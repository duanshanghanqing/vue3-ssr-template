const LRU = require("lru-cache")
const { green } = require("chalk");
const { errorHandler } = require("./errorHandler");

const isProd = process.env.NODE_ENV === "production";

// memory cache
const microCache = new LRU({
  max: 1000,
  maxAge: 20000 // Important: the entry will expire in 20 seconds.
});
const isCacheable = req => {
  // The implementation logic is to check whether the request is user specific.
  // Only non user specific pages are cached
  return true
}

async function render(bundleRenderer, context, req, res) {
  const now = Date.now();
  res.setHeader("Content-Type", "text/html");

  // Read first cache
  const cacheable = isCacheable(req);
  if (cacheable) {
    const html = microCache.get(req.url);
    if (html) {
      res.end(html);
      if (!isProd) {
        console.log(green(`render page from cache, Whole request took: ${Date.now() - now}ms`));
      }
      return;
    }
  }

  try {
    const content = await bundleRenderer.renderToString(context);
    const html = `
      <!DOCTYPE html>
      <html lang="zh-CN">
        <head>
          <script> window.__INITIAL_STATE__ = ${JSON.stringify(context.state)} </script>
          ${context.renderResourceHints()}
          ${context.renderStyles()}
          
          <title>${context.title}</title>
        </head>
        <body>
          <div id="app">${content}</div>
          ${context.renderScripts()}
        </body>
      </html>  
    `.trim();

    res.send(html);
    // Cache set
    if (cacheable) {
      microCache.set(req.url, html)
    }

    if (!isProd) {
      console.log(green(`Whole request took: ${Date.now() - now}ms`));
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
}

module.exports = { render };

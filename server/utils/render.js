const LRU = require("lru-cache")
const { green } = require("chalk");
const { errorHandler } = require("./errorHandler");

const isProd = process.env.NODE_ENV === "production";

// 内存缓存
const microCache = new LRU({
  max: 1000,
  maxAge: 20000 // 重要提示：条目在 20 秒后过期。
});
const isCacheable = req => {
  // 实现逻辑为，检查请求是否是用户特定(user-specific)。
  // 只有非用户特定(non-user-specific)页面才会缓存
  return true
}

async function render(bundleRenderer, context, req, res) {
  const now = Date.now();
  res.setHeader("Content-Type", "text/html");

  // 优先读缓存
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
    // 缓存设置
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

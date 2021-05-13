import { initApp } from "./main";

const { app, router, store } = initApp();

declare let window: any;
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.isReady().then(() => {
  router.beforeResolve((to, from, next) => {
    const matched = to.matched;

    const prevMatched = from.matched;

    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })

    const titleHooks: any[] = [];
    const asyncDataHooks: any[] = [];
    activated.forEach((c: any) => {
      const title = c.components.title || c.components.default.title;
      const asyncData = c.components.asyncData || c.components.default.asyncData;
      if (asyncData) {
        asyncDataHooks.push(asyncData({ route: router.currentRoute, store }));
      }

      if (title) {
        titleHooks.push(title);
      }
    });

    // set title
    if (titleHooks.length > 0) {
      const titleHook = titleHooks[titleHooks.length - 1];
      if (typeof titleHook === 'function') {
        titleHook().then((t: string) => {
          document.title = t;
        });
      } else if (typeof titleHook === 'string') {
        document.title = titleHook;
      }
    }

    if (!asyncDataHooks.length) {
      return next()
    }

    Promise.all(asyncDataHooks).finally(next);
  });

  app.mount("#app");
});

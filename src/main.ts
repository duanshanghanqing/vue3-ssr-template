import { createSSRApp } from "vue";
import App from "./App.vue";

import { initRouter } from "./router";
import { initStore } from "./store";

export function initApp() {
  const app = createSSRApp(App);
  const router = initRouter();
  const store = initStore();
  app.use(router);
  app.use(store);

  return {
    app,
    router,
    store,
  };
}

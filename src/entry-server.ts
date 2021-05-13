/* eslint-disable no-useless-catch */
import { initApp } from "./main";

export default async (context: any) => {
  try {
    const { app, router, store } = initApp();

    const { fullPath } = router.resolve(context.req.url)
    if (fullPath !== context.req.url) {
      return { url: fullPath }
    }

    // set router's location
    router.push(context.req.url);

    // wait until router has resolved possible async hooks
    await router.isReady();


    // 服务端获取数据，存在 store 中
    const matchedComponents = router.currentRoute.value.matched
      .map((record) => Object.values(record.components))
      .flat();

    // no matched routes
    if (!matchedComponents.length) {
      throw { code: 404 };
    }

    // Call fetchData hooks on components matched by the route.
    // A preFetch hook dispatches a store action and returns a Promise,
    // which is resolved when the action is complete and store state has been
    // updated.
    // 服务端获取数据，然后注入到前端
    // asyncData 方法返回 Promise 对象
    await Promise.all(
      matchedComponents.map((component: any) => component.asyncData && component.asyncData({ route: router.currentRoute, store }))
    );
    context.state = store.state;
    
    
    // 服务端设置 页面标题
    const pageComponent: any = matchedComponents[matchedComponents.length - 1];
    if (pageComponent.title) {
      if (typeof pageComponent.title === 'function') {
        context.title = await pageComponent.title();
      } else if (typeof pageComponent.title === 'string') {
        context.title = pageComponent.title;
      }
    }

    return app;
  } catch (err) {
    throw err;
  }
};

const Home = () => import(/* webpackChunkName: "about" */ "../views/Home.vue");
const About = () =>
  import(/* webpackChunkName: "about" */ "../views/About.vue");
const Blank = () =>
  import(/* webpackChunkName: "blank" */ "../views/Blank.vue");
const Store = () => import(/* webpackChunkName: "about" */ "../views/Store.vue");

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/blank",
    name: "BlankPage",
    component: Blank,
    meta: { layout: "LayoutBlank" },
  },
  {
    path: "/store",
    name: "Store",
    component: Store,
    meta: { layout: "Store" },
  },
];

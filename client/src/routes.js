import Login from "./pages/Login";
import Post from "./pages/Posts";
import Page from "./pages/Pages";

const dashboardRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "pe-7s-user",
    component: Login,
    layout: "/",
    showOnSideBar: false,
  },
  {
    path: "/post",
    name: "Posts",
    icon: "pe-7s-note2",
    component: Post,
    layout: "/",
    showOnSideBar: true,
  },
  {
    path: "/page",
    name: "Pages",
    icon: "pe-7s-news-paper",
    component: Page,
    layout: "/",
    showOnSideBar: true,
  },
];
export default dashboardRoutes;

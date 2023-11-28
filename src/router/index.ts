import { createRouter, createWebHistory } from "vue-router";
import { RouteNames } from "./RouteNames";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "",
            name: RouteNames.home,
            component: () => import(/* webpackChunkName: "home" */ "@/views/MainView.vue"),
        },
        {
            path: "/unauthorized",
            name: RouteNames.unauthorized,
            component: () => import(/* webpackChunkName: "unauthorized" */ "@/views/errors/UnauthorizedView.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            name: RouteNames.notFound,
            component: () => import(/* webpackChunkName: "notFound" */ "@/views/errors/NotFoundView.vue"),
        },
    ],
});

export default router;

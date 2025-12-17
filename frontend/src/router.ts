import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/people/:id",
        name: "Details",
        component: () => import("./views/People.vue"),
    },
    {
        path: "/movie/:id",
        name: "Movie",
        component: () => import("./views/Movie.vue"),
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

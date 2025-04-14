import { createRouter, createMemoryHistory } from "vue-router";
import CheckSubconfigs from "../components/CheckSubconfigs.vue"
import NotFound from "../components/NotFound.vue";
import Preview from "../components/Preview.vue";
import UpdateConfig from "../components/UpdateConfig.vue";

const routes = [
    { path: '/', component: CheckSubconfigs },
    { path: '/check-config', component: CheckSubconfigs },
    { path: '/update-config', component: UpdateConfig },
    { path: '/preview', component: Preview }, 
]
  
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})
  
export default router;

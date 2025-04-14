import { createRouter, createMemoryHistory } from "vue-router";
import CountrySubconfigs from "../views/lists/CountrySubconfigs.vue";
import LocationSubconfigs from "../views/lists/LocationSubconfigs.vue";
import NotFound from "../views/NotFound.vue";
import OrganizationConfigs from "../views/lists/OrganizationConfigs.vue";
import UpdateConfig from "../views/UpdateConfig.vue";

const routes = [
    { path: '/', component: OrganizationConfigs },
    { path: '/check-organization-config', component: CountrySubconfigs },
    { path: '/check-organization-country-config', component: LocationSubconfigs },

    { path: '/create-organization-config', component: UpdateConfig },
    { path: '/create-organization-country-config', component: UpdateConfig },
    { path: '/create-organization-location-config', component: UpdateConfig },

    { path: '/update-organization-config', component: UpdateConfig },
    { path: '/update-organization-country-config', component: UpdateConfig },
    { path: '/update-organization-location-config', component: UpdateConfig },

]
  
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})
  
export default router;

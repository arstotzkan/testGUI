import { createRouter, createMemoryHistory } from "vue-router";

import CountrySubconfigs from "../views/lists/CountrySubconfigs.vue";
import LocationSubconfigs from "../views/lists/LocationSubconfigs.vue";
import OrganizationConfigs from "../views/lists/OrganizationConfigs.vue";

import UpdateOrganizationConfig from "../views/updateConfig/UpdateOrganizationConfig.vue";
import UpdateCountryConfig from "../views/updateConfig/UpdateCountryConfig.vue";
import UpdateLocationConfig from "../views/updateConfig/UpdateLocationConfig.vue";

import CreateOrganizationConfig from "../views/createConfig/CreateOrganizationConfig.vue";
import CreateCountryConfig from "../views/createConfig/CreateCountryConfig.vue";
import CreateLocationConfig from "../views/createConfig/CreateLocationConfig.vue";

import NotFound from "../views/NotFound.vue";

const routes = [
    { path: '/', component: OrganizationConfigs },
    { path: '/check-organization-config', component: CountrySubconfigs },
    { path: '/check-organization-country-config', component: LocationSubconfigs },

    { path: '/create-organization-config', component: CreateOrganizationConfig },
    { path: '/create-organization-country-config', component: CreateCountryConfig },
    { path: '/create-organization-location-config', component: CreateLocationConfig },

    { path: '/update-organization-config', component: UpdateOrganizationConfig },
    { path: '/update-organization-country-config', component: UpdateCountryConfig },
    { path: '/update-organization-location-config', component: UpdateLocationConfig },

    { path: '/:pathMatch(.*)*', component: NotFound}
]
  
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})
  
export default router;

import api from './api';

export function getOrganizationConfig(org) {
    return api.get(`/api/get-organization-config?org=${org}`);
}
  
export function getCountryConfig(org, country) {
    return api.get(`/api/get-country-config?org=${org}&country=${country}`);
}

export function getLocationConfig(org, country, loc) {
    return api.get(`/api/get-location-config?org=${org}&country=${country}&location=${loc}`);
}

export function getOrganizations(org) {
    return api.get(`/api/get-organizations`);
}
  
export function getOrganizationCountryConfigs(org) {
    return api.get(`/api/get-organization-country-configs?org=${org}`);
}

export function getCountryLocationConfigs(org, country) {
    return api.get(`/api/get-organization-location-configs?org=${org}&country=${country}`);
}

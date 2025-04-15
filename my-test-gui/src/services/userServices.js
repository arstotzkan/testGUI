import api from './api';

export function getOrganizationConfig(id) {
    return api.get(`/api/get-organization-config?id=${id}`);
}
  
export function getCountryConfig(id) {
    return api.get(`/api/get-country-config?id=${id}`);
}

export function getLocationConfig(id) {
    return api.get(`/api/get-location-config?id=${id}`);
}

export function getOrganizations() {
    return api.get(`/api/get-organizations`);
}
  
export function getOrganizationCountryConfigs(id) {
    return api.get(`/api/get-organization-country-configs?id=${id}`);
}

export function getCountryLocationConfigs(id) {
    return api.get(`/api/get-organization-location-configs?id=${id}`);
}

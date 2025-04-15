import api from './api'

export function getOrganizationConfig(id) {
  return api.get(`/api/get-organization-config?id=${id}`)
}

export function getCountryConfig(id) {
  return api.get(`/api/get-country-config?id=${id}`)
}

export function getLocationConfig(id) {
  return api.get(`/api/get-location-config?id=${id}`)
}

export function getOrganizations() {
  return api.get(`/api/get-organizations`)
}

export function getOrganizationCountryConfigs(id) {
  return api.get(`/api/get-organization-country-configs?id=${id}`)
}

export function getCountryLocationConfigs(id) {
  return api.get(`/api/get-organization-location-configs?id=${id}`)
}

export async function updateOrganizationConfig(data) {
  try {
    const response = await api.post('/api/update-organization-config', data)
    return response.data
  } catch (error) {
    console.error('Error posting config:', error)
    throw error
  }
}

export async function updateCountryConfig(data) {
  try {
    const response = await api.post('/api/update-country-config', data)
    return response.data
  } catch (error) {
    console.error('Error posting config:', error)
    throw error
  }
}

export async function updateLocationConfig(data) {
  try {
    const response = await api.post('/api/update-location-config', data)
    return response.data
  } catch (error) {
    console.error('Error posting config:', error)
    throw error
  }
}
export async function createOrganizationConfig(data) {
  try {
    const response = await api.post('/api/create-organization-config', data)
    return response.data
  } catch (error) {
    console.error('Error posting config:', error)
    throw error
  }
}

export async function createCountryConfig(data) {
  try {
    const response = await api.post('/api/create-country-config', data)
    return response.data
  } catch (error) {
    console.error('Error posting config:', error)
    throw error
  }
}

export async function createLocationConfig(data) {
  try {
    const response = await api.post('/api/create-location-config', data)
    return response.data
  } catch (error) {
    console.error('Error posting config:', error)
    throw error
  }
}

export async function deleteOrganizationConfig(id) {
  try {
    const response = await api.delete('/api/delete-organization-config', { data: { id } });
    return response.data;
  } catch (error) {
    console.error('Error deleting organization config:', error);
    throw error;
  }
}

export async function deleteCountryConfig(id) {
  try {
    const response = await api.delete('/api/delete-country-config', { data: { id } });
    return response.data;
  } catch (error) {
    console.error('Error deleting country config:', error);
    throw error;
  }
}

export async function deleteLocationConfig(id) {
  try {
    const response = await api.delete('/api/delete-location-config', { data: { id } });
    return response.data;
  } catch (error) {
    console.error('Error deleting location config:', error);
    throw error;
  }
}


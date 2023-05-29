import api from './api';

export async function save(body, token) {
  const response = await api.post('/activities', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getAllActivities(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getUserActivities(token) {
  const response = await api.get('/activities/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
//

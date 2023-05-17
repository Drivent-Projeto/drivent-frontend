import api from './api';

export async function save(body, token) {
  const response = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getlistBooking(token) {
  const response = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function putChangeBooking(bookingId, roomId, token) {
  const response = await api.put(`/booking/${bookingId}`, { roomId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
//

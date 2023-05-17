import { useState, useEffect } from 'react';
import * as bookingApi from '../../services/bookingApi';
import useToken from '../useToken';

export default function useBooking() {
  const token = useToken();
  const [booking, setBooking] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const reload = () => {
    setReloadTrigger(!reloadTrigger);
  };

  useEffect(() => {
    const fetchBooking = async() => {
      try {
        const response = await bookingApi.getlistBooking(token);
        const bookingData = await response;
        setBooking(bookingData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Erro ao buscar o ticket:', error);
      }
    };

    fetchBooking();
  }, [token, reloadTrigger]);

  return {
    booking,
    reload,
  };
}

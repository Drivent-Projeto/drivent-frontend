import { useEffect, useState } from 'react';
import * as ticketApi from '../../services/ticketApi';
import useToken from '../useToken';

export default function useTicket() {
  const token = useToken();
  const [ticket, setTicket] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const reload = () => {
    setReloadTrigger(!reloadTrigger);
  };

  useEffect(() => {
    const fetchTicket = async() => {
      try {
        const response = await ticketApi.getUserTicket(token);
        const ticketData = await response;
        setTicket(ticketData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Erro ao buscar o ticket:', error);
      }
    };

    fetchTicket();
  }, [token, reloadTrigger]);

  return {
    ticket,
    reload,
  };
}

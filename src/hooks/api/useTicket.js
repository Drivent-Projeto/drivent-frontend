<<<<<<< Updated upstream
import * as ticketApi from '../../services/ticketApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useTicket() {
  const token = useToken();

  const { data: ticket } = useAsync(() => ticketApi.getUserTicket(token));
=======
import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useTicket() {
  const token = useToken();
  
  const { data: ticket } = useAsync(() => ticketApi.getTicket(token));
>>>>>>> Stashed changes

  return {
    ticket,
  };
}

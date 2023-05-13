import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePayment() {
  const token = useToken();
  
  const { data: payment } = useAsync(() => paymentApi.getPaymentByTicketId(token));

  return {
    payment,
  };
}

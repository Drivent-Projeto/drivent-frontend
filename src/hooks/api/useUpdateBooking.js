import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';
import useAsync from '../useAsync';

export default function useUpdateBooking() {
  const token = useToken();

  const {
    loading: updateBookingLoading,
    error: updateBookingError,
    act: updateBooking
  } = useAsync((data) => bookingApi.putChangeBooking(data.bookingId, data.roomId, token), false);

  return {
    updateBookingLoading,
    updateBookingError,
    updateBooking
  };
}

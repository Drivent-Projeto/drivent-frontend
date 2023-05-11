import * as hotelApi from '../../services/hotelApi.js';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useHotelRooms(hotelId) {
  const token = useToken();

  const { data: hotel } = useAsync(() => hotelApi.getHotelWhithRooms(token, hotelId));

  return {
    hotel,
  };
}

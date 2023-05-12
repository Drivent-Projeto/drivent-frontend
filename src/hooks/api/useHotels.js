import * as hotelApi from '../../services/hotelApi.js';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useHotels() {
  const token = useToken();

  const { data: hotels } = useAsync(() => hotelApi.getHotels(token), true);

  return {
    hotels,
  };
}

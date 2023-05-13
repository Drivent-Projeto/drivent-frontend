import useHotelRooms from '../../hooks/api/useHotelRooms';
import { RoomTypes } from './RoomTypes';

export default function HotelCard({ hotel }) {
  const { hotelRooms } = useHotelRooms(hotel.id);
  const emptyRoomSpace = hotelRooms?.Rooms.map(({ capacity, Booking }) => capacity - Booking.length).reduce((a, b) => {
    return a + b;
  });
  return (
    <div>
      <img src={hotel.image} alt="hotel" />
      <h1>{hotel.name}</h1>
      <h2>Tipos de acomodação:</h2>
      {hotelRooms && <RoomTypes Rooms={hotelRooms.Rooms} />}
      <h2>Vagas disponíveis:</h2>
      {/* <h3>{hotelRooms?.Rooms.length}</h3> */}
      <h3>
        {emptyRoomSpace}
      </h3>
    </div>
  );
}

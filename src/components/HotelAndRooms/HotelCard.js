import styled from 'styled-components';
import useHotelRooms from '../../hooks/api/useHotelRooms';
import { RoomTypes } from './RoomTypes';

export default function HotelCard({ hotel, selected, setSelectedHotel, setSelectedRoom }) {
  const { hotelRooms } = useHotelRooms(hotel.id);
  const emptyRoomSpace = hotelRooms?.Rooms.map(({ capacity, Booking }) => capacity - Booking.length).reduce((a, b) => {
    return a + b;
  });

  function selectHotel() {
    setSelectedHotel(hotelRooms);
    if(!selected) setSelectedRoom(null);
  }
  return (
    <HotelCardColorContainer selected={selected} onClick={selectHotel}>
      <img src={hotel.image} alt="hotel" />
      <h1>{hotel.name}</h1>
      <h2>Tipos de acomodação:</h2>
      {hotelRooms && <RoomTypes Rooms={hotelRooms.Rooms} />}
      <h2>Vagas disponíveis:</h2>
      <h3>{emptyRoomSpace}</h3>
    </HotelCardColorContainer>
  );
}

const HotelCardColorContainer = styled.div`
  background-color: ${({ selected }) => (selected ? '#ffeed2' : '#F1F1F1')};
`;

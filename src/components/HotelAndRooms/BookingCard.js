import styled from 'styled-components';
import useHotelRooms from '../../hooks/api/useHotelRooms';
import { RoomTypes } from './RoomTypes';

export default function HotelCard({ hotelId, nameBooking, qntPeople }) {
  const { hotelRooms } = useHotelRooms(hotelId);

  if (!hotelRooms) return <p>carregando</p>;
  
  return (
    <HotelCardColorContainer>
      <img src={hotelRooms.image} alt="hotel" />
      <h1>{hotelRooms.name}</h1>
      <h2>Quarto reservado</h2>
      <h3>{nameBooking} <RoomTypes Rooms={hotelRooms.Rooms}/></h3>            
      <h2>Pessoas no seu quarto</h2>
      <h3>{qntPeople === 0 ? 'Somente você' : 'Você e mais ' +  qntPeople }</h3>
    </HotelCardColorContainer>
  );
}

const HotelCardColorContainer = styled.div`
  background-color: #ffeed2;
`;

import styled from 'styled-components';
import { TitleAndSubtitle } from '../TitleAndSubtitle';
import Room from './Room';

export default function HotelRooms({ rooms, selectedRoom, setSelectedRoom }) {
  return (
    <>
      <TitleAndSubtitle subtitle={'Ótima pedida! Agora escolha seu quarto:'} />
      <RommContainer>
        {rooms.map((room) => (
          <Room
            key={room.id}
            room={room}
            setSelectedRoom={setSelectedRoom}
            selected={selectedRoom?.id === room.id}
            disabled={room.Booking.length >= room.capacity}
          />
        ))}
      </RommContainer>
    </>
  );
}

const RommContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 17px;
  margin: 36px 0;
`;

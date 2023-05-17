import styled from 'styled-components';
import useHotels from '../../hooks/api/useHotels';
import { TitleAndSubtitle } from '../TitleAndSubtitle';
import HotelCard from './HotelCard';
import BookingCard from './BookingCard';
import { useState } from 'react';
import HotelRooms from './HotelRooms';
import Button from '../Form/Button';
import useSaveBooking from '../../hooks/api/useSaveBooking';
import { toast } from 'react-toastify';
import useBooking from '../../hooks/api/useBooking';
import { useEffect } from 'react';

export function HotelAndRooms() {
  const { hotels } = useHotels();
  const { booking, reload } = useBooking();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [layout, setLayout] = useState(true);
  const { saveBooking } = useSaveBooking();

  useEffect(() => {
    if (booking) {
      toast('Quarto já esta reservado!!');
      setLayout(false);
    }
  }, [booking]);

  async function submitBooking() {
    const newData = { roomId: selectedRoom.id };
    try {
      await saveBooking(newData);
      setLayout(false);
      toast('Quarto reservado com sucesso!');
      handleReload();
    } catch (err) {
      toast('Não foi possível reservar quarto escolhido!');
    }
  }

  const handleReload = () => {
    reload();
  };

  async function updateBooking() {
    setLayout(true);
  }

  return (
    <>
      {layout ?(
        <>
          <TitleAndSubtitle title={'Escolha de hotel e quarto'} subtitle={'Primeiro, escolha seu hotel'} />
          <HotelContainer>
            {hotels?.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                selected={selectedHotel?.id === hotel.id}
                setSelectedHotel={setSelectedHotel}
                setSelectedRoom={setSelectedRoom}
              />
            ))}
          </HotelContainer>
          {selectedHotel && (
            <HotelRooms rooms={selectedHotel.Rooms} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
          )}
      
          {selectedRoom && (
            <Button type="submit" onClick={() => submitBooking()}>
              RESERVAR QUARTO
            </Button>
          )}
        </>
      ) : (
        <>
          <TitleAndSubtitle title={'Escolha de hotel e quarto'} subtitle={'Você já escolheu seu quarto:'} />
          <HotelContainer>      
            <BookingCard
              key={booking?.id}
              nameBooking={selectedRoom ? selectedRoom.name : booking.Room.name}
              hotelId={booking ? booking.Room.hotelId : selectedHotel.id}
              qntPeople={booking ? booking.Room.capacity-1 : selectedRoom.capacity-1}
            />            
          </HotelContainer>
             
          <Button type="submit" onClick={() => updateBooking()}>
            TROCAR DE QUARTO
          </Button>
          
        </>
      )}
    </>
  );
}

const HotelContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 18px;

  > div {
    width: 196px;
    height: 264px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    padding-top: 16px;
    padding-bottom: 22px;
    :hover {
      cursor: pointer;
    }

    > img {
      width: 168px;
      height: 109px;
      border-radius: 5px;
    }
    > h1 {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 23px;
      color: #343434;
      width: calc(100% - 28px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    > h2 {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 14px;
      color: #3c3c3c;
      width: calc(100% - 28px);
    }
    > h3 {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #3c3c3c;
      width: calc(100% - 28px);
    }
  }
`;

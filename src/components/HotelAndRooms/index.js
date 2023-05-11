// import useHotels from '../../hooks/api/useHotels';
import styled from 'styled-components';
import { TitleAndSubtitle } from '../TitleAndSubtitle';

export function HotelAndRooms() {
  //   const { hotels } = useHotels();
  const hotels = [
    {
      id: 67,
      name: 'Ginger Schuppe',
      image: 'http://loremflickr.com/640/480',
      createdAt: '2023-05-11T22:48:55.189Z',
      updatedAt: '2023-05-11T22:48:55.189Z',
    },
    {
      id: 68,
      name: 'Vincent Roberts',
      image: 'http://loremflickr.com/640/480',
      createdAt: '2023-05-11T22:48:55.199Z',
      updatedAt: '2023-05-11T22:48:55.200Z',
    },
    {
      id: 69,
      name: 'Johnnie Johns DVM',
      image: 'http://loremflickr.com/640/480',
      createdAt: '2023-05-11T22:48:55.205Z',
      updatedAt: '2023-05-11T22:48:55.206Z',
    },
  ];
  return (
    <>
      <TitleAndSubtitle title={'Escolha de hotel e quarto'} subtitle={'Primeiro, escolha seu hotel'} />
      <HotelContainer>
        {hotels?.map((hotel) => (
          <div>
            <img src={hotel.image} alt="hotel" />
            <h1>{hotel.name}</h1>
            <h2>Tipos de acomodação:</h2>
            <h3>Single e Double</h3>
            <h2>Vagas disponíveis:</h2>
            <h3>103</h3>
          </div>
        ))}
      </HotelContainer>
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
    background: #ebebeb;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    padding-top: 16px;
    padding-bottom: 22px;

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

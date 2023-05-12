import useHotelRooms from '../../hooks/api/useHotelRooms';

export default function HotelCard({ hotel }) {
  const { hotelRooms } = useHotelRooms(hotel.id);
  //   const
  return (
    <div>
      <img src={hotel.image} alt="hotel" />
      <h1>{hotel.name}</h1>
      <h2>Tipos de acomodação:</h2>
      {hotelRooms && <RoomTypes Rooms={hotelRooms.Rooms}/>}
      <h2>Vagas disponíveis:</h2>
      {/* <h3>{hotelRooms?.Rooms.length}</h3> */}
      <h3>
        {hotelRooms?.Rooms.map(({ capacity }) => capacity).reduce((a, b) => {
          return a + b;
        })}
      </h3>
    </div>
  );
}

function RoomTypes({ Rooms }) {
  const capacitySet = new Set(Rooms.map(({ capacity }) => capacity));
  let text = '';
  switch (true) {
  case capacitySet.has(1 ) && capacitySet.has(2) && capacitySet.has(3):
    text = 'Single, Double e Triple';
    break;
  case capacitySet.has(1 ) && capacitySet.has(2):
    text = 'Single e Double';
    break;
  case capacitySet.has(2 ) && capacitySet.has(3):
    text = 'Double e Triple';
    break;
  case capacitySet.has(1 ) && capacitySet.has(3):
    text = 'Single e Triple';
    break;
  case capacitySet.has(1):
    text = 'Single';
    break;
  case capacitySet.has(2):
    text = 'Double';
    break;
  case capacitySet.has(3):
    text = 'Triple';
    break;
  default:
    text = 'No Room';
    break;
  }
  return (
    <>
      <h3>{text}</h3>
    </>
  );
}

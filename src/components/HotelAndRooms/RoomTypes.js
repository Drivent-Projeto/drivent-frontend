export function RoomTypes({ Rooms }) {
  const capacitySet = new Set(Rooms.map(({ capacity }) => capacity));
  let text = '';
  switch (true) {
  case capacitySet.has(1) && capacitySet.has(2) && capacitySet.has(3):
    text = 'Single, Double e Triple';
    break;
  case capacitySet.has(1) && capacitySet.has(2):
    text = 'Single e Double';
    break;
  case capacitySet.has(2) && capacitySet.has(3):
    text = 'Double e Triple';
    break;
  case capacitySet.has(1) && capacitySet.has(3):
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

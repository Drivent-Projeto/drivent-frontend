import styled from 'styled-components';
import { BsPersonFill, BsPerson } from 'react-icons/bs';

export default function Room({ room, setSelectedRoom, selected, disabled }) {
  function setSelected() {
    setSelectedRoom(room);
  }
  return (
    <>
      <StyledRoom selected={selected} onClick={setSelected} disabled={disabled}>
        <h1>{room.id}</h1>
        <div>
          {Array.from({ length: room.capacity - room.Booking.length - (selected && 1) }).map((_x, index) => (
            <BsPerson key={index} />
          ))}
          {selected && <BsPersonFill key={'selected'} fill="#FF4791" />}
          {room.Booking.map((_x, index) => (
            <BsPersonFill key={index} />
          ))}
        </div>
      </StyledRoom>
    </>
  );
}

const StyledRoom = styled.button`
  display: flex;
  width: 190px;
  height: 45px;
  border: 1px solid #cecece;
  border-radius: 10px;
  background-color: ${({ selected, disabled }) => (disabled ? '#E9E9E9' : selected ? '#FFEED2' : 'transparent')};
  padding: 0 16px;
  cursor: pointer;

  align-items: center;
  justify-content: space-between;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #454545;
  filter: grayscale(${({ disabled }) => (disabled ? 1 : 0)});
  /* filter: grayscale(1); */
`;

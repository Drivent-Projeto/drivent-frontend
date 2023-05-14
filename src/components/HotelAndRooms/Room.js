import styled from 'styled-components';

export default function Room({ room, setSelectedRoom, selected }) {
  function setSelected() {
    setSelectedRoom(room);
  }
  return (
    <>
      <StyledRoom selected={selected} onClick={setSelected}>
        <div>{room.id}</div>
        <div>{room.capacity}</div>
      </StyledRoom>
    </>
  );
}

const StyledRoom = styled.div`
  display: flex;
  width: 190px;
  height: 45px;
  border: 1px solid #cecece;
  border-radius: 10px;
  background-color: ${({ selected }) => (selected ? '#FFEED2' : 'transparent')};
  padding: 0 16px;

  align-items: center;
  justify-content: space-between;
`;

import styled from 'styled-components';

export default function OptionButton({
  name,
  value,
  plus,
  addValue,
  selected,
  type,
  setSelected,
  setTotal,
  baseValue,
  titles,
  setLastType,
}) {
  function setValue() {
    addValue(value);
    setTotal(value + baseValue);
    if (type.isRemote) setTotal(value);
    else setTotal(value + baseValue);
    setSelected(type);
    if (plus || type.isRemote) setLastType(type);
    else setLastType(0);
    console.log(type);
  }

  return (
    <>
      <StyledOptionButton selected={selected.id === type.id} onClick={() => setValue()}>
        <h1>{name ? titles[0] : titles[1]}</h1>

        <h2>
          {plus && '+ '}R$ {value ? value : 0}
        </h2>
      </StyledOptionButton>
    </>
  );
}

const StyledOptionButton = styled.button`
  width: 145px;
  height: 145px;
  border: 1px solid #cecece;
  border-radius: 20px;
  background: ${(props) => (props.selected ? '#FFEED2' : 'transparent')};
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #454545;
  }
  h2 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;

    color: #898989;
  }
`;

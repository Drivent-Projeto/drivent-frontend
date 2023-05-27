import { BiLogIn, BiCheckCircle } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';

export default function ActivityButton({ icon, empty }) {
  const iconOptions = {
    free: (<><BiLogIn/> <p>{empty} vagas</p></>),
    registered: (<><BiCheckCircle/> <p>Inscrito</p></>),
    full: (<><AiOutlineCloseCircle/> <p>Esgotado</p></>) 
  };

  return(
    <StyledActivityButton color={icon === 'full'}>
      {iconOptions[icon]}
    </StyledActivityButton>
  );
}

const StyledActivityButton = styled.div`
display: column;
color: ${({ color }) => color? '#CC6666':'#078632'};
text-align: center;
  :hover {
      cursor: pointer;
  }
  >p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
  }
  >svg{
    width: 20px;
    height: 20px;
  }
`;

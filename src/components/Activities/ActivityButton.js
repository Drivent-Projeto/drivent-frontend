import { BiLogIn, BiCheckCircle } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';
import useSaveActivite from '../../hooks/api/useSaveActivite';

export default function ActivityButton({ icon, empty, activityId }) {
  const { saveActivite } = useSaveActivite();
  const iconOptions = {
    free: (<><BiLogIn onClick={registerActivity}/> <p>{empty} vagas</p></>),
    registered: (<><BiCheckCircle/> <p>Inscrito</p></>),
    full: (<><AiOutlineCloseCircle/> <p>Esgotado</p></>) 
  };
  function registerActivity(e) {
    e.preventdefault();
  }
  // const userActivities = [{ id: 1 }, { id: 2 }];
  //  if(userActivities.includes())
  //   else if(activity.capacity >= activity._count.userActivity) icon = 'full';

  return(
    <StyledActivityButton icon={icon}>
      {iconOptions[icon]}
    </StyledActivityButton>
  );
}

const StyledActivityButton = styled.div`
display: column;
color: ${({ icon }) => icon === 'full'? '#CC6666':'#078632'};
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

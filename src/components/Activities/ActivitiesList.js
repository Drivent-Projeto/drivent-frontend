import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ActivityCard from './ActivityCard';

export default function ActivitiesList({ day }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Faça uma requisição para api de atividades passando o day como parâmetro.
    // Precisa criar esse endpoint
    // O day está vindo no format MM-DD para facilitar a requisição

    // Filtre as atividades na hora de renderizar o componente ActivityCard
    // Ex: activities.filter(activity => activity.local === 'mainAuditorium').map(...);

    // Passe a activity como parâmetro para o componente ActivityCard
  }, [day]);

  const activity1 = {
    id: 1,
    name: 'Palestra 1',
    local: 'mainAuditorium',
    startsAt: '2023-05-28 12:00:00.242',
    endsAt: '2023-05-28 13:00:00.242',
    capacity: 27,
    filled: 23,
    registered: false
  };

  const activity2 = {
    id: 2,
    name: 'Palestra 2',
    local: 'sideAuditorium',
    startsAt: '2023-05-28 12:00:00.242',
    endsAt: '2023-05-28 14:00:00.242',
    capacity: 25,
    filled: 25,
    registered: false
  };

  const activity3 = {
    id: 3,
    name: 'Palestra 3',
    local: 'workshopRoom',
    startsAt: '2023-05-28 12:00:00.242',
    endsAt: '2023-05-28 13:00:00.242',
    capacity: 25,
    filled: 15,
    registered: true
  };

  return(
    <Container>
      <div>
        <h2>Auditório Principal</h2>
        <div>
          <ActivityCard activity={activity1} />
          <ActivityCard activity={activity1} />
        </div>
      </div>
      <div>
        <h2>Auditório Lateral</h2>
        <div className='no-border-left'>
          <ActivityCard activity={activity2} />
        </div>
      </div>
      <div>
        <h2>Sala de Workshop</h2>
        <div className='no-border-left'>
          <ActivityCard activity={activity3} />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 60px;

  > div {
    flex: 1;
    
    > h2 {
      font-family: 'Roboto', sans-serif;
      color: #7B7B7B;
      font-size: 17px;
      font-weight: 400;
      text-align: center;
    }

    > div {
      width: 100%;
      min-height: calc(100vh - 500px);
      border: 1px solid #D7D7D7;
      margin-top: 15px;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      gap: 10px;

      &.no-border-left {
        border-left: none;
      }
    }
  }
`;

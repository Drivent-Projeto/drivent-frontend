import styled from 'styled-components';
import { useEffect } from 'react';
import ActivityCard from './ActivityCard';
import useActivite from '../../hooks/api/useActivite';

export default function ActivitiesList({ day }) {
  const { activities, reload } = useActivite(day);

  useEffect(() => {
    if (activities) {
      handleReload(); 
    };
  }, [day]);

  const handleReload = () => {
    reload();
  };

  return(
    <Container>
      <div>
        <h2>Auditório Principal</h2>
        <div>
          {activities && activities
            .filter(activity => activity.local === 'mainAuditorium')
            .map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
        </div>
      </div>
      <div>
        <h2>Auditório Lateral</h2>
        <div className='no-border-left'>
          {activities && activities
            .filter(activity => activity.local === 'sideAuditorium')
            .map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
        </div>
      </div>
      <div>
        <h2>Sala de Workshop</h2>
        <div className='no-border-left'>
          {activities && activities
            .filter(activity => activity.local === 'workshopRoom')
            .map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
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

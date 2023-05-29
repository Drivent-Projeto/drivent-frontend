import styled from 'styled-components';
import ActivityButton from './ActivityButton';
import dayjs from 'dayjs';

const ActivityCard = ({ activity }) => {
  const qtdHours = dayjs(activity.endsAt).diff(dayjs(activity.startsAt), 'hour');
  const height = qtdHours > 1 ? ((80 * qtdHours) + (10 * (qtdHours-1))) : 80;
  const available = activity.capacity - activity.filled;

  return (
    <Card height={height} registered={activity.registered}>
      <div>
        <h3>{activity.name}</h3>
        <p>{`${dayjs(activity.startsAt).format('HH:mm')} - ${dayjs(activity.endsAt).format('HH:mm')}`}</p>
      </div>
      <div>
        {activity.registered ? (
          <ActivityButton icon={'registered'} />
        ) : (
          available > 0 ? (
            <ActivityButton icon={'free'} empty={available} activityId={activity.id}/>
          ) : (
            <ActivityButton icon={'full'}/>
          )
        )}
      </div>
    </Card>
  );
};

const Card = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.registered ? '#D0FFDB' : '#F1F1F1'};
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Roboto', sans-serif;
  border-radius: 5px;

  > div:first-child {
    display: flex;
    align-items: flex-start;
    height: 100%;
    flex-direction: column;

    > h3 {
      font-size: 12px;
      font-weight: 700;
      color: #343434;
      width: 100%;
      margin-bottom: 6px;
    }

    > p {
      width: 100%;
      font-size: 12px;
      font-weight: 400;
      color: #343434;
    }
  }

  > div:last-child {
    border-left: 1px solid ${props => props.registered ? '#99E8A1' : '#CFCFCF'};
    padding-left: 12px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    box-sizing: border-box;
  }
`;

export default ActivityCard;

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useEvent from '../../hooks/api/useEvent';
//import Button from '../Form/Button';
import { TitleAndSubtitle } from '../TitleAndSubtitle';
import ActivitiesList from './ActivitiesList';

export function ActivitiesComponent() {
  const { event } = useEvent();
  const [ eventDays, setEventDays ] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  dayjs.locale('pt-br');
  
  useEffect(() => {
    if (event) {
      const startsAt = dayjs(event.startsAt);
      const endsAt = dayjs(event.endsAt);

      const days = [];
      const diffInDays = endsAt.diff(startsAt, 'day');
      
      for (let i = 0; i <= diffInDays; i++) {
        const day = startsAt.add(i, 'day');
        days.push(day);
      }
      setEventDays(days);
    }
  }, [event]);

  return (
    <>
      {selectedDay ?         
        <TitleAndSubtitle title={'Escolha de atividades'} />
        :
        <TitleAndSubtitle title={'Escolha de atividades'} subtitle={'Primeiro, filtre pelo dia do evento:'} />
      }
      <HotelContainer>
        <div>
          {eventDays.map((day) => (
            <Button 
              key={day}
              type="button"
              isSelected={selectedDay === day.format('MM-DD')}
              onClick={() => setSelectedDay(day.format('MM-DD'))}
            >
              {day.format('dddd, DD/MM').replace(/-feira/g, '')}
            </Button>
          ))}
        </div>

        {selectedDay && <ActivitiesList day={selectedDay} />}
      </HotelContainer>
    </>
  );
}

const HotelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 18px;
  gap: 17px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;

  width: 131px;
  height: 37px;
  text-transform: capitalize;
  margin-right: 17px;
  background-color: ${(props) => (props.isSelected ? '#FFD37D' : '#E0E0E0')};
  padding: 10px;
  border: none;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  cursor: pointer;
`;


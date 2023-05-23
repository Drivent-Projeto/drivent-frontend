import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useEvent from '../../hooks/api/useEvent';
import Button from '../Form/Button';
import { TitleAndSubtitle } from '../TitleAndSubtitle';

export function ActivitiesComponent() {
  const { event } = useEvent();
  const [ eventDays, setEventDays ] = useState([]);

  dayjs.locale('pt-br');
  
  useEffect(() => {
    if (event) {
      const startsAt = dayjs(event.startsAt);
      const endsAt = dayjs(event.endsAt);

      const days = [];
      const diffInDays = endsAt.diff(startsAt, 'day');
      
      for (let i = 0; i <= diffInDays; i++) {
        const day = startsAt.add(i, 'day');
        days.push(day.format('dddd, DD/MM').replace(/-feira/g, ''));
      }
      setEventDays(days);
    }
  }, [event]);
  
  return (
    <>
      <TitleAndSubtitle title={'Escolha de atividades'} subtitle={'Primeiro, filtre pelo dia do evento:'} />
      <HotelContainer>
        {eventDays.map((day) => (
          <Button key={day} type="button">
            {day}
          </Button>
        ))}
      </HotelContainer>
    </>
  );
}

const HotelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 18px;
  gap: 17px;

  > button {
    width: 140px;
    text-transform: capitalize;
  }
`;

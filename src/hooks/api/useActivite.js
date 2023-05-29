import { useEffect, useState } from 'react';
import * as activitiesApi from '../../services/activitiesApi';
import useToken from '../useToken';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
//import Activities from '../../pages/Dashboard/Activities/index';
//import { activitiesRepository } from '@/repositories/activities-repository';
//import { getActivities } from '@/controllers';
//import { UserActivity } from '@prisma/client';

export default function getActivities(day) {
  //console.log(day);
  const token = useToken();
  const [activities, setActivities] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const reload = () => {
    setReloadTrigger(!reloadTrigger);
  };

  useEffect(() => {
    const fetchActivities = async() => {
      try {
        const response = await activitiesApi.getAllActivities(token);
        const register = await activitiesApi.getUserActivities(token);
        const activitiesApiData = response
          .filter(activity => dayjs(activity.startsAt).format('MM-DD') === day)
          .map(activity => {
            const filled = activity._count.UserActivity;
            const registered = register.some(reg => reg.activityId === activity.id);
            return {
              ...activity,
              filled,
              registered,
            };
          });

        setActivities(activitiesApiData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Erro ao buscar o Activities:', error);
      }
    };

    fetchActivities();
  }, [token, reloadTrigger]);

  return {
    activities,
    reload,
  };
}

import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useSaveActivite() {
  const token = useToken();

  const {
    loading: saveActiviteLoading,
    error: saveActiviteError,
    act: saveActivite
  } = useAsync((data) => activitiesApi.save(data, token), false);

  return {
    saveActiviteLoading,
    saveActiviteError,
    saveActivite
  };
}

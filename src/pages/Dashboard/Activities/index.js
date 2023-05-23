import { ActivitiesComponent } from '../../../components/Activities';
import EmptPage from '../../../components/EmptPage';
import useTicket from '../../../hooks/api/useTicket';

export default function Activities() {
  const { ticket } = useTicket();

  return (
    <div>
      {(ticket?.status !== 'RESERVED') ? (
        ticket?.TicketType.isRemote ? (
          <EmptPage
            pageName="Escolha de atividades"
            message="Sua modalidade de ingresso não necessita escolher
              atividade. Você terá acesso a todas as atividades."
          />
        ) : (
          <ActivitiesComponent />
        )
      ) : (
        <EmptPage
          pageName="Escolha de atividades"
          message="Você precisa ter confirmado pagamento antes
                de fazer a escolha de atividades"
        />
      )}
    </div>
  );
}

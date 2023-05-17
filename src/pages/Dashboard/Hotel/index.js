import EmptPage from '../../../components/EmptPage';
import { HotelAndRooms } from '../../../components/HotelAndRooms';
import useTicket from '../../../hooks/api/useTicket';

export default function Hotel() {
  const { ticket } = useTicket();

  return (
    <div>
      {(ticket && ticket?.status !== 'RESERVED') ? (
        !ticket.TicketType.includesHotel ? (
          <EmptPage
            pageName="Escolha de hotel e quarto"
            message="Sua modalidade de ingresso não inclui hospedagem
                  Prossiga para a escolha de atividades"
          />
        ) : (
          <HotelAndRooms />
        )
      ) : (
        <EmptPage
          pageName="Escolha de hotel e quarto"
          message="Você precisa ter confirmado pagamento antes
                de fazer a escolha de hospedagem"
        />
      )}
    </div>
  );
}

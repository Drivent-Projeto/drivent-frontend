import EmptPage from '../../../components/EmptPage';
import { HotelAndRooms } from '../../../components/HotelAndRooms';
import useTicket from '../../../hooks/api/useTicket';

export default function Hotel() {
  const { ticket } = useTicket();

  return (
    <div>
      {!ticket && (
        <EmptPage
          pageName="Escolha de hotel e quarto"
          message="Você precisa ter confirmado pagamento antes
          de fazer a escolha de hospedagem"
        />
      )}

      {ticket?.TicketType.includesHotel ? (
        <HotelAndRooms />
      ): (
        <EmptPage
          pageName="Escolha de hotel e quarto"
          message="Sua modalidade de ingresso não inclui hospedagem<br />Prossiga para a escolha de atividades"
        />
      )}

      {/* {ticket ? (
              ticket.isRemote ? (
                <EmptPage
                  pageName="Escolha de hotel e quarto"
                  message="Sua modalidade de ingresso não inclui hospedagem
                  Prossiga para a escolha de atividades"
                />
              ) : (
                <TicketAndPaymentInfo />
              )
            ) : (
              <EmptPage
                pageName="Escolha de hotel e quarto"
                message="Você precisa ter confirmado pagamento antes
                de fazer a escolha de hospedagem"
              />
            )} */}
    </div>
  );
}

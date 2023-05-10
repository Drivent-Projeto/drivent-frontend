import EmptPage from '../../../components/EmptPage';
import TicketAndPaymentInfo from '../../../components/TicketAndPaymentInfo';
import useEnrollment from '../../../hooks/api/useEnrollment';

export default function Payment() {
  const { enrollment } = useEnrollment();

  return (
    <div>
      {false ? (
        <TicketAndPaymentInfo />
      ) : (
        <EmptPage
          pageName="Ingresso e pagamento"
          message="Você precisa completar sua inscrição antes
  de prosseguir pra escolha de ingresso"
        />
      )}
    </div>
  );
}

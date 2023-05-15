import { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useSavePayment from '../../hooks/api/useSavePayment';
import useSaveTicket from '../../hooks/api/useSaveTicket';
import useTicket from '../../hooks/api/useTicket';
import useTicketTypes from '../../hooks/api/useTicketTypes';
import Button from '../Form/Button';
import { StyledTypography } from '../PersonalInformationForm';
import vetor from './../../assets/images/vector.png';
import OptionButton from './OptionButton';

export default function TicketAndPaymentInfo() {
  const { types } = useTicketTypes();
  const { ticket } = useTicket();
  const [ticketValue, setTicketValue] = useState(0);
  const [hotelValue, setHotelValue] = useState(0); // eslint-disable-next-line
  const [total, setTotal] = useState(ticketValue + hotelValue);
  const [selectedType, setSelectedType] = useState(0);
  const [selectedModality, setSelectedModality] = useState(0);
  const [lastType, setLastType] = useState();
  const [layout, setLayout] = useState(true);
  const [paid, setPaid] = useState(false);
  const { saveTicket } = useSaveTicket();
  const { savePayment } = useSavePayment();
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focused: '',
  }); 

  useEffect(() => {
    if (ticket) {
      toast('Ingresso já esta reservado!!');
      setSelectedModality(ticket.TicketType);
      textDisplayedChosenTicket(selectedModality);
      setLastType(ticket.TicketType);
      setLayout(false);

      if (ticket.status === 'PAID') setPaid(true);
    }
  }, [ticket]);

  async function submitTicket() {
    const newData = { ticketTypeId: selectedModality.id };
    try {
      await saveTicket(newData);
      setLayout(false);
      toast('Ingresso escolhido com sucesso!');
    } catch (err) {
      toast('Não foi possível salvar ingresso escolhido!');
    }
  };

  async function submitPayment() {
    const newData = { 
      ticketId: ticket.id, 
      cardData: { 
        number: cardData.number, 
        issuer: cardData.name 
      } };

    try {
      await savePayment(newData);
      toast('Ingresso pago com sucesso!');
      setPaid(true);
    } catch (err) {
      toast('Não foi possível efetuar pagamento do ingresso!');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setCardData({
      ...cardData,
      [name]: value,
    });
  };
  
  const handleInputFocus = (e) => {
    const { name } = e.target;
  
    setCardData({
      ...cardData,
      focused: name,
    });
  };

  function textDisplayedChosenTicket(modality) {
    console.log(modality);
    if(modality.isRemote) return 'Online';
    else if(modality.includesHotel ) return 'Presencial + Com Hotel';
    else return 'Presencial + Sem Hotel';
  }

  function finisherPayment() {
    if (!cardData.name || !cardData.number || !cardData.expiry || !cardData.cvc) {
      toast('insira o cartão corretamente');
    } else {
      submitPayment();
    }
  };

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {layout ?(
        <>
          <StyledSubT>Primeiro, escolha sua modalidade de ingresso</StyledSubT>
          <OptionsContayner>
            {types &&
              types.map(
                (t) =>
                  !t.includesHotel && (
                    <OptionButton
                      key={t.id}
                      name={t.isRemote}
                      type={t}
                      value={t.price}
                      selected={selectedType}
                      setSelected={setSelectedType}
                      setTotal={setTotal}
                      addValue={setTicketValue}
                      baseValue={hotelValue}
                      titles={['Online', 'Presencial']}
                      setLastType={setLastType}
                      plus={selectedModality}
                    />
                  )
              )}
          </OptionsContayner>

          {selectedType !== 0 && !selectedType.isRemote && (
            <>
              <StyledSubT>Ótimo! Agora escolha sua modalidade de hospedagem</StyledSubT>
              <OptionsContayner>
                {types &&
                    types.map(
                      (t) =>
                        !t.isRemote && (
                          <OptionButton
                            key={t.id}
                            name={!t.includesHotel}
                            type={t}
                            value={t.price - ticketValue}
                            selected={selectedModality}
                            setSelected={setSelectedModality}
                            setTotal={setTotal}
                            addValue={setHotelValue}
                            baseValue={ticketValue}
                            titles={['Sem Hotel', 'Com Hotel']}
                            setLastType={setLastType}
                            plus={true}
                          />
                        )
                    )}
              </OptionsContayner>
            </>
          )}

          {lastType !== 0 &&
            lastType && (
            <>
              <StyledSubT>
                  Fechado! O total ficou em <strong>R$ {lastType.isRemote ? lastType?.price : selectedModality?.price}</strong>.
                  Agora é só confirmar
              </StyledSubT>
             
              <Button type="submit" onClick={() => submitTicket()}>
                    RESERVAR INGRESSO
              </Button>
              
            </>
          )}
        </>
      ) : (
        <>
          <StyledSubT>Ingresso escolhido</StyledSubT>
          <OptionsContayner>
            <ChosenTicketStyle>
              <h2>{textDisplayedChosenTicket(lastType)}</h2>
              <h3>R$ {lastType.isRemote ? lastType?.price : selectedModality?.price}</h3>
            </ChosenTicketStyle> 
          </OptionsContayner>   

          <StyledSubT>Pagamento</StyledSubT>
          {!paid ?(
            <>
              <StyledWrapper>
                <div>
                  <Cards
                    number={cardData.number}
                    name={cardData.name}
                    expiry={cardData.expiry}
                    cvc={cardData.cvc}
                    focused={cardData.focused} />
                </div>
                <ContaynerFormInput>
                  <input
                    type="tel"
                    name="number"
                    placeholder="Número do Cartão"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus} 
                  />
                  <p>E.g.: 49..., 51..., 36..., 37...</p>

                  <input
                    type="text"
                    name="name"
                    placeholder="Nome do Titular"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus} 
                  />

                  <div>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/AA"
                      onChange={handleInputChange}
                      onFocus={handleInputFocus} 
                    />

                    <input
                      type="tel"
                      name="cvc"
                      placeholder="CVC"
                      onChange={handleInputChange}
                      onFocus={handleInputFocus} 
                    />
                  </div>                  

                </ContaynerFormInput>
              </StyledWrapper><Button type="button" onClick={() => finisherPayment()}>
                  FINALIZAR PAGAMENTO
              </Button>
            </>
          ) : (
            <PaymentConfirmedContainer>
              <img src={vetor} alt='Ok'/>
              <div>
                <h2><strong>Pagamento confirmado!</strong></h2>
                <h2>Prossiga para escolha de hospedagem e atividades</h2>
              </div>              
            </PaymentConfirmedContainer>
          )}
        </>       
      )}         
    </>
  );
}

const PaymentConfirmedContainer = styled.div`  
    width: 420px;
    height: 100%; 
    margin-top: 19px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h2{
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #454545;
    }
`;

const ContaynerFormInput = styled.form`  
    width: 400px;
    height: 100%; 
    margin: 0 30px;
    input{
      margin-top: 10px;
      width: 100%;
      height: 40px;
      border-radius: 5px;
      border: 1px #d3d3d3 solid;
      ::placeholder{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 23px;
        padding: 0 6px;
        color: #8e8e8e;
      }
    }
    p{
      font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 23px;
        color: #8e8e8e;
    }
    div{
      display: flex;
      justify-content: space-between;
      input:nth-of-type(1){
      width: 220px;    
      }
      input:nth-of-type(2){
        width: 110px;    
      }
    }
    
`;

const StyledWrapper = styled.div`
  width: 706px;
  height: 225px;
  display: flex;
`;

export const StyledSubT = styled.h3`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
  margin-top: 17px;
`;

const OptionsContayner = styled.div`
  display: grid;
  margin-top: 17px;
  grid-column-gap: 10px;
  gap: 24px;
  grid-template-columns: repeat(6, 1fr);
`;

const ChosenTicketStyle = styled.button`
  width: 290px;
  height: 108px;
  background-color: #FFEED2;
  border-radius: 20px;
  border: 1px solid #cecece;
  margin-bottom: 13px;
  h2{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #454545;
    text-align: center;
  }
  h3{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #898989;
    text-align: center;
    margin-top: 8px;
  }
`;

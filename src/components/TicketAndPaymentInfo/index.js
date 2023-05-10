import styled from 'styled-components';
import { StyledTypography } from '../PersonalInformationForm';
import OptionButton from './OptionButton';
import { useState } from 'react';
import useTicketTypes from '../../hooks/api/useTicketTypes';

export default function TicketAndPaymentInfo() {
  const { types } = useTicketTypes();
  const [ticketValue, setTicketValue] = useState(0);
  const [hotelValue, setHotelValue] = useState(0);
  const [total, setTotal] = useState(ticketValue + hotelValue);
  const [selectedType, setSelectedType] = useState(0);
  const [selectedModality, setSelectedModality] = useState(0);
  const [modalityHotel, setModalityHotel] = useState([{ id: 1, name: 'Sem Hotel', price: 0, value: true }, { id: 2, name: 'Com Hotel', price: 350, value: false }]);


  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledSubT>Primeiro, escolha sua modalidade de ingresso</StyledSubT>
      <OptionsContayner>
        {types &&
          types.map((t) => (

            !t.includesHotel && <OptionButton

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
            />
          ))}
      </OptionsContayner>

      <StyledSubT>Ótimo! Agora escolha sua modalidade de hospedagem</StyledSubT>
      <OptionsContayner>
        {modalityHotel.map((t) => (
          <OptionButton
            name={t.value}
            type={t}
            value={t.price}
            selected={selectedModality}
            setSelected={setSelectedModality}
            setTotal={setTotal}
            addValue={setHotelValue}
            baseValue={ticketValue}
            titles={['Sem Hotel', 'Com Hotel']}
          />
        ))}
      </OptionsContayner>

      <StyledSubT>Fechado! O total em <strong>R$ {total}</strong>. Agora é só confirmar</StyledSubT>
      
    </>

  );
}

const StyledSubT = styled.h3`
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

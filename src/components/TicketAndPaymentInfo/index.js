import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useTicketTypes from '../../hooks/api/useTicketTypes';
import Button from '../Form/Button';
import { StyledTypography } from '../PersonalInformationForm';
import OptionButton from './OptionButton';

export default function TicketAndPaymentInfo() {
  const { types } = useTicketTypes();
  const [ticketValue, setTicketValue] = useState(0);
  const [hotelValue, setHotelValue] = useState(0);
  const [total, setTotal] = useState(ticketValue + hotelValue);
  const [selectedType, setSelectedType] = useState(0);
  const [selectedModality, setSelectedModality] = useState(0);
  const [lastType, setLastType] = useState();

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
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
          <Link to="/dashboard/payment/finish">
            <Button type="button">
              RESERVAR INGRESSO
            </Button>
          </Link>
        </>
      )}
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

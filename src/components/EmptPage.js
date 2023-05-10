import styled from 'styled-components';
import { StyledTypography } from './PersonalInformationForm';

export default function EmptPage({ pageName, message }) {
  return (
    <>
      <StyledTypography variant="h4">{pageName}</StyledTypography>
      <EmptPageMessage>{message}</EmptPageMessage>
    </>
  );
}

const EmptPageMessage = styled.div`
  margin: auto;
  display: flex;
  width: 45%;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8e8e8e;
  margin-top: 30%;
`;

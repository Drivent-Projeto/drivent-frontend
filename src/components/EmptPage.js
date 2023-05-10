import styled from 'styled-components';
import { StyledTypography } from './PersonalInformationForm';
import { Typography } from '@material-ui/core';

export default function EmptPage({ pageName, message }) {
  return (
    <>
      <StyledTypography variant="h4">{pageName}</StyledTypography>
      <EmptPageMessage>
        <Typography variant="h6">{message}</Typography>
      </EmptPageMessage>
    </>
  );
}

const EmptPageMessage = styled.div`
  margin: auto;
  display: flex;
  width: 45%;
  text-align: center;
  color: #8e8e8e;
  margin-top: 26%;
`;

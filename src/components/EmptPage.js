import { Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';
import { StyledTypography } from './PersonalInformationForm';

export default function EmptPage({ pageName, message }) {
  return (
    <>
      <StyledTypography variant="h4">{pageName}</StyledTypography>
      <EmptPageMessage>
        <Typography variant="h6">{ReactHtmlParser(message)}</Typography>
      </EmptPageMessage>
    </>
  );
}

const EmptPageMessage = styled.div`
  margin: auto;
  display: flex;
  width: 55%;
  text-align: center;
  color: #8e8e8e;
  margin-top: 26%;
`;

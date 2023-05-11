import { StyledTypography } from './PersonalInformationForm';
import { StyledSubT } from './TicketAndPaymentInfo';

export function TitleAndSubtitle({ title, subtitle }) {
  return (
    <>
      <StyledTypography variant="h4">{title}</StyledTypography>
      <StyledSubT>{subtitle}</StyledSubT>
    </>
  );
}

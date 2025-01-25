import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1000px',
    width: '800px',
    margin: '0 auto',
});

export const TitleRowWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '20px',
    marginBottom: '28px',
});

export const RowWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '20px',
});

export const ActionRowWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '20px',
});

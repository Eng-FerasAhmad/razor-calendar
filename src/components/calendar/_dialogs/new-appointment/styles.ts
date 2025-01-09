import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '1000px',
    width: '800px',
    margin: '0 auto',
});

export const RowWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '16px',
});

export const ActionRowWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '16px',
});

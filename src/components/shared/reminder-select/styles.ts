import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const RowWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    gap: '20px',
});

export const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        fontSize: '14px',
        '& input': {
            padding: '8px 10px',
            fontSize: '16px',
        },
    },
});

export const RowItemWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '5px',
});

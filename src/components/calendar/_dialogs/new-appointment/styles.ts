import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ContentContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1000px',
    width: '800px',
    margin: '0 auto',
    gap: '14px',
});

export const RowDateWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '10px',
});

export const RowItemWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '5px',
});

export const RowReminderWrapper = styled(Box)({
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

export const StyledTextAreaField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        '& input': {
            padding: '8px 10px',
            fontSize: '16px',
        },
    },
});

import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px',
    textTransform: 'none',
    padding: '3px 16px',
}));

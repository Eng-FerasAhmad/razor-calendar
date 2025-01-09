import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.border, // Default border color from theme
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main, // Hover color from theme
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main, // Focus color from theme
        },
    },
}));

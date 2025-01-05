import { TextField } from '@mui/material';
import { ReactElement } from 'react';

interface InputTextProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    fullWidth?: boolean;
    size?: 'small' | 'medium'; // Optional size control
}

export default function InputText({
    value,
    onChange,
    label,
    placeholder,
    fullWidth = true,
    size = 'medium',
}: InputTextProps): ReactElement {
    return (
        <TextField
            value={value}
            onChange={(e) => onChange(e.target.value)}
            label={label}
            placeholder={placeholder}
            fullWidth={fullWidth}
            size={size}
            variant="outlined" // Default to outlined variant
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#ccc', // Default border color
                    },
                    '&:hover fieldset': {
                        borderColor: '#36c98e', // Hover color
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#36c98e', // Focus color
                    },
                },
            }}
        />
    );
}

import { TextField } from '@mui/material';
import { ReactElement, ChangeEvent } from 'react';

interface TextAreaProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    fullWidth?: boolean;
    size?: 'small' | 'medium';
    focused?: boolean;
    error?: boolean;
    helperText?: string;
    rows?: number;
    maxRows?: number;
}

export default function TextAreaInput({
    value,
    onChange,
    placeholder,
    fullWidth = true,
    size = 'medium',
    focused = false,
    error = false,
    helperText,
    rows = 3,
    maxRows,
}: TextAreaProps): ReactElement {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        onChange(e.target.value);
    };

    return (
        <TextField
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            fullWidth={fullWidth}
            size={size}
            error={error}
            helperText={helperText}
            variant="outlined"
            autoFocus={focused}
            multiline
            rows={rows}
            maxRows={maxRows}
        />
    );
}

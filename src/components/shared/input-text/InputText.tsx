import { ReactElement, ChangeEvent } from 'react';
import { StyledTextField } from 'components/shared/input-text/styles';

interface InputTextProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    fullWidth?: boolean;
    size?: 'small' | 'medium';
    focused?: boolean;
    error?: boolean;
    helperText?: string;
}

export default function InputText({
    value,
    onChange,
    label,
    placeholder,
    fullWidth = true,
    size = 'medium',
    focused = false,
    error = false,
    helperText,
}: InputTextProps): ReactElement {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        onChange(e.target.value);
    };

    return (
        <StyledTextField
            value={value}
            onChange={handleChange}
            label={label}
            placeholder={placeholder}
            fullWidth={fullWidth}
            size={size}
            error={error}
            helperText={helperText}
            variant="outlined"
            autoFocus={focused}
        />
    );
}

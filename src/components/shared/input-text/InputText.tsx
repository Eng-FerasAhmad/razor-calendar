import { ReactElement } from 'react';
import { StyledTextField } from 'components/shared/input-text/styles';

interface InputTextProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    fullWidth?: boolean;
    size?: 'small' | 'medium';
    focused?: boolean;
}

export default function InputText({
    value,
    onChange,
    label,
    placeholder,
    fullWidth = true,
    size = 'medium',
    focused,
}: InputTextProps): ReactElement {
    return (
        <StyledTextField
            value={value}
            onChange={(e) => onChange(e.target.value)}
            label={label}
            placeholder={placeholder}
            fullWidth={fullWidth}
            size={size}
            variant="outlined"
            autoFocus={focused}
        />
    );
}

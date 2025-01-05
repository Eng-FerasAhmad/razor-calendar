import { FormControlLabel, Checkbox as MUICheckbox } from '@mui/material';
import React from 'react';

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    size?: 'small' | 'medium'; // Optional size control
}

export default function Checkbox({
    checked,
    onChange,
    label,
    size = 'medium',
}: CheckboxProps): React.ReactElement {
    return (
        <FormControlLabel
            control={
                <MUICheckbox
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    size={size}
                />
            }
            label={label}
        />
    );
}

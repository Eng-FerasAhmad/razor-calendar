import { FormControlLabel, Checkbox as MUICheckbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    size?: 'small' | 'medium';
    color?: string;
}

export default function Checkbox({
    checked,
    onChange,
    label,
    size = 'medium',
    color,
}: CheckboxProps): React.ReactElement {
    const theme = useTheme();

    return (
        <FormControlLabel
            control={
                <MUICheckbox
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    size={size}
                    sx={{
                        color,
                        fontSize: '12px',
                        '&.Mui-checked': {
                            color,
                        },
                    }}
                />
            }
            label={label}
            sx={{
                width: '100%',
                '& .MuiFormControlLabel-label': {
                    fontSize: '16px',
                },
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                },
            }}
        />
    );
}

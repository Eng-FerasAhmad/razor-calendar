import { FormControlLabel, Checkbox as MUICheckbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ReactElement } from 'react';

interface Props {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    size?: 'small' | 'medium';
    fontSize?: string;
    color?: string;
    width?: string;
    maxWidth?: string;
}

export default function Checkbox({
    checked,
    onChange,
    label,
    size = 'medium',
    color,
    width,
    maxWidth,
    fontSize,
}: Props): ReactElement {
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
                width: width || 'fit-content',
                maxWidth,
                padding: '0',
                margin: 0,
                borderRadius: '20px',
                '& .MuiFormControlLabel-label': {
                    fontSize: fontSize ? '14px' : '16px',
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: maxWidth || 'inherit',
                },
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                },
            }}
        />
    );
}

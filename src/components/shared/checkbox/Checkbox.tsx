import { FormControlLabel, Checkbox as MUICheckbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ReactElement } from 'react';
import { checkboxStyles, formControlLabelStyles } from './styles';

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
                    sx={checkboxStyles(color)}
                />
            }
            label={label}
            sx={formControlLabelStyles(theme, width, maxWidth, fontSize)}
        />
    );
}

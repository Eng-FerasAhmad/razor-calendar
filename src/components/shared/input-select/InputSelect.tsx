import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    SelectChangeEvent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import {
    formControlStyles,
    inputLabelStyles,
    selectStyles,
    menuItemStyles,
} from './styles';

interface Option<T extends string | number> {
    value: T;
    label: string;
}

interface InputSelectProps<T extends string | number> {
    options: Option<T>[];
    value: T;
    onChange: (value: T) => void;
    label?: string;
    isCompact?: boolean;
    borderRadius?: number;
}

export default function InputSelect<T extends string | number>({
    options,
    value,
    onChange,
    label,
    isCompact,
    borderRadius,
}: InputSelectProps<T>): React.ReactElement {
    const theme = useTheme(); // Get theme inside the component

    const handleChange = (event: SelectChangeEvent<T>): void => {
        onChange(event.target.value as T);
    };

    return (
        <FormControl
            data-testid="form-control"
            fullWidth
            sx={formControlStyles(theme, isCompact)}
        >
            {label && (
                <InputLabel
                    data-testid="input-label"
                    sx={inputLabelStyles(theme)}
                >
                    {label}
                </InputLabel>
            )}
            <Select
                value={value}
                onChange={handleChange}
                data-testid="select"
                variant="outlined"
                size="small"
                label={label}
                sx={selectStyles(theme, borderRadius)}
            >
                {options.map((option) => (
                    <MenuItem
                        data-testid="menu-item"
                        key={String(option.value)}
                        value={option.value}
                        sx={menuItemStyles(theme)}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

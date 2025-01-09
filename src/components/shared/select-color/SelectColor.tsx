import {
    FormControl,
    Select,
    MenuItem,
    Box,
    SelectChangeEvent,
} from '@mui/material';
import React, { useMemo } from 'react';

interface SelectColorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SelectColor({
    value,
    onChange,
}: SelectColorProps): React.ReactElement {
    const colors = useMemo(
        () => [
            { name: 'Salbei', value: '#33b679' },
            { name: 'Pfau', value: '#039be5' },
            { name: 'Lavendel', value: '#7986cb' },
            { name: 'Grafit', value: '#616161' },
            { name: 'Tomato', value: '#d50000' },
            { name: 'Mandarine', value: '#f4511e' },
            { name: 'Flamingo', value: '#e67c73' },
            { name: 'Banane', value: '#f6bf26' },
            { name: 'Basilikum', value: '#0b8043' },
            { name: 'Heidelbeere', value: '#3f51b5' },
            { name: 'Weintraube', value: '#8e24aa' },
        ],
        []
    );

    const handleChange = (event: SelectChangeEvent<string>): void => {
        onChange(event.target.value);
    };

    return (
        <FormControl sx={{ width: '70px' }}>
            <Select
                value={value}
                onChange={handleChange}
                displayEmpty
                sx={{
                    height: 44,
                    borderRadius: 1,
                    '& .MuiSelect-outlined': {
                        display: 'flex',
                        alignItems: 'center',
                    },
                }}
            >
                {colors.map((color) => (
                    <MenuItem key={color.name} value={color.value}>
                        <Box
                            sx={{
                                width: 20,
                                height: 20,
                                backgroundColor: color.value,
                                borderRadius: '50%',
                                margin: 'auto',
                            }}
                        />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

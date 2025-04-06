import IconButton from '@mui/material/IconButton';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import React, { ReactElement, useState } from 'react';
import { ClearIcon } from 'components/shared/icons/clear/ClearIcon';

interface Props {
    submitHandler: () => void;
    clearHandler: () => void;
}

export function Search({
    submitHandler,
    clearHandler,
    ...props
}: Props & InputBaseProps): ReactElement {
    const theme = useTheme();
    const [value, setValue] = useState(props.value || '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if (props.onChange) {
            props.onChange(event);
        }
    };

    const handleClear = () => {
        setValue('');
        clearHandler();
    };

    const clickSubmitHandler = (
        e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
    ): void => {
        e.preventDefault();
        submitHandler();
    };

    return (
        <Paper
            variant="outlined"
            component="form"
            sx={{
                p: '4px 2px 0px 0px',
                display: 'flex',
                alignItems: 'center',
                height: 37,
                width: 225,
                mb: 2,
                mt: 2,
                borderRadius: '8px',
                backgroundColor: theme.palette.grey['100'],
                '& .MuiInputBase-inputSizeSmall': {
                    fontSize: '16px',
                },
            }}
            onSubmit={clickSubmitHandler}
        >
            <InputBase
                sx={{
                    ml: 1,
                    flex: 1,
                }}
                {...props}
                value={value}
                onChange={handleChange}
                inputProps={{
                    'aria-label': 'search',
                    placeholder: props.placeholder || 'Search...', // Ensuring placeholder is passed
                }}
            />
            {value && (
                <IconButton
                    type="button"
                    sx={{ p: '5px' }}
                    aria-label="clear"
                    onClick={handleClear}
                >
                    <ClearIcon size={20} color={theme.palette.grey['500']} />
                </IconButton>
            )}
        </Paper>
    );
}

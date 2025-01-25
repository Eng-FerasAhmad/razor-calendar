import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import { ReactElement } from 'react';
import { CalendarUsers } from 'types/teamConfig';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(id: string, assign: readonly string[], theme: Theme) {
    return {
        fontWeight: assign.includes(id)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

interface Props {
    teamList: CalendarUsers[] | undefined;
    assign: string[];
    onChange: (list: string[]) => void;
}

export default function MultipleSelectChip({
    teamList,
    assign,
    onChange,
}: Props): ReactElement {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof assign>): void => {
        const {
            target: { value },
        } = event;
        // Update the assign list and pass it to the parent component
        const updatedAssign =
            typeof value === 'string' ? value.split(',') : value;
        onChange(updatedAssign);
    };

    return (
        <FormControl
            sx={{
                width: '100%',
                marginBottom: '28px',
                '& .MuiInputBase-root': {
                    display: 'flex',
                    alignItems: 'center',
                },
                '& .MuiInputLabel-root': {
                    lineHeight: '1.5',
                    transform: 'translate(14px, 8px) scale(1)',
                    transition: 'all 0.2s ease-in-out',
                },
                '& .MuiInputLabel-shrink': {
                    transform: 'translate(14px, -10px) scale(0.75)',
                },
            }}
        >
            <InputLabel id="demo-multiple-chip-label">Assign</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={assign}
                onChange={handleChange}
                size="small"
                input={
                    <OutlinedInput id="select-multiple-chip" label="Assign" />
                }
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((id) => {
                            const user =
                                teamList &&
                                teamList.find((item) => item.id === id);
                            return (
                                <Chip
                                    key={id}
                                    label={`${user?.firstName} ${user?.lastName}`}
                                    sx={{
                                        height: '24px',
                                        marginTop: '2px',
                                        fontSize: '14px',
                                    }}
                                />
                            );
                        })}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {teamList &&
                    teamList.map((user) => (
                        <MenuItem
                            key={user.id}
                            value={user.id}
                            style={getStyles(user.id, assign, theme)}
                        >
                            {`${user.firstName} ${user.lastName}`}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
}

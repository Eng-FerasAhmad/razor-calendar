import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import { ReactElement } from 'react';
import {
    standardDarkColor4,
    standardLightColor7,
} from 'calendar/_style/colors';
import { TeamMember } from 'types/teamModel';

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

function getStyles(id: string, assign: readonly TeamMember[], theme: Theme) {
    return {
        fontWeight: assign.some((item) => item.id === id)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

interface Props {
    teamList: TeamMember[] | undefined;
    assign: TeamMember[]; // Array of selected team members
    onChange: (list: TeamMember[]) => void;
}

export default function MultipleSelectChip({
    teamList,
    assign,
    onChange,
}: Props): ReactElement {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<string[]>): void => {
        const {
            target: { value },
        } = event;

        // Map selected IDs back to their corresponding team members
        const updatedAssign =
            teamList?.filter((member) => value.includes(member.id)) || [];
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
            <InputLabel id="multiple-select-chip-label">Assign</InputLabel>
            <Select
                labelId="multiple-select-chip-label"
                id="multiple-select-chip"
                multiple
                value={assign.map((member) => member.id)} // Use IDs as the value
                onChange={handleChange}
                size="small"
                input={
                    <OutlinedInput id="select-multiple-chip" label="Assign" />
                }
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((id) => {
                            const user = teamList?.find(
                                (member) => member.id === id
                            );
                            return (
                                <Chip
                                    key={id}
                                    label={`${user?.firstName || ''} ${
                                        user?.lastName || ''
                                    }`}
                                    sx={{
                                        height: '24px',
                                        marginTop: '2px',
                                        fontSize: '14px',
                                        backgroundColor: user!.color
                                            ? standardLightColor7(user!.color)
                                            : '',
                                        color: user!.color
                                            ? standardDarkColor4(user!.color)
                                            : '',
                                    }}
                                />
                            );
                        })}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {teamList?.map((user) => (
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

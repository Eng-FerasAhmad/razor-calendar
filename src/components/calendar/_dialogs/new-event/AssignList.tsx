import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { RowItemWrapper } from 'calendar/_dialogs/new-event/styles';
import {
    standardDarkColor4,
    standardLightColor7,
} from 'calendar/_style/colors';
import InputTextLabel from 'components/shared/input-label/InputTextLabel';
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

interface Props {
    teamList: TeamMember[] | undefined;
    teamMember: TeamMember[]; // Array of selected team members
    onChange: (list: TeamMember[]) => void;
}

export default function MultipleSelectChip({
    teamList,
    teamMember,
    onChange,
}: Props): ReactElement {
    const { t } = useTranslation();

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
        <RowItemWrapper>
            <InputTextLabel text={t('add.staffer', { ns: 'common' })} />
            <FormControl
                sx={{
                    width: '100%',
                    '& .MuiInputBase-root': {
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '8px',
                    },
                }}
            >
                <Select
                    id="multiple-select-chip"
                    multiple
                    value={teamMember.map((member) => member.id)}
                    onChange={handleChange}
                    size="small"
                    input={<OutlinedInput id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
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
                                                ? standardLightColor7(
                                                      user!.color
                                                  )
                                                : '',
                                            color: user!.color
                                                ? standardDarkColor4(
                                                      user!.color
                                                  )
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
                        <MenuItem key={user.id} value={user.id}>
                            {`${user.firstName} ${user.lastName}`}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </RowItemWrapper>
    );
}

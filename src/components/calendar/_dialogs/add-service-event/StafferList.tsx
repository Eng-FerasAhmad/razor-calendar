import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuProps, formControlSx, menuItemSx, chipBoxSx } from './styles';
import { RowItemWrapper } from 'calendar/_dialogs/new-event/styles';
import InputTextLabel from 'components/shared/input-label/InputTextLabel';
import { Staffer } from 'types/staffer';
import { TeamMember } from 'types/teamModel';

interface Props {
    stafferList: TeamMember[] | undefined;
    staffer: Staffer | undefined;
    onChange: (id: string) => void;
}

export default function StafferList({
    stafferList,
    staffer,
    onChange,
}: Props): ReactElement {
    const { t } = useTranslation();

    const handleChange = (event: SelectChangeEvent<string>): void => {
        onChange(event.target.value);
    };

    return (
        <RowItemWrapper>
            <InputTextLabel text={t('add.staffer', { ns: 'common' })} />
            <FormControl sx={formControlSx}>
                <Select
                    id="single-select-avatar"
                    value={staffer ? staffer.id : ''}
                    onChange={handleChange}
                    size="small"
                    input={<OutlinedInput />}
                    MenuProps={MenuProps}
                    renderValue={(selectedId) => {
                        const user = stafferList?.find(
                            (u) => u.id === selectedId
                        );
                        if (!user) return '';
                        return (
                            <Box sx={chipBoxSx}>
                                <Avatar
                                    src={user.image}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    sx={{ width: 24, height: 24, mr: 1 }}
                                />
                                {`${user.firstName} ${user.lastName}`}
                            </Box>
                        );
                    }}
                >
                    {stafferList?.map((user) => (
                        <MenuItem key={user.id} value={user.id} sx={menuItemSx}>
                            <Avatar
                                src={user.image}
                                alt={`${user.firstName} ${user.lastName}`}
                                sx={{ width: 24, height: 24, mr: 1 }}
                            />
                            {`${user.firstName} ${user.lastName}`}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </RowItemWrapper>
    );
}

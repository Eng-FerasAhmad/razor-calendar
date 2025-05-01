import { ChangeEvent, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { SearchStaffers } from 'calendar/_toolbar/SearchStaffers';
import { StaffDialogContentContainer } from 'calendar/_toolbar/styles';
import Checkbox from 'components/shared/checkbox/Checkbox';
import { DialogCustom } from 'components/shared/dialog/Dialog';

export default function StafferMenu(): ReactElement {
    const { t } = useTranslation();
    const [searchTerms, setSearchTerms] = useState('');
    const { teamModel, dialogStaffers, onDialogStaffers, onUpdateTeamModel } =
        useCalendarContext();

    const handleChange = (userId: string, checked: boolean): void => {
        const updatedUsers = teamModel?.users.map((user) =>
            user.id === userId ? { ...user, visible: checked } : user
        );

        if (updatedUsers) {
            onUpdateTeamModel({ ...teamModel, users: updatedUsers });
        }
    };

    const handleCloseDialog = (): void => {
        onDialogStaffers(false);
    };

    const handleClearSearch = (): void => {
        setSearchTerms('');
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchTerms(event.target.value);
    };

    const filteredUsers = teamModel?.users.filter((user) =>
        `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchTerms.toLowerCase())
    );

    return (
        <DialogCustom
            title={t('staffers.header', { ns: 'common' })}
            description={t('staffers.description', { ns: 'common' })}
            open={dialogStaffers}
            handleClose={handleCloseDialog}
        >
            <SearchStaffers
                clearHandler={handleClearSearch}
                onChange={handleSearch}
                value={searchTerms}
            />
            <StaffDialogContentContainer>
                {filteredUsers?.map((user) => (
                    <div key={user.id}>
                        <Checkbox
                            checked={user.visible}
                            label={`${user.firstName} ${user.lastName}`}
                            color={user.color}
                            width="100%"
                            size="small"
                            onChange={(checked) =>
                                handleChange(user.id, checked)
                            }
                        />
                    </div>
                ))}
            </StaffDialogContentContainer>
        </DialogCustom>
    );
}

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowDownOutline } from 'razor-icon-library';
import { ChangeEvent, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    accordionStyles,
    accordionSummaryStyles,
    accordionTextStyles,
    accordionDetailsStyles,
    CheckUsersWrapper,
    TeamListContainer,
    AccordionWrapper,
} from './styles';
import Checkbox from 'components/shared/checkbox/Checkbox';
import { Search } from 'components/sidebar/Search';
import { TeamMember, TeamModel } from 'types/teamModel';

interface Props {
    teamModel: TeamModel;
    onChangeTeamList: (userId: string, checked: boolean) => void;
}

export default function TeamList({
    teamModel,
    onChangeTeamList,
}: Props): ReactElement {
    const { t } = useTranslation();
    const theme = useTheme();
    const [searchTerms, setSearchTerms] = useState('');

    const handleChange = (
        userId: string,
        checked: boolean | ChangeEvent<HTMLInputElement>
    ): void => {
        onChangeTeamList(userId, !!checked);
    };

    const searchClearHandler = (): void => {
        setSearchTerms('');
    };

    const searchHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchTerms(event.target.value);
    };

    const searchSubmitHandler = (): void => {
        console.log('Search submitted:', searchTerms);
    };

    const filteredUsers = teamModel.users.filter((user) =>
        `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchTerms.toLowerCase())
    );

    return (
        <TeamListContainer data-testid="team-list">
            <Search
                placeholder={t('actions.search', { ns: 'common' })}
                size="small"
                clearHandler={searchClearHandler}
                onChange={searchHandler}
                value={searchTerms}
                submitHandler={searchSubmitHandler}
            />

            <AccordionWrapper>
                <Accordion defaultExpanded sx={accordionStyles(theme)}>
                    <AccordionSummary
                        expandIcon={
                            <ArrowDownOutline
                                size={16}
                                color={theme.palette.grey['500']}
                            />
                        }
                        aria-controls="panel1-content"
                        id="team-panel"
                        data-testid="accordion-summary"
                        sx={accordionSummaryStyles(theme)}
                    >
                        <Typography
                            data-testid="accordion-text-typography"
                            component="span"
                            sx={accordionTextStyles}
                        >
                            Team
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={accordionDetailsStyles}>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user: TeamMember) => (
                                <CheckUsersWrapper
                                    key={user.id}
                                    data-testid="check-user"
                                >
                                    <Checkbox
                                        checked={user.visible}
                                        label={`${user.firstName} ${user.lastName}`}
                                        color={user.color}
                                        width="100%"
                                        maxWidth="225px"
                                        fontSize="12px"
                                        size="small"
                                        onChange={(checked) =>
                                            handleChange(user.id, checked)
                                        }
                                    />
                                </CheckUsersWrapper>
                            ))
                        ) : (
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    width: '100%',
                                    color: theme.palette.grey['600'],
                                    fontSize: '14px',
                                    padding: '10px 0',
                                }}
                            >
                                {t('noItemsFound', { ns: 'common' })}
                            </Typography>
                        )}
                    </AccordionDetails>
                </Accordion>
            </AccordionWrapper>
        </TeamListContainer>
    );
}

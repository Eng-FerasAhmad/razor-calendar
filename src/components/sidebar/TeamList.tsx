import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    TextField,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import Checkbox from 'components/shared/checkbox/Checkbox';
import ArrowDownSymbol from 'components/shared/icons/arrow-down/ArrowDownSymbol';
import {
    CheckUsersWrapper,
    TeamListContainer,
} from 'components/sidebar/styles';
import { CalendarUsers, TeamConfig } from 'types/teamConfig';

interface Props {
    teamConfig: TeamConfig;
    onChangeTeamList: (userId: string, checked: boolean) => void;
}

export default function TeamList({
    teamConfig,
    onChangeTeamList,
}: Props): ReactElement {
    const { t } = useTranslation();
    const theme = useTheme();

    const handleChange = (userId: string, checked: boolean): void => {
        onChangeTeamList(userId, checked);
    };

    return (
        <TeamListContainer data-testid="team-list">
            <TextField
                id="search-user"
                label={t('actions.search', { ns: 'common' })}
                variant="standard"
                sx={{ marginBottom: '20px', width: '100%' }}
            />

            <Accordion
                sx={{
                    width: '100%',
                    boxShadow: 'none',
                    backgroundColor: 'transparent',
                    color: theme.palette.text.primary,
                    padding: 0,
                    margin: 0, // Ensure no margin is applied by default
                    '&.Mui-expanded': {
                        margin: 0, // Remove margin when expanded
                    },
                    '& .MuiAccordionSummary-root': {
                        padding: 0,
                        margin: 0,
                        minHeight: '30px', // Consistent height
                        '&.Mui-expanded': {
                            minHeight: '30px', // No change in height when expanded
                        },
                    },
                    position: 'static',
                }}
            >
                <AccordionSummary
                    expandIcon={<ArrowDownSymbol size={16} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    data-testid="accordion-summary"
                    sx={{
                        padding: 0,
                        margin: 0,
                        '&.Mui-expanded': {
                            padding: 0,
                            margin: 0, // Prevent margin changes on expand
                        },
                        '& .MuiAccordionSummary-content': {
                            margin: 0,
                            padding: 0, // Remove default content padding
                            alignItems: 'center', // Ensure content alignment
                        },
                    }}
                >
                    <Typography
                        data-testid="accordion-text-typography"
                        component="span"
                        sx={{
                            padding: 0,
                            margin: 0, // No margin added
                            flexShrink: 0, // Prevent layout shift
                        }}
                    >
                        Team
                    </Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        maxHeight: '300px',
                        padding: 0,
                        overflowY: 'auto',
                    }}
                >
                    {teamConfig.teams.map((user: CalendarUsers) => (
                        <CheckUsersWrapper
                            key={user.id}
                            data-testid="check-user"
                        >
                            <Checkbox
                                checked={user.visible}
                                label={`${user.firstName} ${user.lastName}`}
                                color={user.color}
                                size="small"
                                onChange={(checked) =>
                                    handleChange(user.id, checked)
                                }
                            />
                        </CheckUsersWrapper>
                    ))}
                </AccordionDetails>
            </Accordion>
        </TeamListContainer>
    );
}

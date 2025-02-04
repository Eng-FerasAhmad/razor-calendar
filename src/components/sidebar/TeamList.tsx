import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    TextField,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ChangeEvent, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import Checkbox from 'components/shared/checkbox/Checkbox';
import ArrowDownSymbol from 'components/shared/icons/arrow-down/ArrowDownSymbol';
import {
    CheckUsersWrapper,
    TeamListContainer,
} from 'components/sidebar/styles';
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

    const handleChange = (
        userId: string,
        checked: boolean | ChangeEvent<HTMLInputElement>
    ): void => {
        onChangeTeamList(userId, !!checked);
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
                defaultExpanded
                sx={{
                    width: '100%',
                    boxShadow: 'none',
                    backgroundColor: '#fff',
                    position: 'static',
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
                }}
            >
                <AccordionSummary
                    expandIcon={<ArrowDownSymbol size={16} />}
                    aria-controls="panel1-content"
                    id="team-panel"
                    data-testid="accordion-summary"
                    sx={{
                        padding: '0',
                        borderRadius: '20px',
                        margin: 0,
                        '&.Mui-expanded': {
                            padding: 0,
                            margin: 0, // Prevent margin changes on expand
                        },
                        '& .MuiAccordionSummary-content': {
                            margin: 0,
                            padding: 0, // Remove default content padding
                            '&.Mui-expanded': {
                                margin: 0, // Remove margin for expanded content
                                padding: '0 20px',
                            },
                        },
                        '& .MuiAccordionSummary-contentGutters': {
                            margin: 0, // Ensure no additional gutter margin
                            padding: 0, // Remove gutter padding
                            '&.Mui-expanded': {
                                margin: 0, // Remove gutter margin on expand
                                padding: '0 0px',
                            },
                        },
                        '& .MuiAccordionSummary-expandIconWrapper': {
                            marginRight: 0, // Remove right padding for expand icon
                            padding: '0 20px',
                        },
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                        },
                    }}
                >
                    <Typography
                        data-testid="accordion-text-typography"
                        component="span"
                        sx={{
                            padding: '5px 12px',
                            margin: 0, // No margin added
                            flexShrink: 0, // Prevent layout shift
                        }}
                    >
                        Team
                    </Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        maxHeight: '250px',
                        padding: 0,
                        overflowY: 'auto',
                    }}
                >
                    {teamModel.users.map((user: TeamMember) => (
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
                    ))}
                </AccordionDetails>
            </Accordion>
        </TeamListContainer>
    );
}

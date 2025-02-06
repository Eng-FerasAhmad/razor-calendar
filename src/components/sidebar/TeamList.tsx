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
import {
    textFieldStyles,
    accordionStyles,
    accordionSummaryStyles,
    accordionTextStyles,
    accordionDetailsStyles,
    CheckUsersWrapper,
    TeamListContainer,
} from './styles';
import Checkbox from 'components/shared/checkbox/Checkbox';
import ArrowDownSymbol from 'components/shared/icons/arrow-down/ArrowDownSymbol';
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
                sx={textFieldStyles}
            />

            <Accordion defaultExpanded sx={accordionStyles(theme)}>
                <AccordionSummary
                    expandIcon={<ArrowDownSymbol size={16} />}
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

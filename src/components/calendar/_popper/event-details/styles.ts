import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DetailsContentContainer = styled('div')(({ theme }) => ({
    width: '100%',
    borderRadius: '10px',
    backgroundColor: theme.palette.background.default,
}));

export const DetailsWrapper = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '10px',
    paddingBottom: '5px',
}));

export const ContentBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '10px 15px',
    color: theme.palette.textPrimary,
    fontSize: '16px',
}));

export const TitleTypography = styled(Typography)(({ theme }) => ({
    ...theme.typography.body1,
    flex: 1,
    fontSize: '17px',
}));

export const AvatarNameTypography = styled(Typography)(({ theme }) => ({
    ...theme.typography.body1,
    flex: 1,
    fontSize: '14px',
    color: theme.palette.textLight,
}));

export const TitleUpdateDate = styled(Typography)(({ theme }) => ({
    ...theme.typography.body1,
    flex: 1,
    fontSize: '12px',
    color: theme.palette.action.disabled,
}));

export const HeaderBox = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
    padding: '5px 10px',
}));

export const ColorBox = styled('div')(({ color }) => ({
    width: '16px',
    height: '16px',
    borderRadius: '5px',
    marginTop: '5px',
    backgroundColor: color,
}));

export const IconWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50%',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.borderLight,
    },
}));

export const TextBox = styled('span')(({ theme }) => ({
    fontSize: '14px',
    width: '100%',
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '10px',
    color: theme.palette.textSecondary,
}));

export const CreatedBox = styled('span')(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '3px',
}));

export const AvatarBox = styled('span')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '5px',
    color: theme.palette.textSecondary,
}));

export const TimeBoxTitle = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
}));

import { useTheme } from '@mui/material/styles';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionRowWrapper } from './styles';
import Button from 'components/shared/button/Button';

type Props = {
    handleClose: () => void;
    handleSave: () => void;
    disabled: boolean;
};

export default function ActionButtons({
    handleClose,
    handleSave,
    disabled,
}: Props): ReactElement {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <ActionRowWrapper>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
                sx={{
                    color: theme.palette.text.primary,
                    borderRadius: '8px',
                    padding: '4px 20px',
                }}
            >
                {t('add.cancel', { ns: 'common' })}
            </Button>
            <Button
                variant="contained"
                onClick={handleSave}
                disabled={disabled}
                sx={{
                    borderRadius: '8px',
                    padding: '5px 25px',
                }}
            >
                {t('add.save', { ns: 'common' })}
            </Button>
        </ActionRowWrapper>
    );
}

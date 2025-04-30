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

    return (
        <ActionRowWrapper>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
                {t('add.cancel', { ns: 'common' })}
            </Button>
            <Button
                variant="contained"
                onClick={handleSave}
                disabled={disabled}
            >
                {t('add.save', { ns: 'common' })}
            </Button>
        </ActionRowWrapper>
    );
}

import { FormControlLabel, Switch } from '@mui/material';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { RowItemWrapper } from './styles';
import InputTextLabel from 'components/shared/input-label/InputTextLabel';

type Props = {
    isFullDay: boolean;
    onChange: (checked: boolean) => void;
};

export default function FullDaySwitch({
    isFullDay,
    onChange,
}: Props): ReactElement {
    const { t } = useTranslation();

    return (
        <RowItemWrapper>
            <InputTextLabel text={t('add.fullDay', { ns: 'common' })} />
            <FormControlLabel
                label=""
                control={
                    <Switch
                        checked={isFullDay}
                        onChange={(e) => onChange(e.target.checked)}
                    />
                }
            />
        </RowItemWrapper>
    );
}

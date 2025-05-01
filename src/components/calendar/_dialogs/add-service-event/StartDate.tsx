import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { RowDateWrapper, RowItemWrapper } from './styles';
import DatePickerInput from 'components/shared/input-datepicker/DatepickerInput';
import InputTextLabel from 'components/shared/input-label/InputTextLabel';
import InputTimepicker from 'components/shared/input-timepicker/InputTimepicker';

type Props = {
    fromTime: DateTime;
    isFullDay: boolean;
    dateFormat: string;
    is24Hours: boolean;
    handleFromDateChange: (newDate: DateTime | null) => void;
    handleFromTimeChange: (newTime: DateTime | null) => void;
};

export default function StartDate({
    fromTime,
    isFullDay,
    dateFormat,
    is24Hours,
    handleFromDateChange,
    handleFromTimeChange,
}: Props): ReactElement {
    const { t } = useTranslation();

    return (
        <RowDateWrapper data-testid="date-start-wrapper">
            <RowItemWrapper>
                <InputTextLabel text={t('add.startDate', { ns: 'common' })} />
                <DatePickerInput
                    value={fromTime}
                    onChange={handleFromDateChange}
                    dateFormat={dateFormat}
                    sx={{ width: '200px', minHeight: '60px' }}
                />
            </RowItemWrapper>

            <RowItemWrapper>
                <InputTextLabel text={t('add.startTime', { ns: 'common' })} />
                <InputTimepicker
                    value={fromTime}
                    onChange={handleFromTimeChange}
                    is24Hours={is24Hours}
                    disabled={isFullDay}
                    sx={{ width: '200px', minHeight: '60px' }}
                />
            </RowItemWrapper>
        </RowDateWrapper>
    );
}

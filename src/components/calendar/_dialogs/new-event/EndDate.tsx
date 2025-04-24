import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { RowDateWrapper, RowItemWrapper } from './styles';
import DatePickerInput from 'components/shared/input-datepicker/DatepickerInput';
import InputTextLabel from 'components/shared/input-label/InputTextLabel';
import InputTimepicker from 'components/shared/input-timepicker/InputTimepicker';

type Props = {
    toTime: DateTime;
    isFullDay: boolean;
    dateFormat: string;
    is24Hours: boolean;
    color: string;
    toDateError: boolean;
    toTimeError: boolean;
    setColor: (value: string) => void;
    handleToDateChange: (newDate: DateTime | null) => void;
    handleToTimeChange: (newTime: DateTime | null) => void;
};

export default function EndDate({
    toTime,
    isFullDay,
    dateFormat,
    is24Hours,
    toDateError,
    toTimeError,
    handleToDateChange,
    handleToTimeChange,
}: Props): ReactElement {
    const { t } = useTranslation();

    return (
        <RowDateWrapper data-testid="date-end-wrapper">
            <RowItemWrapper>
                <InputTextLabel text={t('add.endDate', { ns: 'common' })} />
                <DatePickerInput
                    value={toTime}
                    onChange={handleToDateChange}
                    dateFormat={dateFormat}
                    error={toDateError}
                    helperText={
                        toDateError
                            ? t('add.errorLaterDate', { ns: 'common' })
                            : undefined
                    }
                    sx={{ width: '200px', minHeight: '70px' }}
                />
            </RowItemWrapper>

            <RowItemWrapper>
                <InputTimepicker
                    value={toTime}
                    onChange={handleToTimeChange}
                    is24Hours={is24Hours}
                    error={toTimeError}
                    disabled={isFullDay}
                    helperText={
                        toTimeError
                            ? t('add.errorLaterTime', { ns: 'common' })
                            : undefined
                    }
                    sx={{ width: '200px', minHeight: '70px' }}
                />
            </RowItemWrapper>
        </RowDateWrapper>
    );
}

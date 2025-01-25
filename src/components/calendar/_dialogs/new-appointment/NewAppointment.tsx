import { TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DateTime } from 'luxon';
import { ChangeEvent, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ActionRowWrapper,
    Container,
    RowWrapper,
    TitleRowWrapper,
} from './styles';
import { useNewAppointment } from './useNewAppointment';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import AssignLIst from 'calendar/_dialogs/new-appointment/AssignLIst';
import Button from 'components/shared/button/Button';
import Checkbox from 'components/shared/checkbox/Checkbox';
import { DialogCustom } from 'components/shared/dialog/Dialog';
import DatePickerInput from 'components/shared/input-datepicker/DatepickerInput';
import InputText from 'components/shared/input-text/InputText';
import InputTimepicker from 'components/shared/input-timepicker/InputTimepicker';
import SelectColor from 'components/shared/select-color/SelectColor';

export default function NewAppointment(): ReactElement {
    const {
        title,
        notes,
        setTitle,
        setNotes,
        fromTime,
        setFromTime,
        toTime,
        setToTime,
        isFullDay,
        setIsFullDay,
        color,
        setColor,
        is24Hours,
        dateFormat,
        handleSave,
        titleRequired,
        assign,
        setAssign,
    } = useNewAppointment();
    const { t } = useTranslation();
    const theme = useTheme();
    const { dialogAppointment, onDialogAppointment, teamConfig } =
        useCalendarContext();

    const [toTimeError, setToTimeError] = useState(false);
    const [toDateError, setToDateError] = useState(false);
    const [titleError, setTitleError] = useState(false);

    const handleCloseDialog = (): void => {
        onDialogAppointment(undefined);
    };

    const handleFromTimeChange = (newTime: DateTime | null): void => {
        if (newTime) {
            setFromTime(
                fromTime.set({
                    hour: newTime.hour,
                    minute: newTime.minute,
                })
            );
            // Validate time
            if (toTime <= newTime) {
                setToTimeError(true);
            } else {
                setToTimeError(false);
            }
        }
    };

    const handleToTimeChange = (newTime: DateTime | null): void => {
        if (newTime) {
            setToTime(
                toTime.set({
                    hour: newTime.hour,
                    minute: newTime.minute,
                })
            );
            // Validate time
            if (newTime <= fromTime) {
                setToTimeError(true);
            } else {
                setToTimeError(false);
            }
        }
    };

    const handleFromDateChange = (newDate: DateTime | null): void => {
        if (newDate) {
            setFromTime(
                fromTime.set({
                    year: newDate.year,
                    month: newDate.month,
                    day: newDate.day,
                })
            );
            // Validate date
            if (toTime < newDate.endOf('day')) {
                setToDateError(true);
            } else {
                setToDateError(false);
            }
        }
    };

    const handleToDateChange = (newDate: DateTime | null): void => {
        if (newDate) {
            setToTime(
                toTime.set({
                    year: newDate.year,
                    month: newDate.month,
                    day: newDate.day,
                })
            );
            // Validate date
            if (newDate.startOf('day') <= fromTime) {
                setToDateError(true);
            } else {
                setToDateError(false);
            }
        }
    };

    const handleTitleChange = (value: string): void => {
        setTitle(value);
        setTitleError(!value.trim());
    };

    const handleNotesChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setNotes(event.target.value);
    };

    const handleAssignChange = (list: string[]): void => {
        setAssign(list);
    };

    const isSaveDisabled = toTimeError || toDateError || titleError;

    return (
        <DialogCustom
            title={t('add.header', { ns: 'common' })}
            open={dialogAppointment?.open || false}
            handleClose={handleCloseDialog}
        >
            <Container>
                <TitleRowWrapper>
                    <InputText
                        label={t('add.title', { ns: 'common' })}
                        value={title}
                        onChange={handleTitleChange}
                        fullWidth
                        size="small"
                        error={titleError || titleRequired}
                    />
                </TitleRowWrapper>

                <RowWrapper data-testid="date-start-wrapper">
                    <DatePickerInput
                        label={t('add.startDate', { ns: 'common' })}
                        value={fromTime}
                        onChange={handleFromDateChange}
                        dateFormat={dateFormat}
                        sx={{
                            width: '300px',
                            minHeight: '60px',
                        }}
                    />
                    <InputTimepicker
                        label={t('add.startTime', { ns: 'common' })}
                        value={fromTime}
                        onChange={handleFromTimeChange}
                        is24Hours={is24Hours}
                        disabled={isFullDay}
                        sx={{
                            width: '200px',
                            minHeight: '60px',
                        }}
                    />
                    <Checkbox
                        checked={isFullDay}
                        onChange={setIsFullDay}
                        width={'200px'}
                        label={t('add.fullDay', { ns: 'common' })}
                    />
                </RowWrapper>

                <RowWrapper data-testid="date-end-wrapper">
                    <DatePickerInput
                        label={t('add.endDate', { ns: 'common' })}
                        value={toTime}
                        onChange={handleToDateChange}
                        dateFormat={dateFormat}
                        error={toDateError}
                        helperText={
                            toDateError
                                ? t('add.errorLaterDate', { ns: 'common' })
                                : undefined
                        }
                        sx={{
                            width: '300px',
                            minHeight: '70px',
                        }}
                    />
                    <InputTimepicker
                        label={t('add.endTime', { ns: 'common' })}
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
                        sx={{
                            width: '200px',
                            minHeight: '70px',
                        }}
                    />
                    <SelectColor value={color} onChange={setColor} />
                </RowWrapper>

                <AssignLIst
                    teamList={teamConfig?.teams}
                    assign={assign}
                    onChange={handleAssignChange}
                />

                <TitleRowWrapper>
                    <TextField
                        id="outlined-multiline-flexible"
                        label={t('add.notes', { ns: 'common' })}
                        value={notes}
                        onChange={handleNotesChange}
                        multiline
                        maxRows={4}
                        minRows={8}
                        sx={{ width: '100%' }}
                    />
                </TitleRowWrapper>
                <ActionRowWrapper>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCloseDialog}
                        sx={{ color: theme.palette.text.primary }}
                    >
                        {t('add.cancel', { ns: 'common' })}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={isSaveDisabled}
                    >
                        {t('add.save', { ns: 'common' })}
                    </Button>
                </ActionRowWrapper>
            </Container>
        </DialogCustom>
    );
}

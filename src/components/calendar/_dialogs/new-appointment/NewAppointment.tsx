import { TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DateTime } from 'luxon';
import { ChangeEvent, ReactElement, useState } from 'react';
import {
    ActionRowWrapper,
    Container,
    RowWrapper,
    TitleRowWrapper,
} from './styles';
import { useNewAppointment } from './useNewAppointment';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
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
    } = useNewAppointment();
    const theme = useTheme();
    const { dialogAppointment, onDialogAppointment } = useCalendarContext();

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

    const isSaveDisabled = toTimeError || toDateError || titleError;

    return (
        <DialogCustom
            title="Add new Appointment"
            open={dialogAppointment?.open || false}
            handleClose={handleCloseDialog}
        >
            <Container>
                <TitleRowWrapper>
                    <InputText
                        label="Title"
                        value={title}
                        onChange={handleTitleChange}
                        fullWidth
                        size="medium"
                        error={titleError || titleRequired}
                    />
                </TitleRowWrapper>

                <RowWrapper data-testid="date-start-wrapper">
                    <DatePickerInput
                        label="From Date"
                        value={fromTime}
                        onChange={handleFromDateChange}
                        dateFormat={dateFormat}
                        sx={{
                            width: '300px',
                            minHeight: '60px',
                        }}
                    />
                    <InputTimepicker
                        label="From Time"
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
                        label="All Day"
                    />
                </RowWrapper>

                <RowWrapper data-testid="date-end-wrapper">
                    <DatePickerInput
                        label="To Date"
                        value={toTime}
                        onChange={handleToDateChange}
                        dateFormat={dateFormat}
                        error={toDateError}
                        helperText={
                            toDateError
                                ? 'Must be later than start date'
                                : undefined
                        }
                        sx={{
                            width: '300px',
                            minHeight: '70px',
                        }}
                    />
                    <InputTimepicker
                        label="To Time"
                        value={toTime}
                        onChange={handleToTimeChange}
                        is24Hours={is24Hours}
                        error={toTimeError}
                        disabled={isFullDay}
                        helperText={
                            toTimeError
                                ? 'Must be later than start time'
                                : undefined
                        }
                        sx={{
                            width: '200px',
                            minHeight: '70px',
                        }}
                    />
                    <SelectColor value={color} onChange={setColor} />
                </RowWrapper>

                <TitleRowWrapper>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Notes"
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
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={isSaveDisabled}
                    >
                        Save Appointment
                    </Button>
                </ActionRowWrapper>
            </Container>
        </DialogCustom>
    );
}

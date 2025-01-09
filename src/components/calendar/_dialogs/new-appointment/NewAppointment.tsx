import { useTheme } from '@mui/material/styles';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { ActionRowWrapper, Container, RowWrapper } from './styles';
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
        setTitle,
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
    } = useNewAppointment();
    const theme = useTheme();
    const { dialogAppointment, onDialogAppointment } = useCalendarContext();

    const handleCloseDialog = (): void => {
        onDialogAppointment(undefined);
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
        }
    };

    const handleFromTimeChange = (newTime: DateTime | null): void => {
        if (newTime) {
            setFromTime(
                fromTime.set({
                    hour: newTime.hour,
                    minute: newTime.minute,
                })
            );
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
        }
    };

    return (
        <DialogCustom
            title="Add new Appointment"
            open={dialogAppointment?.open || false}
            handleClose={handleCloseDialog}
        >
            <Container>
                <InputText
                    label="Title"
                    value={title}
                    onChange={setTitle}
                    fullWidth
                    size="medium"
                />

                <RowWrapper data-testid="date-start-wrapper">
                    <DatePickerInput
                        label="From Date"
                        value={fromTime}
                        onChange={handleFromDateChange}
                        dateFormat={dateFormat}
                    />
                    <InputTimepicker
                        label="From Time"
                        value={fromTime}
                        onChange={handleFromTimeChange}
                        is24Hours={is24Hours}
                    />
                </RowWrapper>

                <RowWrapper data-testid="date-end-wrapper">
                    <DatePickerInput
                        label="To Date"
                        value={toTime}
                        onChange={handleToDateChange}
                        dateFormat={dateFormat}
                    />
                    <InputTimepicker
                        label="To Time"
                        value={toTime}
                        onChange={handleToTimeChange}
                        is24Hours={is24Hours}
                    />
                </RowWrapper>

                <RowWrapper>
                    <Checkbox
                        checked={isFullDay}
                        onChange={setIsFullDay}
                        label="All Day"
                    />
                    <SelectColor value={color} onChange={setColor} />
                </RowWrapper>

                <ActionRowWrapper>
                    <Button
                        variant={'outlined'}
                        color={'secondary'}
                        onClick={handleCloseDialog}
                        sx={{ color: theme.palette.text.primary }}
                    >
                        Cancel
                    </Button>
                    <Button variant={'contained'} onClick={handleSave}>
                        Save Appointment
                    </Button>
                </ActionRowWrapper>
            </Container>
        </DialogCustom>
    );
}

import { ReactElement } from 'react';
import { Container } from './styles';
import { useWeekAppointment } from './useWeekAppointment';
import Button from 'components/shared/button/Button';
import Checkbox from 'components/shared/checkbox/Checkbox';
import DatePickerGeneric from 'components/shared/datepicker/Datepicker';
import InputText from 'components/shared/input-text/InputText';
import SelectColor from 'components/shared/select-color/SelectColor';
import TimePickerGeneric from 'components/shared/timepicker/Timepicker';

interface Props {
    slotId: string;
}

export default function WeekAppointmentNew({ slotId }: Props): ReactElement {
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
    } = useWeekAppointment({ slotId });

    console.log('from time', fromTime);
    return (
        <Container>
            <InputText
                label="Title"
                value={title}
                onChange={setTitle}
                fullWidth
                size="medium"
            />

            <DatePickerGeneric
                label="From Date"
                value={fromTime}
                onChange={(newDate) => {
                    if (newDate)
                        setFromTime(
                            fromTime.set({
                                year: newDate.year,
                                month: newDate.month,
                                day: newDate.day,
                            })
                        );
                }}
                dateFormat={dateFormat}
            />

            <TimePickerGeneric
                label="From Time"
                value={fromTime}
                onChange={(newTime) => {
                    if (newTime)
                        setFromTime(
                            fromTime.set({
                                hour: newTime.hour,
                                minute: newTime.minute,
                            })
                        );
                }}
                is24Hours={is24Hours}
            />

            <DatePickerGeneric
                label="To Date"
                value={toTime}
                onChange={(newDate) => {
                    if (newDate)
                        setToTime(
                            toTime.set({
                                year: newDate.year,
                                month: newDate.month,
                                day: newDate.day,
                            })
                        );
                }}
                dateFormat={dateFormat}
            />

            <TimePickerGeneric
                label="To Time"
                value={toTime}
                onChange={(newTime) => {
                    if (newTime)
                        setToTime(
                            toTime.set({
                                hour: newTime.hour,
                                minute: newTime.minute,
                            })
                        );
                }}
                is24Hours={is24Hours}
            />

            <Checkbox
                checked={isFullDay}
                onChange={setIsFullDay}
                label="Full Day"
            />

            <SelectColor value={color} onChange={setColor} />

            <Button onClick={handleSave}>Save Appointment</Button>
        </Container>
    );
}

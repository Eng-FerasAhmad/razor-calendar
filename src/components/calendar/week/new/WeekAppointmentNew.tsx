import { ReactElement } from 'react';
import Datepicker from 'components/shared/datepicker/Datepicker';
import InputText from 'components/shared/input-text/InputText';

interface Props {
    slotId: string;
}

export default function WeekAppointmentNew({ slotId }: Props): ReactElement {
    return (
        <>
            <>Week new: - {slotId}</>
            <InputText />
            <Datepicker />
        </>
    );
}

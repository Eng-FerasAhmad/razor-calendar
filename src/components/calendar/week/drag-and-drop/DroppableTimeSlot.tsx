import { useDroppable } from '@dnd-kit/core';
import { ReactElement, useState } from 'react';
import { DialogCustom } from 'components/shared/dialog/Dialog';
import { isWorkTime } from 'utils/dateTime';
import { DroppableSlotWrapper } from 'week/drag-and-drop/styles';
import WeekAppointmentNew from 'week/new/WeekAppointmentNew';

interface Props {
    slotId: string;
    hour: number;
    minute: number;
    isFirstRow: boolean;
    isLastRow: boolean;
    intervalIndex: number;
    workHoursStart: number;
    workHoursEnd: number;
}

export default function DroppableTimeSlot({
    slotId,
    hour,
    minute,
    isFirstRow,
    isLastRow,
    intervalIndex,
    workHoursStart,
    workHoursEnd,
}: Props): ReactElement {
    const { setNodeRef, isOver } = useDroppable({ id: slotId });
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleOpenClick = (): void => {
        setOpenDialog(true);
    };

    const handleCloseDialog = (): void => {
        setOpenDialog(false);
    };

    return (
        <DroppableSlotWrapper
            ref={setNodeRef}
            data-testid="droppable-time-slot-wrapper"
            id={slotId}
            key={slotId}
            isFullHour={minute === 0}
            isFirstRow={isFirstRow}
            intervalIndex={intervalIndex}
            isLastRow={isLastRow}
            workTime={isWorkTime(hour, workHoursStart, workHoursEnd)}
            style={{
                backgroundColor: isOver ? '#e3f2fd' : '',
            }}
            onDoubleClick={handleOpenClick}
        >
            <DialogCustom
                title={'Add new Appointment'}
                open={openDialog}
                handleClose={handleCloseDialog}
            >
                <WeekAppointmentNew slotId={slotId} />
            </DialogCustom>
        </DroppableSlotWrapper>
    );
}

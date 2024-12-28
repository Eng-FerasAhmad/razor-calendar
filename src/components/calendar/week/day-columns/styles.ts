import styled from 'styled-components';
import { commonSize } from 'calendar/_config/basicConfig';
import { color } from 'style/color';

interface Props {
    timSlotsCount?: number;
    intervalIndex?: number;
}

const calcColumnHeight = (props: Props): string => {
    let offset = 0;
    let slotHeight = commonSize.timeSlotHeight;
    switch (props.intervalIndex) {
        case 0:
            offset = 24;
            break;
        case 1:
            offset = props.intervalIndex! * 24 + 24;
            slotHeight = commonSize.timeSlotHeight - props.intervalIndex! * 10;
            break;
        case 2:
            offset = props.intervalIndex! * 36 + 24;
            slotHeight = commonSize.timeSlotHeight - props.intervalIndex! * 10;
            break;
        case 3:
            offset = props.intervalIndex! * 40 + 24;
            slotHeight = 20;
            break;
        case 4:
            offset = props.intervalIndex! * 66 + 24;
            slotHeight = 20;
            break;
        default:
            offset = 0;
            break;
    }

    const height = props.timSlotsCount! * slotHeight + offset;
    return `${height}px`;
};

export const DaysColumnsContainer = styled.div<Props>`
    flex: 1;
    position: relative;
    border-left: 1px solid ${color.border};
    height: ${calcColumnHeight};
`;

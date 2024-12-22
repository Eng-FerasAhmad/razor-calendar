import { DateTime } from 'luxon';
import React, { ReactElement } from 'react';
import {
    DisplayAppointmentContainer,
    ShortLabelView2Wrapper,
    ShortLabelView1Wrapper,
    ShortTimerView2Wrapper,
    ShortTimerView1Wrapper,
    ShortTimerViewWrapper,
    ShortLabelViewWrapper,
} from 'week/display-appointment/styles';

interface Props {
    title: string;
    from: string;
    to: string;
    primaryColor: string;
    intervalIndex: number;
    style: React.CSSProperties;
}

export default function DisplayAppointment({
    title,
    from,
    to,
    primaryColor,
    intervalIndex,
    style,
}: Props): ReactElement {
    const start = DateTime.fromISO(from).toFormat('hh:mm');
    const end = DateTime.fromISO(to).toFormat('hh:mm');
    const diffInMinutes = DateTime.fromISO(to)
        .diff(DateTime.fromISO(from), 'minutes')
        .toObject().minutes;

    // view1: for all events smaller than 30 minutes in interval 0
    const view1 = (): ReactElement => (
        <div
            data-testid="view1"
            style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <ShortTimerView1Wrapper>
                {start} - {end}
            </ShortTimerView1Wrapper>
            <ShortLabelView1Wrapper>{title}</ShortLabelView1Wrapper>
        </div>
    );

    // view2: for all events bigger than 30 minutes in interval 0
    const view2 = (): ReactElement => (
        <div
            data-testid="view2"
            style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <ShortTimerView2Wrapper>
                {start} - {end}
            </ShortTimerView2Wrapper>
            <ShortLabelView2Wrapper>{title}</ShortLabelView2Wrapper>
        </div>
    );

    // view: default normal view:
    const view = (): ReactElement => (
        <div
            data-testid="view"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                height: '100%',
            }}
        >
            <ShortTimerViewWrapper>
                {start} - {end}
            </ShortTimerViewWrapper>
            <ShortLabelViewWrapper>{title}</ShortLabelViewWrapper>
        </div>
    );

    const viewLabelTimer = (): ReactElement => {
        switch (intervalIndex) {
            case 0:
                return diffInMinutes! <= 45 ? view1() : view();
            case 1:
                return diffInMinutes! <= 45 ? view2() : view();
            case 2:
                return diffInMinutes! < 30 ? view1() : view();
            case 3:
                return diffInMinutes! < 20 ? view1() : view();
            case 4:
                return diffInMinutes! < 10 ? view1() : view();
            default:
                return view();
        }
    };

    return (
        <DisplayAppointmentContainer
            style={{
                ...style,
                backgroundColor: primaryColor,
            }}
        >
            {viewLabelTimer()}
        </DisplayAppointmentContainer>
    );
}

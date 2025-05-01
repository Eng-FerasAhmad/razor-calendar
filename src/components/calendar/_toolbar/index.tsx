import { darken, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';
import {
    AddOutline,
    ArrowDownOutline,
    ArrowNextOutline,
    ArrowPrevOutline,
    CalendarCheckTwotone,
    UsersTwotone,
} from 'razor-icon-library';
import { ReactElement, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    DateIconsCompactWrapper,
    NavigationCompactWrapper,
    NavigationIconsCompactWrapper,
    TitleCompactWrapper,
    TodayButtonWrapper,
    ToolbarContainer,
    ViewWrapper,
} from './styles';
import { ToolbarProps } from './types';
import { useToolbar } from './useToolbar';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import StafferMenu from 'calendar/_toolbar/StafferMenu';
import Button from 'components/shared/button/Button';
import InputSelect from 'components/shared/input-select/InputSelect';

const getLocale = (weekStartsOn?: 'sunday' | 'monday'): 'en-GB' | 'en-US' => {
    switch (weekStartsOn) {
        case 'monday':
            return 'en-GB'; // or 'de', 'fr'
        case 'sunday':
        default:
            return 'en-US';
    }
};

export function Toolbar({
    currentView,
    onViewChange,
    currentDate,
    onNavigate,
    config,
    weekStartsOn = 'monday',
}: ToolbarProps): ReactElement {
    const {
        options,
        handleClickToday,
        handleClickNext,
        handleClickPrev,
        getTitle,
        getPrevLabel,
        getNextLabel,
    } = useToolbar({
        currentView,
        onViewChange,
        currentDate,
        onNavigate,
        config,
    });

    const { t } = useTranslation();
    const theme = useTheme();
    const { onDialogAppointment, onDialogStaffers, onDateChange } =
        useCalendarContext();
    const today = DateTime.now();
    const isToday = currentDate.hasSame(today, 'day');

    const [pickerOpen, setPickerOpen] = useState(false);
    const calendarButtonRef = useRef<HTMLDivElement | null>(null);

    const addHandler = (): void => {
        onDialogAppointment({
            open: true,
            slotId: '',
        });
    };

    const openStaffersDialog = (): void => {
        onDialogStaffers(true);
    };

    const handleDateChange = (date: DateTime | null): void => {
        if (date) {
            onDateChange(date);
        }
        setPickerOpen(false);
    };

    return (
        <ToolbarContainer>
            <NavigationCompactWrapper>
                <LocalizationProvider
                    dateAdapter={AdapterLuxon}
                    adapterLocale={getLocale(weekStartsOn)}
                >
                    <DatePicker
                        open={pickerOpen}
                        onClose={() => setPickerOpen(false)}
                        value={currentDate}
                        onChange={handleDateChange}
                        slotProps={{
                            textField: {
                                style: { display: 'none', borderRadius: '8px' },
                                sx: {
                                    display: 'none',
                                    '& .MuiOutlinedInput-root': {
                                        '& .MuiSvgIcon-root': {
                                            fontSize: '20px',
                                            color: '#6B7280',
                                        },
                                    },
                                },
                            },
                            popper: {
                                anchorEl: calendarButtonRef.current,
                            },
                        }}
                    />
                </LocalizationProvider>

                <Tooltip title={t('buttons.today', { ns: 'common' })}>
                    <TodayButtonWrapper
                        today={isToday}
                        onClick={handleClickToday}
                    >
                        <CalendarCheckTwotone
                            size={22}
                            color={
                                isToday
                                    ? darken(theme.palette.border, 0.4)
                                    : '#fff'
                            }
                        />
                    </TodayButtonWrapper>
                </Tooltip>

                <Tooltip title={getPrevLabel()}>
                    <NavigationIconsCompactWrapper onClick={handleClickPrev}>
                        <ArrowPrevOutline
                            size={20}
                            color={darken(theme.palette.border, 0.4)}
                        />
                    </NavigationIconsCompactWrapper>
                </Tooltip>

                <Tooltip title={getNextLabel()}>
                    <NavigationIconsCompactWrapper onClick={handleClickNext}>
                        <ArrowNextOutline
                            size={20}
                            color={darken(theme.palette.border, 0.4)}
                        />
                    </NavigationIconsCompactWrapper>
                </Tooltip>

                <TitleCompactWrapper>{getTitle()}</TitleCompactWrapper>

                <DateIconsCompactWrapper
                    ref={calendarButtonRef}
                    onClick={() => setPickerOpen(true)}
                >
                    <ArrowDownOutline
                        size={15}
                        color={darken(theme.palette.border, 0.4)}
                    />
                </DateIconsCompactWrapper>
            </NavigationCompactWrapper>

            <ViewWrapper data-testid="view-compact-wrapper">
                <Button
                    variant={'outlined'}
                    startIcon={
                        <AddOutline
                            size={18}
                            color={darken(theme.palette.border, 0.4)}
                        />
                    }
                    onClick={addHandler}
                >
                    {t('actions.new', { ns: 'common' })}
                </Button>

                <StafferMenu />
                <Button
                    variant={'outlined'}
                    startIcon={
                        <UsersTwotone
                            size={18}
                            color={darken(theme.palette.border, 0.4)}
                        />
                    }
                    onClick={openStaffersDialog}
                >
                    {t('staffers.buttonDialog', { ns: 'common' })}
                </Button>

                <InputSelect
                    value={currentView}
                    options={options}
                    onChange={onViewChange}
                />
            </ViewWrapper>
        </ToolbarContainer>
    );
}

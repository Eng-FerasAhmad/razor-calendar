import { darken, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DateTime } from 'luxon';
import {
    AddOutline,
    ArrowNextOutline,
    ArrowPrevOutline,
    CalendarCheckTwotone,
} from 'razor-icon-library';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import {
    NavigationCompactWrapper,
    NavigationIconsCompactWrapper,
    TitleCompactWrapper,
    TodayButtonWrapper,
    ToolbarCompactContainer,
    ViewCompactWrapper,
} from './styles';
import { ToolbarProps } from './types';
import { useToolbar } from './useToolbar';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import Button from 'components/shared/button/Button';
import InputSelect from 'components/shared/input-select/InputSelect';

export function Toolbar({
    currentView,
    onViewChange,
    currentDate,
    onNavigate,
    config,
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
    const { onDialogAppointment } = useCalendarContext();
    const today = DateTime.now();
    const isToday = currentDate.hasSame(today, 'day');

    const addHandler = (): void => {
        onDialogAppointment({
            open: true,
            slotId: '',
        });
    };

    return (
        <ToolbarCompactContainer>
            <NavigationCompactWrapper>
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
            </NavigationCompactWrapper>

            <ViewCompactWrapper data-testid="view-compact-wrapper">
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
                <InputSelect
                    value={currentView}
                    options={options}
                    onChange={onViewChange}
                    isCompact={true}
                    borderRadius={2}
                />
            </ViewCompactWrapper>
        </ToolbarCompactContainer>
    );
}

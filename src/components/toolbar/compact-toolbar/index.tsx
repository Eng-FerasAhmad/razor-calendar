import { CssBaseline, darken, ThemeProvider, Tooltip } from '@mui/material';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { basicConfig } from 'calendar/_config/basicConfig';
import { mergeConfig } from 'calendar/_config/utils';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import Button from 'components/shared/button/Button';
import { AddSquare } from 'components/shared/icons/add-square/AddSquare';
import ArrowNextSymbol from 'components/shared/icons/arrow-next/ArrowNextSymbol';
import ArrowPrevSymbol from 'components/shared/icons/arrow-prev/ArrowPrevSymbol';
import CalendarCheckSymbol from 'components/shared/icons/calendar-check/CalendarCheck';
import InputSelect from 'components/shared/input-select/InputSelect';
import { ToolbarProps } from 'components/toolbar/_config/types';
import { useToolbar } from 'components/toolbar/_config/useToolbar';
import {
    NavigationCompactWrapper,
    NavigationIconsCompactWrapper,
    TitleCompactWrapper,
    TodayButtonWrapper,
    ToolbarCompactContainer,
    ViewCompactWrapper,
} from 'components/toolbar/compact-toolbar/styles';
import { createDynamicTheme } from 'src/theme/theme';

export function RazorToolbarCompact({
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
    const theme = createDynamicTheme(mergeConfig(basicConfig, config));
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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToolbarCompactContainer>
                <NavigationCompactWrapper>
                    <Tooltip title={t('buttons.today', { ns: 'common' })}>
                        <TodayButtonWrapper
                            today={isToday}
                            onClick={handleClickToday}
                        >
                            <CalendarCheckSymbol
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
                        <NavigationIconsCompactWrapper
                            onClick={handleClickPrev}
                        >
                            <ArrowPrevSymbol
                                size={20}
                                color={darken(theme.palette.border, 0.4)}
                            />
                        </NavigationIconsCompactWrapper>
                    </Tooltip>

                    <Tooltip title={getNextLabel()}>
                        <NavigationIconsCompactWrapper
                            onClick={handleClickNext}
                        >
                            <ArrowNextSymbol
                                size={20}
                                color={darken(theme.palette.border, 0.4)}
                            />
                        </NavigationIconsCompactWrapper>
                    </Tooltip>

                    <TitleCompactWrapper>{getTitle()}</TitleCompactWrapper>
                </NavigationCompactWrapper>

                <ViewCompactWrapper data-testid="view-compact-wrapper">
                    <Button
                        variant={'contained'}
                        startIcon={<AddSquare size={20} color="#fff" />}
                        size={'medium'}
                        onClick={addHandler}
                        sx={{
                            color: '#fff',
                            borderRadius: '40px',
                            height: '33px',
                            padding: '0 40px',
                            margin: '0',
                            boxShadow: 'unset',
                            '&:hover': {
                                boxShadow: 'unset',
                            },
                        }}
                    >
                        {t('actions.new', { ns: 'common' })}
                    </Button>
                    <InputSelect
                        value={currentView}
                        options={options}
                        onChange={onViewChange}
                        isCompact={true}
                        borderRadius={10}
                    />
                </ViewCompactWrapper>
            </ToolbarCompactContainer>
        </ThemeProvider>
    );
}

import { CssBaseline, darken, ThemeProvider, Tooltip } from '@mui/material';
import { DateTime } from 'luxon';
import {
    AddOutline,
    ArrowNextOutline,
    ArrowPrevOutline,
    CalendarCheckTwotone,
} from 'razor-icon-library';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { basicConfig } from 'calendar/_config/basicConfig';
import { mergeConfig } from 'calendar/_config/utils';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import Button from 'components/shared/button/Button';
import InputSelect from 'components/shared/input-select/InputSelect';
import { createDynamicTheme } from 'src/theme/theme';
import {
    buttonStyles,
    NavigationCompactWrapper,
    NavigationIconsCompactWrapper,
    TitleCompactWrapper,
    TodayButtonWrapper,
    ToolbarCompactContainer,
    ViewCompactWrapper,
} from 'toolbar/styles';
import { ToolbarProps } from 'toolbar/types';
import { useToolbar } from 'toolbar/useToolbar';

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
                        <NavigationIconsCompactWrapper
                            onClick={handleClickPrev}
                        >
                            <ArrowPrevOutline
                                size={20}
                                color={darken(theme.palette.border, 0.4)}
                            />
                        </NavigationIconsCompactWrapper>
                    </Tooltip>

                    <Tooltip title={getNextLabel()}>
                        <NavigationIconsCompactWrapper
                            onClick={handleClickNext}
                        >
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
                        size={'medium'}
                        onClick={addHandler}
                        sx={buttonStyles(theme)}
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
        </ThemeProvider>
    );
}

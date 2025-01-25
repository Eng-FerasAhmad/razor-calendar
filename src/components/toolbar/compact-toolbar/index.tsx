import { CssBaseline, darken, ThemeProvider, Tooltip } from '@mui/material';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
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
    toolbarConfig,
}: ToolbarProps): ReactElement {
    const {
        config,
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
        toolbarConfig,
    });
    const { t } = useTranslation();
    const theme = createDynamicTheme(config);
    const today = DateTime.now();
    const isToday = currentDate.hasSame(today, 'day');

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
                <ViewCompactWrapper data-testid="view-compact.wrapper">
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

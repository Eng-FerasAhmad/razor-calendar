import { CssBaseline, darken, ThemeProvider, Tooltip } from '@mui/material';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import Button from 'components/shared/button/Button';
import ArrowNextSymbol from 'components/shared/icons/arrow-next/ArrowNextSymbol';
import ArrowPrevSymbol from 'components/shared/icons/arrow-prev/ArrowPrevSymbol';
import InputSelect from 'components/shared/input-select/InputSelect';
import { baseToolbarConfig } from 'components/toolbar/_config/baseToolbarConfig';
import { getLocalizedLabel } from 'components/toolbar/_config/localization';
import { mergeToolbarConfig } from 'components/toolbar/_config/utils';
import {
    NavigationIconsWrapper,
    NavigationWrapper,
    TitleWrapper,
    ToolbarContainer,
    ViewWrapper,
} from 'components/toolbar/styles';
import { createDynamicTheme } from 'src/theme/theme';
import { ViewType } from 'types/appointment';
import { ToolbarConfig } from 'types/toolbarConfig';
import { NavigateAction } from 'utils/constants';

interface ToolbarProps {
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
    currentDate: DateTime;
    onNavigate: (action: NavigateAction, newDate?: DateTime) => void;
    toolbarConfig: Partial<ToolbarConfig>;
}

export function RazorCalendarToolbar({
    currentView,
    onViewChange,
    currentDate,
    onNavigate,
    toolbarConfig,
}: ToolbarProps): ReactElement {
    const config = mergeToolbarConfig(baseToolbarConfig, toolbarConfig);
    const lang = config.lang || 'en';

    const options: { value: ViewType; label: string }[] = [
        { value: 'day', label: getLocalizedLabel('day', lang) },
        { value: 'week', label: getLocalizedLabel('week', lang) },
        { value: 'month', label: getLocalizedLabel('month', lang) },
        { value: 'year', label: getLocalizedLabel('year', lang) },
        { value: 'agenda', label: getLocalizedLabel('agenda', lang) },
    ];

    const handleClickToday = (): void => {
        onNavigate('TODAY');
    };

    const handleClickNext = (): void => {
        onNavigate('NEXT');
    };

    const handleClickPrev = (): void => {
        onNavigate('PREV');
    };

    const getTitle = (): string => {
        switch (currentView) {
            case 'month':
                return currentDate.setLocale(lang).toFormat('MMMM yyyy');
            case 'week': {
                const weekStart = currentDate.startOf('week');
                return `KW${currentDate.weekNumber} - ${weekStart
                    .setLocale(lang)
                    .toFormat('LLLL yyyy')}`;
            }
            case 'day':
                return currentDate.setLocale(lang).toFormat('dd. LLLL yyyy');
            default:
                return currentDate.setLocale(lang).toISODate() || '';
        }
    };

    const theme = createDynamicTheme(config);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToolbarContainer backgroundColor={config.backgroundColor}>
                <NavigationWrapper>
                    <Button
                        sx={{ borderColor: darken(config.primaryColor, 0.2) }}
                        variant={'outlined'}
                        size={'small'}
                        onClick={handleClickToday}
                    >
                        {getLocalizedLabel('today', lang)}
                    </Button>

                    <Tooltip title={getLocalizedLabel('previous', lang)}>
                        <NavigationIconsWrapper
                            onClick={handleClickPrev}
                            color={config.primaryColor}
                        >
                            <ArrowPrevSymbol
                                size={22}
                                color={config.fontColor}
                            />
                        </NavigationIconsWrapper>
                    </Tooltip>

                    <Tooltip title={getLocalizedLabel('next', lang)}>
                        <NavigationIconsWrapper
                            onClick={handleClickNext}
                            color={config.primaryColor}
                        >
                            <ArrowNextSymbol
                                size={22}
                                color={config.fontColor}
                            />
                        </NavigationIconsWrapper>
                    </Tooltip>

                    <TitleWrapper>{getTitle()}</TitleWrapper>
                </NavigationWrapper>
                <ViewWrapper>
                    <InputSelect
                        value={currentView}
                        options={options}
                        onChange={onViewChange}
                    />
                </ViewWrapper>
            </ToolbarContainer>
        </ThemeProvider>
    );
}

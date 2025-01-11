import { CssBaseline, darken, ThemeProvider, Tooltip } from '@mui/material';
import { ReactElement } from 'react';
import Button from 'components/shared/button/Button';
import ArrowNextSymbol from 'components/shared/icons/arrow-next/ArrowNextSymbol';
import ArrowPrevSymbol from 'components/shared/icons/arrow-prev/ArrowPrevSymbol';
import InputSelect from 'components/shared/input-select/InputSelect';
import { baseToolbarConfig } from 'components/toolbar/_config/baseToolbarConfig';
import {
    getLocalizedLabel,
    options,
} from 'components/toolbar/_config/localization';
import { ToolbarProps } from 'components/toolbar/_config/types';
import { mergeToolbarConfig } from 'components/toolbar/_config/utils';
import {
    NavigationIconsWrapper,
    NavigationWrapper,
    TitleWrapper,
    ToolbarContainer,
    ViewWrapper,
} from 'components/toolbar/basic-toolbar/styles';
import { createDynamicTheme } from 'src/theme/theme';
import { navigate } from 'utils/constants';

export function RazorToolbarBasic({
    currentView,
    onViewChange,
    currentDate,
    onNavigate,
    toolbarConfig,
}: ToolbarProps): ReactElement {
    const config = mergeToolbarConfig(baseToolbarConfig, toolbarConfig);
    const lang = config.lang || 'en';

    const handleClickToday = (): void => {
        const updatedDate = navigate(currentView, currentDate, 'TODAY');
        onNavigate(updatedDate);
    };

    const handleClickNext = (): void => {
        const updatedDate = navigate(currentView, currentDate, 'NEXT');
        onNavigate(updatedDate);
    };

    const handleClickPrev = (): void => {
        const updatedDate = navigate(currentView, currentDate, 'PREV');
        onNavigate(updatedDate);
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
                        options={options(lang)}
                        onChange={onViewChange}
                    />
                </ViewWrapper>
            </ToolbarContainer>
        </ThemeProvider>
    );
}

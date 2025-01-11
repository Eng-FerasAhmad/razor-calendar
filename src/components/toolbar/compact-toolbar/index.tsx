import {
    Button,
    CssBaseline,
    darken,
    ThemeProvider,
    Tooltip,
} from '@mui/material';
import { ReactElement } from 'react';
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
    NavigationCompactWrapper,
    NavigationIconsCompactWrapper,
    TitleCompactWrapper,
    ToolbarCompactContainer,
    ViewCompactWrapper,
} from 'components/toolbar/compact-toolbar/styles';
import { createDynamicTheme } from 'src/theme/theme';
import { navigate } from 'utils/constants';

export function RazorToolbarCompact({
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
            <ToolbarCompactContainer>
                <NavigationCompactWrapper>
                    <Button
                        size={'small'}
                        variant={'outlined'}
                        onClick={handleClickToday}
                        sx={{
                            textTransform: 'none',
                            color: theme.palette.text.primary,
                            borderColor: darken(theme.palette.border, 0.1),
                            '&:hover': {
                                backgroundColor: darken(
                                    theme.palette.action.hover,
                                    0.1
                                ),
                            },
                        }}
                    >
                        {getLocalizedLabel('today', lang)}
                    </Button>

                    <Tooltip title={getLocalizedLabel('previous', lang)}>
                        <NavigationIconsCompactWrapper
                            onClick={handleClickPrev}
                        >
                            <ArrowPrevSymbol
                                size={22}
                                color={darken(theme.palette.border, 0.3)}
                            />
                        </NavigationIconsCompactWrapper>
                    </Tooltip>

                    <Tooltip title={getLocalizedLabel('next', lang)}>
                        <NavigationIconsCompactWrapper
                            onClick={handleClickNext}
                        >
                            <ArrowNextSymbol
                                size={22}
                                color={darken(theme.palette.border, 0.3)}
                            />
                        </NavigationIconsCompactWrapper>
                    </Tooltip>

                    <TitleCompactWrapper>{getTitle()}</TitleCompactWrapper>
                </NavigationCompactWrapper>
                <ViewCompactWrapper>
                    <InputSelect
                        value={currentView}
                        options={options(lang)}
                        onChange={onViewChange}
                        isCompact={true}
                    />
                </ViewCompactWrapper>
            </ToolbarCompactContainer>
        </ThemeProvider>
    );
}

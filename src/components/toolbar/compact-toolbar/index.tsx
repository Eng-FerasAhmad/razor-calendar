import {
    Button,
    CssBaseline,
    darken,
    ThemeProvider,
    Tooltip,
} from '@mui/material';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowNextSymbol from 'components/shared/icons/arrow-next/ArrowNextSymbol';
import ArrowPrevSymbol from 'components/shared/icons/arrow-prev/ArrowPrevSymbol';
import InputSelect from 'components/shared/input-select/InputSelect';
import { ToolbarProps } from 'components/toolbar/_config/types';
import { useToolbar } from 'components/toolbar/_config/useToolbar';
import {
    NavigationCompactWrapper,
    NavigationIconsCompactWrapper,
    TitleCompactWrapper,
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
                        {t('buttons.today', { ns: 'common' })}
                    </Button>

                    <Tooltip title={getPrevLabel()}>
                        <NavigationIconsCompactWrapper
                            onClick={handleClickPrev}
                        >
                            <ArrowPrevSymbol
                                size={22}
                                color={darken(theme.palette.border, 0.3)}
                            />
                        </NavigationIconsCompactWrapper>
                    </Tooltip>

                    <Tooltip title={getNextLabel()}>
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
                        options={options}
                        onChange={onViewChange}
                        isCompact={true}
                    />
                </ViewCompactWrapper>
            </ToolbarCompactContainer>
        </ThemeProvider>
    );
}

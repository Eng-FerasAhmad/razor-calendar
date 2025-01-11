import { CssBaseline, darken, ThemeProvider, Tooltip } from '@mui/material';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/shared/button/Button';
import ArrowNextSymbol from 'components/shared/icons/arrow-next/ArrowNextSymbol';
import ArrowPrevSymbol from 'components/shared/icons/arrow-prev/ArrowPrevSymbol';
import InputSelect from 'components/shared/input-select/InputSelect';
import { ToolbarProps } from 'components/toolbar/_config/types';
import { useToolbar } from 'components/toolbar/_config/useToolbar';
import {
    NavigationIconsWrapper,
    NavigationWrapper,
    TitleWrapper,
    ToolbarContainer,
    ViewWrapper,
} from 'components/toolbar/basic-toolbar/styles';
import { createDynamicTheme } from 'src/theme/theme';

export function RazorToolbarBasic({
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
            <ToolbarContainer backgroundColor={config.backgroundColor}>
                <NavigationWrapper>
                    <Button
                        sx={{ borderColor: darken(config.primaryColor, 0.2) }}
                        variant={'outlined'}
                        size={'small'}
                        onClick={handleClickToday}
                    >
                        {t('buttons.today', { ns: 'common' })}
                    </Button>

                    <Tooltip title={getPrevLabel()}>
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

                    <Tooltip title={getNextLabel()}>
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

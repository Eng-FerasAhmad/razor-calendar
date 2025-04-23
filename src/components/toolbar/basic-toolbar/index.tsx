import { CssBaseline, darken, ThemeProvider, Tooltip } from '@mui/material';
import { ArrowNextOutline, ArrowPrevOutline } from 'razor-icon-library';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { basicConfig } from 'calendar/_config/basicConfig';
import { mergeConfig } from 'calendar/_config/utils';
import Button from 'components/shared/button/Button';
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
    const mergedConfig = mergeConfig(basicConfig, config);
    const theme = createDynamicTheme(mergedConfig);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToolbarContainer backgroundColor={config.style!.backgroundColor}>
                <NavigationWrapper>
                    <Button
                        sx={{
                            borderColor: darken(
                                config.style!.primaryColor || '',
                                0.2
                            ),
                        }}
                        variant={'outlined'}
                        size={'small'}
                        onClick={handleClickToday}
                    >
                        {t('buttons.today', { ns: 'common' })}
                    </Button>

                    <Tooltip title={getPrevLabel()}>
                        <NavigationIconsWrapper
                            onClick={handleClickPrev}
                            color={config.style!.primaryColor}
                        >
                            <ArrowNextOutline size={22} color={'#fff'} />
                        </NavigationIconsWrapper>
                    </Tooltip>

                    <Tooltip title={getNextLabel()}>
                        <NavigationIconsWrapper
                            onClick={handleClickNext}
                            color={'#fff'}
                        >
                            <ArrowPrevOutline size={22} color={'#fff'} />
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

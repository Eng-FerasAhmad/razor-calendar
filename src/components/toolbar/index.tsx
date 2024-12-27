import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { StyleSheetManager } from 'styled-components';
import ArrowNextSymbol from 'components/shared/arrow-next/ArrowNextSymbol';
import ArrowPrevSymbol from 'components/shared/arrow-prev/ArrowPrevSymbol';
import Button from 'components/shared/button/Button';
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
import { ViewType } from 'types/appointment';
import { ToolbarConfig } from 'types/toolbarConfig';
import { shouldForwardProp } from 'utils/common';
import { NavigateAction } from 'utils/constants';

interface ToolbarProps {
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
    currentDate: DateTime;
    onNavigate: (action: NavigateAction, newDate?: DateTime) => void;
    toolbarConfig: Partial<ToolbarConfig>;
}

export default function RazorCalendarToolbar({
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

    return (
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
            <ToolbarContainer backgroundColor={config.backgroundColor}>
                <NavigationWrapper>
                    <Button
                        color={config.primaryColor}
                        onClick={handleClickToday}
                    >
                        {getLocalizedLabel('today', lang)}
                    </Button>
                    <NavigationIconsWrapper
                        onClick={handleClickPrev}
                        color={config.primaryColor}
                        title={getLocalizedLabel('previous', lang)}
                    >
                        <ArrowPrevSymbol size={22} color={config.fontColor} />
                    </NavigationIconsWrapper>
                    <NavigationIconsWrapper
                        onClick={handleClickNext}
                        color={config.primaryColor}
                        title={getLocalizedLabel('next', lang)}
                    >
                        <ArrowNextSymbol size={22} color={config.fontColor} />
                    </NavigationIconsWrapper>
                    <TitleWrapper>{getTitle()}</TitleWrapper>
                </NavigationWrapper>
                <ViewWrapper>
                    <InputSelect
                        color={config.primaryColor}
                        value={currentView}
                        options={options}
                        onChange={onViewChange}
                    />
                </ViewWrapper>
            </ToolbarContainer>
        </StyleSheetManager>
    );
}

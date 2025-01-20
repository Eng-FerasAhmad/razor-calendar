import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { baseToolbarConfig } from 'components/toolbar/_config/baseToolbarConfig';
import { ToolbarProps } from 'components/toolbar/_config/types';
import { mergeToolbarConfig } from 'components/toolbar/_config/utils';
import { ViewType } from 'types/appointment';
import { navigate } from 'utils/constants';

interface UseToolbarLogicReturn {
    config: ReturnType<typeof mergeToolbarConfig>;
    handleClickToday: () => void;
    handleClickNext: () => void;
    handleClickPrev: () => void;
    getTitle: () => string;
    getPrevLabel: () => string;
    getNextLabel: () => string;
    options: { value: ViewType; label: string }[];
}

export const useToolbar = ({
    currentView,
    currentDate,
    onNavigate,
    toolbarConfig,
}: ToolbarProps): UseToolbarLogicReturn => {
    const { t, i18n } = useTranslation();
    const config = mergeToolbarConfig(baseToolbarConfig, toolbarConfig);

    useEffect(() => {
        i18n.changeLanguage(config.locale || 'en');
    }, [config.locale, i18n]);

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
        const locale = config.locale || 'en';

        switch (currentView) {
            case 'month':
                return currentDate.setLocale(locale).toFormat('MMMM yyyy');
            case 'week': {
                const weekStart = currentDate.startOf('week');
                return `${t('navigation.week.number', {
                    ns: 'common',
                })}${currentDate.weekNumber} - ${weekStart
                    .setLocale(locale)
                    .toFormat('LLLL yyyy')}`;
            }
            case 'day': {
                const dateString = currentDate
                    .setLocale(locale)
                    .toFormat(config.dateFormat);
                return `${dateString}`;
            }
            case 'team': {
                const dayName = currentDate.setLocale(locale).toFormat('EEEE');
                const dateString = currentDate
                    .setLocale(locale)
                    .toFormat(config.dateFormat);
                return `${dayName}, ${dateString}`;
            }
            default:
                return currentDate.setLocale(locale).toISODate() || '';
        }
    };

    const getPrevLabel = (): string => {
        switch (currentView) {
            case 'day':
                return t('navigation.prev.day', { ns: 'common' });
            case 'week':
                return t('navigation.prev.week', { ns: 'common' });
            case 'month':
                return t('navigation.prev.month', { ns: 'common' });
            case 'year':
                return t('navigation.prev.year', { ns: 'common' });
            default:
                return t('navigation.prev.default', { ns: 'common' });
        }
    };

    const getNextLabel = (): string => {
        switch (currentView) {
            case 'day':
                return t('navigation.next.day', { ns: 'common' });
            case 'week':
                return t('navigation.next.week', { ns: 'common' });
            case 'month':
                return t('navigation.next.month', { ns: 'common' });
            case 'year':
                return t('navigation.next.year', { ns: 'common' });
            default:
                return t('navigation.next.default', { ns: 'common' });
        }
    };

    const options: { value: ViewType; label: string }[] = [
        { value: 'team', label: t('views.team', { ns: 'common' }) },
        { value: 'day', label: t('views.day', { ns: 'common' }) },
        { value: 'week', label: t('views.week', { ns: 'common' }) },
        {
            value: 'month',
            label: t('views.month', { ns: 'common' }),
        },
        { value: 'year', label: t('views.year', { ns: 'common' }) },
        {
            value: 'agenda',
            label: t('views.agenda', { ns: 'common' }),
        },
    ];

    return {
        config,
        options,
        handleClickToday,
        handleClickNext,
        handleClickPrev,
        getTitle,
        getPrevLabel,
        getNextLabel,
    };
};

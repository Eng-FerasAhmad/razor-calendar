import { ReactElement } from 'react';
import CalNavigator from 'components/cal-header/cal-navigator/CalNavigator';
import CalTaskView from 'components/cal-header/cal-task-view/CalTaskView';
import CalTypeList from 'components/cal-header/cal-type-list/CalTypeList';
import Calendar from 'components/cal-header/calendar/Calendar';
import CollapseButton from 'components/cal-header/collapse-button/CollapseButton';
import Help from 'components/cal-header/help/Help';
import Search from 'components/cal-header/search/Search';
import Setting from 'components/cal-header/setting/Setting';
import {
    CalHeaderContainer,
    NavigatorWrapper,
    ProfileWrapper,
    SearchHelpWrapper,
    TaskCalendarWrapper,
} from 'components/cal-header/styles';
import UserProfile from 'components/cal-header/user-profile/UserProfile';

export default function CalHeader(): ReactElement {
    return (
        <CalHeaderContainer data-testid="cal-header">
            <NavigatorWrapper>
                <CollapseButton />
                <CalNavigator />
            </NavigatorWrapper>

            <ProfileWrapper>
                <SearchHelpWrapper>
                    <Search />
                    <Help />
                    <Setting />
                </SearchHelpWrapper>

                <CalTypeList />

                <TaskCalendarWrapper>
                    <Calendar />
                    <CalTaskView />
                </TaskCalendarWrapper>

                <UserProfile />
            </ProfileWrapper>
        </CalHeaderContainer>
    );
}

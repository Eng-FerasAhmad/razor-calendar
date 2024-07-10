import { ReactElement } from 'react';
import CalHeader from 'components/cal-header/CalHeader';
import CalMain from 'components/cal-main/CalMain';
import CalSidebar from 'components/cal-sidebar/CalSidebar';
import CalTabList from 'components/cal-tab-list/CalTabList';
import {
    TemplateContainer,
    TemplateContentWrapper,
} from 'components/template/styles';

export default function Template(): ReactElement {
    return (
        <TemplateContainer data-testid="template">
            <CalHeader />
            <TemplateContentWrapper>
                <CalSidebar />
                <CalMain />
                <CalTabList />
            </TemplateContentWrapper>
        </TemplateContainer>
    );
}

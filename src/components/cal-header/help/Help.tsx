import { ReactElement } from 'react';
import { IoHelpCircleOutline } from 'react-icons/io5';
import { HelpContainer } from 'components/cal-header/help/styles';

export default function Help(): ReactElement {
    return (
        <HelpContainer>
            <IoHelpCircleOutline size={28} />
        </HelpContainer>
    );
}

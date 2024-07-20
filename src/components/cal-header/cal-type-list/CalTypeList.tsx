import { ReactElement } from 'react';
import { IoCaretDownOutline } from 'react-icons/io5';
import { CalTypeListContainer } from 'components/cal-header/cal-type-list/styles';

export default function CalTypeList(): ReactElement {
    return (
        <CalTypeListContainer>
            <span>Month</span>
            <IoCaretDownOutline size={16} />
        </CalTypeListContainer>
    );
}

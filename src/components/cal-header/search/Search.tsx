import { ReactElement } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { SearchContainer } from 'components/cal-header/search/styles';

export default function Search(): ReactElement {
    return (
        <SearchContainer>
            <IoSearchSharp size={24} />
        </SearchContainer>
    );
}

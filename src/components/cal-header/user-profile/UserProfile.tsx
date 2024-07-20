import { ReactElement } from 'react';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { UserProfileContainer } from 'components/cal-header/user-profile/styles';

export default function UserProfile(): ReactElement {
    return (
        <UserProfileContainer>
            <IoPersonCircleSharp size={34} />
        </UserProfileContainer>
    );
}

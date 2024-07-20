import { ReactElement } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { SettingContainer } from 'components/cal-header/setting/styles';

export default function Setting(): ReactElement {
    return (
        <SettingContainer>
            <IoSettingsOutline size={24} />
        </SettingContainer>
    );
}

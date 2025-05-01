import { ReactElement, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { RowItemWrapper, RowNameWrapper } from './styles';
import InputTextLabel from 'components/shared/input-label/InputTextLabel';
import InputText from 'components/shared/input-text/InputText';

type Props = {
    firstName: string;
    lastName: string;
    onChangeFirstName: (event: ChangeEvent<HTMLInputElement>) => void;
    onChangeLastName: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function NameInput({
    firstName,
    lastName,
    onChangeFirstName,
    onChangeLastName,
}: Props): ReactElement {
    const { t } = useTranslation();

    const handleChangeFirstName = (value: string): void => {
        onChangeFirstName({
            target: { value },
        } as ChangeEvent<HTMLInputElement>);
    };

    const handleChangeLastName = (value: string): void => {
        onChangeLastName({
            target: { value },
        } as ChangeEvent<HTMLInputElement>);
    };

    return (
        <RowNameWrapper>
            <RowItemWrapper>
                <InputTextLabel text={t('add.firstName', { ns: 'common' })} />
                <InputText
                    value={firstName}
                    onChange={handleChangeFirstName}
                    size="small"
                />
            </RowItemWrapper>

            <RowItemWrapper>
                <InputTextLabel text={t('add.lastName', { ns: 'common' })} />
                <InputText
                    value={lastName}
                    onChange={handleChangeLastName}
                    size="small"
                />
            </RowItemWrapper>
        </RowNameWrapper>
    );
}

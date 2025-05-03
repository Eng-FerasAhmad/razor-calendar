import { ReactElement, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { RowItemWrapper, RowNameWrapper } from './styles';
import InputTextLabel from 'components/shared/input-label/InputTextLabel';
import InputText from 'components/shared/input-text/InputText';
import { CustomerViewModel } from 'types/customer';

type Props = {
    customer?: CustomerViewModel;
    onChangeFirstName: (event: ChangeEvent<HTMLInputElement>) => void;
    onChangeLastName: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function NameInput({
    customer,
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
                    value={customer?.firstName || ''}
                    onChange={handleChangeFirstName}
                    size="small"
                />
            </RowItemWrapper>

            <RowItemWrapper>
                <InputTextLabel text={t('add.lastName', { ns: 'common' })} />
                <InputText
                    value={customer?.lastName || ''}
                    onChange={handleChangeLastName}
                    size="small"
                />
            </RowItemWrapper>
        </RowNameWrapper>
    );
}

import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { RowItemWrapper } from './styles';
import InputTextLabel from 'components/shared/input-label/InputTextLabel';
import InputText from 'components/shared/input-text/InputText';

type Props = {
    title: string;
    titleError: boolean;
    titleRequired: boolean;
    onChange: (value: string) => void;
};

export default function TitleInput({
    title,
    titleError,
    titleRequired,
    onChange,
}: Props): ReactElement {
    const { t } = useTranslation();

    return (
        <RowItemWrapper>
            <InputTextLabel text={t('add.title', { ns: 'common' })} />
            <InputText
                value={title}
                onChange={onChange}
                fullWidth
                size="small"
                error={titleError || titleRequired}
            />
        </RowItemWrapper>
    );
}

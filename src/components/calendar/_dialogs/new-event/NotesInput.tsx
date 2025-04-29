import { ReactElement, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { RowItemWrapper } from './styles';
import InputTextLabel from 'components/shared/input-label/InputTextLabel';
import TextAreaInput from 'components/shared/textarea/TextAreaInput';

type Props = {
    notes: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function NotesInput({ notes, onChange }: Props): ReactElement {
    const { t } = useTranslation();

    const handleChange = (value: string): void => {
        onChange({ target: { value } } as ChangeEvent<HTMLInputElement>);
    };

    return (
        <RowItemWrapper>
            <InputTextLabel text={t('add.notes', { ns: 'common' })} />
            <TextAreaInput
                value={notes}
                onChange={handleChange}
                rows={3}
                maxRows={2}
            />
        </RowItemWrapper>
    );
}

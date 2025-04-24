import { ReactElement, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledTextAreaField, RowItemWrapper } from './styles';
import InputTextLabel from 'components/shared/input-label/InputTextLabel';

type Props = {
    notes: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function NotesInput({ notes, onChange }: Props): ReactElement {
    const { t } = useTranslation();

    return (
        <RowItemWrapper>
            <InputTextLabel text={t('add.notes', { ns: 'common' })} />
            <StyledTextAreaField
                id="outlined-multiline-flexible"
                value={notes}
                onChange={onChange}
                multiline
                maxRows={2}
                minRows={3}
                sx={{ width: '100%', borderRadius: '8px' }}
            />
        </RowItemWrapper>
    );
}

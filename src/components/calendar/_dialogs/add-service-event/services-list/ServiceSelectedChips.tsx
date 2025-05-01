import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { ReactElement } from 'react';
import {
    chipSx,
    renderTagBoxSx,
} from 'calendar/_dialogs/add-service-event/services-list/styles';
import { ServiceViewModel } from 'types/serviceModel';

interface Props {
    selected: string[];
    services: ServiceViewModel[];
}

export default function ServiceSelectedChips({
    selected,
    services,
}: Props): ReactElement {
    return (
        <Box sx={renderTagBoxSx}>
            {selected.map((id) => {
                const service = services.find((s) => s.id === id);
                return (
                    <Chip
                        key={id}
                        label={service?.serviceName || id}
                        sx={chipSx}
                    />
                );
            })}
        </Box>
    );
}

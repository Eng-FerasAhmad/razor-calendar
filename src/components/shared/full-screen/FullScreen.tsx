import { useRef, ReactElement, PropsWithChildren } from 'react';

import { useFullscreen } from './useFullScreen';

interface Props {
    isFullscreen: boolean;
    onToggle: (isFullscreen: boolean) => void;
    lockFullscreen?: boolean;
}

export function ReactFullScreen({
    isFullscreen,
    onToggle,
    children,
}: PropsWithChildren<Props>): ReactElement {
    const divRef = useRef<HTMLDivElement | null>(null);

    useFullscreen(divRef, isFullscreen, onToggle);

    return <div ref={divRef}>{children}</div>;
}

import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';

import { Provider } from 'react-redux';
import { store } from 'src/store/rootStore';

const AllTheProviders = ({
    children,
}: {
    children: ReactNode;
}): ReactElement => {
    return <>{children}</>;
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
    // eslint-disable-next-line
): any => render(ui, { wrapper: AllTheProviders, ...options });

const ReduxProvider = (
    { children }: { children: ReactNode },
    withMemoryRouter = false
): ReactElement => {
    if (withMemoryRouter) {
        return <Provider store={store}>{children}</Provider>;
    }
    return <Provider store={store}>{children}</Provider>;
};

const renderWithStore = (
    ui: ReactElement,
    withMemoryRouter?: boolean,
    options?: Omit<RenderOptions, 'wrapper'>
    // eslint-disable-next-line
): any =>
    render(ui, {
        wrapper: withMemoryRouter
            ? ReduxProvider.bind(withMemoryRouter)
            : ReduxProvider,
        ...options,
    });

export * from '@testing-library/react';
export { customRender as render, renderWithStore };

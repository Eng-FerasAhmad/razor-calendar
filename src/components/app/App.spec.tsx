import { render, screen } from '@testing-library/react';
import App from 'components/app/App';

describe('<App />', () => {
    test('should render component', () => {
        render(<App />);
        
        expect(screen.getByTestId('app')).toBeInTheDocument()
    });
});
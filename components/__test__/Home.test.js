import React from 'react';
import { render } from '@testing-library/react-native';
import Home from '../Home';


test('rendering Home component', async () => {
    const { debug } = render(<Home />);
    debug();
});
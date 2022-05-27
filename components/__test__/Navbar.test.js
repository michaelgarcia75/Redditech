import React from 'react';
import { render } from '@testing-library/react-native';
import Navbar from '../Navbar';


test('rendering Navbar component', async () => {
    const { debug } = render(<Navbar />);
    debug();
});
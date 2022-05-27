import React from 'react';
import { render } from '@testing-library/react-native';
import Works from '../Works';


test('rendering Works component', async () => {
    const { debug } = render(<Works />);
    debug();
});
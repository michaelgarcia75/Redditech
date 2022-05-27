import React from 'react';
import { render } from '@testing-library/react-native';
import Search from '../Search';


test('rendering Search component', async () => {
    const { debug } = render(<Search />);
    debug();
});
import React from 'react';
import { render } from '@testing-library/react-native';
import Chat from '../Chat';


test('rendering Chat component', async () => {
    const { debug } = render(<Chat />);
    debug();
});
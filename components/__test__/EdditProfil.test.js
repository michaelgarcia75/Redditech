import React from 'react';
import { render } from '@testing-library/react-native';
import EdditProfil from '../EditProfil';


test('rendering EdditProfil component', async () => {
    const { debug } = render(<EdditProfil />);
    debug();
});
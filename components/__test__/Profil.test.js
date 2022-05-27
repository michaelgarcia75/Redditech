import React from 'react';
import Profil from '../Profil';
import {cleanup, render} from '@testing-library/react-native';
 
afterEach(cleanup);
 
describe('Profil', () => {
 
  it('should find the button title', () => {
    const title = 'Commentaires';
 
    const {getByText} = render(<Profil />);
 
    const foundButtonTitle = getByText(title);
 
    expect(foundButtonTitle.props.children).toEqual(title);
  });

  it('should find the button title', () => {
    const title = 'A propos';
 
    const {getByText} = render(<Profil />);
 
    const foundButtonTitle = getByText(title);
 
    expect(foundButtonTitle.props.children).toEqual(title);
  });

  it('should find the button title', () => {
    const title = 'Publications';
 
    const {getByText} = render(<Profil />);
 
    const foundButtonTitle = getByText(title);
 
    expect(foundButtonTitle.props.children).toEqual(title);
  });

});


test('rendering Profil component', async () => {
    const { debug } = render(<Profil />);
    debug();
});

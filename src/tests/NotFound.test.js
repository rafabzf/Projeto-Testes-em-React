import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa a aplicação NotFound', () => {
  test('Testa se a página contém um h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const textH2 = screen.getByRole('heading', {
      level: 2, name: /Page requested not found/i });

    expect(textH2).toBeInTheDocument();
  });

  test('Testa se a página mostra uma imagem', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

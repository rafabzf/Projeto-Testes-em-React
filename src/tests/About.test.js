import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente About', () => {
  test('Testa se a página possui um h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const textHeading = screen.getByRole('heading', {
      level: 2, name: /About Pokédex/i });

    expect(textHeading).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos de texto', () => {
    renderWithRouter(<About />);

    const textParagraphOne = screen.getByText(/This application simulates a Pokédex/i);
    const textParagraphTwo = screen.getByText(/One can filter Pokémons by type, and/i);

    expect(textParagraphOne).toBeInTheDocument();
    expect(textParagraphTwo).toBeInTheDocument();
  });

  test('Testa se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img');

    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

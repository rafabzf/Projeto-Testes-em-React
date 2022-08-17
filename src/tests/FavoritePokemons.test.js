import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../pages';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente App', () => {
  test('Testa se caso não exista pokémons favoritos, é exibida uma mensagem', () => {
    renderWithRouter(<FavoritePokemons />);

    const messageNotFound = screen.getByText(/No favorite pokemon found/i);

    expect(messageNotFound).toBeInTheDocument();
  });
});

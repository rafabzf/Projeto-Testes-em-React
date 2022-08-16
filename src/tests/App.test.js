import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente App', () => {
  test('Testa se ao clicar no link Home, redireciona para a página inicial', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });

    expect(linkHome).toBeInTheDocument();
  });

  test('Testa se ao clicar no link About, redireciona para a URl /about', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });

    expect(linkAbout).toBeInTheDocument();
  });

  test('Testa se clicar no link Favorite Pokémons, irá para a URL /favorites', () => {
    renderWithRouter(<App />);

    const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(linkFavorites).toBeInTheDocument();
  });

  test('Testa se ao entrar em uma URL desconhecida, irá para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/close/i');
    const titleNotFound = screen.getByRole('heading', { level: 2, name: /not Found/i });

    expect(titleNotFound).toBeInTheDocument();
  });
});

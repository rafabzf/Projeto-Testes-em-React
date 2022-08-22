import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  test('Testa se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);

    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const image = screen.getByRole('img', { name: /sprite/i });

    expect(name).toBeInTheDocument();
    expect(type.textContent).toBe('Electric');
    expect(weight).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Testa se o card do pokémon contém o link correto', () => {
    renderWithRouter(<App />);
    const inicialPokemon = pokemons[0];

    const link = screen.getByRole('link', { name: /More Details/i });

    expect(link).toHaveAttribute('href', `/pokemons/${inicialPokemon.id}`);
  });

  test('Testa se o link redireciona a página para os detalhes do pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const inicialPokemon = pokemons[0];
    const link = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(link);

    expect(history.location.pathname).toBe(`/pokemons/${inicialPokemon.id}`);
  });

  test('Testa se os pokémons estão favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const inicialPokemon = pokemons[0];
    history.push(`/pokemons/${inicialPokemon.id}`);

    const favorite = screen.getByRole('checkbox', { checked: false });
    userEvent.click(favorite);

    const icon = screen.getByAltText(`${inicialPokemon.name} is marked as favorite`);

    expect(icon).toBeInTheDocument();
    expect(icon.src).toBe('http://localhost/star-icon.svg');
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../pages';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

const isFavorite = {
  25: false,
  4: false,
  10: false,
  23: false,
  65: false,
  151: false,
  78: false,
  143: false,
  148: false,
};

describe('Testa a aplicação Pokedex', () => {
  test('Testa se a página contém um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ isFavorite }
      pokemons={ pokemons }
    />);

    const textH2 = screen.getByRole(
      'heading', { level: 2, name: /Encountered pokémons/i },
    );

    expect(textH2).toBeInTheDocument();
  });

  test('Testa se é exibido o pŕoximo pokémon quando o botão é clicado', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ isFavorite }
      pokemons={ pokemons }
    />);

    const pokemon = screen.getByTestId('pokemon-name');

    expect(pokemon).toHaveTextContent(/pikachu/i);

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextButton);

    expect(pokemon).toHaveTextContent(/charmander/i);

    userEvent.click(nextButton);
    userEvent.click(nextButton);

    expect(pokemon).toHaveTextContent(/ekans/i);

    userEvent.click(nextButton);
    userEvent.click(nextButton);

    expect(pokemon).toHaveTextContent(/mew/i);
  });

  test('Testa se a Pokédex contém botões de filtro', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ isFavorite }
      pokemons={ pokemons }
    />);

    const electric = screen.getByRole('button', { name: /electric/i });
    const fire = screen.getByRole('button', { name: /fire/i });
    const bug = screen.getByRole('button', { name: /bug/i });
    const poison = screen.getByRole('button', { name: /poison/i });
    const psychic = screen.getByRole('button', { name: /psychic/i });
    const normal = screen.getByRole('button', { name: /normal/i });
    const dragon = screen.getByRole('button', { name: /dragon/i });

    expect(electric).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();

    const id = screen.getAllByTestId('pokemon-type-button');
    const buttonsLength = 7;
    expect(id).toHaveLength(buttonsLength);
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ isFavorite }
      pokemons={ pokemons }
    />);

    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(screen.getByRole('button', { name: /all/i }));

    expect(buttonAll).toBeInTheDocument();
  });
});

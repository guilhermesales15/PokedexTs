import styles from '../styles/home.module.scss';
import Head from 'next/head';
import Header from '@/components/Header/Header';
import PokemonCard from '@/components/Card';
import { Container, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Pokemon {
  name: string;
}

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => setPokemon(res.data.results))
      .catch((err) => console.log);
  };

  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>

      <Header />

      <Container maxWidth={false}>
        <Grid container>
          {pokemon.map((pkm) => (
            <Grid item xs={3} key={pkm.name}>
              <PokemonCard name={pkm.name} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

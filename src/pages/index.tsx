import styles from '../styles/home.module.scss';
import Head from 'next/head';
import Header from '@/components/Header/Header';
import PokemonCard from '@/components/Card';
import { Container, Grid } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = () => {
    const endpoints: string[] = [];
    for (let i = 1; i <= 1010; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    const requests: Promise<AxiosResponse<any>>[] = endpoints.map((endpoint) => axios.get(endpoint));

    axios
      .all(requests)
      .then((responses: AxiosResponse<any>[]) => {
        const responseData: Pokemon[] = responses.map((res: AxiosResponse<any>) => res.data);
        const updatedPokemon: Pokemon[] = responseData.map((data: any) => ({
          name: data.name,
          sprites: {
            front_default: data.sprites.front_default,
          },
        }));
        setPokemon(updatedPokemon);
      })
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
              <PokemonCard name={pkm.name} image={pkm.sprites.front_default} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

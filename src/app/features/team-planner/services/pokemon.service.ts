import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {map} from 'rxjs';
import {Pokemon} from '../../../core/models/pokemon';
import {PokemonPage} from '../../../core/models/pokemon-page';
import {PokemonState} from '../search/store/search.reducer';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private apollo: Apollo) {}

  getPokemons() {
    return this.apollo
      .watchQuery({
        query: gql`
          {
            pokemon_v2_pokemon(limit: 20) {
              id
              name
              pokemon_v2_pokemontypes {
                pokemon_v2_type {
                  name
                }
              }
            }
            pokemon_v2_pokemon_aggregate {
              aggregate {
                count
              }
            }
          }
        `,
      })
      .valueChanges.pipe(
        map((res: any) => {
          const page: PokemonPage = {
            limit: 20,
            currentPage: 1,
            total: res.data.pokemon_v2_pokemon_aggregate.aggregate.count,
            totalPages: Math.ceil(res.data.pokemon_v2_pokemon_aggregate.aggregate.count / 20),
          };
          return {
            pokemons: this.mapResponse(res),
            page,
          } as PokemonState;
        }),
      );
  }

  getByName(name: string, page: PokemonPage) {
    return this.apollo
      .watchQuery({
        query: gql`{
          pokemon_v2_pokemon(limit: ${page.limit}, offset: ${
            page.currentPage * page.limit - page.limit
          }, where: {name: {_ilike: "%${name}%"}}) {
            id
            name
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
          }
          pokemon_v2_pokemon_aggregate (where: {name: {_ilike: "%${name}%"}}) {
            aggregate {
              count
            }
          }
        }`,
      })
      .valueChanges.pipe(
        map((res: any) => {
          return {
            page: {
              limit: page.limit,
              currentPage: page.currentPage,
              total: res.data.pokemon_v2_pokemon_aggregate.aggregate.count,
              totalPages: Math.ceil(
                res.data.pokemon_v2_pokemon_aggregate.aggregate.count / page.limit,
              ),
            },
            pokemons: this.mapResponse(res),
          } as PokemonState;
        }),
      );
  }

  mapResponse = (r: any) => {
    const res: Pokemon[] = [];
    (r.data.pokemon_v2_pokemon as any[]).forEach((p) => {
      res.push({
        imageUrl: `https://projectpokemon.org/images/normal-sprite/${p.name.split('-')[0]}.gif`,
        name: p.name,
        id: p.id,
        types: p.pokemon_v2_pokemontypes.map((t: any) => t.pokemon_v2_type.name),
      } as Pokemon);
    });
    return res;
  };
}

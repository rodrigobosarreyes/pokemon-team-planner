import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {map} from 'rxjs';
import {Pokemon} from '../../../core/models/pokemon';

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
          }
        `,
      })
      .valueChanges.pipe(map(this.mapResponse));
  }

  getByName(name: string) {
    return this.apollo
      .watchQuery({
        query: gql`{
          pokemon_v2_pokemon(limit: 20, where: {name: {_ilike: "%${name}%"}}) {
            id
            name
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
          }
        }`,
      })
      .valueChanges.pipe(map(this.mapResponse));
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

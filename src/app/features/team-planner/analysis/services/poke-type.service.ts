import {Injectable} from '@angular/core';
// @ts-expect-error legacy js library
import * as pokeTypes from 'poke-types';
import {Pokemon} from '../../../../core/models/pokemon';

export type Weakness = {[key: string]: number};

@Injectable()
export class PokeTypeService {
  EFFECTIVENESS = pokeTypes.effectiveness;

  calculateWeakness(pokemons: ReadonlyArray<Pokemon>): Weakness {
    const setWeakness = new Set<{[key: string]: number}>();
    for (const pokemon of pokemons) {
      setWeakness.add(pokeTypes.getTypeWeaknesses(...pokemon.types));
    }
    const prevWeakness: Weakness[] = [...setWeakness];
    return prevWeakness.reduce((prev, current) => {
      for (const [type, prevValue] of Object.entries(prev)) {
        const currentValue = current[type];
        const difference = Math.abs(prevValue - currentValue);
        const smallestValue = Math.min(prevValue, currentValue);
        const largestValue = Math.max(prevValue, currentValue);

        if (difference === 0) {
          prev[type] =
            smallestValue === this.EFFECTIVENESS.superEffective
              ? this.EFFECTIVENESS.ultra
              : smallestValue === this.EFFECTIVENESS.notVeryEffective
                ? this.EFFECTIVENESS.weak
                : smallestValue;
        } else if (
          largestValue === this.EFFECTIVENESS.superEffective &&
          smallestValue === this.EFFECTIVENESS.normal
        ) {
          prev[type] = this.EFFECTIVENESS.superEffective;
        } else if (
          smallestValue === this.EFFECTIVENESS.noEffect ||
          smallestValue === this.EFFECTIVENESS.notVeryEffective
        ) {
          prev[type] = smallestValue;
        }
      }
      return prev;
    }, prevWeakness[0] || {});
  }

  getWeakness(weakness: Weakness): Array<string> {
    const allWeakness = new Set<string>();
    const arr = Object.entries(weakness)
      .filter((a) => a[1] > 1)
      .map((a) => a[0]);
    arr.forEach((a) => allWeakness.add(a));
    return [...allWeakness];
  }
}

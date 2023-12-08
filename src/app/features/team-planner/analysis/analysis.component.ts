import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectTeam} from '../../../core/store/team.selector';
import {AsyncPipe, TitleCasePipe} from '@angular/common';
// @ts-expect-error legacy js library
import * as pokeTypes from 'poke-types';
import {PokemonTypeDirective} from '../../../core/directives/pokemon-type.directive';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [AsyncPipe, PokemonTypeDirective, TitleCasePipe],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent implements OnInit {
  team$ = this.store.select(selectTeam);
  weakness: string[] = [];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.team$.subscribe((t) => {
      const EFFECTIVENESS = pokeTypes.effectiveness;
      const setWeakness = new Set<{[key: string]: number}>();
      for (const pokemon of t) {
        setWeakness.add(pokeTypes.getTypeWeaknesses(...pokemon.types));
        console.log(pokemon.name, pokeTypes.getTypeWeaknesses(...pokemon.types));
      }
      const allWeakness: {[key: string]: number}[] = [...setWeakness];
      const newWeak = allWeakness.reduce((prevWeakness, currentWeakness) => {
        for (const [type, prevValue] of Object.entries(prevWeakness)) {
          const currentValue = currentWeakness[type];
          const difference = Math.abs(prevValue - currentValue);
          const smallestValue = Math.min(prevValue, currentValue);
          const largestValue = Math.max(prevValue, currentValue);

          if (difference === 0) {
            prevWeakness[type] =
              smallestValue === EFFECTIVENESS.superEffective
                ? EFFECTIVENESS.ultra
                : smallestValue === EFFECTIVENESS.notVeryEffective
                  ? EFFECTIVENESS.weak
                  : smallestValue;
          } else if (
            largestValue === EFFECTIVENESS.superEffective &&
            smallestValue === EFFECTIVENESS.normal
          ) {
            prevWeakness[type] = EFFECTIVENESS.superEffective;
          } else if (
            smallestValue === EFFECTIVENESS.noEffect ||
            smallestValue === EFFECTIVENESS.notVeryEffective
          ) {
            prevWeakness[type] = smallestValue;
          }
        }
        return prevWeakness;
      });
      console.log(newWeak);
      const a = this.getWeakness(newWeak);
      this.weakness = a;
    });
  }

  private getWeakness(weakness: any) {
    const allWeakness = new Set<string>();
    const arr = Object.entries(weakness)
      .filter((a: any) => a[1] > 1)
      .map((a) => a[0]);
    arr.forEach((a) => allWeakness.add(a));
    return [...allWeakness];
  }
}

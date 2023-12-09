import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectTeam} from '../../../core/store/team.selector';
import {AsyncPipe, TitleCasePipe} from '@angular/common';

import {PokemonTypeDirective} from '../../../core/directives/pokemon-type.directive';
import {PokeTypeService} from './services/poke-type.service';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [AsyncPipe, PokemonTypeDirective, TitleCasePipe],
  providers: [PokeTypeService],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent implements OnInit {
  team$ = this.store.select(selectTeam);
  weakness: string[] = [];
  constructor(
    private store: Store,
    private pokeTypeService: PokeTypeService,
  ) {}

  ngOnInit(): void {
    this.team$.subscribe((pokemons) => {
      this.weakness = this.pokeTypeService.getWeakness(
        this.pokeTypeService.calculateWeakness(pokemons),
      );
    });
  }
}

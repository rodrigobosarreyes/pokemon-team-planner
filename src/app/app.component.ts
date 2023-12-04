import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {TeamPreviewComponent} from './features/team-planner/team-preview/team-preview.component';
import {AnalysisComponent} from './features/team-planner/analysis/analysis.component';
import {SearchComponent} from './features/team-planner/search/search.component';
import {Pokemon} from './core/models/pokemon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TeamPreviewComponent, AnalysisComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pokemon-team-planner';

  team: Array<Pokemon> = [
    {
      imageUrl: 'https://projectpokemon.org/images/normal-sprite/primarina.gif',
      id: 1,
      name: 'Primarina',
      types: ['water', 'fairy'],
    },
    {
      imageUrl: 'https://projectpokemon.org/images/normal-sprite/rapidash.gif',
      id: 78,
      name: 'Rapidash',
      types: ['fire'],
    },
    {
      imageUrl: 'https://projectpokemon.org/images/normal-sprite/dragapult.gif',
      id: 78,
      name: 'Dragapult',
      types: ['dragon', 'ghost'],
    },
    {
      imageUrl: 'https://projectpokemon.org/images/normal-sprite/cresselia.gif',
      id: 78,
      name: 'Cresselia',
      types: ['psychic'],
    },
    {
      imageUrl: 'https://projectpokemon.org/images/normal-sprite/lucario.gif',
      id: 78,
      name: 'Lucario',
      types: ['fighting', 'steel'],
    },
    {
      imageUrl: 'https://projectpokemon.org/images/normal-sprite/dodrio.gif',
      id: 78,
      name: 'Dodrio',
      types: ['normal', 'flying'],
    },
  ];
}

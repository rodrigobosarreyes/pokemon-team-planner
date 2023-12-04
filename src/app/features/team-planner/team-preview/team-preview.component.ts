import {Component, Input} from '@angular/core';
import {PokemonPreviewComponent} from './pokemon-preview/pokemon-preview.component';
import {Pokemon} from '../../../core/models/pokemon';

@Component({
  selector: 'app-team-preview',
  standalone: true,
  imports: [PokemonPreviewComponent],
  templateUrl: './team-preview.component.html',
  styleUrl: './team-preview.component.scss',
})
export class TeamPreviewComponent {
  @Input() team!: ReadonlyArray<Pokemon>;
}

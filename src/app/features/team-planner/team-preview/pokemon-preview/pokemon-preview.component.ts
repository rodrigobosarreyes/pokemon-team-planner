import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PokemonTypeDirective} from '../../../../core/directives/pokemon-type.directive';
import {Pokemon} from '../../../../core/models/pokemon';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-pokemon-preview',
  standalone: true,
  imports: [PokemonTypeDirective, TitleCasePipe],
  templateUrl: './pokemon-preview.component.html',
  styleUrl: './pokemon-preview.component.scss',
})
export class PokemonPreviewComponent {
  @Input() pokemon!: Pokemon;
  @Output() readonly clickPokemon = new EventEmitter<Pokemon>();

  onClickPokemon(pokemon: Pokemon): void {
    this.clickPokemon.emit(pokemon);
  }
}

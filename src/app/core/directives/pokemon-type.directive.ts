import {Directive, HostBinding, Input, OnInit} from '@angular/core';

interface PokemonTypeStyle {
  background: string;
  color: string;
}

@Directive({
  selector: '[appPokemonType]',
  standalone: true,
})
export class PokemonTypeDirective implements OnInit {
  @Input() appPokemonType!: string;

  @HostBinding('style.background') bgColor: string = 'none';
  @HostBinding('style.color') color: string = '#fff';
  @HostBinding('style.padding') padding: string = '1px 15px';
  @HostBinding('style.borderRadius') borderRadius = '5px';

  private colors: {[key: string]: PokemonTypeStyle} = {
    'bug': {
      background: '#A6B91A',
      color: '#252d06',
    },
    'dark': {
      background: '#705746',
      color: '#f6f4f0',
    },
    'dragon': {
      background: 'linear-gradient(180deg, rgba(111,53,252,1) 0%, rgba(220,65,38,1) 100%)',
      color: '#f3f2ff',
    },
    'electric': {
      background: '#F7D02C',
      color: '#6f4014',
    },
    'fighting': {
      background: '#C22E28',
      color: '#fde4e3',
    },
    'fairy': {
      background: '#D685AD',
      color: '#fbf4f8',
    },
    'fire': {
      color: '#fef7ee',
      background: '#EE8130',
    },
    'flying': {
      background: '#A98FF3',
      color: '#eeeafd',
    },
    'ghost': {
      background: '#735797',
      color: '#f9f7fc',
    },
    'grass': {
      color: '#000',
      background: '#7fc952',
    },
    'ground': {
      background: '#E2BF65',
      color: '#69361e',
    },
    'ice': {
      background: '#96D9D6',
      color: '#294b50',
    },
    'normal': {
      background: '#A8A77A',
      color: '#f6f5ef',
    },
    'poison': {
      color: '#faecfb',
      background: '#A33EA1',
    },
    'psychic': {
      background: '#F95587',
      color: '#fff1f4',
    },
    'rock': {
      background: '#B6A136',
      color: '#69361e',
    },
    'steel': {
      background: '#B7B7CE',
      color: '#514f60',
    },
    'water': {
      background: '#6390F0',
      color: '#f0f4fe',
    },
    'unknown': {
      background: 'none',
      color: '#000',
    },
    'shadow': {
      background: '#fff',
      color: '#000',
    },
  };

  ngOnInit(): void {
    const styles = this.colors[this.appPokemonType];
    this.bgColor = styles.background;
    this.color = styles.color;
  }
}

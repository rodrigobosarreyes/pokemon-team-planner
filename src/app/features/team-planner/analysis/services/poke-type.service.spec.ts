import { TestBed } from '@angular/core/testing';

import { PokeTypeService } from './poke-type.service';

describe('PokeTypeService', () => {
  let service: PokeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

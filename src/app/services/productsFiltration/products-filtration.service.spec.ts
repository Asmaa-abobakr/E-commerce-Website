import { TestBed } from '@angular/core/testing';

import { ProductsFiltrationService } from './products-filtration.service';

describe('ProductsFiltrationService', () => {
  let service: ProductsFiltrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsFiltrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

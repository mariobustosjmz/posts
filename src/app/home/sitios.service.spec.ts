import { TestBed } from '@angular/core/testing';

import { SitiosService } from './sitios.service';

describe('SitiosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SitiosService = TestBed.get(SitiosService);
    expect(service).toBeTruthy();
  });
});

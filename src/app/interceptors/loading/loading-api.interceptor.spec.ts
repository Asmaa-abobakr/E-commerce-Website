import { TestBed } from '@angular/core/testing';

import { LoadingAPIInterceptor } from './loading-api.interceptor';

describe('LoadingAPIInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoadingAPIInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoadingAPIInterceptor = TestBed.inject(LoadingAPIInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

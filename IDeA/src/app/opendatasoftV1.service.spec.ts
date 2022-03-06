/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OpendatasoftV1Service } from './opendatasoftV1.service';

describe('Service: OpendatasoftV1', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpendatasoftV1Service]
    });
  });

  it('should ...', inject([OpendatasoftV1Service], (service: OpendatasoftV1Service) => {
    expect(service).toBeTruthy();
  }));
});

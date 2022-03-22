/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FirestorageService } from './firestorage.service';

describe('Service: Firestorage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirestorageService]
    });
  });

  it('should ...', inject([FirestorageService], (service: FirestorageService) => {
    expect(service).toBeTruthy();
  }));
});

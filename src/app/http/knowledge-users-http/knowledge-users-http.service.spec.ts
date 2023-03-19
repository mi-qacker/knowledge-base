import {TestBed} from '@angular/core/testing';

import {KnowledgeUsersHttpService} from './knowledge-users-http.service';

describe('KnowledgeUsersHttpService', () => {
  let service: KnowledgeUsersHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnowledgeUsersHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

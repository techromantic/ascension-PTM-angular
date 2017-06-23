import { Injectable } from '@angular/core';
import { Assignment } from './assignment';
import { ASSIGNMENTS } from './mock-assignments';
import { AscensionStorageService } from './ascension-storage.service';

@Injectable()
export class AssignmentService {

  getAssignments(): Assignment[] {
    return ASSIGNMENTS;
  } // stub
}

import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class CurrentDateSelectedService {
  private key = 'currentDate';

  constructor(@Inject(SESSION_STORAGE)
    private webstorage: StorageService,
  ) {}

  setCurrentDate(date: Date) {
    this.webstorage.set(this.key, date);
  }

  getCurrentDate(): Date {
    return this.webstorage.get(this.key);
  }
}

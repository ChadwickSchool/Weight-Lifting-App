import { Injectable } from '@angular/core';

@Injectable()
export class CurrentDateSelectedService {
  currentDate: Date;
  setCurrentDate(date: Date) {
    this.currentDate = date;
  }

  getCurrentDate(): Date {
    return this.currentDate;
  }
}

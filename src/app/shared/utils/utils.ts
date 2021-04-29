export default class Utils {
  /**
   * Returns a date object at the start of the day given a date object.
   * Ex. July 25, 2019 00:00:00
   * @param date given date
   */
  static getSimplifiedDate(date: Date): Date {
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const todayDate = new Date('\'' + (month + 1) + '-' + day + '-' + year + '\'');
    return todayDate;
  }
}

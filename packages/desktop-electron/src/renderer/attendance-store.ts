import { Constants } from '@etu-access/lib';
import { Attendance } from './types/attendance';

export abstract class AttendanceStore {
  public static get attendanceList(): Attendance[] {
    const result = localStorage.getItem(Constants.CARDS_STORAGE_KEY);
    if (result === null) {
      const cards: Attendance[] = [];
      localStorage.setItem(Constants.CARDS_STORAGE_KEY, JSON.stringify(cards));
      return cards;
    }
    return JSON.parse(result);
  }

  public static addAttendance(attendance: Attendance): boolean {
    const list = this.attendanceList;
    const exisitngAttendance = list.find(
      (item) => attendance.cardId === item.cardId,
    );
    if (exisitngAttendance) {
      return false;
    }
    list.push(attendance);
    localStorage.setItem(Constants.CARDS_STORAGE_KEY, JSON.stringify(list));
    return true;
  }

  public static resetAttendance() {
    localStorage.setItem(Constants.CARDS_STORAGE_KEY, JSON.stringify([]));
  }
}

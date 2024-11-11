import { Constants } from '@etu-access/lib';

export abstract class CardStore {
  public static get savedCards(): string[] {
    const result = localStorage.getItem(Constants.CARDS_STORAGE_KEY);
    if (result === null) {
      const cards: string[] = [];
      localStorage.setItem(Constants.CARDS_STORAGE_KEY, JSON.stringify(cards));
      return cards;
    }
    return JSON.parse(result);
  }
  public static set savedCards(cards: string[]) {
    localStorage.setItem(Constants.CARDS_STORAGE_KEY, JSON.stringify(cards));
  }
}

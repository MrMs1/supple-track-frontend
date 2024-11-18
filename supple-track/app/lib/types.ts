export interface Supplement {
  name: string;
  items: Item[];
}

export interface Item {
  id: string;
  name: string;
  quantity: number;
  dosagePerUse: number;
  dailyIntakeFrequency: number;
  supplyDays: number;
  expiredAt: Date;
  startAt: Date;
  endAt: Date;
}

export interface SupplementFormData {
  supplementName: string;
  itemName: string;
  quantity: number;
  dosagePerUse: number;
  dailyIntakeFrequency: number;
  expiredAt: Date;
  startAt: Date;
}

export interface ItemFormData {
  supplementName: string;
  itemName: string;
  quantity: number;
  dosagePerUse: number;
  dailyIntakeFrequency: number;
  expiredAt: Date;
  startAt: Date;
}

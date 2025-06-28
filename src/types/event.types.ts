export type Event = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  saleStart: string;
  saleEnd: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  deleted: boolean;
};

export type Location = {
  id: number;
  name: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  deleted: boolean;
};

export type EventLocation = {
  id: number;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  deleted: boolean;
  event: Event;
  location: Location;
};
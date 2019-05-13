export interface RealtyDetails {
  id:number;
  title: string;
  description: string;
  price: number;
  currency: string;
  area: number;
  flooring: number;
  rooms: number;
  ownerPhone: string;
  ownerName: string;
  offer: string;
  creator: any;
  link: string;
  floor: number;
  kitchenArea: number;
  photos: string[] | File[];
  resourcetype:string;
  fieldArea:number;
}


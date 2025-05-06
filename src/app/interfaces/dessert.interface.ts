export interface Dessert {
  id : string;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  },
  name: string;
  category: string;
  price: number;
  quantity?: number;
}

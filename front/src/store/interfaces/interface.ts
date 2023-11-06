export interface House {
  id: number;
  title: string;
  price: string;
  number_of_rooms: number;
  total_area: number;
  living_area: number;
  location: string;
  type: string;
  floor: number;
  floors: number;
  house_extensions: string;
  photos: string;
}

export interface ExtendedHouse {
  house: House;
  extensions: {
    show_more: boolean;
    changer: boolean;
    array_of_idx_to_delete: number[];
    price_in_BYN: number;
  };
}

export interface InitialExtentedHouse {
  houses: ExtendedHouse[];
}

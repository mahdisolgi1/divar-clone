//  for Ad

export interface Ad {
  id: number;
  created_at: string;
  title: string;
  price: number;
  phoneNumber: number;
  status: string;
  openToExchange: boolean;
  description: string;
  img1: string | null;
  img2: string | null;
  img3: string | null;
  longitude: number;
  latitude: number;
  categoryID: number;
  placeID: number;
  place: {
    id: number;
    province: string;
    city: string;
  };
  category: {
    id: number;
    category: string;
    subCategory1: string;
    subCategory2: string;
  };
}

// for Category

export interface Category {
  id: number;
  category: string;
  created_at: string;
  subCategory1: string;
  subCategory2: string;
}

// for province

export interface place {
  id: number;
  province: string;
  created_at: string;
  provinceLongitude: number;
  provinceLatitude: number;
  city: string;
  cityLongitude: number;
  cityLatitude: number;
}

// for status

export interface status {
  id: number;
  status: string;
  created_at: string;
}

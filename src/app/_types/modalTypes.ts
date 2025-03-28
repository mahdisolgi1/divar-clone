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
  categoryId : number;
  placeId: number;
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

export interface province {
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

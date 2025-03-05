//  for Ad

export interface Ad {
  id: number;
  created_at: string;
  title: string;
  price: number;
  phoneNumber: number;
  place: string;
  province: string;
  status: string;
  openToExchange: string | null;
  description: string;
  img1: string | null;
  img2: string | null;
  img3: string | null;
  longitude: number;
  latitude: number;
  category: string;
}

// for Category

export interface Category {
  id: number;
  category: string;
  created_at: string;
}

// for province

export interface province {
  id: number;
  province: string;
  created_at: string;
  longitude: number;
  latitude: number;
}

// for status

export interface status {
  id: number;
  status: string;
  created_at: string;
}

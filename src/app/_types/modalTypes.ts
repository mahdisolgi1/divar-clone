//  for Ad

export interface Ad {
  id: number;
  created_at: string;
  title: string;
  price: number;
  phoneNumber: number;
  place: string;
  status: string;
  openToExchange: string | null;
  description: string;
  img1: string | null;
  img2: string | null;
  img3: string | null;
  category: string;
}

// for Category

export interface Category {
  id: number;
  category: string;
  created_at: string;
}

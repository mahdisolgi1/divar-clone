// // import { eachDayOfInterval } from "date-fns";
import { Ad } from "../_types/modalTypes";
import { supabase } from "./supabase";

// /////////////
// // GET

export async function getAd(id: number) {
  const { data, error } = await supabase
    .from("ad")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Ads could not be loaded");
  }

  return data;
}
export const getAds = async function () {
  const { data: ads, error } = await supabase
    .from("ad")
    .select("*")
    .order("created_at");

  // For testing
  // await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    console.error(error);
    throw new Error("Ads could not be loaded");
  }
  return ads;
};

export const filterAds = async function (
  titleSearch?: string,
  province?: string,
  category?: string,
  status?: string,
  minPrice?: number,
  maxPrice?: number,
  isExchangeOpen?: boolean
) {
  let query = supabase.from("ad").select("*").order("created_at");

  if (titleSearch) query = query.ilike("title", `%${titleSearch}%`);
  if (province) query = query.eq("province", province);
  if (category) query = query.eq("category", category);
  if (status) query = query.eq("status", status);
  if (isExchangeOpen) query = query.eq("openToExchange", isExchangeOpen);

  if (minPrice !== undefined && maxPrice !== undefined) {
    query = query.gte("price", minPrice).lte("price", maxPrice);
  } else if (minPrice !== undefined) {
    query = query.gte("price", minPrice);
  } else if (maxPrice !== undefined) {
    query = query.lte("price", maxPrice);
  }

  const { data: ads, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Ads could not be loaded");
  }

  return ads;
};
export const searchAds = async (searchTerm: string, province?: string) => {
  if (!searchTerm) return [];

  try {
    const query = supabase
      .from("ad")
      .select("*")
      .ilike("title", `%${searchTerm}%`)
      .limit(4);

    if (province) {
      query.eq("province", province);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching ads:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
};

export const queryedAds = async (searchTerm: string) => {
  if (!searchTerm) return [];

  const { data, error } = await supabase
    .from("ad")
    .select("*")
    .ilike("title", `%${searchTerm}%`);

  if (error) {
    console.error("Error fetching ads:", error);
    return [];
  }

  return data;
};
export const getCates = async function () {
  const { data: ads, error } = await supabase
    .from("category")
    .select("*")
    .order("id");

  // For testing
  // await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    console.error(error);
    throw new Error("categories could not be loaded");
  }
  return ads;
};
export const getProvinces = async function () {
  const { data: provinces, error } = await supabase
    .from("provinces")
    .select("*")
    .order("id");

  // For testing
  // await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    console.error(error);
    throw new Error("provinces could not be loaded");
  }
  return provinces;
};
export const getStatuses = async function () {
  const { data: statuses, error } = await supabase
    .from("statuses")
    .select("*")
    .order("id");

  // For testing
  // await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    console.error(error);
    throw new Error("provinces could not be loaded");
  }
  return statuses;
};
export const getFaves = async function () {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .order("created_at");

  // For testing
  // await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    console.error(error);
    throw new Error("faves could not be loaded");
  }

  return data;
};
export async function createAd(newAd: Ad): Promise<Ad[]> {
  const { data, error } = await supabase.from("ad").insert([newAd]);

  if (error) {
    console.error(error);
    throw new Error("Ad could not be created");
  }

  return data ?? [];
}

export async function uploadImage(file: File) {
  const fileName = `${Date.now()}_${file.name}`;

  const { error } = await supabase.storage
    .from("ad-images")
    .upload(fileName, file);

  if (error) {
    console.error("Upload failed:", error.message);
    return null;
  }

  const { data: publicURL } = supabase.storage
    .from("ad-images")
    .getPublicUrl(fileName);

  return publicURL?.publicUrl || null;
}

// export async function getCabinPrice(id) {
//   const { data, error } = await supabase
//     .from("cabins")
//     .select("regularPrice, discount")
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.error(error);
//   }

//   return data;
// }

// // Guests are uniquely identified by their email address
// export async function getGuest(email) {
//   const { data, error } = await supabase
//     .from("guests")
//     .select("*")
//     .eq("email", email)
//     .single();

//   // No error here! We handle the possibility of no guest in the sign in callback
//   return data;
// }

// export async function getBooking(id) {
//   const { data, error, count } = await supabase
//     .from("bookings")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not get loaded");
//   }

//   return data;
// }

// export async function getBookings(guestId) {
//   const { data, error, count } = await supabase
//     .from("bookings")
//     // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
//     .select(
//       "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)"
//     )
//     .eq("guestId", guestId)
//     .order("startDate");

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }

// export async function getBookedDatesByCabinId(cabinId) {
//   let today = new Date();
//   today.setUTCHours(0, 0, 0, 0);
//   today = today.toISOString();

//   // Getting all bookings
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("*")
//     .eq("cabinId", cabinId)
//     .or(`startDate.gte.${today},status.eq.checked-in`);

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   // Converting to actual dates to be displayed in the date picker
//   const bookedDates = data
//     .map((booking) => {
//       return eachDayOfInterval({
//         start: new Date(booking.startDate),
//         end: new Date(booking.endDate),
//       });
//     })
//     .flat();

//   return bookedDates;
// }

// export async function getSettings() {
//   const { data, error } = await supabase.from("settings").select("*").single();

//   // await new Promise((res) => setTimeout(res, 5000));

//   if (error) {
//     console.error(error);
//     throw new Error("Settings could not be loaded");
//   }

//   return data;
// }

// export async function getCountries() {
//   try {
//     const res = await fetch(
//       "https://restcountries.com/v2/all?fields=name,flag"
//     );
//     const countries = await res.json();
//     return countries;
//   } catch {
//     throw new Error("Could not fetch countries");
//   }
// }

// /////////////
// // CREATE

// /*
// export async function createBooking(newBooking) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .insert([newBooking])
//     // So that the newly created object gets returned!
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be created");
//   }

//   return data;
// }
// */
// /////////////
// // UPDATE

// /*
// // The updatedFields is an object which should ONLY contain the updated data
// export async function updateGuest(id, updatedFields) {
//   const { data, error } = await supabase
//     .from("guests")
//     .update(updatedFields)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Guest could not be updated");
//   }
//   return data;
// }

// export async function updateBooking(id, updatedFields) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .update(updatedFields)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be updated");
//   }
//   return data;
// }

// /////////////
// // DELETE

// export async function deleteBooking(id) {
//   const { data, error } = await supabase.from("bookings").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be deleted");
//   }
//   return data;
// }
// */

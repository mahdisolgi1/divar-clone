// // import { eachDayOfInterval } from "date-fns";
import { Ad, Chat } from "../_types/modalTypes";
import { supabase } from "./supabase";

// /////////////
// // GET

export async function getAd(id: number) {
  const { data, error } = await supabase
    .from("ad")
    .select(`
      *,
    place:placeID (
        id,
        province,
        city
      ),
      category:categoryID (
        id,
        category,
        subCategory1,
        subCategory2
      )
    `)
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
  isExchangeOpen?: boolean,
  activeSub1?: string,
  activeSub2?: string,
  city?: string
) { 
  let query = supabase
    .from("ad")
    .select(`
      *,
      placeID (
        id,
        province,
        city
      ),
      categoryID (
        id,
        category,
        subCategory1,
        subCategory2
      )
    `)
    .order("created_at", { ascending: false });

  if (titleSearch) query = query.ilike("title", `%${titleSearch}%`);
  if (province) query = query.eq("placeID.province", province);
  if (city) query = query.eq("placeID.city", city);
  if (status) query = query.eq("status", status);
  if (isExchangeOpen) query = query.eq("openToExchange", isExchangeOpen);
  
  if (category) {
    query = query.eq("categoryID.category", category);
    if (activeSub1) {
      query = query.eq("categoryID.subCategory1", activeSub1);
      if (activeSub2) {
        query = query.eq("categoryID.subCategory2", activeSub2);
      }
    }
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    query = query.gte("price", minPrice).lte("price", maxPrice);
  } else if (minPrice !== undefined) {
    query = query.gte("price", minPrice);
  } else if (maxPrice !== undefined) {
    query = query.lte("price", maxPrice);
  }

  // Add a filter to only return ads that have matching placeID
  if (province || city) {
    query = query.not("placeID", "is", null);
  }

  const { data: ads, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Ads could not be loaded");
  }

  // Filter the results in memory to ensure we only get ads with matching province/city
  let filteredAds = ads || [];
  if (province) {
    filteredAds = filteredAds.filter(ad => ad.placeID?.province === province);
  }
  if (city) {
    filteredAds = filteredAds.filter(ad => ad.placeID?.city === city);
  }

  // Filter by category in memory to ensure proper filtering
  if (category) {
    filteredAds = filteredAds.filter(ad => ad.categoryID?.category === category);
    if (activeSub1) {
      filteredAds = filteredAds.filter(ad => ad.categoryID?.subCategory1 === activeSub1);
      if (activeSub2) {
        filteredAds = filteredAds.filter(ad => ad.categoryID?.subCategory2 === activeSub2);
      }
    }
  }

  return filteredAds;
};
export const searchAds = async (searchTerm: string, province?: string) => {
  if (!searchTerm) return [];

  try {
    // Build the query
    const query = supabase
      .from("ad")
      .select(`
        *,
        category:categoryID (
          id,
          category,
          subCategory1,
          subCategory2
        )
      `)
      .ilike("title", `%${searchTerm}%`) // Perform case-insensitive search on title
      .limit(4); // Limit the results to 4 ads

    // Apply the province filter if provided
    if (province) {
      query.eq("province", province);
    }

    // Execute the query and return the results
    const { data, error } = await query;

    if (error) {
      throw error; // Handle any errors from the query
    }

    return data; // Return the found ads
  } catch (error) {
    console.error("Error fetching ads:", error);
    return []; // Return an empty array in case of an error
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
  const { data: categories, error } = await supabase
    .from("category")
    .select("category")
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("categories could not be loaded");
  }

  // Remove duplicates and return unique categories
  const uniqueCategories = Array.from(new Set(categories.map(c => c.category)))
    .map(category => ({ category }));
  
  return uniqueCategories;
};
export const getSubCates1 = async function (category: string) {
  const { data: subCategories1, error } = await supabase
    .from("category")
    .select("id,subCategory1")
    .eq("category", category)
    .order("id");

  // For testing
  // await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    console.error(error);
    throw new Error("categories could not be loaded");
  }
  return subCategories1;
};
export const getSubCates2 = async function ( subCategory1: string) {
  const { data: subCategories2, error } = await supabase
    .from("category")
    .select("id,subCategory2") 
      .eq("subCategory1", subCategory1)
    .order("id");

  // For testing
  // await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    console.error(error);
    throw new Error("categories could not be loaded");
  }
  return subCategories2;
};
export const getCatesByID = async function (id: number) {
  const { data, error } = await supabase
    .from("category")
    .select(`
      id,
      category,
      subCategory1,
      subCategory2,
      created_at
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Category could not be loaded");
  }

  return data; // Return as array to match Category[] type
};
export const getPlace = async function () {
  const { data: place, error } = await supabase
    .from("place")
    .select("id, province")
    .order("id");

  // For testing
  // await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    console.error(error);
    throw new Error("place could not be loaded");
  }
  const uniqueProvinces = Array.from(new Set(place.map(p => p.province)))
  .map(province => ({ province }));

  return uniqueProvinces;
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
export async function createAd(newAd: Omit<Ad, 'id' | 'created_at' | 'place' | 'category'>): Promise<Ad[]> {
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
export const getCitiesByProvince = async function (province: string) {
  const { data: cities, error } = await supabase
    .from("place")
    .select("id, city, cityLongitude, cityLatitude")
    .eq("province", province)
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("cities could not be loaded");
  }
  return cities;
};
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

export const getSubCategories = async (category: string) => {
  const { data, error } = await supabase
    .from("category")
    .select("subCategory1, subCategory2")
    .eq("category", category)
    .order("subCategory1");

  if (error) {
    console.error(error);
    throw new Error("Subcategories could not be loaded");
  }

  return data || [];
};

// Category Services
export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from("category")
    .select("category, subCategory1, subCategory2")
    .order("category");

  if (error) {
    console.error(error);
    throw new Error("Categories could not be loaded");
  }

  return data || [];
};

export const getCategoryDetails = async (category: string) => {
  const { data, error } = await supabase
    .from("category")
    .select("*")
    .eq("category", category)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Category details could not be loaded");
  }

  return data;
};

// Favorite Services
export const addToFavorites = async (userId: string, adId: number) => {
  const { data, error } = await supabase
    .from("favorites")
    .insert([{ userId, adId }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Could not add to favorites");
  }

  return data;
};

export const removeFromFavorites = async (userId: string, adId: number) => {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("userId", userId)
    .eq("adId", adId);

  if (error) {
    console.error(error);
    throw new Error("Could not remove from favorites");
  }
};

export const getUserFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from("favorites")
    .select(`
      *,
      ad:adId (
        *,
        category:categoryID (
          category,
          subCategory1,
          subCategory2
        ),
        place:placeID (
          province,
          city
        )
      )
    `)
    .eq("userId", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Could not fetch favorites");
  }

  return data || [];
};

// User Services
export const getUserAds = async (userId: string) => {
  const { data, error } = await supabase
    .from("ad")
    .select(`
      *,
      category:categoryID (
        category,
        subCategory1,
        subCategory2
      ),
      place:placeID (
        province,
        city
      )
    `)
    .eq("userId", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Could not fetch user ads");
  }

  return data || [];
};

export const updateUserProfile = async (userId: string, updates: {
  name?: string;
  phone?: string;
  email?: string;
}) => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Could not update user profile");
  }

  return data;
};

// Chat Services
// For buyers (people who initiated the chat)
export const getBuyerChats = async (userId: string) => {
  const { data, error } = await supabase
    .from("chats")
    .select(`
      id,
      message,
      created_at,
      senderID,
      receiverID,
      ad:adID (
        id,
        title,
        img1,
        userEmail,
        userID
      )
    `)
    .or(`senderID.eq.${userId},receiverID.eq.${userId}`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error('Database error:', error);
    throw new Error("Failed to fetch buyer chats");
  }

  // Filter on related field client-side
  const filtered = data.filter(chat  => chat.ad?.userID !== userId);

  return filtered;
};


// For owners (people who received the chat)
export const getOwnerChats = async (userId: string) => {
  const { data, error } = await supabase
    .from("chats")
    .select(`
      id,
      message,
      created_at,
      senderID,
      receiverID,
      ad:adID (
        id,
        title,
        img1,
        userEmail,
        userID
      )
    `)
    .eq('ad.userID', userId)  // Changed from eq('userID', userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error('Database error:', error);
    throw new Error("Failed to fetch owner chats");
  }

  return data;
};

export const sendMessage = async (adId: number, senderEmail: string, receiverEmail: string, senderId: string, receiverId: string, message: string) => {
  const { data, error } = await supabase
    .from("chats")
    .insert([{
      adID: adId,
      senderEmail: senderEmail,
      receiverEmail: receiverEmail,
      senderID: senderId,
      receiverID: receiverId,
      message: message
    }])
    .select()
    .single();

  if (error) {
    console.error('Error sending message:', error);
    throw new Error("Failed to send message");
  }

  return data;
};

export const getAdByID = async (adId: number) => {
  const { data, error } = await supabase
    .from("ad")
    .select("id,title,userEmail,img1")
    .eq("id", adId)
    .single();

  if (error) {
    throw error;
  }
  return data;
};
export const getAdByUserID = async (userId: string) => {
  const { data, error } = await supabase
    .from("ad")
    .select(`
      *,
      placeID (
        id,
        province,
        city
      ),
      categoryID (
        id,
        category,
        subCategory1,
        subCategory2
      )
    `)
    .eq("userID", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }
  return data;
};

export const getMyNotes = async (userId: string) => {
  const { data, error } = await supabase
    .from("notes")
    .select(`*, 
          adID (
           *,
      placeID (
        id,
        province,
        city
      ),
      categoryID (
        id,
        category,
        subCategory1,
        subCategory2
    ))`)
      .eq('userID', userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }
  return data;};
export const getMySavedAds = async (userId: string) => {
  const { data, error } = await supabase
    .from("saved_ads")
    .select(`
      *,
      ad!saved_ads_adID_fkey (
        *
      )
    `)
    .eq('userID', userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error('Database error:', error);
    throw new Error("Failed to fetch saved ads");
  }

  return data;
};
export const getMyNotesForAd = async (userId: string, adId: number) => {
  const { data, error } = await supabase
    .from("notes")
    .select("id,note,adID,userID")
    .eq("userID", userId)    
    .eq("adID", adId)
.single()    

  if (error) {
    console.error('Error fetching note:', error);
    return null;
  }
  return data;
};
export const getMySavedAdsForAd = async (userId: string, adId: number) => {
  const { data, error } = await supabase
    .from("saved_ads")
    .select("id,adID,userID")
    .eq("userID", userId)
    .eq("adID", adId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching saved ad:', error);
    return null;
  }
  return data;
};

export const deleteAd = async (adId: number, userId: string) => {
  const { error } = await supabase
    .from("ad")
    .delete()
    .eq("id", adId)
    .eq("userID", userId);

  if (error) {
    console.error('Error deleting ad:', error);
    throw new Error("Failed to delete ad");
  }
};

export async function updateAd(adId: number,userId: string, updatedAd: Omit<Ad, 'id' | 'created_at' | 'place' | 'category'>) {
  const { data, error } = await supabase
    .from("ad")
    .update(updatedAd)
    .eq("id", adId)
    .eq("userID", userId)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Ad could not be updated");
  }

  return data;
}

export const updateNote = async (id: number, userId: string, adId: number, note: string) => {
  try {
    // First check if a note already exists
    const existingNote = await getMyNotesForAd(userId, adId);
    
    if (existingNote) {
      // Update existing note
      const { data, error } = await supabase
        .from("notes")
        .update({ note })
        .eq("id", existingNote.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Create new note
      const { data, error } = await supabase
        .from("notes")
        .insert([{ userID: userId, adID: adId, note }])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error('Error updating note:', error);
    throw new Error("Failed to update note");
  }
};

export const deleteNote = async (userId: string, adId: number) => {
  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("userID", userId)
    .eq("adID", adId);

  if (error) {
    console.error('Error deleting note:', error);
    throw new Error("Failed to delete note");
  }
};

export const toggleSavedAd = async (userId: string, adId: number) => {
  try {
    const existingSaved = await getMySavedAdsForAd(userId, adId);
    
    if (existingSaved) {
      const { error } = await supabase
        .from("saved_ads")
        .delete()
        .eq("userID", userId)
        .eq("adID", adId);
      
      if (error) throw error;
      return false;
    } else {
      const { data, error } = await supabase
        .from("saved_ads")
        .insert([{ userID: userId, adID: adId }])
        .select()
        .single();
      
      if (error) throw error;
      return true;
    }
  } catch (error) {
    console.error('Error toggling saved ad:', error);
    throw new Error("Failed to toggle saved ad");
  }
};

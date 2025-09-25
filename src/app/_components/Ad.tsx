"use client";

import { Button, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { GoShareAndroid } from "react-icons/go";
import { MdBookmark, MdBookmarkBorder, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Swiper as SwiperType } from "swiper/types";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { IoWarningOutline } from "react-icons/io5";
import { getAd, getMyNotesForAd, getMySavedAdsForAd, updateNote, deleteNote, toggleSavedAd } from "../_lib/data-service";
import { useParams } from "next/navigation";
import { BiCopy } from "react-icons/bi";
import Image from "next/image";
import { Ad as AdInterface, MyNote } from "../_types/modalTypes";
import PersianRelativeTime from "./PersianRelativeTime";
import LocationDisplayer from "./LocationDisplayer";
import Spinner from "./Spinner";
import { formatPrice } from "../_utils/formatPrice";
import Link from "next/link";
import { useUser } from "../_context/UserContext";
import UserModal from "./UserModal";

// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const Ad: React.FC = () => {
  const [ad, setAd] = useState<AdInterface | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [toggleNumber, setToggleNumber] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const { user } = useUser();
  const [isSaved, setIsSaved] = useState(false);
  const [note, setNote] = useState<string>("");
  const [originalNote, setOriginalNote] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [isNoteSaving, setIsNoteSaving] = useState(false);
  const [noteId, setNoteId] = useState<number | null>(null);
const [isSmallScreen, setIsSmallScreen] = useState(false);

if(user?.id){  
  useEffect(() => {
      const checkIfSaved = async () => {
          if (!user?.id || !id) return;
          try {
              const savedAd = await getMySavedAdsForAd(user.id, Number(id));
              setIsSaved(!!savedAd);
          } catch (error) {
              console.error('Error checking saved status:', error);
              setIsSaved(false);
          }
      };
      checkIfSaved();
  }, [user?.id, id]);

  useEffect(() => {
      const showUserNotesForAds = async () => {
          if (!user?.id || !id) return;
          try {
              const savedNoteAd = await getMyNotesForAd(user.id, Number(id));
              if (savedNoteAd) {
                  setNote(savedNoteAd.note || "");
                  setOriginalNote(savedNoteAd.note || "");
                  setNoteId(savedNoteAd.id);
              } else {
                  setNote("");
                  setOriginalNote("");
                  setNoteId(null);
              }
          } catch (error) {
              console.error('Error fetching notes:', error);
              setNote("");
              setOriginalNote("");
              setNoteId(null);
          }
      };
      showUserNotesForAds();
  }, [user?.id, id]);
}
  async function handleCopy(phoneNumber: number) {
    try {
      await navigator.clipboard.writeText(phoneNumber?.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) return;

    const fetchAd = async () => {
      try {
        const data = await getAd(Number(id));
        if (!data) {
          throw new Error("Ad not found");
        }
        setAd(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);
  const images = [ad?.img1];
  if (ad?.img2) images.push(ad.img2);
  if (ad?.img3) images.push(ad.img3);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleSaveNote = async () => {
    if (!user?.id || !id) return;
    try {
      setIsNoteSaving(true);
      if (note.trim() === "") {
        await deleteNote(user.id, Number(id));
        setNote("");
        setOriginalNote("");
        setNoteId(null);
      } else {
        const updatedNote = await updateNote(noteId || 0, user.id, Number(id), note);
        if (updatedNote) {
          setOriginalNote(note);
          setNoteId(updatedNote.id || null);
        }
      }
    } catch (error) {
      console.error('Error saving note:', error);
      setNote(originalNote);
      alert('خطا در ذخیره یادداشت. لطفا دوباره تلاش کنید.');
    } finally {
      setIsNoteSaving(false);
    }
  };

  const handleCancelNote = () => {
    setNote(originalNote);
  };

  const handleSaveToggle = async () => {
    if (!user?.id || !id) return;
    
    try {
      setIsSaving(true);
      const newSavedState = await toggleSavedAd(user.id, Number(id));
      setIsSaved(newSavedState);
    } catch (error) {
      console.error('Error toggling saved state:', error);
      alert('خطا در ذخیره آگهی. لطفا دوباره تلاش کنید.');
    } finally {
      setIsSaving(false);
    }
  };

useEffect(() => {
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 640); // Tailwind's sm breakpoint
  };

  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
  return () => window.removeEventListener("resize", checkScreenSize);
}, []);
  return (
    <section className="text-right md:max-w-[960px] lg:max-w-[1024px] m-auto relative">
      <Link href="/ads" className="absolute top-0 left-0 lg:hidden">
      <MdOutlineKeyboardArrowRight className="text-dark-white-secondary p-2 bg-black dark:bg-white  dark:text-black-secondary   w-5" />
      </Link>
      {loading ? (
        <div className="flex justify-center w-full h-[75vh] items-center">
          <Spinner />
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : !ad ? (
        <p>Ad not found</p>
      ) : (
        <>
          {" "}
          <div className="flex justify-end gap-2 items-center py-4">
            <span className="text-black-hint dark:text-dark-white-hint  text-xs leading-10">
              {ad.title}
            </span>

            <MdOutlineKeyboardArrowLeft className="text-black-secondary  dark:text-dark-white-secondary w-5" />
            <span className="text-black-secondary dark:text-dark-white-secondary text-xs">{ad?.category?.category}</span>

            <MdOutlineKeyboardArrowLeft className="text-black-secondary dark:text-dark-white-secondary w-5" />
            <span className="text-black-secondary dark:text-dark-white-secondary text-xs">{ad?.category?.subCategory1}</span>
            {ad?.category?.subCategory2 && (
              <>
                <MdOutlineKeyboardArrowLeft className="text-black-secondary dark:text-dark-white-secondary w-5" />
                <span className="text-black-secondary dark:text-dark-white-secondary text-xs">
                  {ad.category?.subCategory2}
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col lg:flex-row justify-center  flex-1 gap-5 ">
            <div className="w-full lg:max-w-[50%] flex flex-col  justify-center  gap-5 mr-[8.33%]">
            <div className="w-full -z-10 max-w-3xl mx-auto">
  {/* Main Swiper */}
  {isSmallScreen ? (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      className="h-64 mb-5"
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <Image
            width={1500}
            height={1000}
            src={img || "/images/emptyAdImg.png"}
            alt={`Slide ${i + 1}`}
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <Swiper
      modules={[Navigation, Thumbs]}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      thumbs={{ swiper: thumbsSwiper }}
      className="h-64 mb-5"
    >
      {images.map((img, i) => (
        <SwiperSlide key={i} className="flex items-center justify-center">
          <Image
            width={1500}
            height={1000}
            src={img || "/images/emptyAdImg.png"}
            alt={`Slide ${i + 1}`}
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )}  

  {/* Thumbnail Swiper – only for larger screens */}
  {!isSmallScreen && images.length > 1 && (
    <Swiper
      modules={[Thumbs]}
      onSwiper={setThumbsSwiper}
      spaceBetween={10}
      slidesPerView={images.length}
      watchSlidesProgress
      className="mt-4"
    >
      {images.map((img, i) =>
        img ? (
          <SwiperSlide key={i} className="cursor-pointer">
            <Image
              width={1500}
              height={1000}
              src={img}
              alt={`Thumbnail ${i + 1}`}
              className="h-16 w-full object-cover"
            />
          </SwiperSlide>
        ) : null
      )}
    </Swiper>
  )}
</div>
      <div className="w-full hidden lg:block">
              <textarea
                name="notes"
                id="notes"
                className="w-full text-right border h-32 p-3 resize-none text-black-primary dark:text-dark-white-primary "
                placeholder="یادداشت شما..."
                value={note}
                onChange={handleNoteChange}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={handleCancelNote}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  disabled={isNoteSaving}
                >
                  انصراف
                </button>
                <UserModal onAuthenticated={handleSaveNote}>
                  <button
                    disabled={isNoteSaving}
                    className="px-4 py-2 text-sm bg-[#a62626] text-white rounded hover:bg-[#be3737] disabled:opacity-50"
                    >
                    {isNoteSaving ? "در حال ذخیره..." : "ذخیره"}
                  </button>
                </UserModal>
              </div>
              <p className="text-black-secondary dark:text-dark-white-secondary text-xs mt-2">
                یادداشت تنها برای شما قابل دیدن است و پس از حذف آگهی، پاک خواهد شد.
              </p>{" "}
              <LocationDisplayer lng={ad.longitude} lat={ad.latitude} />
                    </div>  
            </div>
            <div className="flex flex-col gap-5 w-full lg:w-1/2">
              <div className="flex flex-col gap-3 justify-start">
                <h1 className="text-xl font-medium text-black-primary dark:text-dark-white-primary  ">
                  {ad?.title}
                </h1>
                <div className=" flex text-right  justify-end items-center gap-1  ">
                  <p className="text-[0.875rem] text-black-secondary dark:text-dark-white-secondary">
                    {ad?.place?.city}
                  </p>
                  <PersianRelativeTime createdAt={ad.created_at} />
                </div>
                <div className="flex border-y justify-between items-center py-3">
                  <MdOutlineKeyboardArrowLeft className="text-black-hint dark:text-dark-white-hint w-10 text-lg cursor-pointer" />
                  <span className="text-black-primary dark:text-dark-white-primary  text-base ">
                    زنگ خطرهای قبل از معامله
                  </span>

                  <IoWarningOutline className="text-black-secondary dark:text-dark-white-secondary w-10 text-2xl cursor-pointer" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex justify-center items-center gap-5">
                  <span className="p-2 flex justify-center items-center cursor-pointer hover:bg-black-light-100 dark:hover:bg-dark-white-light-100 dark:hover:bg-dark-white-light-100 rounded-full">
                    <GoShareAndroid className="text-black-secondary dark:text-dark-white-secondary   text-xl" />
                  </span>
                  <UserModal onAuthenticated={handleSaveToggle}>
                    <span 
                      className="p-2 flex justify-center items-center cursor-pointer hover:bg-black-light-100 dark:hover:bg-dark-white-light-100 rounded-full" 
                      style={{ pointerEvents: isSaving ? 'none' : 'auto' }}
                    >
                      {isSaved ? (
                        <MdBookmark className="text-xl text-[#a62626]" />
                      ) : (
                        <MdBookmarkBorder className="text-xl text-black-secondary dark:text-dark-white-secondary" />
                      )}
                    </span>
                  </UserModal>
                </div>
                <div className="hidden w-full lg:flex  justify-center items-center gap-5">
                 <Link href={`/chat?adID=${ad.id}`}> <Button
                    variant="contained"
                    sx={{ background: "white", color: " rgba(0, 0, 0, 0.56)" }}
                    className="hover:bg-black/5 dark:hover:bg-white/5 text-black-secondary dark:text-dark-white-secondary hover:shadow-none  whitespace-nowrap bg-transparent text-content-primary"
                  >
                    چت
                  </Button>
                  </Link>
                  <Button
                    onClick={() => setToggleNumber(true)}
                    variant="contained"
                    sx={{ background: "#a62626" }}
                    className="hover:bg-[#be3737] hover:shadow-none  whitespace-nowrap"
                  >
                    تماس
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {toggleNumber && (
                  <>
                    <div className="flex justify-between  pb-3 items-center ">
                      <div className="flex justify-center items-center gap-2">
                        <Tooltip
                          title="! کپی شد"
                          placement="top"
                          arrow
                          open={copied}
                          disableHoverListener
                        >
                          <span
                            className="p-2 flex justify-center cursor-pointer items-center  hover:bg-black-light-100 dark:hover:bg-dark-white-light-100 rounded-full"
                            onClick={() => handleCopy(ad.phoneNumber)}
                          >
                            <BiCopy className="text-black-secondary dark:text-dark-white-secondary text-xl" />
                          </span>
                        </Tooltip>
                        <a
                          className="text-brand hover:text-[#be3737]  text-base  "
                          href={`tel:0${ad.phoneNumber}`}
                        >
                          0{ad.phoneNumber}
                        </a>
                      </div>
                      <span className="text-black-secondary dark:text-dark-white-secondary text-base">
                        شمارهٔ موبایل
                      </span>
                    </div>
                    <div className="flex justify-between  pb-3 items-center ">
                      <span className="text-brand hover:text-[#be3737]  text-base cursor-pointer ">
                        پیام در چت
                      </span>
                      <span className="text-black-secondary dark:text-dark-white-secondary text-base">چت</span>
                    </div>

                    <div className="rounded-sm  bg-message-primary text-black-secondary dark:text-dark-white-secondary p-4 ">
                      <h4 className="font-medium leading-8 text-xs">
                        درخواست بیعانه، از نشانه‌های کلاهبرداری
                      </h4>
                      <span className="leading-8 text-xs">
                        برای هر نوع پرداخت (بیعانه یا کل مبلغ)، از «پرداخت امن»
                        استفاده کنید.
                      </span>
                    </div>
                  </>
                )}
                <div className="flex justify-between border-b pb-3 items-center ">
                  <span className="text-black-primary dark:text-dark-white-primary  text-base ">
                    {ad.status}
                  </span>
                  <span className="text-black-secondary dark:text-dark-white-secondary text-base">وضعیت</span>
                </div>
                <div className="flex justify-between border-b pb-3 items-center ">
                  <span className="text-black-primary dark:text-dark-white-primary  text-base ">
                    {" "}
                    {ad.openToExchange ? "هستم" : "نیستم"}
                  </span>
                  <span className=" dark:text-dark-white-secondary text-black-secondary text-base">
                    مایل به معاوضه
                  </span>
                </div>
                <div className="flex justify-between border-b pb-3 items-center ">
                  <span className="text-black-primary dark:text-dark-white-primary  text-base ">
                    {formatPrice(ad.price.toString())}
                  </span>
                  <span className="text-black-secondary dark:text-dark-white-secondary text-base">قیمت</span>
                </div>
              </div>
              <h2 className="text-[1.125rem] text-black-primary dark:text-dark-white-primary  leading-7">
                توضیحات
              </h2>
              <p className="text-[0.875rem] text-black-primary dark:text-dark-white-primary ">
                {ad.description}
              </p>
            </div>    <div className="w-full  lg:hidden">
              <textarea
                name="notes"
                id="notes"
                className="w-full text-right border h-32 p-3 resize-none text-black-primary dark:text-dark-white-primary "
                placeholder="یادداشت شما..."
                value={note}
                onChange={handleNoteChange}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={handleCancelNote}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  disabled={isNoteSaving}
                >
                  انصراف
                </button>
                <UserModal onAuthenticated={handleSaveNote}>
                  <button
                    disabled={isNoteSaving}
                    className="px-4 py-2 text-sm bg-[#a62626] text-white rounded hover:bg-[#be3737] disabled:opacity-50"
                    >
                    {isNoteSaving ? "در حال ذخیره..." : "ذخیره"}
                  </button>
                </UserModal>
              </div>
              <p className="text-black-secondary dark:text-dark-white-secondary text-xs mt-2">
                یادداشت تنها برای شما قابل دیدن است و پس از حذف آگهی، پاک خواهد شد.
              </p>{" "}
              <LocationDisplayer lng={ad.longitude} lat={ad.latitude} />
                    </div>  
          </div>
          <div className="hidden lg:flex mt-[128px] py-4  justify-between items-center">
            <div className="flex gap-5 justify-center items-center w-full">
              <FaLinkedin className="text-black-secondary dark:text-dark-white-secondary  w-5" />
              <FaTwitter className="text-black-secondary dark:text-dark-white-secondary w-5" />
              <AiFillInstagram className="text-black-secondary dark:text-dark-white-secondary w-5"  />
            </div>
            <div className="flex whitespace-nowrap gap-2 text-black-secondary dark:text-dark-white-secondary justify-center items-center">
              <span>دریافت برنامه</span>
              <hr className="h-6 w-px mx-2 bg-[#dbdbe4]  " />
              <span>دربارهٔ دیوار</span>
              <hr className="h-6 w-px mx-2 bg-[#dbdbe4]  " />
              <span>اتاق خبر</span>
              <hr className="h-6 w-px mx-2 bg-[#dbdbe4]  " />
              <span>دیوار حرفه‌ای</span>
              <hr className="h-6 w-px mx-2 bg-[#dbdbe4]  " />
              <span>گزارش آسیب‌پذیری</span>
              <hr className="h-6 w-px mx-2 bg-[#dbdbe4]  " />
              <span>دیواری شو</span>
              <hr className="h-6 w-px mx-2 bg-[#dbdbe4]  " />
              <span>پشتیبانی و قوانین</span>
            </div>
          </div>
        </>
      )}
      <div className="fixed  w-full flex lg:hidden justify-center flex-1 gap-5">
                 <Link href={`/chat?adID=${id}`} className=" w-1/2"> <Button
                    variant="contained"
                    sx={{ background: "white", color: " rgba(0, 0, 0, 0.56)" }}
                    className="hover:bg-black/5 dark:hover:bg-white/5 text-black-secondary dark:text-dark-white-secondary hover:shadow-none  whitespace-nowrap bg-transparent text-content-primary"
                  >
                    چت
                  </Button>
                  </Link>
                  <Button
                    onClick={() => setToggleNumber(true)}
                    variant="contained"
                    sx={{ background: "#a62626" }}
                    className="hover:bg-[#be3737] hover:shadow-none  whitespace-nowrap  w-1/2"  
                  >
                    تماس
                  </Button>
                </div>
    </section>
  );
};

export default Ad;
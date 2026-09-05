"use client"
import Image from "next/image";
import {  useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdArrowUpward } from "react-icons/md";
import { useUser } from "../_context/UserContext";
import { getAdByID, getBuyerChats, sendMessage } from "../_lib/data-service";
import { Chat } from "../_types/modalTypes";
interface Ad {
    id: number;
    title: string;
    img1: string;
    userEmail: string;
}
const ChatBox: React.FC = () => {
    const { user } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const adID = searchParams.get('adID');
    
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);
    const [userAds, setUserAds] = useState<{ id: number; title: string; img1: string; userEmail: string ,userID:number}[]>([]);
    const [selectedAdDetails, setSelectedAdDetails] = useState<Ad | null>(null);

    // Fetch chat messages for selected ad
    useEffect(() => {
        const fetchChatMessages = async () => {
            if (!user?.id || !adID) return;
            try {
                const chatsData = await getBuyerChats(user.id);
                const selectedAdChats = chatsData
                    .filter(chat => chat.ad.id === Number(adID))
                    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    
                if (selectedAdChats.length === 0) {
                    const adDetails = await getAdByID(Number(adID));
                    if (adDetails) {
                        const newChat = {
                            id: 0,
                            adID: adDetails.id,
                            senderID: user.id,
                            receiverID: user.id,
                            senderEmail: user.email || '',
                            receiverEmail: adDetails.userEmail,
                            message: '',
                            created_at: new Date().toISOString(),
                            ad: {
                                id: adDetails.id,
                                title: adDetails.title,
                                userEmail: adDetails.userEmail,
                                img1: adDetails.img1
                            }
                        };
                        setChats([newChat]);
                    }
                } else {
                    setChats(selectedAdChats);
                }
            } catch (error) {
                console.error('Error fetching chat messages:', error);
            }
        };
        fetchChatMessages();
    }, [user?.id, adID, user?.email]);
    
    // Fetch all user's ads with messages
    useEffect(() => {
        const fetchUserAds = async () => {
            if (!user?.id) return;
            try {
                const chatsData = await getBuyerChats(user.id);
                if (!chatsData) return;
    
                // First filter out any null or invalid chats
                const validChats = chatsData.filter(chat => chat?.ad?.id);
                
                const uniqueAds = Array.from(new Set(validChats.map(chat => chat.ad.id)))
                    .map(id => {
                        const chat = validChats.find(c => c.ad.id === id);
                        if (!chat?.ad) return null;
                        return {
                            id: chat.ad.id,
                            title: chat.ad.title,
                            img1: chat.ad.img1,
                            userEmail: chat.ad.userEmail
                        };
                    })
                    .filter((ad): ad is NonNullable<typeof ad> => ad !== null);
    
                setUserAds(uniqueAds);
            } catch (error) {
                console.error('Error fetching user ads:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserAds();
    }, [user?.id, adID]);

    useEffect(() => {
        const fetchSelectedAdDetails = async () => {
            if (!adID) return;
            try {
                const adDetails = await getAdByID(Number(adID));
                setSelectedAdDetails(adDetails);
            } catch (error) {
                console.error('Error fetching ad details:', error);
            }
        };
        fetchSelectedAdDetails();
    }, [adID]);

    const handleAdSelect = (adId: number) => {
        router.push(`/my-chat?adID=${adId}`);
    };

    const handleSendMessage = async () => {
        if (!message.trim() || !user?.id || !adID) return;
    
        try {
            // First try to find the ad in userAds
            let selectedAd = userAds.find(ad => ad.id === Number(adID));
            
            // If not found in userAds, fetch it from the database
            if (!selectedAd) {
                const adDetails = await getAdByID(Number(adID));
                if (!adDetails) return;
                selectedAd = adDetails;
            }
    
            await sendMessage(
                Number(adID),
                user.email || '',
                selectedAd.userEmail,
                user.id,
                selectedAd.id,
                message.trim()
            );
    
            setMessage("");
            
            // Refresh chats after sending message
            const updatedChats = await getBuyerChats(user.id);
            const selectedAdChats = updatedChats
                .filter(chat => chat.ad.id === Number(adID))
                .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            setChats(selectedAdChats);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

  return (
        <div className="lg:border lg:border-black-divider lg:dark:border-dark-white-divider w-full h-full lg:max-w-[1024px] mx-auto lg:h-[80vh] flex ">
            {/* Left side - Chat area */}
            <div className={`${adID ? 'flex' : 'hidden'} flex-1 flex flex-col border-l border-black-divider dark:border-dark-white-divider`}>
                {adID ? (
                    <>
                        {chats.length > 0 && (
                            <div className="p-4 border-b border-black-divider dark:border-dark-white-divider">
                                <h2 className="text-[0.875rem] text-black-primary dark:text-dark-white-primary text-right">
                                    {chats[0].ad.userEmail}
                                </h2>
                                <div className="flex justify-end items-center gap-3 mt-2">
                                    <span className="text-black-primary dark:text-dark-white-primary text-xs">{chats[0].ad.title}</span>
                                {chats[0].ad.img1 ? (<Image 
                                        alt="ad image" 
                                        src={chats[0].ad.img1} 
                                        className="w-12 h-12" 
                                        width={100} 
                                        height={100} 
                                    />) : (
                                        <Image
                                          width={170}
                                          height={180}
                                          className="w-12 h-12" 
                                          src="/images/emptyAdImg.png"
                                          alt="Default image"
                                        />)}
        </div>
    </div>
                        )}
                        <div className="flex-1 overflow-y-auto p-4">
                            {chats.map((chat) => (
                                chat.message && (
                                    <div 
                                        key={chat.id}
                                        className={`mb-4 ${chat.senderID === user?.id ? 'text-left' : 'text-right'}`}
                                    >
                                        <div className={`inline-block p-3 rounded-xl ${
                                            chat.senderID === user?.id ? 'bg-brand text-white' : 'bg-[#fafafa] text-black'
                                        }`}>
                                            {chat.message}
</div>
        </div>
                                )
                            ))}
        </div>
                        <div className="p-4 border-t border-black-divider dark:border-dark-white-divider">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    className="w-full h-14 px-2 pr-14 focus:outline-none shadow-[0_-1px_2px_0_rgba(0,0,0,0.12)] text-right text-black-primary dark:text-dark-white-primary placeholder:text-base placeholder:text-black-secondary dark:text-dark-white-secondary" 
                                    placeholder="متنی بنویسید" 
                                    value={message} 
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <span 
                                    className={`absolute cursor-pointer right-1 top-1/2 rounded-full p-1 ${message ? "bg-brand" : "bg-neutral-50"}`}
                                    onClick={handleSendMessage}
                                >
                                    <MdArrowUpward className={`${message ? "text-white-primary" : "text-black-secondary dark:text-dark-white-secondary"} m-auto text-xl`}/>
                                </span>
            </div>
    </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-black-secondary dark:text-dark-white-secondary">
                        یک گفتگو را انتخاب کنید
                    </div>
                )}
            </div>

            {/* Right side - Ads list */}
            <div className={`w-full h-full lg:h-auto lg:w-1/3 p-4 ${adID ? "hidden lg:block" : "block"}`}>
                <h2 className="text-[0.875rem] text-black-primary dark:text-dark-white-primary text-right lg:text-left mb-4">گفتگوهای من</h2>
                {selectedAdDetails && (
                    <div className="mb-4 p-4 bg-white rounded-lg shadow">
                        <div className="flex items-center gap-4">
                            {selectedAdDetails.img1 ? (
                                <Image 
                                    alt="selected ad image" 
                                    src={selectedAdDetails.img1} 
                                    className="w-16 h-16 object-cover rounded"
                                    width={100} 
                                    height={100} 
                                />
                            ) : (
                                <Image
                                    width={170}
                                    height={180}
                                    className="w-16 h-16 object-cover rounded"
                                    src="/images/emptyAdImg.png"
                                    alt="Default image"
                                />
                            )}
                            <div>
<h3 className="font-medium">
  {loading ? "Loading..." : selectedAdDetails.title}
</h3>                                <p className="text-sm text-gray-500">{selectedAdDetails.userEmail}</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="space-y-4 w-full flex flex-col-reverse gap-2">
                    {userAds.map((ad) => (
                        <div 
                            key={ad.id}
                            onClick={() => handleAdSelect(ad.id)}
                            className={`cursor-pointer p-4 rounded-lg transition-colors ${
                                adID === ad.id.toString() ? 'bg-[#fafafa] hover:bg-gray-100 dark:hover:bg-dark-gray-100 ' : 'bg-gray-100'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                {ad.img1 ? (
                                    <Image 
                                        alt="ad image" 
                                        src={ad.img1} 
                                        className="w-16 h-16 object-cover rounded"
                                        width={100} 
                                        height={100} 
                                    />
                                ) : (
                                    <Image
                                        width={170}
                                        height={180}
                                        className="w-16 h-16 object-cover rounded"
                                        src="/images/emptyAdImg.png"
                                        alt="Default image"
                                    />
                                )}
                                <div className="flex-1">
                                    <h3 className="text-black-primary dark:text-dark-white-primary text-sm">{ad.title}</h3>
                                    <p className="text-black-secondary dark:text-dark-white-secondary text-xs">{ad.userEmail}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            </div>
    </div>
  );
};

export default ChatBox;
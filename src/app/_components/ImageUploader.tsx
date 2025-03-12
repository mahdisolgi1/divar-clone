import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { TiImage } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { uploadImage } from "../_lib/data-service";
import Spinner from "./Spinner";

interface ImageUploaderProps {
  onImg1: (img1: string) => void;
  onImg2: (img2: string) => void;
  onImg3: (img3: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImg1,
  onImg2,
  onImg3,
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedImages[0]) onImg1(selectedImages[0]);
    if (selectedImages[1]) onImg2(selectedImages[1]);
    if (selectedImages[2]) onImg3(selectedImages[2]);
  }, [selectedImages, onImg1, onImg2, onImg3]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || selectedImages.length >= 3) return;

    setUploading(true);
    try {
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) {
        setSelectedImages((prev) => [...prev, uploadedUrl]);
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePlaceholderClick = () => {
    if (selectedImages.length < 3 && !uploading) {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        {selectedImages.map((image, index) => (
          <div
            key={index}
            className="relative w-40 h-40 border-2 border-black-medium-200 rounded-lg overflow-hidden group"
          >
            <Image
              src={image}
              alt={`Selected ${index + 1}`}
              width={160}
              height={160}
              className="rounded-lg object-cover group-hover:opacity-90 transition-opacity"
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              onClick={() => handleRemoveImage(index)}
            >
              <MdDelete className="text-3xl text-red-500" />
            </div>
          </div>
        ))}
        {selectedImages.length < 3 && (
          <div
            className="w-40 h-40 border-2 border-dashed border-black-medium-200 hover:border-black-secondary rounded-lg flex items-center justify-center cursor-pointer"
            onClick={handlePlaceholderClick}
          >
            {uploading ? (
              <Spinner />
            ) : (
              <div className="flex flex-col items-center">
                <TiImage className="text-4xl text-black-medium-200" />
                <FaPlusCircle className="text-brand" />
              </div>
            )}
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;

import Image from "next/image";
import { useState, useRef } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { TiImage } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { uploadImage } from "../_lib/data-service";

const ImageUploader: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || selectedImages.length >= 3) return;

    setUploading(true);
    const uploadedUrl = await uploadImage(file);
    if (uploadedUrl) {
      setSelectedImages((prev) => [...prev, uploadedUrl]);
    }
    setUploading(false);
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
              width={500}
              height={500}
              src={image}
              alt={`Selected ${index + 1}`}
              className="w-full h-full object-cover"
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
              <span className="text-xs text-gray-500">Uploading...</span>
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

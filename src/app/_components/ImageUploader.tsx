import Image from "next/image";
import { FC, useState, useRef } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { TiImage } from "react-icons/ti";
import { MdDelete } from "react-icons/md"; // Import the delete icon

const ImageUploader: FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedImages.length < 3) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImages((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlaceholderClick = () => {
    if (selectedImages.length < 3) {
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
            className="relative w-40 h-40 border-2 border-solid border-black-medium-200 rounded-lg overflow-hidden group"
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
              <MdDelete className="text-3xl  text-red-500 transition-colors duration-200" />
            </div>
          </div>
        ))}

        {selectedImages.length < 3 && (
          <div
            className="group w-40 h-40 border-2 border-dashed border-black-medium-200 hover:border-black-secondary rounded-lg flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-200"
            onClick={handlePlaceholderClick}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="relative">
                <TiImage className="text-4xl text-black-medium-200 group-hover:text-black-secondary transition-all duration-200" />
                <FaPlusCircle className="text-lg text-brand absolute -top-2 -right-2 bg-white rounded-full" />
              </div>
            </div>
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

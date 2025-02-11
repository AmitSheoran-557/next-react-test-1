import React, { useState, ChangeEvent } from 'react';

interface ImageFile {
  url: string;
}

const MultiImage: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArr = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
      }));
      setImages((prevImages) => [...prevImages, ...fileArr]);
    }
  };

  return (
    <div className='py-20 text-white'>
      <label htmlFor="image" className='bg-black rounded-lg px-4 py-2 mb-4 mx-auto flex max-w-56 justify-center items-center text-white cursor-pointer text-3xl'>
        Upload Image
      </label>
      <input type="file" multiple onChange={handleFiles} id='image' hidden />
      <div className='mt-5 flex gap-4 flex-wrap max-w-[1140px] w-full mx-auto justify-center'>
        {images.map((item, index) => (
          <img className='max-w-80' key={index} src={item.url} alt={`selected-img-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default MultiImage;

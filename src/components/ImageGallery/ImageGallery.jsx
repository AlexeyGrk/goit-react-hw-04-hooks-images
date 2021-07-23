import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

import { Imagegallery } from "./ImageGallery.styled";

const ImageGallery = ({ images, handleLargeImages }) => {
  return (
    <Imagegallery>
      {images.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem key={id}>
            <img
              src={webformatURL}
              alt="photoAction"
              data-sorce={largeImageURL}
              onClick={handleLargeImages}
            />
          </ImageGalleryItem>
        );
      })}
    </Imagegallery>
  );
};

export default ImageGallery;

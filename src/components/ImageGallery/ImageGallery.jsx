import React, { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

import { Imagegallery } from "./ImageGallery.styled";

export class ImageGallery extends Component {
  render() {
    // console.log(this.props.images);
    return (
      <Imagegallery>
        {this.props.images.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem key={id}>
              <img
                src={webformatURL}
                alt="photoAction"
                data-sorce={largeImageURL}
                onClick={this.props.handleLargeImages}
              />
            </ImageGalleryItem>
          );
        })}
      </Imagegallery>
    );
  }
}

export default ImageGallery;

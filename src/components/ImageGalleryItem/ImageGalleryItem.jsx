import React, { Component } from "react";
import { ImageGalleryItemStyled } from "./ImageGalleryItem.styled";

export class ImageGalleryItem extends Component {
  render() {
    return (
      <ImageGalleryItemStyled>{this.props.children}</ImageGalleryItemStyled>
    );
  }
}

export default ImageGalleryItem;

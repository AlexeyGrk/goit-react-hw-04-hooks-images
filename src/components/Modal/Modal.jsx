import React, { Component } from "react";
import { ModalWindow, OverlayWindow } from "./Modal.styled";

export class Modal extends Component {
  render() {
    return (
      <OverlayWindow onClick={this.props.handleBackDropClick}>
        <ModalWindow>{this.props.children}</ModalWindow>
      </OverlayWindow>
    );
  }
}

export default Modal;

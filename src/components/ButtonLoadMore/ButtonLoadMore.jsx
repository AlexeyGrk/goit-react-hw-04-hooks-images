import React, { Component } from "react";
import { ButtonLMore, ButtonLMoreContainer } from "./ButtonLoadMore.styled";

export class ButtonLoadMore extends Component {
  render() {
    return (
      <>
        <ButtonLMoreContainer>
          <ButtonLMore onClick={this.props.handleNextPage}>
            Load More
          </ButtonLMore>
        </ButtonLMoreContainer>
      </>
    );
  }
}

export default ButtonLoadMore;

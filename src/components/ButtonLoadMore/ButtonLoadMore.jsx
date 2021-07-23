import React, { Component } from "react";
import { ButtonLMore, ButtonLMoreContainer } from "./ButtonLoadMore.styled";

export class ButtonLoadMore extends Component {
  render() {
    return (
      <>
        <ButtonLMoreContainer>
          <ButtonLMore onClick={this.props.handleNextPage}>
            {this.props.isLoading ? "Loading" : "Load More"}
          </ButtonLMore>
        </ButtonLMoreContainer>
      </>
    );
  }
}

export default ButtonLoadMore;

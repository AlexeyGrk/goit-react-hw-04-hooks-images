import React, { Component } from "react";
import SearchForm from "../SearchForm/SearchForm";

import { Searchbar } from "./SearchBar.styled";

export class SearchBar extends Component {
  state = {};

  render() {
    return (
      <Searchbar>
        <SearchForm
          handleInput={this.props.handleInputValue}
          getItemsGalleryImages={this.props.getItemsGalleryImages}
          resetPage={this.props.resetPage}
        ></SearchForm>
      </Searchbar>
    );
  }
}
export default SearchBar;

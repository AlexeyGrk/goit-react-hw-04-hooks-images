import React, { Component } from "react";
import {
  Searchform,
  SearchformButton,
  SearchformButtonLabel,
  SearchformInput,
} from "./SearchForm.styled";

export class SearchForm extends Component {
  render() {
    return (
      <Searchform onSubmit={this.props.handleInput}>
        {/* <Searchform onSubmit={this.props.resetPage}> */}
        <SearchformButton>
          <SearchformButtonLabel>Search</SearchformButtonLabel>
        </SearchformButton>

        <SearchformInput
          className="SearchForm-input"
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
          name="inputValue"
          // onChange={this.props.handleInput}
        ></SearchformInput>
      </Searchform>
    );
  }
}
export default SearchForm;

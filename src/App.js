import axios from "axios";
import React, { Component } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./App.css";
import ButtonLoadMore from "./components/ButtonLoadMore/ButtonLoadMore";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import StartMessage from "./components/StartMessage/StartMessage";
const controller = new AbortController();
const signal = controller.signal;
export class App extends Component {
  state = {
    inputValue: "",
    images: [],
    selectedImg: null,
    page: 1,
    isLoading: false,
    error: "",
    showModal: false,
  };

  componentDidMount() {
    this.handleKeyDown();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.inputValue !== this.state.inputValue) {
      this.resetPage();
    }

    if (prevState.page !== this.state.page) {
      if (this.state.inputValue !== "") {
        axios
          .get(
            `https://pixabay.com/api/?q=${this.state.inputValue}&page=${this.state.page}&key=21657672-6f26057767faea3bb550eec99&image_type=photo&orientation=horizontal&per_page=12`,
            { signal }
          )
          .then((response) =>
            this.setState((prevState) => ({
              images: [...prevState.images, ...response.data.hits],
              isLoading: false,
            }))
          )
          .catch((error) => this.setState({ error }))
          .finally(() => this.setState({ isLoading: false }));
      }
    }
  }
  componentWillMount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }
  handleKeyDown = (e) => {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        this.setState({
          showModal: false,
        });
      }
    });
  };
  getItemsGalleryImages = (e) => {
    e.preventDefault();
    if (this.state.inputValue === "") {
      return;
    }
    axios
      .get(
        `https://pixabay.com/api/?q=${this.state.inputValue}&page=${this.state.page}&key=21657672-6f26057767faea3bb550eec99&image_type=photo&orientation=horizontal&per_page=12`,
        { signal }
      )
      .then((response) =>
        this.setState({ images: response.data.hits, isLoading: false })
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));

    this.setState({
      isLoading: true,
    });
  };
  handleInputValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  resetPage = () => {
    this.setState({
      page: 1,
    });
  };

  handleNextPage = () => {
    this.setState({
      page: this.state.page + 1,
    });

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 300);
  };
  handleLargeImages = (e) => {
    if (e.target.nodeName === "IMG") {
      this.setState((prevState) => ({
        showModal: !prevState.showModal,
        selectedImg: e.target.dataset.sorce,
      }));
    }
  };
  handleBackDropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.setState({
        showModal: false,
      });
    }
  };
  scrollTo = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  render() {
    const { isLoading, images, selectedImg, error, showModal } = this.state;
    return (
      <div className="App">
        <SearchBar
          handleInputValue={this.handleInputValue}
          getItemsGalleryImages={this.getItemsGalleryImages}
        />

        {isLoading ? (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
            style={{ display: "flex", justifyContent: "center" }}
          />
        ) : (
          <ImageGallery
            images={images}
            handleLargeImages={this.handleLargeImages}
            selectedImg={selectedImg}
          ></ImageGallery>
        )}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {(images.length > 0 && (
          <ButtonLoadMore handleNextPage={this.handleNextPage} />
        )) || <StartMessage />}
        {showModal && (
          <Modal handleBackDropClick={this.handleBackDropClick}>
            <img src={selectedImg} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;

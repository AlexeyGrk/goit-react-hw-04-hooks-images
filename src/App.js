import axios from "axios";
import { useState, useEffect } from "react";
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
let timer;

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const scrollTo = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  const handleBackDropClick = (e) => {
    if (e.currentTarget === e.target) {
      setShowModal(false);
    }
  };

  const handleLargeImages = (e) => {
    if (e.target.nodeName === "IMG") {
      setShowModal(!showModal);
      setSelectedImg(e.target.dataset.sorce);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);

    timer = setTimeout(() => {
      scrollTo();
    }, 300);
  };
  const resetPage = (e) => {
    setImages([]);

    setPage(1);
    clearTimeout(timer);
  };

  const handleInputValue = (e) => {
    e.preventDefault();

    setInputValue(e.target.elements.inputValue.value);
    resetPage();
  };
  const handleKeyDown = (e) => {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        setShowModal(false);
      }
    });
  };

  // async function fetchGalleryImages(page) {
  //   const response = await axios.get(
  //     `https://pixabay.com/api/?q=${inputValue}&page=${page}&key=21657672-6f26057767faea3bb550eec99&image_type=photo&orientation=horizontal&per_page=12`,
  //     { signal }
  //   );
  //   return response;
  // }
  // const getItemsGalleryImages = (e) => {
  //   if (inputValue === "") {
  //     return;
  //   }

  //   axios
  //     .get(
  //       `https://pixabay.com/api/?q=${inputValue}&page=${page}&key=21657672-6f26057767faea3bb550eec99&image_type=photo&orientation=horizontal&per_page=12`,
  //       { signal }
  //     )
  //     .then(
  //       (response) => setImages((state) => [...state, ...response.data.hits]),

  //       setIsLoading(false)
  //     )
  //     .catch((error) => setError({ error }))
  //     .finally(() => setIsLoading(false));

  //   setIsLoading(true);
  // };

  useEffect(() => {
    if (inputValue === "") {
      return;
    }

    const getItemsGalleryImages = () => {
      axios
        .get(
          `https://pixabay.com/api/?q=${inputValue}&page=${page}&key=21657672-6f26057767faea3bb550eec99&image_type=photo&orientation=horizontal&per_page=12`,
          { signal }
        )
        .then(
          (response) => setImages((state) => [...state, ...response.data.hits]),

          setIsLoading(false)
        )
        .catch((error) => setError({ error }))
        .finally(() => setIsLoading(false));

      setIsLoading(true);
    };

    getItemsGalleryImages();
    handleKeyDown();
  }, [inputValue, page]);

  return (
    <div className="App">
      <SearchBar handleInputValue={handleInputValue} resetPage={resetPage} />

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
          handleLargeImages={handleLargeImages}
          selectedImg={selectedImg}
        ></ImageGallery>
      )}
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {(images.length > 0 && (
        <ButtonLoadMore handleNextPage={handleNextPage} />
      )) || <StartMessage />}
      {showModal && (
        <Modal handleBackDropClick={handleBackDropClick}>
          <img src={selectedImg} alt="" />
        </Modal>
      )}
    </div>
  );
};

export default App;

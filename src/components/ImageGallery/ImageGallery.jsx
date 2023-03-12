import { useState } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { getImages } from 'components/API/getImages';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

import styles from 'styles.module.css';
import { Modal } from 'components/Modal/Modal';
import { useEffect } from 'react';

const defaultStateData = {
  images: [],
  loading: false,
  error: null,
  page: 1,
  modalOpen: false,
  search: '',
  modalContent: {
    largeImageURL: '',
    tags: '',
  },
};

const modalInitialState = {
  largeImageURL: '',
  tags: '',
};

export const ImageGallery = ({ value }) => {
  const [images, setImages] = useState(defaultStateData.images);
  const [loading, setLoading] = useState(defaultStateData.loading);
  const [error, setError] = useState(defaultStateData.error);
  const [search, setSearch] = useState(defaultStateData.search);
  const [page, setPage] = useState(defaultStateData.page);
  const [modalOpen, setModalOpen] = useState(defaultStateData.modalOpen);
  const [modalContent, setModalContent] = useState(
    defaultStateData.modalContent
  );

  const settingState = (data, isNewData = true) => {
    setImages(prevState => [...(!isNewData ? prevState : []), ...data]);
    setPage(prevState => ++prevState);
    if (!data.hits.length) {
      toast.error(`Oooops... No information for your request ${value}`);
    }
  };

  const requestImages = (value, isNewData, page) => {
    setLoading({ loading: true });
    getImages(value.trim(), page)
      .then(response => response.json())
      .then(data => {
        settingState(data.hits, isNewData);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  const handleLoad = () => {
    requestImages(value, false, page);
  };

  const openModal = modalContent => {
    setModalOpen(true);
    setModalContent(modalContent);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(defaultStateData.modalContent);
  };

  const setDefaultData = searchValue => {
    setError(defaultStateData.error);
    setSearch(searchValue);
    setImages(defaultStateData.images);
    setPage(defaultStateData.page);
    setModalOpen(defaultStateData.modalOpen);
    setModalContent({ ...defaultStateData.modalContent });
  };

  useEffect(() => {
    if (search !== value) {
      setDefaultData(value);
      setSearch(value);
      requestImages(value, true, defaultStateData.page);
    }
  }, [value]);

  return (
    <>
      {modalOpen && (
        <Modal close={closeModal}>
          <img src={modalContent.largeImageURL} alt={modalContent.tags}></img>
        </Modal>
      )}

      {loading && <Loader />}
      <ul className={styles.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              onClick={() => openModal({ largeImageURL, tags })}
            />
          );
        })}
      </ul>

      {images.length ? <Button onClick={handleLoad} /> : <></>}
    </>
  );
};

ImageGallery.defaultProps = {
  images: [],
};

ImageGallery.protoTypes = {
  value: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

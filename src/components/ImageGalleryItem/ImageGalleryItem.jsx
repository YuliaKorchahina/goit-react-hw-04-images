import PropTypes from 'prop-types';
import styles from 'styles.module.css';

export const ImageGalleryItem = ({ webformatURL, onClick, tags }) => {
  return (
    <>
      <li onClick={onClick} className={styles.ImageGalleryItem}>
        <img
          className={styles.ImageGalleryItem_image}
          src={webformatURL}
          alt={tags}
        />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

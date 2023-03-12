import { useState } from 'react';

import { Toaster } from 'react-hot-toast';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App =() => {
  const [search, setSearch] = useState('');
  // const [page, setPage] = useState(1)
  

  const handleSubmit = search => {
    setSearch( search )
  };

     return (
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
          }}
        />
        <Searchbar onSearch={handleSubmit} />
        <ImageGallery value={search} />
      </div>
    );
  }


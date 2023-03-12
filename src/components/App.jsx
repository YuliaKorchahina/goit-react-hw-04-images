import { Component } from 'react';

import { Toaster } from 'react-hot-toast';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    search: '',
    page: 1,
  };

  handleSubmit = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    return (
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
          }}
        />
        <Searchbar onSearch={this.handleSubmit} />
        <ImageGallery value={search} />
      </div>
    );
  }
}

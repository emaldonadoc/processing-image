import { buildCropper } from './cropper';
import './style.css';

import { buildButtons } from './buttons';

export default ({
  container,
  imgUrl,
  saveCallback,
}) => {
  const imageContainer = document.createElement('DIV');
  imageContainer.className = 'image-container';
  const img = document.createElement('IMG');
  img.src = imgUrl;
  img.id = 'app';
  img.onload = (e) => {
    console.log('Image has been loaded', e);
    buildCropper('app');
    buildButtons(imageContainer, saveCallback);
  };
  imageContainer.appendChild(img);
  document.querySelector(container).appendChild(imageContainer);
};

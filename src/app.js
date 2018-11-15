import { buildCropper } from './cropper';
import './style.css';

import { buildButtons } from './buttons';

export default ({ imgUrl, saveCallback, deleteCallback }) => {
  const imageContainer = document.createElement('DIV');
  imageContainer.className = 'image-container';
  const img = document.createElement('IMG');
  img.src = imgUrl;
  img.id = 'app';
  imageContainer.appendChild(img);
  document.body.appendChild(imageContainer);

  buildCropper('app');
  buildButtons(imageContainer);
};

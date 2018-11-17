import './style.css';
import { buildCropper } from './cropper';

import { buildButtons } from './buttons';

const urlToB64Data = (url, imgToRender) => {
  const canvas = document.createElement('CANVAS');
  const img = document.createElement('IMG');
  img.setAttribute('crossorigin', 'anonymous');
  img.src = `https://cors-anywhere.herokuapp.com/${url}`;
  img.onload = () => {
    canvas.height = img.height;
    canvas.width = img.width;
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    imgToRender.src = canvas.toDataURL('image/png');
  };
};

export default ({
  container,
  imgUrl,
  saveCallback,
}) => {
  const imageContainer = document.createElement('DIV');
  imageContainer.className = 'image-container';
  const img = document.createElement('IMG');
  img.id = 'app';

  urlToB64Data(imgUrl, img);
  img.onload = () => {
    buildCropper('app');
    buildButtons(imageContainer, saveCallback);
  };
  imageContainer.appendChild(img);
  document.querySelector(container).appendChild(imageContainer);
};

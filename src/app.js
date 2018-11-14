import Cropper from 'cropperjs';
import './style.css';

import { buildButtons } from './buttons';

window.onload = () => {
  console.log('page has been loaded');
  const image = document.getElementById('app');
  const cropper = new Cropper(image, { aspectRatio: 16 / 9 });

  const container = document.querySelector('.image-container');
  buildButtons(container, cropper);
};
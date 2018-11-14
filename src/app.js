import { buildCropper } from './cropper';
import './style.css';

import { buildButtons } from './buttons';

window.onload = () => {
  console.log('page has been loaded');
  buildCropper('app');
  const container = document.querySelector('.image-container');
  buildButtons(container);
};
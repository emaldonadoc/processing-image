import { buildCropper } from '../cropper';
import { buildButtons } from '../buttons';

const urlToB64Data = (url, imgToRender) => {
  const canvas = document.createElement('CANVAS');
  const img = document.createElement('IMG');
  img.src = url;
  img.onload = () => {
    canvas.height = img.height;
    canvas.width = img.width;
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    imgToRender.src = canvas.toDataURL('image/png');
  };
};

const loadFirebaseImage = (imgUrl, saveCallback) => {
  const loader = document.createElement('DIV');
  loader.className = 'loader';
  const imageContainer = document.createElement('DIV');
  imageContainer.className = 'image-container';
  imageContainer.appendChild(loader);

  const img = document.createElement('IMG');
  img.id = 'app';

  urlToB64Data(imgUrl, img);
  img.onload = () => {
    loader.parentElement.removeChild(loader);
    buildCropper('app');
    buildButtons(imageContainer, saveCallback);
  };

  imageContainer.appendChild(img);
  return imageContainer;
};

const toggleModal = () => {
  document.querySelector('.modal').classList.toggle('show-modal');
};

const closeButton = () => {
  const button = document.createElement('DIV');
  button.className = 'close-button';
  button.innerText = 'x';
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleModal();
    const modal = document.querySelector('.modal');
    modal.parentElement.removeChild(modal);
  });
  return button;
};

const title = () => {
  const t = document.createElement('H3');
  t.innerText = 'Edición de Imagen';
  return t;
};

const modalContent = (imgUrl, saveCallback) => {
  const content = document.createElement('DIV');
  content.className = 'modal-content';
  content.appendChild(closeButton());
  content.appendChild(title());
  content.appendChild(loadFirebaseImage(imgUrl, saveCallback));
  return content;
};

export default ({ container, imgUrl, saveCallback }) => {
  const modalContainer = document.createElement('DIV');
  modalContainer.className = 'modal';
  modalContainer.appendChild(modalContent(imgUrl, saveCallback));
  document.querySelector(container).appendChild(modalContainer);
  toggleModal();
};

import {
  rotateCropper,
  getCroppedB64FromCanvas,
  destroyCropper,
  buildCropper,
} from '../cropper';

const fontAwesomeMap = {
  'rotate-right-button': 'repeat',
  'rotate-left-button': 'undo',
  'crop-button': 'crop',
};

const singleButton = (id) => {
  const button = document.createElement('DIV');
  button.className = 'edition-button';
  button.id = id;
  const i = document.createElement('I');
  i.classList.add('fa');
  i.classList.add(`fa-${fontAwesomeMap[id]}`);
  button.appendChild(i);
  return button;
};

const rotateRightButton = () => {
  const rightButton = singleButton('rotate-right-button');
  rightButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    rotateCropper(45);
  });
  return rightButton;
};

const rotateLeftButton = () => {
  const leftButton = singleButton('rotate-left-button');
  leftButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    rotateCropper(-45);
  });
  return leftButton;
};

const cropButton = () => {
  const save = singleButton('crop-button');
  save.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('app').src = getCroppedB64FromCanvas();
    destroyCropper();
    buildCropper('app');
  });
  return save;
};

export const buildButtons = (container) => {
  const buttonsContainer = document.createElement('DIV');
  buttonsContainer.className = 'buttons-edition-container';
  buttonsContainer.appendChild(rotateLeftButton());
  buttonsContainer.appendChild(rotateRightButton());
  buttonsContainer.appendChild(cropButton());
  container.prepend(buttonsContainer);
};

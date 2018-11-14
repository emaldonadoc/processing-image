import { getCropper, destroyCropper, buildCropper } from '../cropper';

const singleButton = (value, id) => {
  const button = document.createElement('INPUT');
  button.value = value;
  button.className = 'edition-button';
  button.id = id;
  button.type = 'button';
  return button;
};

const rotateRightButton = () => {
  const rightButton = singleButton('Rotate Right', 'rotate-right-button');
  rightButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    getCropper().rotate(45);
  });
  return rightButton;
};

const rotateLeftButton = () => {
  const leftButton = singleButton('Rotate Left', 'rotate-left-button');
  leftButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    getCropper().rotate(-45);
  });
  return leftButton;
};

const cropButton = () => {
  const save = singleButton('Crop', 'crop-button');
  save.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = getCropper().getCroppedCanvas();
    document.getElementById('app').src = data.toDataURL();
    destroyCropper();
    buildCropper('app');
  });
  return save;
};

export const buildButtons = (container) => {
  const buttonsContainer = document.createElement('DIV');
  buttonsContainer.className = 'buttons-container';
  buttonsContainer.appendChild(rotateRightButton());
  buttonsContainer.appendChild(rotateLeftButton());
  buttonsContainer.appendChild(cropButton());
  container.appendChild(buttonsContainer);
};

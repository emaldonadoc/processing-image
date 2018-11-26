import {
  rotateCropper,
  getCroppedB64FromCanvas,
  destroyCropper,
  buildCropper,
} from '../cropper';

const fontAwesomeMap = {
  'rotate-right-button': {
    icon: 'repeat',
    text: '+45°',
  },
  'rotate-left-button': {
    icon: 'undo',
    text: '-45°',
  },
  'crop-button': {
    icon: 'crop',
    text: 'cortar',
  },
  'save-button': {
    icon: 'check',
    text: 'finalizar',
  },
};

const singleButton = (id) => {
  const button = document.createElement('DIV');
  button.className = 'edition-button';
  button.id = id;
  const i = document.createElement('I');
  i.classList.add('fa');
  i.classList.add(`fa-${fontAwesomeMap[id].icon}`);
  const p = document.createElement('P');
  p.style.fontSize = '15px';
  p.style.position = 'absolute';
  p.style.padding = '0';
  p.style.margin = '7px 0 0 0';
  p.innerText = fontAwesomeMap[id].text;
  i.appendChild(p);
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
  const crop = singleButton('crop-button');
  crop.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('app').src = getCroppedB64FromCanvas();
    destroyCropper();
    buildCropper('app');
  });
  return crop;
};

const saveButton = (saveCallback) => {
  const save = singleButton('save-button');
  save.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const b64ImageCrooped = getCroppedB64FromCanvas();
    saveCallback(b64ImageCrooped);
  });
  return save;
};

const editionButtons = () => {
  const editionButtonsContainer = document.createElement('DIV');
  editionButtonsContainer.className = 'edition-buttons-container';
  editionButtonsContainer.appendChild(rotateLeftButton());
  editionButtonsContainer.appendChild(rotateRightButton());
  editionButtonsContainer.appendChild(cropButton());
  return editionButtonsContainer;
};

const actionsButton = (saveCallback) => {
  const actionsButtonsContainer = document.createElement('DIV');
  actionsButtonsContainer.className = 'action-buttons-container';
  actionsButtonsContainer.appendChild(saveButton(saveCallback));
  return actionsButtonsContainer;
};

export const buildButtons = (container, saveCallback) => {
  container.prepend(editionButtons());
  container.appendChild(actionsButton(saveCallback));
};

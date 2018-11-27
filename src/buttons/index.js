import {
  rotateCropper,
  getCroppedB64FromCanvas,
  destroyCropper,
  buildCropper,
} from '../cropper';

const iconsTextButtonsMap = {
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
  'finish-button': {
    icon: 'check',
    text: 'finalizar',
  },
  'cancel-button': {
    icon: 'close',
    text: 'no',
  },
  'save-button': {
    icon: 'save',
    text: 'si',
  },
};

let globalContainer;
let globalsaveCallback;

const singleButton = (id) => {
  const button = document.createElement('DIV');
  button.className = 'edition-button';
  button.id = id;
  const i = document.createElement('I');
  i.classList.add('fa');
  i.classList.add(`fa-${iconsTextButtonsMap[id].icon}`);
  const p = document.createElement('P');
  p.style.fontSize = '15px';
  p.style.position = 'absolute';
  p.style.padding = '0';
  p.style.margin = '7px 0 0 0';
  p.innerText = iconsTextButtonsMap[id].text;
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
    document.querySelector('#finish-button').style.display = 'block';
    document.getElementById('app').src = getCroppedB64FromCanvas();
    destroyCropper();
    buildCropper('app');
  });
  return crop;
};

const cancelButton = () => {
  const cancel = singleButton('cancel-button');
  cancel.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    buildCropper('app');
    document.querySelector('.modal-title').innerText = 'Edición de Imagen';
    document.querySelector('.edition-buttons-container').style.display = 'block';
    const savingContainer = document.querySelector('.saving-container');
    savingContainer.parentElement.removeChild(savingContainer);
  });
  return cancel;
};

const saveButton = () => {
  const save = singleButton('save-button');
  save.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    globalsaveCallback(document.querySelector('#app').src);
  });
  return save;
};

const savingButtons = () => {
  const savingButtonsContainer = document.createElement('DIV');
  savingButtonsContainer.className = 'saving-buttons-container';
  savingButtonsContainer.appendChild(cancelButton());
  savingButtonsContainer.appendChild(saveButton());

  return savingButtonsContainer;
};

const savingContainerBuilder = () => {
  const savingContainer = document.createElement('DIV');
  savingContainer.className = 'saving-container';
  const text = document.createElement('DIV');
  text.className = 'saving-message';
  text.innerText = '¿Esta seguro de guardar esta imagen?';
  savingContainer.appendChild(text);
  savingContainer.appendChild(savingButtons());
  globalContainer.appendChild(savingContainer);
};

const finishEditionButton = () => {
  const finish = singleButton('finish-button');
  finish.style.display = 'none';
  finish.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector('.edition-buttons-container').style.display = 'none';
    document.querySelector('.modal-title').innerText = 'Preview';
    destroyCropper();
    savingContainerBuilder();
  });
  return finish;
};

const editionButtons = () => {
  const editionButtonsContainer = document.createElement('DIV');
  editionButtonsContainer.className = 'edition-buttons-container';
  editionButtonsContainer.appendChild(rotateLeftButton());
  editionButtonsContainer.appendChild(rotateRightButton());
  editionButtonsContainer.appendChild(cropButton());
  editionButtonsContainer.appendChild(finishEditionButton());
  return editionButtonsContainer;
};

export const buildButtons = (container, saveCallback) => {
  globalContainer = container;
  globalsaveCallback = saveCallback;
  globalContainer.prepend(editionButtons(saveCallback));
};

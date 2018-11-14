/* eslint-disable import/prefer-default-export */
const singleButton = (value, id) => {
  const button = document.createElement('INPUT');
  button.value = value;
  button.className = 'edition-button';
  button.id = id;
  button.type = 'button';
  return button;
};

const rotateRightButton = (cropper) => {
  const rightButton = singleButton('Rotate Right', 'rotate-right-button');
  rightButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    cropper.rotate(45);
  });
  return rightButton;
};

const rotateLeftButton = (cropper) => {
  const leftButton = singleButton('Rotate Left', 'rotate-left-button');
  leftButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    cropper.rotate(-45);
  });
  return leftButton;
};

const saveButton = (cropper) => {
  const save = singleButton('Save', 'save-button');
  save.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = cropper.getCroppedCanvas();
    console.log('cropped canvas', data.toDataURL());
  });
  return save;
};

export const buildButtons = (container, cropper) => {
  const buttonsContainer = document.createElement('DIV');
  buttonsContainer.className = 'buttons-container';
  buttonsContainer.appendChild(rotateRightButton(cropper));
  buttonsContainer.appendChild(rotateLeftButton(cropper));
  buttonsContainer.appendChild(saveButton(cropper));
  container.appendChild(buttonsContainer);
};

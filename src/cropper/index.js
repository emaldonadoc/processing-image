import Cropper from 'cropperjs';

let cropper = null;

export const getCropper = () => cropper;

export const destroyCropper = () => {
  cropper.destroy();
};

export const buildCropper = (id) => {
  cropper = new Cropper(document.getElementById(id), { aspectRatio: 16 / 9 });
};

import Cropper from 'cropperjs';

let cropper = null;

export const getCroppedB64FromCanvas = () => cropper.getCroppedCanvas().toDataURL();

export const rotateCropper = grades => cropper.rotate(grades);

export const destroyCropper = () => {
  cropper.destroy();
};

export const buildCropper = (id) => {
  cropper = new Cropper(document.getElementById(id));
};

import { buildButtons } from '../src/buttons';
import * as cropper from '../src/cropper';

jest.mock('../src/cropper', () => ({
  rotateCropper: jest.fn(),
  destroyCropper: jest.fn(),
  buildCropper: jest.fn(),
  getCroppedB64FromCanvas: jest.fn(() => 'base64:dataimage'),
}));

const saveCallback = jest.fn();

describe('Edition image buttons', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    const container = document.createElement('DIV');
    container.id = 'container';
    document.body.appendChild(container);
    buildButtons(container, saveCallback);
  });

  afterEach(() => {
    cropper.rotateCropper.mockClear();
    cropper.destroyCropper.mockClear();
    cropper.buildCropper.mockClear();
    cropper.getCroppedB64FromCanvas.mockClear();
  });

  it('Should render edition buttons', () => {
    const editionButtons = document.querySelectorAll('.edition-buttons-container > .edition-button');
    expect(editionButtons.length).toBe(4);
  });

  it('Should Call cropper.rotate on click rotateRightButton', () => {
    document.querySelector('#rotate-right-button').click();
    expect(cropper.rotateCropper).toHaveBeenCalledTimes(1);
  });

  it('Should Call cropper rotate on click rotateLeftButton', () => {
    document.querySelector('#rotate-left-button').click();
    expect(cropper.rotateCropper).toHaveBeenCalledTimes(1);
  });

  it('Should Call getCroppedB64FromCanvas, destroy and build a new cropper', () => {
    const img = document.createElement('IMG');
    img.id = 'app';
    document.body.appendChild(img);
    document.querySelector('#crop-button').click();
    expect(cropper.getCroppedB64FromCanvas).toHaveBeenCalledTimes(1);
    expect(cropper.destroyCropper).toHaveBeenCalledTimes(1);
    expect(cropper.buildCropper).toHaveBeenCalledTimes(1);
    expect(img.src).toBe('base64:dataimage');
  });

  it('Should Change modal title, hide buttons and create saving-container', () => {
    const title = document.createElement('DIV');
    title.className = 'modal-title';
    document.body.appendChild(title);

    document.querySelector('#finish-button').click();

    expect(title.innerText).toBe('Preview');
    expect(document.querySelector('.edition-buttons-container').style.display)
      .toBe('none');
    expect(cropper.destroyCropper).toHaveBeenCalledTimes(1);
    expect(document.querySelector('.saving-container')).not.toBe(null);
  });

  it('Should call saveCallback on save-button click', () => {
    const title = document.createElement('DIV');
    title.className = 'modal-title';
    const img = document.createElement('IMG');
    img.id = 'app';
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEU';
    document.body.appendChild(title);
    document.body.appendChild(img);

    document.querySelector('#finish-button').click();
    document.querySelector('#save-button').click();

    expect(saveCallback).toHaveBeenCalledTimes(1);
  });

  it('Should build cropper, return title, remove saving-container and show buttons on cancel click', () => {
    const title = document.createElement('DIV');
    title.className = 'modal-title';
    const img = document.createElement('IMG');
    img.id = 'app';
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEU';
    document.body.appendChild(title);
    document.body.appendChild(img);

    document.querySelector('#finish-button').click();
    document.querySelector('#cancel-button').click();

    expect(title.innerText).toBe('Edición de Imagen');
    expect(document.querySelector('.edition-buttons-container').style.display).toBe('block');
    expect(cropper.buildCropper).toHaveBeenCalledTimes(1);
    expect(document.querySelector('.saving-container')).toBe(null);
  });
});

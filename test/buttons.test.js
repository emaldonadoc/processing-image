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
    const actionButtons = document.querySelectorAll('.action-buttons-container > .edition-button');
    expect(editionButtons.length).toBe(3);
    expect(actionButtons.length).toBe(1);
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

  it('Should call saveCallback on click on save', () => {
    document.querySelector('#save-button').click();
    expect(cropper.getCroppedB64FromCanvas).toHaveBeenCalledTimes(1);
    expect(saveCallback).toHaveBeenCalledTimes(1);
  });
});

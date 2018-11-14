import { buildButtons } from '../../src/buttons';
import * as cropper from '../../src/cropper';

jest.mock('../../src/cropper', () => ({
  rotateCropper: jest.fn(),
  destroyCropper: jest.fn(),
  buildCropper: jest.fn(),
  getCroppedB64FromCanvas: jest.fn(() => 'base64:dataimage'),
}));

describe('Edition image buttons', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    const container = document.createElement('DIV');
    container.id = 'container';
    document.body.appendChild(container);
    buildButtons(container);
  });

  afterEach(() => {
    cropper.rotateCropper.mockClear();
    cropper.destroyCropper.mockClear();
    cropper.buildCropper.mockClear();
    cropper.getCroppedB64FromCanvas.mockClear();
  });

  it('Should render edition buttons', () => {
    const buttons = document.querySelectorAll('input[type="button"]');
    expect(buttons.length).toBe(3);
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
});

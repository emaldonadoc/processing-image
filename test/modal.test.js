import modal from '../src/modal';
import * as cropper from '../src/cropper';

jest.mock('../src/cropper', () => ({
  rotateCropper: jest.fn(),
  destroyCropper: jest.fn(),
  buildCropper: jest.fn(),
  getCroppedB64FromCanvas: jest.fn(() => 'base64:dataimage'),
}));

describe('Modal builder', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    const modalContainer = document.createElement('DIV');
    modalContainer.id = 'app';
    document.body.appendChild(modalContainer);
  });

  it('Should render modal elements', () => {
    const options = {
      container: '#app',
      imgUrl: 'imgUrl',
      saveCallback: () => { },
    };

    modal(options);

    const modalElement = document.querySelector('.modal');
    expect(modalElement.className).toBe('modal show-modal');
    expect(modalElement).not.toBe(null);
    const modalContent = modalElement.childNodes[0];
    expect(modalContent.className).toBe('modal-content');
    expect(modalContent.childNodes.length).toBe(3);
    const contentChild = modalContent.childNodes;
    expect(contentChild[0].innerText).toBe('x');
    expect(contentChild[1].innerText).toBe('Edición de Imagen');
    expect(contentChild[2].innerHTML).toBe('<div class="loader"></div><img id="app" crossorigin="anonymous">');
  });

  it('On Close button delete modal container', () => {
    
  });
});

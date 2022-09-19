import modal from './hbs/modal.hbs'
const refs = {
  mainContainerEl: document.querySelector('.js-container'),
  closeModalBtnEl: document.querySelector('[data-close-modal]'),
  forLazyLoadEl: document.querySelector('.js-low-div'),
  modalEl: document.querySelector('.js-backdrop'),
  modalContentEl: document.querySelector('.js-modal-content'),
  bodyEl: document.body
};
let {
  mainContainerEl,
  closeModalBtnEl,
  forLazyLoadEl,
  modalEl,
  modalContentEl,
  bodyEl,
} = refs;

function onBackdropClick(event) {
  let { target, currentTarget } = event;
  if (target === currentTarget) {
    closeModal();
  }
}
function toggleModal() {
  modalEl.classList.toggle('is-hidden');
  bodyEl.classList.toggle('--notScrolled');
  modalEl.addEventListener('click', onBackdropClick);
}
function closeModal() {
  modalEl.classList.toggle('is-hidden');
  bodyEl.classList.remove('--notScrolled');
  if (modalEl.classList.contains('is-hidden')) {
    modalNameEl.innerHTML = '';
    modalContentEl.innerHTML = '';
    modalContentEl.classList.remove('--emptyCartContent');
    modalEl.removeEventListener('click', onBackdropClick);
    closeModalBtnEl.removeEventListener('click', closeModal)

  }
}
closeModalBtnEl.addEventListener('click', closeModal)
modalEl.addEventListener('click', onBackdropClick)


console.log(mainContainerEl);
console.log(closeModalBtnEl);
console.log(forLazyLoadEl);
console.log(modalEl);
console.log(modalContentEl);
console.log(bodyEl);

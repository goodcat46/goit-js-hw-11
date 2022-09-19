// import modal from './hbs/modal.hbs';

const refs = {
  mainContainerEl: document.querySelector('.js-container'),
  closeModalBtnEl: document.querySelector('[data-close-modal]'),
  forLazyLoadEl: document.querySelector('.js-low-div'),
  modalEl: document.querySelector('.js-backdrop'),
  modalNameEl: document.querySelector('.js-modal-name'),
  modalContentEl: document.querySelector('.js-modal-content'),
  formEl: document.querySelector('.form'),
  formInputEl: document.querySelector('.form-input'),
  formBtnEl: document.querySelector('.--form-btn'),
  photoListEl: document.querySelector('.photo-list'),
  bodyEl: document.body,
};
let {
  mainContainerEl,
  closeModalBtnEl,
  formEl,
  formInputEl,
  formBtnEl,
  photoListEl,
  forLazyLoadEl,
  modalNameEl,
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
    modalEl.removeEventListener('click', onBackdropClick);
    closeModalBtnEl.removeEventListener('click', closeModal);
  }
}
closeModalBtnEl.addEventListener('click', closeModal);
modalEl.addEventListener('click', onBackdropClick);

function makeGalleryCard(el) {
  let {} = el;
  return `
<div class="photo-list">
  <div class="card">
    <!-- <img src="" alt=""> -->
    <div class="card-bottom">
      <div class="col-title">Views</div>
      <div class="col-text"></div>
      <div class="col-title">Likes</div>
      <div class="col-text"></div>
      <div class="col-title">Comments</div>
      <div class="col-text"></div>
      <div class="col-title">Downloads</div>
      <div class="col-text"></div>
    </div>
  </div>
</div>`;
}
function makeGallery(arr){
  return arr.map(el=>makeGalleryCard(el)).join('')
}
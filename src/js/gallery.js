import { PixabayApi } from './api';
// import createGalleryCards from '../templates/gallery-card.hbs';
import Notiflix from 'notiflix';
import makeGalleryCards from '../hbs/makeGalleryCards.hbs';

const refs = {
  mainContainerEl: document.querySelector('.js-container'),
  modalEl: document.querySelector('.js-backdrop'),
  modalNameEl: document.querySelector('.js-modal-name'),
  modalContentEl: document.querySelector('.js-modal-content'),
  closeModalBtnEl: document.querySelector('[data-close-modal]'),
  forLazyLoadEl: document.querySelector('.js-low-div'),
  searchFormEl: document.querySelector('.form'),
  formInputEl: document.querySelector('.form-input'),
  formBtnEl: document.querySelector('.--form-btn'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.js-load-more'),
  bodyEl: document.body,
};
let {
  mainContainerEl,
  closeModalBtnEl,
  searchFormEl,
  formInputEl,
  formBtnEl,
  galleryEl,
  forLazyLoadEl,
  modalNameEl,
  modalEl,
  modalContentEl,
  loadMoreBtnEl,
  bodyEl,
} = refs;
console.log(refs);
const pixabayApi = new PixabayApi();

const onLoadMoreBtnElClick = async event => {
  // Варіант через async/await
  try {
    pixabayApi.page += 1;

    const { data } = await pixabayApi.fetchPhotosByQuery();

    // galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(data));

    if (pixabayApi.page >= data.totalHits / pixabayApi.per_page + 1) {
      loadMoreBtnEl.classList.add('is-hidden');
      loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnElClick);
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    galleryEl.insertAdjacentHTML('beforeend',makeGalleryCards(data.hits))
  } catch (err) {
    console.log(err);
  }
};

const onSearchsearchFormElSubmit = async event => {
  event.preventDefault();
  //* зчитую інпут
  pixabayApi.searchQuery = formInputEl.value;
  //* скидую лічильник
  pixabayApi.page = 1;
  //* ховаю кнопку
  loadMoreBtnEl.classList.add('is-hidden');

  // *Варіант через async/await
  try {
    const { data } = await pixabayApi.fetchPhotosByQuery();

    if (pixabayApi.page >= data.totalHits / pixabayApi.per_page + 1) {
      //* очищаю галрею
      galleryEl.innerHTML = '';
      //* виводжу повідомлення про кінець запитів
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }

    if (data.totalHits === 0) {
      //* очищаю галрею
      galleryEl.innerHTML = '';
      //* виводжу повідомлення про невдачу
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    //* малюю галерею
    galleryEl.innerHTML = makeGalleryCards(data.hits);
    //* показую кнопку
    loadMoreBtnEl.classList.remove('is-hidden');
    //* додаю слухач подій на кнопку
    loadMoreBtnEl.addEventListener('click', onLoadMoreBtnElClick);
  } catch (err) {
    // помилка піде у лог
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSearchsearchFormElSubmit);
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
function makeGallery(arr) {
  return arr.map(el => makeGalleryCard(el)).join('');
}

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

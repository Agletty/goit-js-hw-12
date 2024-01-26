import axios from 'axios';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import API_KEY from './servises/pixabayApi.js';

const BASE_URL = 'https://pixabay.com/api/';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('[name="query"]');
const galleryCards = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentPage;
let currentSearchQuery = '';

const modalSimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

hideLoader();
hideLoadMoreBtn();

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();
  const searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    return;
  }

  clearGallery();
  hideLoadMoreBtn();

  currentSearchQuery = searchQuery;
  currentPage = 1;

  await performSearch();
}

async function handleLoadMore() {
  currentPage += 1;
  await performSearch(true);
  scrollToNewImages();
}

async function performSearch() {
  showLoader();

  const url = `${BASE_URL}?key=${API_KEY}&q=${currentSearchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`;

  try {
    const response = await axios.get(url);

    if (response.data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      createGalleryMarkup(response.data.hits);

      const totalHits = response.data.totalHits;
      const perPage = response.data.hits.length;
      const imagesLoaded = currentPage * perPage;

      if (imagesLoaded >= totalHits) {
        hideLoadMoreBtn();
        iziToast.info({
          title: 'End of results',
          message: 'We’re sorry, but you’ve reached the end of search results.',
        });
      } else {
        showLoadMoreBtn();
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
    searchInput.value = '';
  }
}

function createGalleryMarkup(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <div class="photo-card">
        <a href="${largeImageURL}" data-lightbox="gallery" data-title="${tags}">
          <img
            class="photo-card__img"
            src="${webformatURL}"
            alt="${tags}"
            loading="lazy"
            width="320"
            height="212"
          />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes:</b> <span>${likes}</span>
          </p>
          <p class="info-item">
            <b>Views:</b> <span>${views}</span>
          </p>
          <p class="info-item">
            <b>Comments:</b> <span>${comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads:</b> <span>${downloads}</span>
          </p>
        </div>
      </div>
      `;
      }
    )
    .join('');

  galleryCards.insertAdjacentHTML('beforeend', markup);

  modalSimpleLightbox.refresh();
}

function clearGallery() {
  galleryCards.innerHTML = '';
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

function getPhotoCardHeight(photoCard) {
  return photoCard ? photoCard.getBoundingClientRect().height : 0;
}

function smoothScroll(height) {
  window.scrollBy({
    top: height,
    behavior: 'smooth',
  });
}

function scrollToNewImages() {
  const firstPhotoCard = document.querySelector('.photo-card');
  smoothScroll(getPhotoCardHeight(firstPhotoCard) * 2);
}

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41902391-3586b75e6bf6b946d25386040';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('[name="query"]');
const galleryCards = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const modalSimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

hideLoader();

// function fetchData(url) {
//   showLoader();

//   return fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     })
//     .finally(() => {
//       hideLoader();
//       searchInput.value = '';
//       searchInput.focus();
//     });
// }

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    return;
  }
  clearGallery();

  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;

  fetchData(url)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        createGalleryMarkup(data.hits);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function fetchData(url) {
  showLoader();

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .finally(() => {
      hideLoader();
      searchInput.value = '';
      searchInput.focus();
    });
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

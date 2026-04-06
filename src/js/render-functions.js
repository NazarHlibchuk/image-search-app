import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const markup = images
    .map(
      img => `
    <li class="gallery-item">
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" />
      </a>
      <ul class="image-info">
        <li>👍 ${img.likes}</li>
        <li>👁️ ${img.views}</li>
        <li>💬 ${img.comments}</li>
        <li>⬇️ ${img.downloads}</li>
      </ul>
    </li>
  `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('visible');
}

export function hideLoader() {
  loader.classList.remove('visible');
}


export function showLoadMoreButton() {
  const btn = document.querySelector('.load-more');
  if (btn) {
    btn.style.display = 'block';
  }
}

export function hideLoadMoreButton() {
  const btn = document.querySelector('.load-more');
  if (btn) {
    btn.style.display = 'none';
  }
}


export function refreshLightbox() {
  if (lightbox) lightbox.refresh();
}

export function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

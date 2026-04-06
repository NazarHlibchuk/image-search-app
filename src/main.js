 // main.js
import './css/styles.css';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  refreshLightbox,
  scrollPage
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


let currentQuery = '';
let currentPage = 1;
const perPage = 15;
let totalHits = 0;

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');
 hideLoadMoreButton(); // ховаємо кнопку перед пошуком


form.addEventListener('submit', async e => {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.warning({ message: 'Please enter a search query.' });
    return;
  }
  //нове
  
  currentQuery = query;
  currentPage = 1;
  //
  clearGallery();
  showLoader();
 


  try {
    const data = await getImagesByQuery(currentQuery, currentPage); //замість(query)
    const { hits, totalHits: total } = data; //додали totalHits: total
    totalHits = total; //нове

    if (hits.length === 0) {
      iziToast.info({
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
  
    createGallery(hits);
      if (totalHits > currentPage * perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong. Please try again later.' });
  } finally {
    hideLoader();
  }
});

// нове



loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const { hits } = data;

    createGallery(hits);
    refreshLightbox(); // якщо винесеш refresh окремо

    scrollPage(); // плавний скрол

    if (currentPage * perPage >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: 'Failed to load more images.' });
  } finally {
    hideLoader();
  }
});



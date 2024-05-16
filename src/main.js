import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '43843798-e4c61f3cfe0ada13281a73887';
const BASE_URL = 'https://pixabay.com/api/'; 


const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader'); 

function onSearchFormSubmit(event) {
    event.preventDefault();
    const searchQuery = event.target.elements.searchKeyword.value.trim();

    if (searchQuery === '') {
        galleryEl.innerHTML = '';
        event.target.reset();
        iziToast.show({
            message: 'Input field can not be empty',
            position: 'topRight',
            timeout: 2000,
            color: 'red',
        });

        return;
    }

    galleryEl.innerHTML = '';
    loaderEl.classList.remove('is-hidden');

    fetchPhotosByQuery(searchQuery)
        .then(imagesData => {
            if (imagesData.total === 0) {
                iziToast.show({
                    message: 'Sorry, there are no images for this query',
                    position: 'topRight',
                    timeout: 2000,
                    color: 'red',
                });
            }

            galleryEl.innerHTML = createGalleryItemMarkup(imagesData.results);
        })
        .catch(error => console.log(error))
        .finally(() => {
            event.target.reset();
            loaderEl.classList.add('is-hidden');
        });
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.js-search-form');
    const galleryEl = document.querySelector('.gallery');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const input = document.querySelector('.js-search-input');
        const inputValue = input.value;

        fetchPhotosByQuery(inputValue)
            .then(data => {
                galleryEl.innerHTML = createGalleryItemMarkup(data.hits);
                console.log(data.hits);
                initializeLightbox();
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    });
});

export const fetchPhotosByQuery = (q) => {
    const searchParams = new URLSearchParams({
        q,
        key: API_KEY,
        per_page: 20,
        image_type: "photo",
        orientation: 'horizontal',
        safesearch: true
    });

    return fetch(`${BASE_URL}?${searchParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
};

export function createGalleryItemMarkup(items) {
    return items.map(item => `
        <a href="${item.largeImageURL}" class="gallery-item" data-lightbox="gallery">
            <img src="${item.webformatURL}" alt="${item.tags}" />
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Likes</strong> ${item.likes}</li>
                <li class="list-group-item"><strong>Views</strong> ${item.views}</li>
                <li class="list-group-item"><strong>Comments</strong> ${item.comments}</li>
                <li class="list-group-item"><strong>Downloads</strong> ${item.downloads}</li>
              </ul>
            </div>
        </a>   
    `).join('');
};

function initializeLightbox() {
    const lightbox = new SimpleLightbox('.gallery a', {
        overlayOpacity: 1,
        captionsData: 'alt',
        captionsDelay: 250,
        nav: true,
        close: true,
        showCounter: true,
        animationSpeed: 300,
        fadeSpeed: 300,
    });

    lightbox.refresh();
}
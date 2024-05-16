import iziToast from 'izitoast';
import { createGalleryItemMarkup } from './js/pixabay-api.js';
import { fetchPhotosByQuery } from './js/pixabay-api.js';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.js-search-form');
    const galleryEl = document.querySelector('.gallery');
    const loaderEl = document.querySelector('.loader');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const input = document.querySelector('.js-search-input');
        const searchQuery = input.value.trim();

        if (searchQuery === '') {
            galleryEl.innerHTML = '';
            input.value = '';
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
            .then(data => {
                if (data.totalHits === 0) {
                    iziToast.show({
                        message: 'Sorry, there are no images for this query',
                        position: 'topRight',
                        timeout: 2000,
                        color: 'red',
                    });
                } else {
                    galleryEl.innerHTML = createGalleryItemMarkup(data.hits);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                iziToast.show({
                    message: 'Failed to load images',
                    position: 'topRight',
                    timeout: 2000,
                    color: 'red',
                });
            })
            .finally(() => {
                input.value = '';
                loaderEl.classList.add('is-hidden');
            });
    });
});

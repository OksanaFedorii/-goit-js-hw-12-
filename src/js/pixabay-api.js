import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '43843798-e4c61f3cfe0ada13281a73887';
const BASE_URL = 'https://pixabay.com/api/'; 

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.js-search-form'); 
    const galleryEl = document.querySelector('.gallery'); 

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const input = document.querySelector('.js-search-input'); 
        const inputValue = input.value; 

        fetchPhotosByQuery(inputValue) 
            .then(data => {
                galleryEl.innerHTML = createGalleryItemMarkup(data.hits);
                console.log(data.hits); 
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
        <div class="gallery-item">
            <img src="${item.webformatURL}" alt="${item.tags}" />
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Likes</strong> ${item.likes}</li>
                <li class="list-group-item"><strong>Views</strong> ${item.views}</li>
                <li class="list-group-item"><strong>Comments</strong> ${item.comments}</li>
                <li class="list-group-item"><strong>Downloads</strong> ${item.downloads}</li>
              </ul>
            </div>
        </div>   
    `).join('');
}
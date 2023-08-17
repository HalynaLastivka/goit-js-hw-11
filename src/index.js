import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import "simplelightbox/dist/simple-lightbox.min.css";

let page = 1;
const form = document.getElementById('search-form');
const ulEl = document.querySelector('.gallery');
const btnLoad = document.querySelector('.load-more');



form.addEventListener('submit', onSearch);
btnLoad.addEventListener('click', onLoadMore);
document.addEventListener('scroll', onscroll);


function onLoadMore() {
    page += 1;
    serviceSearch(form[0].value, page);
}

function serviceSearch(value,page) {
    
    
  btnLoad.classList.add('hidden'); 
  if (value.trim().length === 0) {
    return Notiflix.Notify.failure('Search is empty!');
  }

  getItem(value,page)
    .then(data => {
    
            if (data.hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                const newElImg = createLi(data.hits);
                ulEl.insertAdjacentHTML('beforeend', newElImg);

                
                scrollToNewImages();

                let newLightbox = new SimpleLightbox('.gallery a'); // create new gallery
                newLightbox.refresh();
                Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`); // Send a notify with found image qty
         
                 if (page*40 >= data.total) {
                    btnLoad.classList.add('hidden'); 
                 } else {
                    btnLoad.classList.remove('hidden'); 
                 }
            }
        })
        
    .catch(err => console.log(err));
}

function scrollToNewImages() {
  const { height: cardHeight } = document
    .querySelector(".gallery")
    .lastElementChild.getBoundingClientRect();
  
  window.scrollBy({
    top: cardHeight * 2, 
    behavior: "smooth",
  });
}






function onSearch(event) {
    page = 1;
    event.preventDefault();
    ulEl.innerHTML = '';

    serviceSearch(event.currentTarget.elements[0].value, page);  
}



async function getItem(searchField, page=1) { 
 
    const API_KEY = '38874967-f841ab5810138828c5f6e1fdb';
    const URL = "https://pixabay.com/api/";
    const END_POINT = "&q="+searchField+"&image_type=photo&orientation=horizontal&safesearch=true";
       
    const params = new URLSearchParams({
        key: API_KEY,
        page,
        per_page: 40,

    });   

        const resp = await fetch(`${URL}?${params}${END_POINT}`);

        if (!resp.ok) {
            throw new Error(resp.statusText);
        }

    return resp.json();
}


function createLi(gallery) {
  return gallery
    .map(({ webformatURL, largeImageURL , tags, likes, views,comments,downloads}) => {
        return `<div class="photo-card">
      <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="200"/></a>
  <div class="info">
    <div class="info-item">
      <b>Likes</b>
      <p>${likes}</p>
    </div>
    <div class="info-item">
      <b>Views</b>
      <p>${views}</p>
    </div>
    <div class="info-item">
      <b>Comments</b>
      <p>${comments}</p>
    </div>
    <div class="info-item">
      <b>Downloads</b>
      <p>${downloads}</p>
    </div>
  </div>
 
</div>`;
    })
    .join('');
}







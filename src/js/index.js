import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

import { getItem } from "../js/connect";
import { createLi} from "../js/markup";

let page = 1;
let lightbox = null;
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

                if (lightbox) {
                    lightbox.destroy(); 
                }
                lightbox = new SimpleLightbox('.gallery a'); // create new gallery
                lightbox.refresh();
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

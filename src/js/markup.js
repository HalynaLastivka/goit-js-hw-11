
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

export {createLi};
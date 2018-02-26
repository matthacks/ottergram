const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
const HIDDEN_DETAIL_CLASS = 'hidden-detail';
const TINY_EFFECT_CLASS = 'is-tiny';
const ESC_KEY = 27;
let indexOfCurrentlyDisplayedImage = 0;

function setDetails(imageURL, titleText) {
  // this line tells the browser that the function conforms to the most recent
  // standard version of JavaScript
  const detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageURL);

  const detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.innerHTML = titleText;
}

function imageFromThumb(thumbnail) {
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function setIndexOfCurrentlyDisplayedImage(newIndex) {
  indexOfCurrentlyDisplayedImage = newIndex;
}

function showDetails() {
  const frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(() => {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function addThumbClickHandler(thumb, index) {
  thumb.addEventListener('click', (event) => {
    event.preventDefault();
    setIndexOfCurrentlyDisplayedImage(index);
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function getThumbnailsArray() {
  const thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  // since qSA returns a node list which contains less functionality than an array
  // (there is no for each method)....
  // we will now convert to an array using a backward-compatable way
  // arrays also guarenteed that items in the array will not change even if the DOM is modified
  const thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function hideDetails() {
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function addKeyPressHandler() {
  document.body.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
}

function addCycleImagesLeftHandler() {
  document.getElementById('cycleImagesLeftButton').addEventListener('click', () => {
    const thumbnailsAr = getThumbnailsArray();
    let previousImageIndex;
    if (indexOfCurrentlyDisplayedImage === 0) {
      previousImageIndex = thumbnailsAr.length - 1;
    } else {
      previousImageIndex = (indexOfCurrentlyDisplayedImage - 1) % thumbnailsAr.length;
    }
    setIndexOfCurrentlyDisplayedImage(previousImageIndex);
    setDetailsFromThumb(thumbnailsAr[previousImageIndex]);
    showDetails();
  });
}

function addCycleImagesRightHandler() {
  document.getElementById('cycleImagesRightButton').addEventListener('click', () => {
    const thumbnailsAr = getThumbnailsArray();
    const nextImageIndex = (indexOfCurrentlyDisplayedImage + 1) % thumbnailsAr.length;
    setIndexOfCurrentlyDisplayedImage(nextImageIndex);
    setDetailsFromThumb(thumbnailsAr[nextImageIndex]);
    showDetails();
  });
}

function initializeEvents() {
  const thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addCycleImagesLeftHandler();
  addCycleImagesRightHandler();
  addKeyPressHandler();
}

initializeEvents();

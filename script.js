const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;


//Unsplash API
const count = 10;
const apiKey = '';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get fotos Unsplash Api
async function getFotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(isInitialLoad){
            updateApiWithNewCount(30);
            isInitialLoad = false;
        }
    } catch (error) {
        //Catch error
    }
}


//Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    //InnerHeight = height of our browser window
    //ScrollY - how heightly are from the top of the page, distance from the top of the page user has scrolled
    //body.offsetHeight - the height of everything in the body including ehat is not within the view - combined size of all images (10)
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getFotos();
   }
});

//On load
getFotos();
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;


//Unsplash API
let initialCount = 5; // first time it loades 5 images then 30
const apiKey = 'h0cOsu3FJYRAAiB-aaRWDEs7ITW19vLYz_Lc28daHRw';
const type = 'landscape';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}&orientation=${type}`;

function updateApiWithNewCount (picCount){
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}&orientation=${type}`;
}

//Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        imagesLoaded = 0;
    }
}
//Helper Funtion to set attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//Display photos, add to the DOM
function displayPhotos(){
    //imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function foreach
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        //Create <img>
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //Put img inside a , put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
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


//DRY code dont repeat yourself
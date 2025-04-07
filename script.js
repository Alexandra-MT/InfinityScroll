//Unsplash API
const count = 10;
const apiKey = '';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get fotos Unsplash Api
async function getFotos(){
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        //Catch error
    }
}

getFotos();

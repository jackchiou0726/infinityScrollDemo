const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//確認所有照片讀取完畢
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30
    }
}

//Unsplash API
const count = 5;
const apiKey = 'DOS9yuGeebvrOGMv2vewUV3fpI_pwgJwx1ccX1vZFvU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//設置標籤屬性的方法
function setAttributes(element,attributes){
    for (const key in attributes ){
        element.setAttribute(key,attributes[key]);
    }
}

// display photo
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photoArray.length;
    //將取到的json陣列跑forEach
    photoArray.forEach((photo) =>{
        //製作往unsplash的a連結
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank'
        });
        //製作img標籤
        const img = document.createElement('img');
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        })
        //事件監聽:確認每張圖片讀取
        img.addEventListener('load',imageLoaded)
        //將製作好的img加到a,a再加到imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//get photo from unsplash api
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log('error')
    }
}

//check to see if near bottom of page, load more photo
window.addEventListener('scroll', () =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
        
    }
})

// On load
getPhotos()
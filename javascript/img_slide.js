let slideWapper = document.querySelector('.container');
let slides = document.querySelectorAll('.item');
let totalSlides = slides.length; //item의 갯수

let sliderWidth = slideWapper.clientWidth; //컨테이너의 width
let slideIndex = 0;
let slider = document.querySelector('.slider');
slider.stlye.width = sliderWidth * totalSlides + 'px';

showSlides()

function showSlides(){
    for(let i;i<slides.length;i++){
        slider.style.left = (sliderWidth * slideIndex) + 'px';
    }
    slideIndex++;
    if(slideIndex === totalSlides){
        slideIndex = 0;
    }
    setTimeout(showSlides, 2000);
}
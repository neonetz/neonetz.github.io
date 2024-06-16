let sections = document.querySelectorAll('section');

window.onscroll = ()  => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop -150;
        let height = sec.offsetHeight;

        if(top >= offset && top < offset + height) {
            sec.classList.add('show-animate');
        }
        /*FOR ANIMATION IN SCROLL */
        else {
            sec.classList.remove('show-animate');
        }
    })
}

document.addEventListener('DOMContentLoaded', function() {
    const musicButton = document.getElementById('musicButton');
    const audio = document.getElementById('audio');
    let isPlaying = false;


    musicButton.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            musicButton.classList.remove('playing');
        } else {
            audio.play();
            musicButton.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
});

let counter = 1;
setInterval(() => {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 4) {
        counter = 1;
    }
}, 5000);
// script.js
let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }
  const newTransform = -currentSlide * 100;
  document.querySelector('.slides').style.transform = `translateX(${newTransform}%)`;
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
}

document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
  setInterval(() => {
    changeSlide(1);
  }, 3000); // Auto-slide interval
});



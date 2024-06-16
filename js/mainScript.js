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


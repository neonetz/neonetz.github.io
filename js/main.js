var lastScrollTop = 0;

window.addEventListener("scroll", function() {
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    var header = document.getElementById("myHeader");

    if (currentScroll > lastScrollTop) {
        // Scrolling ke bawah
        header.style.transform = "translateY(-100%)"; // Menghilangkan header dengan menggeser ke atas
    } else {
        // Scrolling ke atas atau di atas
        header.style.transform = "translateY(0)"; // Menampilkan kembali header
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);
function toggleMenu() {
    var menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}
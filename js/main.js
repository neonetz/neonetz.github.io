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
document.getElementById('navbar2-toggler').addEventListener('click', function() {
    var navbarToggler = document.getElementById('navbar2-toggler');
    navbarToggler.classList.toggle('clicked');
    
    var navbarNav = document.getElementById('navbar2-nav');
    if (navbarNav.style.display === 'block') {
        navbarNav.style.display = 'none';
    } else {
        navbarNav.style.display = 'block';
    }
});
// Tambahkan atribut 'aria-label' untuk memberi tombol label yang dapat diakses
document.getElementById('navbar2-toggler').setAttribute('aria-label', 'Toggle Navigation');

// Fungsi untuk memuat peta Google Maps setelah halaman selesai dimuat
window.addEventListener('load', function() {
    var iframes = document.querySelectorAll('iframe[data-src]');
    for (var i = 0; i < iframes.length; i++) {
        iframes[i].setAttribute('src', iframes[i].getAttribute('data-src'));
    }
});


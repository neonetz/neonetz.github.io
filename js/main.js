document.addEventListener('DOMContentLoaded', function() {
    const homeLink = document.getElementById('home-link');
    const navLinks = document.querySelector
    ('.nav-links');

    // Toggle menu saat tombol burger diklik
    const menuToggle = document.querySelector('.menu-toggle');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active'); // Toggle class 'active' pada menu navigasi
        menuToggle.classList.toggle('active'); // Toggle class 'active' pada tombol burger
    });

    // Menambahkan event listener untuk tombol "Home"
    homeLink.addEventListener('click', function(event) {
        event.preventDefault(); // Menghentikan perilaku default dari link
        
        // Menampilkan kembali semua konten utama
        document.querySelectorAll('.box').forEach(function(box) {
            box.style.display = 'block';
        });
        
        // Sembunyikan konten profil
        const profileBox = document.getElementById('profile');
        profileBox.style.display = 'none';
    });

    // Menangkap elemen tombol "About"
    const aboutLink = document.getElementById('about-link');

    // Menambahkan event listener untuk tombol "About"
    aboutLink.addEventListener('click', function(event) {
        event.preventDefault(); // Menghentikan perilaku default dari link
        
        // Memastikan semua konten lain disembunyikan terlebih dahulu
        document.querySelectorAll('.box').forEach(function(box) {
            box.style.display = 'none';
        });
        
        // Menampilkan profil
        const profileBox = document.getElementById('profile');
        profileBox.style.display = 'block';
    });
});

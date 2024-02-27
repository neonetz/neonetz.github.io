document.addEventListener('DOMContentLoaded', function() {
    // Menangkap elemen tombol "Home"
    const homeLink = document.getElementById('home-link');

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

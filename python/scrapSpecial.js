$(function(){
    $.getJSON('python/berita_special.json', function(data) {
        // Ubah format waktu publish menjadi timestamp dan lakukan sorting
        data.forEach(function(item) {
            item.timestamp = moment(item.waktu_publish, 'dddd , DD MMM YYYY, HH:mm Z').valueOf();
        });
        data.sort(function(a, b) {
            return b.timestamp - a.timestamp;
        });

        var str = '<table border="1">';

        // Tambahkan baris header ke tabel
        str += '<tr><th>No</th><th>Judul</th><th>Kategori</th><th>Waktu Publish</th><th>Waktu Scrapping</th></tr>';

        var no = 1; // inisialisasi counter
        $.each(data, function(key, value){
            str += '<tr><td>' + no + '</td><td>' + value.judul + '</td><td>' + value.kategori + '</td><td>' + value.waktu_publish + '</td><td>' + value.waktu_scraping + '</td></tr>';
            no++; // increment counter
        });

        str += '</table>';
        $("#Berita_Republik_Special").html(str);
    });
});
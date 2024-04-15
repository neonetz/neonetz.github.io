from bs4 import BeautifulSoup
import requests
import json
import re
from datetime import datetime
import subprocess

# Mendefinisikan fungsi untuk melakukan commit dan push perubahan ke GitHub
def commit_and_push_changes():
    try:
        # Perintah Git untuk menambahkan semua perubahan
        subprocess.run(["git", "add", "."], check=True)
        # Perintah Git untuk melakukan commit dengan pesan "Update data"
        subprocess.run(["git", "commit", "-m", "Update data"], check=True)
        # Perintah Git untuk melakukan push ke branch saat ini
        subprocess.run(["git", "push"], check=True)
        print("Perubahan berhasil di-commit dan di-push ke GitHub")
    except subprocess.CalledProcessError as e:
        # Menangani kesalahan jika terjadi
        print("Terjadi kesalahan saat melakukan commit dan push perubahan:", e)



html = requests.get('https://news.republika.co.id/')
soup = BeautifulSoup(html.text,'html.parser')

infoNews = []
infoNewsSpecial = []

for i in soup.find_all('div',class_='caption'):
    time_element = i.find_next('div', class_='date')   # mencari elemen waktu publikasi
    if time_element:
        waktu_publish = time_element.text.split('-')[1].strip()
    else:
        time_element = i.find("small")
        waktu_publish = time_element.text.strip() if time_element else 'Unknown'
    kategori_element = i.find_next('span', class_='kanal-info')  # mencari elemen kategori
    kategori = kategori_element.text if kategori_element else 'Terpopuler'
    h3_element = i.find('h3')  # mencari elemen h3
    if h3_element:
        judul = h3_element.text.strip()
    else:
        title_element = i.find(class_='title')  # mencari elemen dengan class 'title'
        judul = title_element.text.strip() if title_element else 'Tidak ada judul'
    infoNew = {
        'judul': judul,
        'kategori': kategori,
        'waktu_publish': waktu_publish,
        'waktu_scraping': datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    }
    if re.match(r'\w+ , \d{2} \w+ \d{4}, \d{2}:\d{2}', waktu_publish):
        infoNewsSpecial.append(infoNew)
    else:
        infoNews.append(infoNew)

with open('berita.json', 'w') as f:
    json.dump(infoNews, f)

with open('berita_special.json', 'w') as f:
    json.dump(infoNewsSpecial, f)

# Memanggil fungsi commit_and_push_changes setelah menulis data ke file JSON
commit_and_push_changes()
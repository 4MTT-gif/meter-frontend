# Meter Frontend

Cihaz/sayac kayit uygulamasinin arayuzu. React (Vite) ile yazildi, GitHub Pages uzerinde yayinlaniyor.

## Canli Adres

https://4mtt-gif.github.io/meter-frontend/

## Teknolojiler

- React 18 + Vite
- GitHub Actions (build + deploy)
- GitHub Pages (hosting)

## Ozellikler

- Cihaz ekleme, listeleme, silme
- Cihaza okuma (deger) ekleme
- Dogrulama: okuma degeri negatif olamaz

## Yapilandirma

Backend adresi koda gomulu degildir, build sirasinda environment variable ile verilir:

- Yerel gelistirme: `.env` dosyasinda `VITE_API_URL`
- Canli (GitHub Actions): repository secret olarak `VITE_API_URL`

`.env.example` dosyasi ornek olarak repoda bulunur.

Not: React client-side bir uygulama oldugu icin bu degisken build aninda pakete gomulur ve tarayicida gorunur. Public bir API adresi icin bu normaldir; gizli deger konulmaz.

## Yerel Calistirma
Uygulama http://localhost:5173 adresinde calisir. `.env` dosyasina backend adresini yazmak gerekir:## Deploy

main branchine her push, GitHub Actions ile otomatik build + GitHub Pages deploy tetikler. Backend Render deploylarindan farkli olarak, burada deploy isini de dogrudan GitHub Actions yapar.

## Bilinen Davranis

Backend Render ucretsiz pakette calistigi icin, uzun sure kullanilmadiginda ilk istek ~50 saniye surebilir. Ayrica veriler kalici degildir (bkz. backend README).

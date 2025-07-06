# 📱 QR Code Generator

A lightweight and easy-to-use web application for generating QR codes from **plain text**, **URLs**, or **secure Wi-Fi credentials**.  
Perfect for instantly sharing information via scannable QR images — no backend required.

## 🚀 Features

- 🔤 Encode any custom text or link into a QR code  
- 📶 Generate QR codes with Wi-Fi credentials (SSID + password)  
- 📸 Instant preview and download of QR images  
- ⚡ Fast, responsive, and lightweight  
- 🖥️ Works directly in the browser (no installation needed)

## 🛠️ Built With

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**

## 📚 Libraries Used

- [QRCode.js](https://github.com/davidshimjs/qrcodejs) — minimal pure JS library for QR code generation

## 📸 Preview



## 💡 How to Use
1. Clone or download the repository.
2. Open `index.html` in your browser.
3. Enter your text, link, or Wi-Fi details.
4. Click **Generate QR Code**.
5. Scan with a smartphone or save the QR image.

## 🔒 Security Notes

- Wi-Fi QR generation follows the format:  
  `WIFI:T:WPA;S:SSID;P:password;;`
- QR data is not stored or transmitted — everything runs locally in your browser

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).

---

🔧 _Feel free to contribute or fork this project for your own use._  
✉️ _Questions or suggestions? Reach out via Issues or Pull Requests!_


# Tasks TO-DO:

- [ ] __Fix app compatibility with phones__
    - [X] Fix responsiveness on the phones(in the google's phone preview mode on PC it works properly but on real mobile devices it doesn't) (Done, but can be improved so much in the future!)
    - [ ] Fix "Copy" feature (It doesn't work on phones!)
    - [X] Fix "Download" feature (It doesn't work as well)
    - [X] Add new feature: creating qr-code to connect to WI-FI

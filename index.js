function formValidation(form) {
  const userInput = form.qrcode_content;

  if (userInput.value === "") {
    userInput.classList.add("shake-animation");
    setTimeout(() => userInput.classList.remove("shake-animation"), 200);
  } else {
    document.querySelector("body").innerHTML +=
      "<div class='qrcode-window'>" +
      "<div class='qrcode-container'>" +
      "<h2>Here is your QR-CODE</h2>" +
      "<div id='qrcode'></div>" +
      "<div id='action-block'>" +
      "<a href='#' class='btn dwn-link'>Download</a><a href='#' class='btn cp-link'>Copy</a> <a href='index.html' class='btn cls-link'>Close</a> " +
      "</div>" +
      "</div>" +
      "</div>";
    generateQRCode(userInput.value);
  }
  return false;
}

/* QR_CODE GENERATION SECTION!!! */
function generateDownloadLink() {
  const canvas = document.querySelector("#qrcode canvas");

  if (canvas) {
    const imgSrc = canvas.toDataURL("image/png");
    document.querySelector(".dwn-link").setAttribute("href", imgSrc);
    document.querySelector(".dwn-link").setAttribute("download", "qr-code.png");
  } else {
    console.error("QR code image not found!");
  }
}

function generateCopyLink() {
  const imgBS64 = document.querySelector("#qrcode img").src;
  const imgBlob = convertImgBase64ToBlob(imgBS64);
  document.querySelector(".cp-link").addEventListener("click", () => {
    window.navigator.clipboard.write([
      new ClipboardItem({ "image/png": imgBlob }),
    ]);
    document.querySelector(".cp-link").innerHTML = "Done!";
  });
}

function detectPhoneDeviceType(){
  return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)
}

function convertImgBase64ToBlob(imgBS64) {
  const imgDecode = atob(imgBS64.split(",")[1]);

  const byteNumbers = new Array(imgDecode.length);
  for (let i = 0; i < imgDecode.length; i++) {
    byteNumbers[i] = imgDecode.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], { type: "image/png" });
}

function generateQRCode(text) {
  document.querySelector("#qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), text);

  setTimeout(generateDownloadLink, 500); //Waiting for image to generate
  
  //Providing a temporary copy restriction for phones
  if(!detectPhoneDeviceType()) setTimeout(generateCopyLink, 500);
  else document.querySelector(".cp-link").style.display = "none";
}


/* TABS FUNCTIONALITY */
const tabBtns = document.querySelectorAll("[data-tab-target]");
const tabs = document.querySelectorAll("[data-tab-content]")

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetTab = document.querySelector(btn.dataset.tabTarget);
    tabs.forEach((tab) => tab.classList.remove("active"));
    targetTab.classList.add("active");
  })
});
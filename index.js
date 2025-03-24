function formValidation(form) {
  const userInput = form.qrcode_content;

  if (userInput.value === "") {
    addWarnAnim(userInput);
  } else {
    generateModalWindowAndCode(userInput.value);
  }
  return false;
}

function addWarnAnim(field){
  field.classList.add("shake-animation");
  setTimeout(() => field.classList.remove("shake-animation"), 200);
}

function generateModalWindowAndCode(content){
  let qrWindow = document.createElement("div");
  qrWindow.classList.add("qrcode-window");

  let qrContainer = document.createElement("div");
  qrContainer.classList.add("qrcode-container");

  let title = document.createElement("h2");
  title.textContent = "Here is your QR-CODE";

  let qrCodeDiv = document.createElement("div");
  qrCodeDiv.id = "qrcode";

  let actionBlock = document.createElement("div");
  actionBlock.id = "action-block";

  let downloadLink = document.createElement("a");
  downloadLink.href = "#";
  downloadLink.classList.add("btn", "dwn-link");
  downloadLink.textContent = "Download";

  let copyLink = document.createElement("a");
  copyLink.href = "#";
  copyLink.classList.add("btn", "cp-link");
  copyLink.textContent = "Copy";

  let closeLink = document.createElement("a");
  closeLink.href = "index.html";
  closeLink.classList.add("btn", "cls-link");
  closeLink.textContent = "Close";

  actionBlock.appendChild(downloadLink);
  actionBlock.appendChild(copyLink);
  actionBlock.appendChild(closeLink);

  qrContainer.appendChild(title);
  qrContainer.appendChild(qrCodeDiv);
  qrContainer.appendChild(actionBlock);

  qrWindow.appendChild(qrContainer);

  document.body.appendChild(qrWindow);
  
  generateQRCode(content);
}

/* QR_CODE GENERATION SECTION!!! */
function generateQRCode(text) {
  document.querySelector("#qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), text);

  setTimeout(generateDownloadLink, 500); //Waiting for image to generate
  
  //Providing a temporary copy restriction for phones
  if(!detectPhoneDeviceType()) setTimeout(generateCopyLink, 500);
  else document.querySelector(".cp-link").style.display = "none";
}


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

/* TABS FUNCTIONALITY */
const tabBtns = document.querySelectorAll("[data-tab-target]");
const tabs = document.querySelectorAll("[data-tab-content]")

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetTab = document.querySelector(btn.dataset.tabTarget);
    tabs.forEach((tab) => {
      tab.classList.remove("active");
      tab.classList.remove("appearOnLoad");
    });

    tabBtns.forEach(btn => {
      btn.classList.remove("activeBtn");
    })

    targetTab.classList.add("active");
    btn.classList.add("activeBtn");
  })
});

/* WI-FI QR CODE GENERATION */
function netFormValidation(form){
  const netName = form.net_name;
  const netPassw = form.net_password;
  const netProt = form.net_protocol;

  let isValid = true;

  if(netName.value === ""){
    addWarnAnim(netName);
    isValid = false;
  }

  if(netPassw.value === ""){
    addWarnAnim(netPassw);
    isValid = false;
  }

  if(isValid){
    const netConfig = createWiFiConfiguration(netName.value,netPassw.value, netProt.value);
    generateModalWindowAndCode(netConfig);
  }

  return false;
}

function createWiFiConfiguration(netName, netPass, netProt){
  return `WIFI:T:${netProt};S:${netName};P:${netPass};;`;
}
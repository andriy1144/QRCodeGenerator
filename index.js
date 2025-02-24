function formValidation(form) {
  const userInput = form.qrcode_content;
  console.log(userInput);
  if (userInput.value === "") {
    userInput.classList.add("shake-animation");
    setTimeout(() => userInput.classList.remove("shake-animation"), 200);
    return false;
  }

  return true;
}

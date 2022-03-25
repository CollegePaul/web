// Get the modal
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let x = document.getElementById("close");

// When the user clicks on the button, open the modal
btn.onclick = () => {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
x.onclick = () => {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
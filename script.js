window.addEventListener("load", function () {
  // Your code here

  var cards = document.querySelectorAll(".memory-card");

  [...cards].forEach((card) => {
    card.addEventListener("click", function () {
      card.classList.toggle("is-flipped");
    });
  });

  yourFunction();
});

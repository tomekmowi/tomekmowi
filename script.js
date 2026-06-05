const section = document.querySelector(".scroll-section");
const titleSection = document.querySelector(".title-section");
const openFlashcardsButton = document.querySelector("#open-flashcards");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateCards() {
  const rect = section.getBoundingClientRect();
  const maxScroll = section.offsetHeight - window.innerHeight;
  const progress = clamp(-rect.top / maxScroll, 0, 1);

  const speed = 5.5;

  const card1 = clamp(progress * speed - 0, 0, 1);
  const card2 = clamp(progress * speed - 0.7, 0, 1);
  const card3 = clamp(progress * speed - 1.4, 0, 1);
  const card4 = clamp(progress * speed - 2.1, 0, 1);

  document.body.style.setProperty("--card-1", card1);
  document.body.style.setProperty("--card-2", card2);
  document.body.style.setProperty("--card-3", card3);
  document.body.style.setProperty("--card-4", card4);
}

function revealTitle() {
  const rect = titleSection.getBoundingClientRect();

  if (rect.top < window.innerHeight * 0.8) {
    titleSection.classList.add("visible");
  } else {
    titleSection.classList.remove("visible");
  }
}

function openFlashcards() {
  document.body.classList.add("flashcards-open");
  window.scrollTo({ top: 0, behavior: "auto" });
}

function updatePage() {
  if (!document.body.classList.contains("flashcards-open")) {
    updateCards();
    revealTitle();
  }
}

const flashcardButton = document.querySelector("#flashcard-button");
const flashcardWord = document.querySelector("#flashcard-word");

let flashcardFlipped = false;

flashcardButton.addEventListener("click", () => {
  flashcardFlipped = !flashcardFlipped;

  if (flashcardFlipped) {
    flashcardWord.textContent = "Dzień dobry";
  } else {
    flashcardWord.textContent = "Dobrý den";
  }
});

openFlashcardsButton.addEventListener("click", openFlashcards);

window.addEventListener("scroll", updatePage);
window.addEventListener("resize", updatePage);

updatePage();
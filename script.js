const hamburgerBtn = document.getElementById('hamburgerBtn');
const menuItems = document.getElementById('menuItems');

hamburgerBtn.addEventListener('click', () => {
  menuItems.classList.toggle('show');
});



// testimonials
fetch("./testimonials.json")
  .then((result) => result.json())
  .then((data) => {
    const reviews = document.querySelector(".reviews");
    data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "review";
      const {
        text,
        rating,
        profile: { avatar, name, title },
      } = item;

      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

      let starsHTML = "";

      for (let i = 0; i < fullStars; i++) {
        starsHTML += `<img src="./image/Star.svg" />`;
      }

      if (hasHalfStar) {
        starsHTML += `<img src="./image/StarHalf.svg" />`;
      }

      for (let i = 0; i < emptyStars; i++) {
        starsHTML += `<img src="./image/Star (1).svg" />`;
      }

      card.innerHTML = `
        <div class="stars">
          ${starsHTML}
        </div>
        <p>${text}</p>
        <div class="profile flex">
          <div class="avatar">
            <img src="${avatar}" />
          </div>
          <div class="info">
            <h4>${name}</h4>
            <p>${title}</p>
          </div>
        </div>
      `;

      reviews.appendChild(card);
    });
  });

// faq
fetch("./faq.json")
  .then((result) => result.json())
  .then((data) => {
    const faqBody = document.querySelector(".faq-body");
    data.forEach((item) => {
      const faqBox = document.createElement("div");
      faqBox.className = "faq-box";

      faqBox.innerHTML = `
      <div class="question">
        <div class="flex item-center" style="gap: 8px;">
          <img src="./image/faq icon/Question.svg" alt="" />
          <h1>${item.question}</h1>
        </div>
        <button><img src="./image/faq icon/CaretDown.svg" alt="" /></button>
      </div>
      <p>${item.answer}</p>
    `;

      faqBody.appendChild(faqBox);
    });
  });

document.addEventListener("click", function (e) {
  const question = e.target.closest(".question");
  if (question) {
    const faqBox = question.closest(".faq-box");
    const answer = faqBox.querySelector("p");
    const arrow = question.querySelector("button img");

    document.querySelectorAll(".faq-box p").forEach((p) => {
      if (p !== answer) {
        p.style.maxHeight = null;
      }
    });

    document
      .querySelectorAll(".faq-box .question button img")
      .forEach((img) => {
        if (img !== arrow) {
          img.style.transform = "rotate(0deg)";
        }
      });

    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      arrow.style.transform = "rotate(0deg)";
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
      arrow.style.transform = "rotate(180deg)";
    }
  }
});


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

  
const projectsContentList = [
  {
    chapter: "Rostov-on-Don, Admiral",
    city: "Rostov-on-Don <br> LCD admiral",
    area: "81 m2",
    time: "3.5 months",
    cost: "Upon request",
    src: "./imgs/completed.png",
  },
  {
    chapter: "Sochi, Thieves",
    city: "Sochi <br> Thieves",
    area: "105 m2",
    time: "4 months",
    cost: "Upon request",
    src: "./imgs/completed_1.png",
  },
  {
    chapter: "Rostov-on-Don, Patriotic",
    city: "Rostov-on-Don <br> Patriotic",
    area: "93 m2",
    time: "3 months",
    cost: "Upon request",
    src: "./imgs/completed_2.png",
  },
];

const sliderImages = document.querySelector(".slider_content_slider");
const sliderNavigation = document.querySelector(".slider_tab_nav");
const sliderPaginationBullets = document.querySelector(
  ".slider_tab_pagination_wrap"
);
const projectChapterList = document.querySelector(".slider_chapter_list");
const projectPDescrCity = document.querySelector(".slider_p_item.city_wrap");
const projectPDescrArea = document.querySelector(".slider_p_item.area_wrap");
const projectPDescrTime = document.querySelector(".slider_p_item.time_wrap");
const projectPDescrCost = document.querySelector(".slider_p_item.cost_wrap");

let sliderOptions = {
  pagination: true,
  autoplay: false,
  autoplayInterval: 5000,
};

document.addEventListener("DOMContentLoaded", () => {
  initSlider(projectsContentList, sliderOptions);
});

function initSlider(content, options) {
  if (!content || !content.length) return;

  options = options || {
    titles: false,
    pagination: true,
    autoplay: false,
  };

  initSliderContent();
  initSliderBtns();

  if (options.pagination) {
    initSliderPagination();
  }

  if (options.autoplay) {
    initAutoplay();
  }

  function initSliderContent() {
    content.forEach((image, index) => {
      let chapter = `<li class="slider_chapter_item">
        <button class="btn slider_chapter_btn chapter-${index} ${
        index === 0 ? "is-active" : ""
      } "data-index="${index}">
        ${content[index].chapter}<hr></button></li>`;
      projectChapterList.innerHTML += chapter;
      projectChapterList
        .querySelector(".is-active")
        .setAttribute("tabindex", "-1");
      projectChapterList
        .querySelectorAll(".slider_chapter_btn")
        .forEach((item) => {
          item.addEventListener("click", function () {
            moveSliderImages(this.dataset.index);
          });
        });

      let img = `<img class="slider_content_image img-${index} ${
        index === 0 ? "is-active" : ""
      }" src="${content[index].src}" data-index="${index}"></img>`;

      sliderImages.innerHTML += img;

      let city = `<p class="slider_p_descr city city-${index} ${
        index === 0 ? "is-active" : ""
      } "data-index="${index}">${content[index].city}</p>`;

      projectPDescrCity.innerHTML += city;

      let area = `<p class="slider_p_descr area area-${index} ${
        index === 0 ? "is-active" : ""
      } "data-index="${index}">${content[index].area}</p>`;

      projectPDescrArea.innerHTML += area;

      let time = `<p class="slider_p_descr time time-${index} ${
        index === 0 ? "is-active" : ""
      } "data-index="${index}">${content[index].time}</p>`;

      projectPDescrTime.innerHTML += time;

      let cost = `<p class="slider_p_descr cost cost-${index} ${
        index === 0 ? "is-active" : ""
      } "data-index="${index}">${content[index].cost}</p>`;

      projectPDescrCost.innerHTML += cost;
    });
  }

  function initSliderBtns() {
    sliderNavigation.querySelectorAll(".slider_tab_nav_btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        let currentImg =
          +sliderImages.querySelector(".is-active").dataset.index;
        let nextImg;
        if (btn.classList.contains("prev")) {
          nextImg = currentImg === 0 ? content.length - 1 : currentImg - 1;
        } else {
          nextImg = currentImg === content.length - 1 ? 0 : currentImg + 1;
        }
        moveSliderImages(nextImg);
      });
    });
  }

  function initSliderPagination() {
    content.forEach((image, index) => {
      let bullet = `<button class="btn slider_pagination_bullet img-${index} ${
        index === 0 ? "is-active" : ""
      }" data-index="${index}"></button>`;
      sliderPaginationBullets.innerHTML += bullet;
    });
    sliderPaginationBullets
      .querySelectorAll(".slider_pagination_bullet")
      .forEach((blt) => {
        blt.addEventListener("click", function () {
          moveSliderImages(this.dataset.index);
        });
      });
  }

  function moveSliderImages(num) {
    projectChapterList
      .querySelector(".is-active")
      .removeAttribute("tabindex", "-1");
    projectChapterList
      .querySelector(".is-active")
      .classList.remove("is-active");
    projectChapterList
      .querySelector(".chapter-" + num)
      .classList.add("is-active");
    projectChapterList
      .querySelector(".chapter-" + num)
      .setAttribute("tabindex", "-1");
    sliderImages.querySelector(".is-active").classList.remove("is-active");
    sliderImages.querySelector(".img-" + num).classList.add("is-active");
    projectPDescrCity.querySelector(".is-active").classList.remove("is-active");
    projectPDescrCity.querySelector(".city-" + num).classList.add("is-active");
    projectPDescrArea.querySelector(".is-active").classList.remove("is-active");
    projectPDescrArea.querySelector(".area-" + num).classList.add("is-active");
    projectPDescrTime.querySelector(".is-active").classList.remove("is-active");
    projectPDescrTime.querySelector(".time-" + num).classList.add("is-active");
    projectPDescrCost.querySelector(".is-active").classList.remove("is-active");
    projectPDescrCost.querySelector(".cost-" + num).classList.add("is-active");
    if (options.pagination) {
      sliderPaginationBullets
        .querySelector(".is-active")
        .classList.remove("is-active");
      sliderPaginationBullets
        .querySelector(".img-" + num)
        .classList.add("is-active");
    }
  }

  function initAutoplay() {
    setInterval(() => {
      let currentImg = +sliderImages.querySelector(".is-active").dataset.index;
      let nextImg = currentImg === content.length - 1 ? 0 : currentImg + 1;

      moveSliderImages(nextImg);
    }, options.autoplayInterval);
  }
}

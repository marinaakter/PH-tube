// 1. Fetch, load and show categories on html

// Create loadcategories
const loadcategories = () => {
  //fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => diplayCategories(data.categories))
    .catch((error) => console.log(error));
};

//load videos
const loadVideos = () => {
  //fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// Create Display Categories
const diplayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  // add data in html
  categories.forEach((item) => {
    console.log(item);
    //create a button
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    //add button to category container
    categoryContainer.appendChild(button);
  });
};

// Create Display Videos
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videos.forEach((videos) => {
    console.log(videos);
    const card = document.createElement("div");
    card.classList = "card card-compact"
    card.innerHTML = `
    <figure class="h-[200px]">
        <img src=${videos.thumbnail} class="h-full w-full object-cover"
        alt="Shoes" />
  </figure>
  <div class="card-body">
        <h2 class="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
        </div>
  </div> 
        `;
        videoContainer.appendChild(card)
  });
};

loadcategories();
loadVideos();

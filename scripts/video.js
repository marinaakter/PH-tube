function getTimeString(time){
    const hour = parseInt(time/3600)
    let remainingSecond = parseInt(time % 3600)
    const minute = parseInt(remainingSecond / 60)
    remainingSecond = remainingSecond % 60
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn')
    console.log(buttons);
    for(let btn of buttons){
        btn.classList.remove('active')
    }
    
}

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

const loadcategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        //sobai k active class remove koro r id er class k active koro
        removeActiveClass()
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add('active')
        displayVideos(data.category)
        
    })
    .catch((error) => console.log(error));
}

const loadDetails = async (videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video${videoId}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.video)
    

}

const displayDetails = (video) => {
    console.log(video);
    
}

// Create Display Categories
const diplayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  // add data in html
  categories.forEach((item) => {
    // console.log(item);
    //create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadcategoryVideos(${item.category_id})" class="btn category-btn">
            ${item.category}
        </button>
    `

    //add button to category container
    categoryContainer.appendChild(buttonContainer);
  });
};

// Create Display Videos
const displayVideos = (videos) => {    
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = ""
  if(videos.length == 0){
    videoContainer.classList.remove("grid")
    videoContainer.innerHTML = `
        <div class="min-h-[500] w-full flex flex-col gap-5 justify-center items-center">
            <img src="./assets/icon.png" />
            <h2 class="text-center text-xl font-bold">No content Here in this Category</h2>
        </div>
    `
    return
  }else{
    videoContainer.classList.add("grid")
  }
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    <figure class="h-[200px] relative">
        <img src=${video.thumbnail} class="h-full w-full object-cover"
        alt="Shoes" />
        ${
          video.others.posted_date?.length == 0
            ? ""
            : `<span class="absolute right-2 bottom-2 text-xs bg-black rounded p-1 text-white">${getTimeString(video.others.posted_date)}</span>`
        }
        
  </figure>
  <div class="px-0 py-2 flex gap-2">
        <div>
            <img class="w-10 h-10 rounded-full object-cover" src=${
              video.authors[0].profile_picture
            } />
        </div>
         <div>
            <h2 class="font-bold">${video.title}</h2>
            <div class="flex items-center gap-2">
                <p class="text-gray-400">${video.authors[0].profile_name}</p>
                ${
                  video.authors[0].verified == true
                    ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />`
                    : ""
                }
            </div>
            <p> <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button> </p>
        </div>   

  </div> 
        `;
    videoContainer.appendChild(card);
  });
};

loadcategories();
loadVideos();


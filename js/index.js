let data = [];
const cardContainer = document.getElementById("card-container");
const handleCategory = async () => {
  const resp = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const dataObject = await resp.json();
  const data = dataObject.data;
  // console.log(data);
  handleCategoriesName(data);
};

let clickedButton = "";

const handleCategoriesName = (datas) => {
  // console.log(data);

  const buttonContainer = document.getElementById("button-container");
  for (const data of datas) {
    const button = document.createElement("button");
    button.innerText = data.category;
    button.classList.add(
      "m-6",
      "rounded",
      "py-2",
      "px-5",
      "capitalize",
      "hover:bg-[#FF1F3D]",
      "hover:font-semibold",
      "hover:text-white",
      "text-[#252525B2]",
      "bg-[#25252526]",
      "font-medium"
    );

    button.addEventListener("click", () => {
      // button.classList.add("bg-red-500");
      handleCards(data.category_id);
      clickedButton = data.category;
    });

    buttonContainer.appendChild(button);
  }
};

const handleCards = async (id = 1000) => {
  const resp = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  data = await resp.json();

  // const drawingcardContainer = document.getElementById("drawing-container");
  cardContainer.innerHTML = "";
  // drawingcardContainer.innerHTML = "";
  if (data.data.length === 0) {
    const div = document.createElement("div");
    cardContainer.classList.remove("grid");
    div.innerHTML = `
    <div class= "w-[400px] lg:mt-16 h-[200px] mx-auto ">
    <img class="mx-auto py-7" src="./images//Icon.png" alt="">
    <h2 class="text-4xl font-bold">Oops!! Sorry, There is no content here</h2>
    </div>
    `;
    cardContainer.appendChild(div);
  } else {
    cardContainer.classList.add("grid");
  }

  data.data.forEach((element) => {
    // console.log(element);

    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card relative h-[320px] ">
    <figure class="">
      <img class="h-[250px] lg:h-[180px] w-full rounded-lg" src="${
        element.thumbnail
      }" />
    </figure>
    <div class="card-body   p-1">
      <div class=" flex ">
        <div class=" flex gap-3 mt-4">
          <div>
            <div class="avatar">
              <div class="w-10 rounded-full">
                <img src="${element.authors[0].profile_picture}" />
              </div>
            </div>
          </div>
          <div class="">
          <h3 id="posted-date" class="absolute lg:top-36 top-[200px] bg-[#171717] right-2 text-white text-[12px] rounded">${
            element.others.posted_date
              ? Math.floor(element.others.posted_date / 3600) + "hrs"
              : ""
          } ${
      element.others.posted_date
        ? Math.floor((element.others.posted_date % 3600) / 60) + "min ago"
        : ""
    }</h3>
            <h2 class="text-[16px] font-bold">${element.title}</h2>
            <h6 class="text-[14px] lg:my-3 text-[#111111B3]">${
              element.authors[0].profile_name
            } <span id="verified-id" class="">${
      element.authors[0].verified
        ? '<img class="inline" src="./images/fi_10629607.svg" alt="" />'
        : ""
    }</span></h6>
            <p class="text-[14px] text-[#111111B3]">${
              element.others.views
            } Views</p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
    `;

    cardContainer.appendChild(div);
  });
};

document.getElementById("sort-btn").addEventListener("click", () => {
  data?.data?.sort((a, b) => {
    return (
      parseFloat(b.others.views.slice(0, b.others.views.length - 1)) -
      parseFloat(a.others.views.slice(0, a.others.views.length - 1))
    );
  });
  cardContainer.textContent = "";

  data.data.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card relative h-[320px] ">
    <figure class="">
      <img class="h-[250px] lg:h-[180px] w-full rounded-lg" src="${
        element.thumbnail
      }" />
    </figure>
    <div class="card-body   p-1">
      <div class=" flex ">
        <div class=" flex gap-2">
          <div>
            <div class="avatar">
              <div class="w-10 rounded-full">
                <img src="${element.authors[0].profile_picture}" />
              </div>
            </div>
          </div>
          <div class="">
          <h3 id="posted-date" class="absolute lg:top-36 top-[200px] bg-[#171717] right-2 text-white">${
            element.others.posted_date
              ? Math.floor(element.others.posted_date / 3600) + "hrs"
              : ""
          } ${
      element.others.posted_date
        ? Math.floor((element.others.posted_date % 3600) / 60) + "min ago"
        : ""
    }</h3>
            <h2 class="text-[16px] font-bold">${element.title}</h2>
            <h6>${
              element.authors[0].profile_name
            } <span id="verified-id" class="">${
      element.authors[0].verified
        ? '<img class="inline" src="./images/fi_10629607.svg" alt="" />'
        : ""
    }</span></h6>
            <p>${element.others.views} Views</p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
    `;

    cardContainer.appendChild(div);
  });
});

handleCategory();
handleCards();

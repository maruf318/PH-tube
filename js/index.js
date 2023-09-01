const handleCategory = async () => {
  const resp = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const dataObject = await resp.json();
  const data = dataObject.data;
  // console.log(data);
  handleCategoriesName(data);
};

const handleCategoriesName = (data) => {
  // console.log(data);

  const buttonContainer = document.getElementById("button-container");
  for (const dataa of data) {
    const button = document.createElement("button");
    button.innerText = dataa.category;
    button.classList.add("btn", "m-6");
    button.addEventListener("click", () => {
      handleCards(dataa.category_id);
    });
    buttonContainer.appendChild(button);
  }
};
const handleCards = async (id = 1000) => {
  const resp = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await resp.json();
  const cardContainer = document.getElementById("card-container");
  // const drawingcardContainer = document.getElementById("drawing-container");
  cardContainer.innerHTML = "";
  // drawingcardContainer.innerHTML = "";
  if (data.data.length === 0) {
    const div = document.createElement("div");
    cardContainer.classList.remove("grid");
    div.innerHTML = `
    <div class= "w-[400px] h-[200px] mx-auto ">
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
    const postedDate = document.getElementById("posted-date");
    // if (element.others.posted_date) {
    //   postedDate.classList.add("hidden");
    // } else {
    //   postedDate.classList.remove("hidden");
    // }
    const verified = document.getElementById("verified-id");
    // // // verified.innerText = "";
    // if (element.authors[0].verified === true) {
    //   console.log(element.authors[0].verified);
    //   // console.log(element.authors[0].verified);
    //   // verified.innerHTML = `<img src="./images/fi_10629607.svg" alt="" />`;
    //   const image = document.createElement("img");
    //   image.setAttribute("src", "./images/fi_10629607.svg"); // Replace with the path to your image
    //   image.setAttribute("alt", "Verified Icon"); // Provide an alt text for accessibility
    //   verified.appendChild(image);
    // } else {
    //   verified.textContent = "Not available";
    //   console.log("false");
    // }
    const verifiedText = verified.innerText;
    console.log(verifiedText);
  });
};

handleCategory();
handleCards();

// ${(
// element.others.posted_date / 3600
// ).toFixed(0)}hrs

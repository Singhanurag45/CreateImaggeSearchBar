const accessKey = "7afxkrWei8aQVA38hundSEvCW-tVRcBVViCmG3a8tQI";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value.trim();
  if (!keyword) {
    alert("Please enter a search keyword!");
    return;
  }

  const url = `https://api.unsplash.com/search/photos?query=${keyword}&client_id=${accessKey}&page=${page}&per_page=12`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

    const data = await response.json();

    // Clear previous results only on first page
    if (page === 1) {
      searchResult.innerHTML = "";
    }

    data.results.forEach((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description || "Unsplash Image";

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";

      imageLink.appendChild(image);
      searchResult.appendChild(imageLink);
    });

    // Show "Show More" button if more results are available
    showMoreBtn.style.display = "block";
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// Handle Search Form Submission
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

// Handle "Show More" Button Click
showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});

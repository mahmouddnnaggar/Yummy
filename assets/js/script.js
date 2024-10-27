// ^ some html elements
const content = $("#mainContent");
const ourLogo = $("#ourLogo");

// ^ initial
$(function () {
  loading();
  searchByName("");
});

// ^ close and open sidebar
function openSidebar() {
  $("#sidebar").addClass("active");
  $("#toCloseAndOpen").html(`<i class="fa-solid fa-xmark"></i>`);

  $("#pages ul li").addClass("active");
}

function closeSidebar() {
  $("#sidebar").removeClass("active");
  $("#toCloseAndOpen").html(`<i class="fa-solid fa-bars"></i>`);

  $("#pages ul li").removeClass("active");
}

$("#toCloseAndOpen").on("click", function () {
  if (!$("#sidebar").hasClass("active")) {
    openSidebar();
  } else {
    closeSidebar();
  }
});

// ^ dealing with design and content
function resetContent(inSearch = false) {
  $(content).removeClass("in-contact");
  content.html("");
  innerLoading();
  closeSidebar();
  if (!inSearch) {
    $("#searchArea").css("display", "none");
  }
}

function loading() {
  $("#loadingScreen").removeClass("d-none");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    $("#loadingScreen").addClass("d-none");
    document.body.style.overflow = "auto";
  }, 2000);
}

function innerLoading() {
  $("#innerLoadingScreen").removeClass("d-none");
  $("#innerLoadingScreen").addClass("d-flex");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    $("#innerLoadingScreen").removeClass("d-flex");
    $("#innerLoadingScreen").addClass("d-none");
    document.body.style.overflow = "auto";
  }, 1800);
}

function displayMeals(meals) {
  content.html("");
  const data = meals
    .map(
      (meal) => `
      <div onclick="getMealDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${meal.strMealThumb}" alt="Meal Image">
        <div class="meal-layer position-absolute d-flex align-items-center text-black p-5">
          <h3>${meal.strMeal}</h3>
        </div>
      </div>
  `
    )
    .join("");
  content.html(data);
}

// ^ dealing with display data to our project
function displayMealDetails(meal) {
  content.html("");
  $(content).addClass("in-contact");

  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map((i) =>
      meal[`strIngredient${i}`]
        ? `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${
            meal[`strIngredient${i}`]
          }</li>`
        : ""
    )
    .join("");

  const tags = (meal.strTags?.split(",") || [])
    .map((tag) => `<li class="alert alert-danger m-2 p-1">${tag}</li>`)
    .join("");

  const data = `
  <div class="row text-white p-4 bg-dark rounded-3 shadow-lg">
    <div class="col-md-4 text-center mb-4 mb-md-0">
      <img class="w-100 rounded-3 mb-3" src="${meal.strMealThumb}" alt="${meal.strMeal} image">
      <h2 class="text-warning">${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
      <h2 class="text-info mb-3">Instructions</h2>
      <p class="text-light lh-lg">${meal.strInstructions}</p>
      
      <div class="d-flex flex-wrap gap-3 my-4">
        <h3 class="mb-0"><span class="fw-bold text-warning">Area:</span> ${meal.strArea}</h3>
        <h3 class="mb-0"><span class="fw-bold text-warning">Category:</span> ${meal.strCategory}</h3>
      </div>

      <h3 class="text-info mt-4">Recipes:</h3>
      <ul class="list-unstyled d-flex gap-2 flex-wrap mb-4">
        ${ingredients}
      </ul>

      <h3 class="text-info">Tags:</h3>
      <ul class="list-unstyled d-flex gap-2 flex-wrap mb-4">
        ${tags}
      </ul>

      <div class="d-flex gap-3">
        <a target="_blank" href="${meal.strSource}" class="btn btn-outline-success btn-lg">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-outline-danger btn-lg">YouTube</a>
      </div>
    </div>
  </div>`;

  content.html(data);
}

function displayCategories(arr) {
  const data = arr
    .map(
      (item, index) => `
          <div onclick="getCategoryMeals('${
            arr[index].strCategory
          }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${item.strCategoryThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
              <h3>${item.strCategory}</h3>
              <p>${item.strCategoryDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
            </div>
          </div>
      `
    )
    .join("");

  content.html(data);
}

function displayArea(arr) {
  const data = arr
    .map(
      (item) => `
          <div onclick="getAreaMeals('${item.strArea}')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
            <h3 class="text-white">${item.strArea}</h3>
          </div>
      `
    )
    .join("");
  content.html(data);
}

function displayIngredients(arr) {
  const data = arr
    .map(
      (item) => `
          <div onclick="getIngredientsMeals('${
            item.strIngredient
          }')" class="rounded-2 text-center cursor-pointer text-white">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${item.strIngredient}</h3>
            <p>${item.strDescription.split(" ").slice(0, 20).join(" ")}</p>
          </div>
      `
    )
    .join("");

  content.html(data);
}

function displayOurForm() {
  const namePattern = "^[A-Za-z\\s]{3,}$";
  const emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
  const phonePattern = "^[0-9]{11}$";
  const passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";

  content.addClass("in-contact");

  const data = `
  <div class="contact-form text-white d-flex align-items-center justify-content-center min-vh-100 w-100">
    <div class="w-100" style="max-width: 700px;">
      <h3 class="text-center mb-4">Contact Us</h3>
      
      <form action="" class="d-flex flex-wrap gap-3 w-100" id="contactForm" autocomplete="off">
        <div class="row w-100">
          <div class="col-md-6 mb-3">
            <input type="text" id="name" placeholder="Name" class="form-control" pattern="${namePattern}" title="Name should contain at least 3 letters" autocomplete="off" required>
            <div class="invalid-feedback">Please enter a valid name with at least 3 letters.</div>
          </div>
          
          <div class="col-md-6 mb-3">
            <input type="email" id="email" placeholder="Email" class="form-control" pattern="${emailPattern}" title="Please enter a valid email address" autocomplete="off" required>
            <div class="invalid-feedback">Please enter a valid email address.</div>
          </div>
        </div>

        <div class="row w-100">
          <div class="col-md-6 mb-3">
            <input type="tel" id="phone" placeholder="Phone" class="form-control" pattern="${phonePattern}" title="Phone number should be 11 digits" autocomplete="off" required>
            <div class="invalid-feedback">Phone number should be 11 digits.</div>
          </div>

          <div class="col-md-6 mb-3">
            <input type="number" id="age" placeholder="Age" class="form-control" min="16" max="100" title="Age must be between 16 and 100" autocomplete="off" required>
            <div class="invalid-feedback">Age must be between 16 and 100.</div>
          </div>
        </div>

        <div class="row w-100">
          <div class="col-md-6 mb-3">
            <input type="password" id="password" placeholder="Password" class="form-control" pattern="${passwordPattern}" title="Password must be at least 8 characters long and include both letters and numbers" autocomplete="off" required>
            <div class="invalid-feedback">Password must be at least 8 characters long and include both letters and numbers.</div>
          </div>

          <div class="col-md-6 mb-3">
            <input type="password" id="confirmPassword" placeholder="Confirm Password" class="form-control" autocomplete="off" required>
            <div class="invalid-feedback">Please confirm your password.</div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-50 mx-auto mt-4">Send</button>
      </form>

      <div id="formAlert" class="alert alert-danger mt-3 d-none" role="alert"></div>
    </div>
  </div>`;

  content.html(data);

  $("#contactForm input").on("blur", function () {
    if (!this.checkValidity()) {
      $(this).addClass("is-invalid");
      $(this).siblings(".invalid-feedback").text(this.title);
    } else {
      $(this).removeClass("is-invalid");
      $(this).siblings(".invalid-feedback").text("");
    }
  });

  $("#confirmPassword").on("blur", function () {
    const password = $("#password").val();
    const confirmPassword = $(this).val();
    if (password !== confirmPassword) {
      $(this).addClass("is-invalid");
      $(this).siblings(".invalid-feedback").text("Passwords do not match!");
    } else {
      $(this).removeClass("is-invalid");
      $(this).siblings(".invalid-feedback").text("");
    }
  });

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();

    if (password !== confirmPassword) {
      $("#formAlert")
        .removeClass("d-none")
        .addClass("alert-danger")
        .text("Passwords do not match!");
      return;
    }

    if (this.checkValidity()) {
      $("#formAlert")
        .removeClass("d-none alert-danger")
        .addClass("alert-success")
        .text("Form submitted successfully!");
      this.reset();
    } else {
      $("#formAlert")
        .removeClass("d-none")
        .addClass("alert-danger")
        .text("Please fill all fields correctly!");
    }
  });
}

// ^ dealing with apis
const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

async function fetchData(endpoint, queryParam = "") {
  const response = await fetch(`${BASE_URL}${endpoint}${queryParam}`);
  const data = await response.json();
  return data;
}

function limitAndDisplay(data, displayFunction, limit = 20) {
  displayFunction(data.slice(0, limit));
}

function enforceSingleLetterInput(selector) {
  $(selector).on("input", function (e) {
    const value = e.target.value;
    if (value.length > 1) e.target.value = value[0];
    if (!/^[A-Za-z]$/.test(e.target.value)) e.target.value = "";
  });
}

async function getMealDetails(mealID) {
  resetContent();
  try {
    const { meals } = await fetchData("lookup.php", `?i=${mealID}`);
    displayMealDetails(meals[0]);
  } catch (error) {
    console.error("Error fetching meal details:", error);
  }
}

async function getCategories() {
  resetContent();
  try {
    const { categories } = await fetchData("categories.php");
    displayCategories(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

async function getCategoryMeals(category) {
  resetContent();
  try {
    const { meals } = await fetchData("filter.php", `?c=${category}`);
    limitAndDisplay(meals, displayMeals);
  } catch (error) {
    console.error("Error fetching category meals:", error);
  }
}

async function getArea() {
  resetContent();
  try {
    const { meals } = await fetchData("list.php", "?a=list");
    displayArea(meals);
  } catch (error) {
    console.error("Error fetching areas:", error);
  }
}

async function getAreaMeals(area) {
  resetContent();
  try {
    const { meals } = await fetchData("filter.php", `?a=${area}`);
    limitAndDisplay(meals, displayMeals);
  } catch (error) {
    console.error("Error fetching area meals:", error);
  }
}

async function getIngredients() {
  resetContent();
  try {
    const { meals } = await fetchData("list.php", "?i=list");
    limitAndDisplay(meals, displayIngredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
  }
}

async function getIngredientsMeals(ingredient) {
  resetContent();
  try {
    const { meals } = await fetchData("filter.php", `?i=${ingredient}`);
    limitAndDisplay(meals, displayMeals);
  } catch (error) {
    console.error("Error fetching meals by ingredient:", error);
  }
}

async function searchByName(term) {
  resetContent(true);
  enforceSingleLetterInput(
    `#searchArea input[placeholder="Search By First Letter"]`
  );

  try {
    const { meals = [] } = await fetchData("search.php", `?s=${term}`);
    displayMeals(meals);
  } catch (error) {
    console.error("Error searching meals by name:", error);
  }
}

// ^ dealing with events
const selectors = {
  logo: "#ourLogo",
  searchLink: "#searchLink",
  searchArea: "#searchArea",
  searchInput: "#searchArea input",
  categoriesLink: "#categoriesLink",
  areaLink: "#areaLink",
  ingredientsLink: "#ingredientsLink",
  contactUsLink: "#contactUsLink",
  content: "#content",
};

function initEventListeners() {
  $(selectors.logo).on("click", handleLogoClick);
  $(selectors.searchLink).on("click", showSearchArea);
  $(selectors.searchInput).on("input", handleSearchInput);
  $(selectors.categoriesLink).on("click", getCategories);
  $(selectors.areaLink).on("click", getArea);
  $(selectors.ingredientsLink).on("click", getIngredients);
  $(selectors.contactUsLink).on("click", handleContactUsClick);
}

function handleLogoClick() {
  resetContent();
  searchByName("");
}

function showSearchArea() {
  $(selectors.searchArea).css("display", "block");
  resetContent(true);
}

function handleSearchInput() {
  const term = $(selectors.searchInput).val().trim();
  searchByName(term);
}

function handleContactUsClick() {
  $(selectors.content).addClass("in-contact");
  closeSidebar();
  $(selectors.content).empty();
  displayOurForm();
}

$(function () {
  initEventListeners();
});

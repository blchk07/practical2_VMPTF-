const filterInput = document.getElementById("filterInput");
const filterButton = document.getElementById("filterButton");
const showAllButton = document.getElementById("showAllButton");
const result = document.getElementById("result");
const errorText = document.getElementById("error");

let products = [];

fetch("products.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Помилка завантаження");
    }
    return response.json();
  })
  .then(data => {
    products = data;
    renderProducts(products);
  })
  .catch(error => {
    errorText.textContent = error.message;
  });

filterButton.addEventListener("click", () => {
  const value = filterInput.value.trim().toLowerCase();

  const filtered = products.filter(product =>
    product.category.toLowerCase() === value
  );

  renderProducts(filtered);
});

showAllButton.addEventListener("click", () => {
  filterInput.value = "";
  renderProducts(products);
});

function renderProducts(data) {
  result.innerHTML = "";

  if (data.length === 0) {
    result.textContent = "Нічого не знайдено";
    return;
  }

  data.forEach(product => {
    const card = document.createElement("div");
    card.className = "json-filter__card";

    card.innerHTML = `
      <div class="json-filter__card-name">${product.name}</div>
      <div class="json-filter__card-category">${product.category}</div>
      <div class="json-filter__card-price">${product.price} грн</div>
    `;

    result.appendChild(card);
  });
}
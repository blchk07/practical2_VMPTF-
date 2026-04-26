const shoppingList = document.getElementById("shoppingList");
const errorText = document.getElementById("error");

fetch("shopping-list.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Помилка завантаження");
    }

    return response.text();
  })
  .then(text => {
    const products = JSON.parse(text);

    products.forEach(product => {
      const li = document.createElement("li");
      li.className = "shopping__item";
      li.textContent = `${product.name} - ${product.quantity} шт.`;
      shoppingList.appendChild(li);
    });
  })
  .catch(error => {
    errorText.textContent = error.message;
  });
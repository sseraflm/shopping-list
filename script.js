let productCount = document.getElementById("productCount");
let boughtProductCount = document.getElementById("boughtProductCount");
let productList = document.getElementById("productList");
let createProductButton = document.getElementById("createProduct");
let noProducts = document.getElementById("noProducts");
let products = [
    {
        id: 1,
        name: "Ado's CD",
        quantity: 43,
        category: "Music",
        isBought: true,
    },
    {
        id: 2,
        name: "Mazda RX-7",
        quantity: 1,
        category: "Vehicles",
        isBought: false,
    },
    {
        id: 3,
        name: "RTX 5090",
        quantity: 1,
        category: "Computer parts",
        isBought: false,
    },
    {
        id: 4,
        name: "Water",
        quantity: 1,
        category: "Drinks",
        isBought: true,
    },
];

function createProductItem(product) {
    let productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.dataset.id = product.id;

    let productName = document.createElement("h2");
    productName.innerText = `Name: ${product.name}`;

    let productQuantity = document.createElement("p");
    productQuantity.innerText = `Quantity: ${product.quantity}`;

    let productCategory = document.createElement("p");
    productCategory.innerText = `Product category: ${product.category}`;

    let productIsBought = document.createElement("p");

    let boughtCheckbox = document.createElement("input");
    boughtCheckbox.setAttribute("type", "checkbox");
    boughtCheckbox.classList.add("boughtCheck");
    boughtCheckbox.checked = product.isBought;
    if (boughtCheckbox.checked) {
        productIsBought.innerText = `Is the product bought: Yes`;
        productCard.classList.add("bought");
    } else {
        productIsBought.innerText = `Is the product bought: No`;
        productCard.classList.remove("bought");
    }

    boughtCheckbox.addEventListener("change", () => {
        product.isBought = boughtCheckbox.checked;
        if (boughtCheckbox.checked) {
            productIsBought.innerText = `Is the product bought: Yes`;
            updateBoughtProductsCount(products, boughtProductCount);
            productCard.classList.add("bought");
        } else {
            productIsBought.innerText = `Is the product bought: No`;
            updateBoughtProductsCount(products, boughtProductCount);
            productCard.classList.remove("bought");
        }
    });

    let boughtCheckLabel = document.createElement("label");
    boughtCheckLabel.innerText = "Check to mark the product as bought.";
    let br = document.createElement("br");

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("removeObject");
    deleteButton.innerText = "Delete Object";
    deleteButton.addEventListener("click", deleteObject);

    productCard.append(
        productName,
        productQuantity,
        productCategory,
        productIsBought,
        boughtCheckbox,
        boughtCheckLabel,
        br,
        deleteButton,
    );

    return productCard;
}
function deleteObject(event) {
    event.preventDefault();
    let closestProduct = event.target.closest(".product-card");
    let productId = closestProduct.dataset.id;
    let numberProductId = Number(productId);
    let productIndex = products.findIndex(product => product.id === numberProductId);
    products.splice(productIndex, 1);
    renderProducts(products, productList);
    updateAllProductCount(products, productCount);
    updateBoughtProductsCount(products, boughtProductCount);
}
function renderProducts(productsArray, container) {
    container.innerHTML = "";
    if (productsArray.length === 0) {
        noProducts.classList.remove("hidden");
        return;
    } else if (productsArray.length > 0) {
        noProducts.classList.add("hidden");
    }
    for (let product of productsArray) {
        let productCard = createProductItem(product);
        container.append(productCard);
    }
}

function getBoughtProducts(productsArray) {
    let boughtProducts = productsArray.filter(product => product.isBought);
    return boughtProducts;
}

function updateAllProductCount(productsArray, container) {
    let allProductCounts = productsArray.length;
    container.innerText = `There are currently ${allProductCounts} products in the list.`;
}

function updateBoughtProductsCount(productsArray, container) {
    let boughtProducts = getBoughtProducts(productsArray);

    container.innerText = `There are currently ${boughtProducts.length} products bought.`;
}

let objectId = 5;

function createNewProducts(event) {
    event.preventDefault();
    let nameInput = document.getElementById("nameInput");
    let quantityInput = document.getElementById("quantityInput");
    let categoryInput = document.getElementById("categoryInput");

    let newObject = {
        id: objectId++,
        name: nameInput.value,
        quantity: quantityInput.value,
        category: categoryInput.value,
        isBought: false,
    };
    products.push(newObject);
    nameInput.value = "";
    quantityInput.value = "";
    categoryInput.value = "";
    renderProducts(products, productList);
    updateAllProductCount(products, productCount);
}

renderProducts(products, productList);
updateAllProductCount(products, productCount);
updateBoughtProductsCount(products, boughtProductCount);

createProductButton.addEventListener("click", createNewProducts);

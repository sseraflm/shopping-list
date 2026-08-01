let productCount = document.getElementById("productCount");
let boughtProductCount = document.getElementById("boughtProductCount");
let productList = document.getElementById("productList");
let boughtProductList = document.getElementById("boughtProductList");

let products = [
    {
        name: "Ado's CD",
        quantity: 43,
        category: "Music",
        isBought: true,
    },
    {
        name: "Mazda RX-7",
        quantity: 1,
        category: "Vehicles",
        isBought: false,
    },
    {
        name: "RTX 5090",
        quantity: 1,
        category: "Computer parts",
        isBought: false,
    },
    {
        name: "Water",
        quantity: 1,
        category: "Drinks",
        isBought: true,
    },
];

function createProductItem(product) {
    let productCard = document.createElement("div");
    productCard.className = "product-card";

    let productName = document.createElement("h2");
    productName.innerText = `Name: ${product.name}`;

    let productQuantity = document.createElement("p");
    productQuantity.innerText = `Quantity: ${product.quantity}`;

    let productCategory = document.createElement("p");
    productCategory.innerText = `Product category: ${product.category}`;

    let productIsBought = document.createElement("p");
    if (product.isBought) {
        productIsBought.innerText = `Is the product bought: Yes`;
        productCard.classList.add("bought");
    } else {
        productIsBought.innerText = `Is the product bought: No`;
    }
    productCard.append(productName, productQuantity, productCategory, productIsBought);

    return productCard;
}

function renderProducts(productsArray, container) {
    container.innerHTML = "";
    if (productsArray.length === 0) {
        alert("The shopping list is empty.");
        return;
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

renderProducts(products, productList);
updateAllProductCount(products, productCount);
updateBoughtProductsCount(products, boughtProductCount);
let boughtProducts = getBoughtProducts(products);
renderProducts(boughtProducts, boughtProductList);

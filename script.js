const productCount = document.getElementById("productCount");
const boughtProductCount = document.getElementById("boughtProductCount");
const productList = document.getElementById("productList");
const createProductButton = document.getElementById("createProduct");
const noProducts = document.getElementById("noProducts");
const products = [
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
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.dataset.id = product.id;

    const productName = document.createElement("h2");
    productName.innerText = `Name: ${product.name}`;

    const productQuantity = document.createElement("p");
    productQuantity.innerText = `Quantity: ${product.quantity}`;

    const productCategory = document.createElement("p");
    productCategory.innerText = `Product category: ${product.category}`;

    const productIsBought = document.createElement("p");

    const boughtCheckbox = document.createElement("input");
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

    const boughtCheckLabel = document.createElement("label");
    boughtCheckLabel.innerText = "Check to mark the product as bought.";
    const br = document.createElement("br");

    const deleteButton = document.createElement("button");
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
    const closestProduct = event.target.closest(".product-card");
    const productId = closestProduct.dataset.id;
    const numberProductId = Number(productId);
    const productIndex = products.findIndex(product => product.id === numberProductId);
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
    for (const product of productsArray) {
        const productCard = createProductItem(product);
        container.append(productCard);
    }
}

function getBoughtProducts(productsArray) {
    const boughtProducts = productsArray.filter(product => product.isBought);
    return boughtProducts;
}

function updateAllProductCount(productsArray, container) {
    const allProductCounts = productsArray.length;
    container.innerText = `There are currently ${allProductCounts} products in the list.`;
}

function updateBoughtProductsCount(productsArray, container) {
    const boughtProducts = getBoughtProducts(productsArray);

    container.innerText = `There are currently ${boughtProducts.length} products bought.`;
}

let objectId = 5;

function createNewProducts(event) {
    event.preventDefault();
    const nameInput = document.getElementById("nameInput");
    const quantityInput = document.getElementById("quantityInput");
    const categoryInput = document.getElementById("categoryInput");

    const newObject = {
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

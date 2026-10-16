/* ================= PRODUCTS ================= */

const productList = [

    {
        id: 1,
        name: "Smartphone",
        description: "Latest smartphone with powerful performance",
        price: 15999,
        rating: "⭐⭐⭐⭐⭐",
        image: "📱",
        category: "Electronics"
    },

    {
        id: 2,
        name: "Laptop",
        description: "Fast laptop for study and work",
        price: 45999,
        rating: "⭐⭐⭐⭐⭐",
        image: "💻",
        category: "Electronics"
    },

    {
        id: 3,
        name: "Wireless Headphones",
        description: "High quality wireless headphones",
        price: 2499,
        rating: "⭐⭐⭐⭐",
        image: "🎧",
        category: "Electronics"
    },

    {
        id: 4,
        name: "Smart Watch",
        description: "Fitness tracking smart watch",
        price: 2999,
        rating: "⭐⭐⭐⭐",
        image: "⌚",
        category: "Electronics"
    },

    {
        id: 5,
        name: "Men's T-Shirt",
        description: "Comfortable cotton t-shirt",
        price: 599,
        rating: "⭐⭐⭐⭐",
        image: "👕",
        category: "Fashion"
    },

    {
        id: 6,
        name: "Running Shoes",
        description: "Lightweight running shoes",
        price: 1899,
        rating: "⭐⭐⭐⭐⭐",
        image: "👟",
        category: "Fashion"
    },

    {
        id: 7,
        name: "Backpack",
        description: "Stylish backpack for college",
        price: 999,
        rating: "⭐⭐⭐⭐",
        image: "🎒",
        category: "Fashion"
    },

    {
        id: 8,
        name: "Table Lamp",
        description: "Modern LED study table lamp",
        price: 799,
        rating: "⭐⭐⭐⭐",
        image: "💡",
        category: "Home"
    },

    {
        id: 9,
        name: "Coffee Mug",
        description: "Premium ceramic coffee mug",
        price: 299,
        rating: "⭐⭐⭐⭐",
        image: "☕",
        category: "Home"
    },

    {
        id: 10,
        name: "Programming Book",
        description: "Learn programming from basics",
        price: 699,
        rating: "⭐⭐⭐⭐⭐",
        image: "📚",
        category: "Books"
    },

    {
        id: 11,
        name: "Notebook",
        description: "Premium ruled notebook",
        price: 199,
        rating: "⭐⭐⭐⭐",
        image: "📓",
        category: "Books"
    },

    {
        id: 12,
        name: "Keyboard",
        description: "Mechanical keyboard for programmers",
        price: 1999,
        rating: "⭐⭐⭐⭐⭐",
        image: "⌨️",
        category: "Electronics"
    }

];


/* ================= CART ================= */

let cart = [];


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(products) {

    const productsDiv =
        document.getElementById("products");

    productsDiv.innerHTML = "";


    if (products.length === 0) {

        productsDiv.innerHTML =
            "<h3>No products found.</h3>";

        return;
    }


    products.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">
                ${product.image}
            </div>

            <h3>${product.name}</h3>

            <p class="product-description">
                ${product.description}
            </p>

            <div class="rating">
                ${product.rating}
            </div>

            <div class="price">
                ₹${product.price.toLocaleString("en-IN")}
            </div>

            <button
                class="add-cart"
                onclick="addToCart(${product.id})">

                Add to Cart

            </button>

        `;


        productsDiv.appendChild(card);

    });

}


/* ================= SEARCH ================= */

function searchProducts() {

    const searchText =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();


    const selectedCategory =
        document
        .getElementById("category")
        .value;


    let filteredProducts =
        productList.filter(product => {

            const matchesSearch =
                product.name
                .toLowerCase()
                .includes(searchText);


            const matchesCategory =
                selectedCategory === "All" ||
                product.category === selectedCategory;


            return matchesSearch &&
                   matchesCategory;

        });


    displayProducts(filteredProducts);

}


/* ================= SEARCH ENTER KEY ================= */

document
    .getElementById("searchInput")
    .addEventListener("keyup", function(event) {

        if (event.key === "Enter") {

            searchProducts();

        }

    });


/* ================= ADD TO CART ================= */

function addToCart(productId) {

    const product =
        productList.find(
            item => item.id === productId
        );


    cart.push(product);


    updateCart();


    alert(
        product.name +
        " added to cart!"
    );

}


/* ================= UPDATE CART ================= */

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");


    cartCount.textContent =
        cart.length;


    const cartItems =
        document.getElementById("cartItems");


    const cartTotal =
        document.getElementById("cartTotal");


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        cartTotal.textContent = "0";

        return;
    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((product, index) => {

        total += product.price;


        const item =
            document.createElement("div");


        item.className =
            "cart-item";


        item.innerHTML = `

            <div class="cart-item-info">

                <h4>
                    ${product.image}
                    ${product.name}
                </h4>

                <p>
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">

                Remove

            </button>

        `;


        cartItems.appendChild(item);

    });


    cartTotal.textContent =
        total.toLocaleString("en-IN");

}


/* ================= REMOVE FROM CART ================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* ================= SHOW CART ================= */

function showCart() {

    document
        .getElementById("cartBox")
        .classList
        .add("active");

}


/* ================= CLOSE CART ================= */

function closeCart() {

    document
        .getElementById("cartBox")
        .classList
        .remove("active");

}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert(
        "Thank you for shopping! Checkout feature coming soon."
    );

}


/* ================= SHOP NOW ================= */

function scrollToProducts() {

    document
        .getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= INITIAL LOAD ================= */

displayProducts(productList);
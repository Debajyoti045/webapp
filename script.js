document.addEventListener('DOMContentLoaded', function() {
    let products = document.querySelector('.products');
    let searchInput = document.getElementById('searchInput');
    let searchButton = document.getElementById('searchButton');
    let originalProducts = [];
    async function fetchProducts(url) {
        try {
            let data = await fetch(url);
            let response = await data.json();

            for (let i = 0; i < response.length; i++) {
                let description = response[i].description;
                let title = response[i].title;
                products.innerHTML += `
            <div class="product">
                <img src="${response[i].image}" alt="${
                response[i].category
                }" class="product-img">
                <div class="product-content">
                    <h2 class="product-title">${
                        title.length > 18 ? title.substring(0, 18).concat(' ...') : title
                    }</h2>
            
                    <p class="product-description">${
                        description.length > 80
                        ? description.substring(0, 80).concat(' ...more')
                        : description
                    }</p>
                    <div class="product-price-container">
                        <h3 class="product-price">$${response[i].price}</h3>
                        <a href="#!" data-productId="${
                            response[i].id
                        }" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
                    </div>
                </div>
            </div>`;
            }
        } catch (err) {
            console.log(err);
        }
    }
    function filterProducts(query, productArray) {
        return productArray.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    async function displayFilteredProducts(query) {
        products.innerHTML = ''; // Clear existing products

        try {
            let data = await fetch('https://fakestoreapi.com/products');
            let response = await data.json();
            
            let filteredProducts = filterProducts(query, response);

            for (let i = 0; i < filteredProducts.length; i++) {
            }
        } catch (err) {
            console.log(err);
        }
    }

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value;
        displayFilteredProducts(searchTerm);
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const searchTerm = searchInput.value;
            displayFilteredProducts(searchTerm);
        }
    });

    fetchProducts('https://fakestoreapi.com/products');
});

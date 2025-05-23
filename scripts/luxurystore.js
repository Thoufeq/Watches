document.addEventListener("DOMContentLoaded", function () {
  // Core Elements
  const sortSelect = document.getElementById("sort");
  const grid = document.querySelector(".product-grid");
  const filterSelect = document.getElementById("filter");
  const priceRange = document.querySelector(".filter-group input[type='range']");
  const priceDisplay = document.querySelector(".filter-group span");
  const applyFiltersBtn = document.querySelector(".apply-filters");
  const resetBtn = document.querySelector(".reset");
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  // Filter Elements
  const categoryCheckboxes = document.querySelectorAll(".filter-group input[type='checkbox'][value='Dress'], .filter-group input[type='checkbox'][value='Dive'], .filter-group input[type='checkbox'][value='Chronograph'], .filter-group input[type='checkbox'][value='Smart']");
  const movementTypeRadios = document.querySelectorAll(".filter-group input[type='radio'][name='movement']");
  const otherFilters = document.querySelectorAll(".filter-group input[type='checkbox'][value='New'], .filter-group input[type='checkbox'][value='Popular'], .filter-group input[type='checkbox'][value='Offer']");

  // Constants
  const ITEMS_PER_PAGE = 10;
  let currentlyShownItems = ITEMS_PER_PAGE;

  // Get brand from URL
  const urlParams = new URLSearchParams(window.location.search);
  const brandFilter = urlParams.get('brand');

  // Store all products
  const allProducts = Array.from(grid.querySelectorAll(".product-card"));

  // Create See More button
  const seeMoreBtn = document.createElement("button");
  seeMoreBtn.className = "see-more-btn";
  seeMoreBtn.textContent = "See More";
  seeMoreBtn.style.cssText = `
    background-color: #d4af37;
    color: #121212;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
    margin: 30px auto;
    display: block;
  `;
  grid.parentNode.insertBefore(seeMoreBtn, grid.nextSibling);

  // Initial brand filtering
  if (brandFilter) {
    filterByBrand(brandFilter);
  }

  // Initialize page display
  initializePageDisplay();

  // Event Listeners
  priceRange.addEventListener("input", updatePriceDisplay);
  seeMoreBtn.addEventListener("click", handleSeeMore);
  applyFiltersBtn.addEventListener("click", applyFilters);
  resetBtn.addEventListener("click", resetFilters);
  sortSelect.addEventListener("change", handleSort);
  searchButton.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch();
    }
  });

  // Core Functions
  function filterByBrand(brand) {
  let foundProducts = false;

  allProducts.forEach(card => {
    const brandText = card.querySelector('.brand').textContent.toLowerCase();
    let shouldShow = false;

    switch(brand) {
      case 'cartier':
        shouldShow = brandText === 'cartier';
        break;
      case 'rolex':
        shouldShow = brandText === 'rolex';
        break;
      case 'patek':
        shouldShow = brandText === 'patek philippe';
        break;
      case 'omega':
        shouldShow = brandText === 'omega';
        break;
      case 'jacob':
        shouldShow = brandText === 'jacob & co.';
        break;
      case 'ap':
        shouldShow = brandText === 'audemars piguet';
        break;
      case 'rm':
        shouldShow = brandText === 'richard mille';
        break;
    }

    if (shouldShow) {
      card.style.display = 'flex';
      foundProducts = true;
    } else {
      card.style.display = 'none';
    }
  });

  if (!foundProducts) {
    const noResultsMessage = document.createElement('div');
    noResultsMessage.textContent = `No watches found for ${brand.toUpperCase()}`;
    noResultsMessage.className = 'no-results-message';
    grid.appendChild(noResultsMessage);
  }
}

  function updatePriceDisplay() {
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(this.value);

    priceDisplay.textContent = `Up to ${formattedPrice}`;
  }

  function handleSeeMore() {
    const hiddenProducts = Array.from(grid.querySelectorAll(".product-card[style*='display: none']"));
    hiddenProducts.slice(0, ITEMS_PER_PAGE).forEach(product => {
      product.style.display = "flex";
    });

    currentlyShownItems += ITEMS_PER_PAGE;
    seeMoreBtn.style.display = currentlyShownItems >= allProducts.length ? "none" : "block";
  }

  function applyFilters() {
    currentlyShownItems = ITEMS_PER_PAGE;

    const selectedCategories = Array.from(categoryCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    const selectedMovement = Array.from(movementTypeRadios)
      .find(radio => radio.checked)?.value;

    const selectedOtherFilters = Array.from(otherFilters)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    const maxPrice = parseInt(priceRange.value);

    const filteredProducts = allProducts.filter(product => {
      if (brandFilter) {
        const brandName = product.querySelector('.brand').textContent.toLowerCase();
        const brandMatches = {
          'cartier': brandName.includes('cartier'),
          'rolex': brandName.includes('rolex'),
          'patek': brandName.includes('patek'),
          'omega': brandName.includes('omega'),
          'jacob': brandName.includes('jacob'),
          'ap': brandName.includes('audemars'),
          'rm': brandName.includes('richard')
        };

        if (!brandMatches[brandFilter]) return false;
      }

      const price = parseInt(product.dataset.price);
      const specs = product.querySelector(".specs").textContent;
      const badges = Array.from(product.querySelectorAll(".badge")).map(badge => badge.textContent);

      if (price > maxPrice) return false;

      if (selectedCategories.length > 0) {
        const categoryMatch = selectedCategories.some(category =>
          specs.includes(`Category: ${category}`) ||
          specs.includes(`Category: ${category} Watch`)
        );
        if (!categoryMatch) return false;
      }

      if (selectedMovement && selectedMovement !== "All") {
        if (!specs.includes(`Movement: ${selectedMovement}`)) return false;
      }

      if (selectedOtherFilters.includes("New") && !badges.some(b => b.includes("NEW"))) return false;
      if (selectedOtherFilters.includes("Popular") && !badges.some(b => b.includes("POPULAR"))) return false;
      if (selectedOtherFilters.includes("Offer") && !badges.some(b => b.includes("OFF"))) return false;

      return true;
    });

    updateProductDisplay(filteredProducts);
    sortProducts(sortSelect.value, filteredProducts);
  }

  function resetFilters() {
    currentlyShownItems = ITEMS_PER_PAGE;

    categoryCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    movementTypeRadios.forEach(radio => {
      radio.checked = radio.value === "All";
    });

    otherFilters.forEach(checkbox => {
      checkbox.checked = false;
    });

    priceRange.value = priceRange.max;
    priceDisplay.textContent = `Up to $${priceRange.max}`;

    if (brandFilter) {
      filterByBrand(brandFilter);
    } else {
      updateProductDisplay(allProducts);
    }

    sortProducts(sortSelect.value, allProducts);
  }

  function handleSort() {
    currentlyShownItems = ITEMS_PER_PAGE;
    const visibleProducts = Array.from(grid.querySelectorAll(".product-card:not([style*='display: none'])"));
    sortProducts(this.value, visibleProducts);
  }

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let foundProducts = false;

    const existingMessage = document.querySelector('.no-results-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    allProducts.forEach(card => {
      const cardText = card.textContent.toLowerCase();
      const matches = cardText.includes(searchTerm);

      card.style.display = matches ? 'flex' : 'none';
      if (matches) foundProducts = true;
    });

    if (!foundProducts) {
      showNoResultsMessage(searchInput.value);
    }
  }

  function showNoResultsMessage(searchTerm) {
    const noResultsMessage = document.createElement('div');
    noResultsMessage.classList.add('no-results-message');
    noResultsMessage.innerHTML = `
      <div style="text-align: center; padding: 40px; color: #d4af37; font-size: 18px; width: 100%;">
        <i class="fas fa-search" style="font-size: 24px; margin-bottom: 10px;"></i>
        <p>No products found matching "${searchTerm}"</p>
        <p style="font-size: 14px; color: #888; margin-top: 5px;">Try different keywords or check your spelling</p>
      </div>
    `;
    grid.appendChild(noResultsMessage);
  }

  function initializePageDisplay() {
    allProducts.forEach((product, index) => {
      product.style.display = index < ITEMS_PER_PAGE ? "flex" : "none";
    });

    seeMoreBtn.style.display = allProducts.length > ITEMS_PER_PAGE ? "block" : "none";
  }

  function sortProducts(sortValue, products) {
    let sortedProducts = [...products];

    switch (sortValue) {
      case "priceLowHigh":
        sortedProducts.sort((a, b) => +a.dataset.price - +b.dataset.price);
        break;
      case "priceHighLow":
        sortedProducts.sort((a, b) => +b.dataset.price - +a.dataset.price);
        break;
      case "rating":
        sortedProducts.sort((a, b) => +b.dataset.rating - +a.dataset.rating);
        break;
      case "year":
        sortedProducts.sort((a, b) => +b.dataset.year - +a.dataset.year);
        break;
    }

    updateProductDisplay(sortedProducts);
  }

  function updateProductDisplay(productsToShow) {
    grid.innerHTML = '';

    if (productsToShow.length === 0) {
      showNoResultsMessage("your filters");
      seeMoreBtn.style.display = "none";
      return;
    }

    productsToShow.forEach((product, index) => {
      product.style.display = index < currentlyShownItems ? "flex" : "none";
      grid.appendChild(product);
    });

    seeMoreBtn.style.display = currentlyShownItems < productsToShow.length ? "block" : "none";
  }
});



document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
        // Collect product data from the card
        const productData = {
            image: this.querySelector('.card-image img').src,
            brand: this.querySelector('.brand').textContent,
            model: this.querySelector('.model').textContent,
            rating: this.querySelector('.rating').textContent,
            price: this.querySelector('.price .current').textContent,
            year: this.querySelector('.specs p:nth-child(1)').textContent,
            movement: this.querySelector('.specs p:nth-child(2)').textContent,
            material: this.querySelector('.specs p:nth-child(3)').textContent,
            category: this.querySelector('.specs p:nth-child(4)').textContent
        };

        // Store the data in localStorage
        localStorage.setItem('selectedProduct', JSON.stringify(productData));

        // Redirect to product details page
        window.location.href = 'product-details.html';
    });
});
document.addEventListener("DOMContentLoaded", function () {
  const sortSelect = document.getElementById("sort");
  const grid = document.querySelector(".product-grid");

  sortSelect.addEventListener("change", () => {
    const cards = Array.from(grid.querySelectorAll(".product-card"));
    const val = sortSelect.value;

    let sortedCards = [...cards];

    switch (val) {
      case "priceLowHigh":
        sortedCards.sort((a, b) => +a.dataset.price - +b.dataset.price);
        break;
      case "priceHighLow":
        sortedCards.sort((a, b) => +b.dataset.price - +a.dataset.price);
        break;
      case "rating":
        sortedCards.sort((a, b) => +b.dataset.rating - +a.dataset.rating);
        break;
      case "year":
        sortedCards.sort((a, b) => +b.dataset.year - +a.dataset.year);
        break;
      default:
        return; // Do nothing for "default"
    }

    // Re-render the sorted cards
    grid.innerHTML = '';
    sortedCards.forEach(card => grid.appendChild(card));
  });

  // the filter and sortby dynamic function
  const filterSelect = document.getElementById("filter");
  // Get UI elements
  const priceRange = document.querySelector(".filter-group input[type='range']");
  const priceDisplay = document.querySelector(".filter-group span");
  const applyFiltersBtn = document.querySelector(".apply-filters");
  const resetBtn = document.querySelector(".reset");
  const categoryCheckboxes = document.querySelectorAll(".filter-group input[type='checkbox'][value='Dress'], .filter-group input[type='checkbox'][value='Dive'], .filter-group input[type='checkbox'][value='Chronograph'], .filter-group input[type='checkbox'][value='Smart']");
  const movementTypeRadios = document.querySelectorAll(".filter-group input[type='radio'][name='movement']");
  const otherFilters = document.querySelectorAll(".filter-group input[type='checkbox'][value='New'], .filter-group input[type='checkbox'][value='Popular'], .filter-group input[type='checkbox'][value='Offer']");
  
  // Store all products to reference for filtering
  const allProducts = Array.from(grid.querySelectorAll(".product-card"));
  
  // Pagination variables
  const ITEMS_PER_PAGE = 10;
  let currentlyShownItems = ITEMS_PER_PAGE;
  
  // Create See More button
  const seeMoreBtn = document.createElement("button");
  seeMoreBtn.className = "see-more-btn";
  seeMoreBtn.textContent = "See More";
  seeMoreBtn.style.backgroundColor = "#d4af37";
  seeMoreBtn.style.color = "#121212";
  seeMoreBtn.style.padding = "12px 24px";
  seeMoreBtn.style.border = "none";
  seeMoreBtn.style.borderRadius = "4px";
  seeMoreBtn.style.fontWeight = "bold";
  seeMoreBtn.style.cursor = "pointer";
  seeMoreBtn.style.fontSize = "14px";
  seeMoreBtn.style.margin = "30px auto";
  seeMoreBtn.style.display = "block";
  
  // Append See More button after the product grid
  grid.parentNode.insertBefore(seeMoreBtn, grid.nextSibling);
  
  // Initialize page - show only first 10 items
  initializePageDisplay();
  
  // Update price range display when slider moves
  priceRange.addEventListener("input", function() {
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(this.value);
    
    priceDisplay.textContent = `Up to ${formattedPrice}`;
  });
  
  // See More button click handler
  seeMoreBtn.addEventListener("click", function() {
    const visibleProducts = Array.from(grid.querySelectorAll(".product-card:not([style*='display: none'])"));
    const hiddenProducts = Array.from(grid.querySelectorAll(".product-card[style*='display: none']"));
    
    // Show next batch of items
    hiddenProducts.slice(0, ITEMS_PER_PAGE).forEach(product => {
      product.style.display = "flex";
    });
    
    currentlyShownItems += ITEMS_PER_PAGE;
    
    // Hide button if no more products to show
    if (currentlyShownItems >= allProducts.length) {
      seeMoreBtn.style.display = "none";
    }
  });
  
  // Apply all filters
  applyFiltersBtn.addEventListener("click", function() {
    // Reset pagination when applying new filters
    currentlyShownItems = ITEMS_PER_PAGE;
    
    // Get selected categories
    const selectedCategories = Array.from(categoryCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
      
    // Get selected movement type
    const selectedMovement = Array.from(movementTypeRadios)
      .find(radio => radio.checked)?.value;
      
    // Get other selected filters
    const selectedOtherFilters = Array.from(otherFilters)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
      
    // Get max price
    const maxPrice = parseInt(priceRange.value);
    
    // Filter products
    const filteredProducts = allProducts.filter(product => {
      const price = parseInt(product.dataset.price);
      const specs = product.querySelector(".specs").textContent;
      const badges = Array.from(product.querySelectorAll(".badge")).map(badge => badge.textContent);
      
      // Price filter
      if (price > maxPrice) return false;
      
      // Category filter
      if (selectedCategories.length > 0) {
        const categoryMatch = selectedCategories.some(category => 
          specs.includes(`Category: ${category}`) || 
          specs.includes(`Category: ${category} Watch`) || 
          specs.includes(`Category: Luxury ${category}`) ||
          specs.includes(`Category: Ultra ${category}`) ||
          specs.includes(`Category: Ultra Luxury ${category}`) ||
          specs.includes(`Category: Professional ${category}`) ||
          specs.includes(`Category: Classic ${category}`) ||
          specs.includes(`Category: Premium ${category}`) ||
          specs.includes(`Category: Luxury ${category}`) ||
          specs.includes(`Category: Sport ${category}`) ||
          specs.includes(`Category: Grand ${category}`)
        );
        if (!categoryMatch) return false;
      }
      
      // Movement filter
      if (selectedMovement && selectedMovement !== "All") {
        if (!specs.includes(`Movement: ${selectedMovement}`)) return false;
      }
      
      // Other filters
      if (selectedOtherFilters.includes("New") && !badges.some(b => b.includes("NEW"))) return false;
      if (selectedOtherFilters.includes("Popular") && !badges.some(b => b.includes("POPULAR"))) return false;
      if (selectedOtherFilters.includes("Offer") && !badges.some(b => b.includes("OFF"))) return false;
      
      return true;
    });
    
    // Update display
    updateProductDisplay(filteredProducts);
    
    // Apply current sort to filtered results
    sortProducts(sortSelect.value, filteredProducts);
  });
  
  // Reset all filters
  resetBtn.addEventListener("click", function() {
    // Reset pagination
    currentlyShownItems = ITEMS_PER_PAGE;
    
    // Reset checkboxes
    categoryCheckboxes.forEach(checkbox => {
      checkbox.checked = checkbox.value === "Dress"; // Only Dress is checked by default
    });
    
    // Reset radio buttons
    movementTypeRadios.forEach(radio => {
      radio.checked = radio.value === "All"; // "All" is checked by default
    });
    
    // Reset other filters
    otherFilters.forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Reset price range
    priceRange.value = priceRange.max;
    priceDisplay.textContent = `Up to $100,000`;
    
    // Show all products (but respect pagination)
    updateProductDisplay(allProducts);
    
    // Apply current sort to all products
    sortProducts(sortSelect.value, allProducts);
  });
  
  // Sort functionality
  sortSelect.addEventListener("change", function() {
    // Reset pagination when changing sort
    currentlyShownItems = ITEMS_PER_PAGE;
    
    // Get currently visible products (not filtered out)
    const visibleProducts = Array.from(grid.querySelectorAll(".product-card:not([style*='display: none'])"));
    sortProducts(this.value, visibleProducts);
  });
  
  function initializePageDisplay() {
    // Hide all products initially
    allProducts.forEach((product, index) => {
      if (index < ITEMS_PER_PAGE) {
        product.style.display = "flex";
      } else {
        product.style.display = "none";
      }
    });
    
    // Show see more button if there are more products than the initial count
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
      default:
        // Keep original order for "default" option
        sortedProducts = products;
    }
    
    // Re-render the sorted cards
    grid.innerHTML = '';
    
    // Add all cards to the DOM but only show the paginated amount
    sortedProducts.forEach((card, index) => {
      if (index < currentlyShownItems) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
      grid.appendChild(card);
    });
    
    // Show/hide see more button based on how many items are displayed vs total
    seeMoreBtn.style.display = currentlyShownItems < sortedProducts.length ? "block" : "none";
  }
  
  function updateProductDisplay(productsToShow) {
    // Reset pagination
    currentlyShownItems = ITEMS_PER_PAGE;
    
    // Hide all products
    allProducts.forEach(product => {
      product.style.display = "none";
    });
    
    // Show only first batch of filtered products
    productsToShow.slice(0, ITEMS_PER_PAGE).forEach(product => {
      product.style.display = "flex";
    });
    
    // Show/hide see more button based on how many items are displayed vs total
    seeMoreBtn.style.display = productsToShow.length > ITEMS_PER_PAGE ? "block" : "none";
    
    // Show message if no products match filters
    if (productsToShow.length === 0) {
      const noResultsMessage = document.createElement("div");
      noResultsMessage.className = "no-results";
      noResultsMessage.textContent = "No products match your filters. Please try different criteria.";
      noResultsMessage.style.padding = "20px";
      noResultsMessage.style.textAlign = "center";
      noResultsMessage.style.color = "#d4af37";
      noResultsMessage.style.fontSize = "18px";
      grid.appendChild(noResultsMessage);
      seeMoreBtn.style.display = "none";
    } else {
      const existingNoResults = grid.querySelector(".no-results");
      if (existingNoResults) {
        existingNoResults.remove();
      }
    }
  }
})
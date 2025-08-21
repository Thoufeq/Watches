// Luxury Watch Store JavaScript
class LuxuryWatchStore {
    constructor() {
        this.products = [];
        this.cart = [];
        this.filters = {
            price: { min: 0, max: 500000 },
            brands: [],
            materials: [],
            availability: []
        };
        this.currentView = 'grid';
        this.currentSort = 'featured';
        this.currentPage = 1;
        this.productsPerPage = 12;
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.loadWishlist();
        this.setupEventListeners();
        this.setupMobileMenu();
        this.setupFilters();
        this.setupCart();
        this.setupSearch();
        this.renderProducts();
    }

    loadWishlist() {
        const saved = localStorage.getItem('luxuryWatchWishlist');
        this.wishlist = saved ? JSON.parse(saved) : [];
    }

    loadWishlistState() {
        // Update wishlist buttons based on saved state
        this.wishlist.forEach(productId => {
            const wishlistBtn = document.querySelector(`[onclick="luxuryStore.toggleWishlist(${productId})"]`);
            if (wishlistBtn) {
                wishlistBtn.classList.add('favorited');
                wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
            }
        });
    }

    // Sample Products Data
    loadProducts() {
        this.products = [
            {
                id: 1,
                name: "Submariner Date",
                brand: "Rolex",
                price: 28500,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1523170335258-f5e11bbeba86?w=400&h=400&fit=crop",
                rating: 4.9,
                reviews: 127,
                badges: ["new"],
                availability: "in-stock",
                material: "steel",
                description: "Professional dive watch with exceptional reliability"
            },
            {
                id: 2,
                name: "Nautilus 5711",
                brand: "Patek Philippe",
                price: 95000,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop",
                rating: 5.0,
                reviews: 89,
                badges: ["limited"],
                availability: "pre-order",
                material: "steel",
                description: "Iconic luxury sports watch with elegant design"
            },
            {
                id: 3,
                name: "Royal Oak",
                brand: "Audemars Piguet",
                price: 75000,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=400&fit=crop",
                rating: 4.8,
                reviews: 156,
                badges: ["new", "limited"],
                availability: "in-stock",
                material: "steel",
                description: "Revolutionary luxury sports watch design"
            },
            {
                id: 4,
                name: "Speedmaster Professional",
                brand: "Omega",
                price: 6500,
                image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=400&fit=crop",
                rating: 4.7,
                reviews: 234,
                badges: ["sale"],
                availability: "in-stock",
                material: "steel",
                description: "Legendary moonwatch with chronograph function"
            },
            {
                id: 5,
                name: "Datejust 41",
                brand: "Rolex",
                price: 12500,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=400&h=400&fit=crop",
                rating: 4.6,
                reviews: 189,
                badges: [],
                availability: "in-stock",
                material: "steel",
                description: "Classic dress watch with timeless elegance"
            },
            {
                id: 6,
                name: "Calatrava",
                brand: "Patek Philippe",
                price: 32000,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1548169874-53e85f753072?w=400&h=400&fit=crop",
                rating: 4.9,
                reviews: 98,
                badges: ["new"],
                availability: "in-stock",
                material: "gold",
                description: "Pure dress watch perfection in gold"
            },
            {
                id: 7,
                name: "Seamaster Planet Ocean",
                brand: "Omega",
                price: 8900,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1533139502658-0198f8608b60?w=400&h=400&fit=crop",
                rating: 4.5,
                reviews: 167,
                badges: [],
                availability: "in-stock",
                material: "steel",
                description: "Professional dive watch with Co-Axial movement"
            },
            {
                id: 8,
                name: "Code 11.59",
                brand: "Audemars Piguet",
                price: 45000,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1509048191080-d2ccf53d2e40?w=400&h=400&fit=crop",
                rating: 4.4,
                reviews: 76,
                badges: ["limited"],
                availability: "pre-order",
                material: "gold",
                description: "Contemporary luxury with innovative design"
            },
            {
                id: 9,
                name: "GMT-Master II",
                brand: "Rolex",
                price: 42000,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1615361200141-f45040e32652?w=400&h=400&fit=crop",
                rating: 4.8,
                reviews: 143,
                badges: ["new"],
                availability: "in-stock",
                material: "steel",
                description: "Professional GMT watch for travelers"
            },
            {
                id: 10,
                name: "Aquanaut",
                brand: "Patek Philippe",
                price: 68000,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
                rating: 4.7,
                reviews: 92,
                badges: ["limited"],
                availability: "pre-order",
                material: "steel",
                description: "Modern sports watch with tropical strap"
            },
            {
                id: 11,
                name: "Constellation",
                brand: "Omega",
                originalPrice: 4800,
                image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
                rating: 4.3,
                reviews: 201,
                badges: ["sale"],
                availability: "in-stock",
                material: "steel",
                description: "Precision timepiece with Co-Axial escapement"
            },
            {
                id: 12,
                name: "Royal Oak Offshore",
                brand: "Audemars Piguet",
                price: 85000,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
                rating: 4.6,
                reviews: 88,
                badges: ["new", "limited"],
                availability: "in-stock",
                material: "steel",
                description: "Bold sports chronograph with octagonal case"
            }
        ];
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenuBtn?.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Cart toggle
        const cartBtn = document.getElementById('cartBtn');
        const mobileCartBtn = document.getElementById('mobileCartBtn');
        
        cartBtn?.addEventListener('click', () => this.toggleCart());
        mobileCartBtn?.addEventListener('click', () => this.toggleCart());

        // Cart close
        const cartClose = document.getElementById('cartClose');
        const cartOverlay = document.getElementById('cartOverlay');
        
        cartClose?.addEventListener('click', () => this.closeCart());
        cartOverlay?.addEventListener('click', () => this.closeCart());

        // Filters toggle (mobile)
        const filtersToggleBtn = document.getElementById('filtersToggleBtn');
        const mobileFiltersBtn = document.getElementById('mobileFiltersBtn');
        const filtersSidebar = document.getElementById('filtersSidebar');
        const closeFiltersBtn = document.getElementById('closeFiltersBtn'); // New button
        
        filtersToggleBtn?.addEventListener('click', () => {
            filtersSidebar.classList.toggle('active');
        });
        
        mobileFiltersBtn?.addEventListener('click', () => {
            filtersSidebar.classList.toggle('active');
        });

        // Event listener for the new close button
        closeFiltersBtn?.addEventListener('click', () => {
            filtersSidebar.classList.remove('active');
        });

        // Sort dropdown
        const sortSelect = document.getElementById('sortSelect');
        sortSelect?.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderProducts();
        });

        // View toggle
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentView = btn.dataset.view;
                this.renderProducts();
            });
        });

        // Clear filters
        const clearFilters = document.getElementById('clearFilters');
        clearFilters?.addEventListener('click', () => this.clearAllFilters());
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn?.contains(e.target) && !mobileMenu?.contains(e.target)) {
                mobileMenu?.classList.remove('active');
            }
        });
    }

    setupFilters() {
        // Price range sliders and inputs
        const priceMin = document.getElementById('priceMin');
        const priceMax = document.getElementById('priceMax');
        const priceMinInput = document.getElementById('priceMinInput');
        const priceMaxInput = document.getElementById('priceMaxInput');
        const priceMinLabel = document.getElementById('priceMinLabel');
        const priceMaxLabel = document.getElementById('priceMaxLabel');

        const updatePriceLabels = () => {
            if (priceMin && priceMax && priceMinLabel && priceMaxLabel) {
                const min = parseInt(priceMin.value);
                const max = parseInt(priceMax.value);
                
                priceMinLabel.textContent = min.toLocaleString();
                priceMaxLabel.textContent = max.toLocaleString();
                
                // Sync with number inputs
                if (priceMinInput) priceMinInput.value = min;
                if (priceMaxInput) priceMaxInput.value = max;
                
                this.filters.price.min = min;
                this.filters.price.max = max;
                this.renderProducts();
            }
        };

        const updateFromInput = () => {
            if (priceMinInput && priceMaxInput && priceMin && priceMax) {
                const min = parseInt(priceMinInput.value) || 0;
                const max = parseInt(priceMaxInput.value) || 500000;
                
                // Ensure min is not greater than max
                if (min > max) {
                    priceMinInput.value = max;
                    return;
                }
                
                priceMin.value = min;
                priceMax.value = max;
                
                priceMinLabel.textContent = min.toLocaleString();
                priceMaxLabel.textContent = max.toLocaleString();
                
                this.filters.price.min = min;
                this.filters.price.max = max;
                this.renderProducts();
            }
        };

        priceMin?.addEventListener('input', updatePriceLabels);
        priceMax?.addEventListener('input', updatePriceLabels);
        priceMinInput?.addEventListener('input', updateFromInput);
        priceMaxInput?.addEventListener('input', updateFromInput);
        priceMinInput?.addEventListener('blur', updateFromInput);
        priceMaxInput?.addEventListener('blur', updateFromInput);

        // Filter accordions
        const filterTitles = document.querySelectorAll('.filter-title');
        filterTitles.forEach(title => {
            title.addEventListener('click', () => {
                const content = title.nextElementSibling;
                content.classList.toggle('active');
            });
        });

        // Checkbox filters
        const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateFilters();
                this.renderProducts();
            });
        });
    }

    updateFilters() {
        // Update brand filters
        const brandCheckboxes = document.querySelectorAll('.filter-option input[value="rolex"], .filter-option input[value="patek-philippe"], .filter-option input[value="audemars-piguet"], .filter-option input[value="omega"]');
        this.filters.brands = Array.from(brandCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // Update material filters
        const materialCheckboxes = document.querySelectorAll('.filter-option input[value="gold"], .filter-option input[value="steel"], .filter-option input[value="platinum"], .filter-option input[value="titanium"]');
        this.filters.materials = Array.from(materialCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // Update availability filters
        const availabilityCheckboxes = document.querySelectorAll('.filter-option input[value="in-stock"], .filter-option input[value="pre-order"]');
        this.filters.availability = Array.from(availabilityCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
    }

    clearAllFilters() {
        // Reset price range
        const priceMin = document.getElementById('priceMin');
        const priceMax = document.getElementById('priceMax');
        
        if (priceMin && priceMax) {
            priceMin.value = 0;
            priceMax.value = 500000;
        }

        // Uncheck all checkboxes
        const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = false);

        // Reset filters object
        this.filters = {
            price: { min: 0, max: 500000 },
            brands: [],
            materials: [],
            availability: []
        };

        this.renderProducts();
    }

    setupCart() {
        this.updateCartDisplay();
    }

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        let searchTimeout;

        searchInput?.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.searchProducts(e.target.value);
            }, 300);
        });
    }

    searchProducts(query) {
        if (!query.trim()) {
            this.renderProducts();
            return;
        }

        const filteredProducts = this.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );

        this.renderFilteredProducts(filteredProducts);
    }

    filterProducts() {
        return this.products.filter(product => {
            // Price filter
            if (product.price < this.filters.price.min || product.price > this.filters.price.max) {
                return false;
            }

            // Brand filter
            if (this.filters.brands.length > 0) {
                const brandMatch = this.filters.brands.some(brand => 
                    product.brand.toLowerCase().replace(/\s+/g, '-') === brand
                );
                if (!brandMatch) return false;
            }

            // Material filter
            if (this.filters.materials.length > 0) {
                if (!this.filters.materials.includes(product.material)) {
                    return false;
                }
            }

            // Availability filter
            if (this.filters.availability.length > 0) {
                if (!this.filters.availability.includes(product.availability)) {
                    return false;
                }
            }

            return true;
        });
    }

    sortProducts(products) {
        const sorted = [...products];
        
        switch (this.currentSort) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'newest':
                return sorted.sort((a, b) => b.id - a.id);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            default:
                return sorted;
        }
    }

    renderProducts() {
        const filteredProducts = this.filterProducts();
        const sortedProducts = this.sortProducts(filteredProducts);
        this.renderFilteredProducts(sortedProducts);
    }

    renderFilteredProducts(products) {
        const productsGrid = document.getElementById('productsGrid');
        const resultsCount = document.getElementById('resultsCount');
        const showingCount = document.getElementById('showingCount');
        const totalCount = document.getElementById('totalCount');

        if (!productsGrid) return;

        // Add updating class for smooth transition
        productsGrid.classList.add('updating');

        // Update counts
        if (resultsCount) resultsCount.textContent = products.length;
        if (showingCount) showingCount.textContent = products.length;
        if (totalCount) totalCount.textContent = products.length;

        // Animate out existing products then render new ones
        setTimeout(() => {
            // Clear existing products
            productsGrid.innerHTML = '';

            // Render products
            products.forEach((product, index) => {
                const productCard = this.createProductCard(product);
                productCard.style.animationDelay = `${index * 0.1}s`;
                productsGrid.appendChild(productCard);
            });

            // Remove updating class and apply fade-in animation
            productsGrid.classList.remove('updating');
            productsGrid.classList.add('fade-in');
            
            // Load wishlist state
            this.loadWishlistState();
        }, 150);
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        card.dataset.productId = product.id;

        // Add click handler to the entire card
        card.addEventListener('click', (e) => {
            // Don't redirect if clicking on cart or wishlist buttons
            if (e.target.closest('.add-to-cart-btn') || e.target.closest('.wishlist-btn')) {
                return;
            }

            // Create detailed product data
            const productData = {
                // Basic Info
                image: product.image,
                brand: product.brand.toUpperCase(),
                model: product.name,
                rating: product.rating,
                price: product.price.toLocaleString(),
                reviews: product.reviews,
                
                // Core Specifications
                year: "2024",
                movement: product.movement || "Swiss Automatic",
                material: product.material ? product.material.charAt(0).toUpperCase() + product.material.slice(1) : "Stainless Steel",
                category: product.category || "Luxury Sports",
                waterResistance: "100m",
                caseDiameter: "41mm",
                crystal: "Sapphire Crystal",
                powerReserve: "70 hours",
                
                // Premium Features
                features: [
                    {
                        title: "Sapphire Crystal Glass",
                        description: "Scratch-resistant crystal for lasting clarity",
                        icon: "fa-gem"
                    },
                    {
                        title: "Water Resistant",
                        description: "Professional dive watch capability",
                        icon: "fa-tint"
                    },
                    {
                        title: "Anti-Magnetic",
                        description: "Protected against magnetic fields",
                        icon: "fa-shield-alt"
                    },
                    {
                        title: "Precision Movement",
                        description: "Swiss-made automatic caliber",
                        icon: "fa-clock"
                    },
                    {
                        title: "Swiss Made",
                        description: "Highest quality craftsmanship",
                        icon: "fa-certificate"
                    },
                    {
                        title: "Limited Edition",
                        description: "Exclusive numbered series",
                        icon: "fa-award"
                    }
                ],
                
                // Detailed Description
                description: `The ${product.brand} ${product.name} exemplifies the pinnacle of Swiss watchmaking excellence. 
                            This sophisticated timepiece features a precise ${product.movement || "Swiss Automatic"} movement 
                            housed in a refined ${product.material || "stainless steel"} case. With its 100m water resistance 
                            and sapphire crystal, it perfectly balances luxury with durability. The 41mm case diameter provides 
                            an elegant presence on the wrist, while the 70-hour power reserve ensures reliable timekeeping.`,
                
                // Additional Details
                reference: `REF. ${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
                warranty: "2-Year International Warranty",
                certificates: ["COSC Certified", "Swiss Made Certification"],
                serialNumber: Math.random().toString(36).substr(2, 12).toUpperCase()
            };

            // Store the data and redirect
            localStorage.setItem('selectedProduct', JSON.stringify(productData));
            // Update the path to point to the correct location
            window.location.href = '../pages/product-details.html';  // Changed this line
        });

        const badges = product.badges.map(badge => 
            `<span class="product-badge ${badge}">${badge.toUpperCase()}</span>`
        ).join('');

        const originalPriceHtml = product.originalPrice 
            ? `<span class="original-price">$${product.originalPrice.toLocaleString()}</span>`
            : '';

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-badges">
                    ${badges}
                </div>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${this.generateStars(product.rating)}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    $${product.price.toLocaleString()}
                    ${originalPriceHtml}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); luxuryStore.addToCart(${product.id})">
                        <i class="fas fa-shopping-bag"></i>
                        Add to Cart
                    </button>
                    <button class="wishlist-btn" onclick="event.stopPropagation(); luxuryStore.toggleWishlist(${product.id})">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }

        if (hasHalfStar) {
            stars += '☆';
        }

        return stars;
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }

        // Add visual feedback to button
        const addBtn = document.querySelector(`[onclick="luxuryStore.addToCart(${productId})"]`);
        if (addBtn) {
            addBtn.classList.add('adding');
            addBtn.innerHTML = '<i class="fas fa-check"></i> Added!';
            
            setTimeout(() => {
                addBtn.classList.remove('adding');
                addBtn.innerHTML = '<i class="fas fa-shopping-bag"></i> Add to Cart';
            }, 1500);
        }

        this.updateCartDisplay();
        this.renderCartItems();
        this.showCartFeedback();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartDisplay();
        this.renderCartItems();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;

        if (newQuantity <= 0) {
            this.removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            this.updateCartDisplay();
            this.renderCartItems();
        }
    }

    updateCartDisplay() {
        const cartCount = document.getElementById('cartCount');
        const mobileCartCount = document.getElementById('mobileCartCount');
        const cartSubtotal = document.getElementById('cartSubtotal');
        const cartTotal = document.getElementById('cartTotal');

        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.classList.add('updated');
            setTimeout(() => cartCount.classList.remove('updated'), 500);
        }
        if (mobileCartCount) {
            mobileCartCount.textContent = totalItems;
            mobileCartCount.classList.add('updated');
            setTimeout(() => mobileCartCount.classList.remove('updated'), 500);
        }
        if (cartSubtotal) cartSubtotal.textContent = `$${totalPrice.toLocaleString()}`;
        if (cartTotal) cartTotal.textContent = `$${totalPrice.toLocaleString()}`;
    }

    renderCartItems() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag" style="font-size: 3rem; color: var(--medium-gray); margin-bottom: 1rem;"></i>
                    <p style="color: var(--medium-gray); text-align: center;">Your cart is empty</p>
                </div>
            `;
            return;
        }

        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-brand">${item.brand}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="luxuryStore.updateQuantity(${item.id}, ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="luxuryStore.updateQuantity(${item.id}, ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="remove-item" onclick="luxuryStore.removeFromCart(${item.id})">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    toggleCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        cartSidebar?.classList.toggle('active');
        
        if (cartSidebar?.classList.contains('active')) {
            this.renderCartItems();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        cartSidebar?.classList.remove('active');
        document.body.style.overflow = '';
    }

    showCartFeedback() {
        // Simple feedback - could be enhanced with a toast notification
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                cartBtn.style.transform = '';
            }, 200);
        }
    }

    toggleWishlist(productId) {
        // Initialize wishlist if not exists
        if (!this.wishlist) {
            this.wishlist = [];
        }

        const wishlistBtn = document.querySelector(`[onclick="luxuryStore.toggleWishlist(${productId})"]`);
        const isInWishlist = this.wishlist.includes(productId);
        
        if (isInWishlist) {
            // Remove from wishlist
            this.wishlist = this.wishlist.filter(id => id !== productId);
            if (wishlistBtn) {
                wishlistBtn.classList.remove('favorited');
                wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
            }
        } else {
            // Add to wishlist
            this.wishlist.push(productId);
            if (wishlistBtn) {
                wishlistBtn.classList.add('favorited');
                wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
            }
        }

        // Save to localStorage
        localStorage.setItem('luxuryWatchWishlist', JSON.stringify(this.wishlist));
        
        console.log('Wishlist updated:', this.wishlist);
    }
}

// Initialize the store when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.luxuryStore = new LuxuryWatchStore();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close modals on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const cartSidebar = document.getElementById('cartSidebar');
        const filtersSidebar = document.getElementById('filtersSidebar');
        const mobileMenu = document.getElementById('mobileMenu');
        
        cartSidebar?.classList.remove('active');
        filtersSidebar?.classList.remove('active');
        mobileMenu?.classList.remove('active');
        
        document.body.style.overflow = '';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe product cards for animations
const observeProductCards = () => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => observer.observe(card));
};

// Call this after products are rendered
setTimeout(observeProductCards, 100);
document.addEventListener('DOMContentLoaded', () => {
    // Auth popup functionality
    const authPopup = document.getElementById('authPopup');
    const closeAuth = document.getElementById('closeAuth');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const accountBtn = document.querySelector('.account-btn');

    // Open auth popup
    accountBtn?.addEventListener('click', () => {
        authPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close auth popup
    closeAuth?.addEventListener('click', () => {
        authPopup.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            document.querySelector(`.auth-form#${tab.dataset.tab}Form`).classList.add('active');
        });
    });

    // Form submission
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your login logic here
        
        // Show user avatar after successful login
        accountBtn.innerHTML = '<div class="user-avatar">JD</div>';
        authPopup.classList.remove('active');
        document.body.style.overflow = '';
    });

    signupForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your signup logic here
    });
});

// Payment popup functionality
const paymentPopup = document.getElementById('paymentPopup');
const closePayment = document.getElementById('closePayment');
const checkoutBtn = document.querySelector('.checkout-btn');

checkoutBtn?.addEventListener('click', () => {
    paymentPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closePayment?.addEventListener('click', () => {
    paymentPopup.classList.remove('active');
    document.body.style.overflow = '';
});

// Card input formatting
const cardInput = document.querySelector('.card-input');
cardInput?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    
    e.target.value = formattedValue;
});

// Payment step progress
const paymentSteps = document.querySelectorAll('.payment-step');
const progressBar = document.querySelector('.payment-progress');
let currentStep = 0;

function updateProgress() {
    const progress = (currentStep / (paymentSteps.length - 1)) * 100;
    progressBar.style.width = `${progress}%`;
    
    paymentSteps.forEach((step, index) => {
        if (index <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

document.querySelector('.payment-btn.primary')?.addEventListener('click', () => {
    if (currentStep < paymentSteps.length - 1) {
        currentStep++;
        updateProgress();
        
        if (currentStep === paymentSteps.length - 1) {
            // Show success message
            document.querySelector('.payment-success').classList.add('active');
        }
    }
});
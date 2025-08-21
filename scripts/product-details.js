document.addEventListener('DOMContentLoaded', function() {
    // Product image gallery functionality
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.thumbnail-nav.prev');
    const nextBtn = document.querySelector('.thumbnail-nav.next');
    const productData = JSON.parse(localStorage.getItem('selectedProduct'));

    if (productData) {
        // Update product details with stored data
        document.querySelector('.main-image img').src = productData.image;
        document.querySelector('.product-info h2').textContent = productData.model;
        document.querySelector('.price h3').innerHTML = `${productData.price} <span>Excl. Tax</span>`;
        //111
        // Update product specs
        const specsList = document.querySelector('.product-specs');
        specsList.innerHTML = `
            <div class="spec">
                <span class="spec-name">Brand</span>
                <span class="spec-value">${productData.brand}</span>
            </div>
            <div class="spec">
                <span class="spec-name">Year</span>
                <span class="spec-value">${productData.year.split(': ')[1]}</span>
            </div>
            <div class="spec">
                <span class="spec-name">Movement</span>
                <span class="spec-value">${productData.movement.split(': ')[1]}</span>
            </div>
            <div class="spec">
                <span class="spec-name">Material</span>
                <span class="spec-value">${productData.material.split(': ')[1]}</span>
            </div>
            <div class="spec">
                <span class="spec-name">Category</span>
                <span class="spec-value">${productData.category.split(': ')[1]}</span>
            </div>
        `;

        // Update thumbnails
        const thumbnails = document.querySelector('.thumbnails');
        thumbnails.innerHTML = `
            <div class="thumbnail active">
                <img src="${productData.image}" alt="${productData.model}">
            </div>
            <div class="thumbnail">
                <img src="${productData.image}" alt="${productData.model}">
            </div>
            <div class="thumbnail">
                <img src="${productData.image}" alt="${productData.model}">
            </div>
        `;

        // Set up rating stars based on rating value
        const ratingText = productData.rating;
        const ratingValue = parseFloat(ratingText.match(/\d+\.\d+/)[0]);
        const ratingStars = document.querySelector('.rating');
        ratingStars.innerHTML = Array(5).fill().map((_, index) =>
            `<i class="fas fa-star${index < Math.floor(ratingValue) ? '' : '-half'}"></i>`
        ).join('');
    }

    let currentIndex = 0;
    
    // Set up thumbnails click event
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateActiveImage(index);
        });
    });
    
    // Previous button functionality
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        updateActiveImage(currentIndex);
    });
    
    // Next button functionality
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        updateActiveImage(currentIndex);
    });
    
    // Update active image function
    function updateActiveImage(index) {
        // Remove active class from all thumbnails
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        thumbnails[index].classList.add('active');
        
        // Update main image source
        const thumbImg = thumbnails[index].querySelector('img');
        mainImage.src = thumbImg.src.replace('-thumb', '');
        
        currentIndex = index;
    }
    
    // Buy Now button click event
    const buyButton = document.querySelector('.buy-btn');
    buyButton.addEventListener('click', () => {
        alert('Item added to cart!');
    });
    
    // Product action buttons
    const findStoreBtn = document.querySelector('.action:nth-child(1)');
    const likeBtn = document.querySelector('.action:nth-child(2)');
    const shareBtn = document.querySelector('.action:nth-child(3)');
    
    findStoreBtn.addEventListener('click', () => {
        alert('Store locator feature will be available soon!');
    });
    
    likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle('liked');
        if(likeBtn.classList.contains('liked')) {
            likeBtn.querySelector('i').style.color = '#d4af37';
            alert('You liked this product!');
        } else {
            likeBtn.querySelector('i').style.color = '';
        }
    });
    
    shareBtn.addEventListener('click', () => {
        // Create a share dialog/modal in a real implementation
        const shareOptions = ['Facebook', 'Twitter', 'Email', 'WhatsApp'];
        const option = prompt(`Share via: ${shareOptions.join(', ')}`);
        if(option) {
            alert(`Sharing via ${option} would be implemented in production.`);
        }
    });
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
    });
    
    // Add scroll animation
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if(window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Add responsive menu toggle for mobile
    if(window.innerWidth < 768) {
        const logoElement = document.querySelector('.logo');
        const navElement = document.querySelector('nav');
        
        const menuToggle = document.createElement('div');
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        logoElement.parentNode.insertBefore(menuToggle, navElement);
        
        navElement.style.display = 'none';
        
        menuToggle.addEventListener('click', () => {
            if(navElement.style.display === 'none') {
                navElement.style.display = 'block';
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                navElement.style.display = 'none';
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
});

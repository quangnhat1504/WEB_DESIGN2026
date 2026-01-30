/**
 * FoodAI - Advanced Interaction Logic
 * Handles animations, state management, and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // === VARIABLES ===
    const topCarousel = document.querySelector('.top-carousel');
    const searchInput = document.querySelector('.search-input');
    const searchWrapper = document.querySelector('.search-input-wrapper');

    // === 1. KEYBOARD SHORTCUTS ===
    document.addEventListener('keydown', (e) => {
        // CMD/CTRL + K to focus search
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });

    // === 2. FAVORITE BUTTON TOGGLE ===
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const icon = btn.querySelector('.material-symbols-outlined');
            const isActive = btn.classList.contains('active');

            if (isActive) {
                btn.classList.remove('active');
                btn.style.backgroundColor = 'rgba(0,0,0,0.4)';
                btn.style.color = 'white';
                icon.textContent = 'favorite'; // Outline version (if font supports it, or just keep fill)
                icon.style.fontVariationSettings = "'FILL' 0";
            } else {
                btn.classList.add('active');
                btn.style.backgroundColor = 'var(--primary)';
                btn.style.color = 'white';
                // Add pop animation
                btn.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.4)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 300,
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                });
                icon.style.fontVariationSettings = "'FILL' 1";
            }
        });
    });

    // === 3. ORDER BUTTON INTERACTION ===
    const orderBtns = document.querySelectorAll('.order-btn');
    orderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const card = btn.closest('.masonry-item');
            const title = card.querySelector('.card-title').textContent;
            const price = card.querySelector('.price').textContent;

            // Animate button
            btn.innerHTML = `<span class="material-symbols-outlined">check</span> Added`;
            btn.style.backgroundColor = '#22c55e'; // Success green

            showToast(`Added ${title} (${price}) to cart`);

            // Update cart notification badge
            updateCartCount();

            // Reset button after 2s
            setTimeout(() => {
                btn.innerHTML = `Order Now <span class="material-symbols-outlined" style="font-size: 18px;">shopping_bag</span>`;
                btn.style.backgroundColor = 'var(--primary)';
            }, 2000);
        });
    });

    // === 4. TOP CAROUSEL DRAG & SCROLL ===
    let isDown = false;
    let startX;
    let scrollLeft;

    topCarousel.addEventListener('mousedown', (e) => {
        isDown = true;
        topCarousel.style.cursor = 'grabbing';
        startX = e.pageX - topCarousel.offsetLeft;
        scrollLeft = topCarousel.scrollLeft;
    });

    topCarousel.addEventListener('mouseleave', () => {
        isDown = false;
        topCarousel.style.cursor = 'grab';
    });

    topCarousel.addEventListener('mouseup', () => {
        isDown = false;
        topCarousel.style.cursor = 'grab';
    });

    topCarousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - topCarousel.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        topCarousel.scrollLeft = scrollLeft - walk;
    });

    // === 5. TOAST NOTIFICATION SYSTEM ===
    function showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: rgba(35, 20, 15, 0.95);
      border: 1px solid #4b2c20;
      color: white;
      padding: 12px 24px;
      border-radius: 99px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 1000;
      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;

        toast.innerHTML = `
      <span class="material-symbols-outlined" style="color: var(--primary)">check_circle</span>
      ${message}
    `;

        document.body.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        // Hide notification
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // === 6. CART COUNT UPDATE ===
    let cartCount = 0;
    const badge = document.querySelector('.notification-badge');

    function updateCartCount() {
        cartCount++;
        badge.style.display = 'block';

        // Pulse animation for cart icon
        const cartBtn = document.querySelector('.icon-btn:nth-child(3)'); // Shopping cart button
        cartBtn.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.2)' },
            { transform: 'scale(1)' }
        ], {
            duration: 300
        });
    }

    // === 7. FILTER BUTTONS ===
    const filterBtns = document.querySelectorAll('.filter-btn, .tag-pill');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Toggle active class
            if (btn.classList.contains('active-filter')) {
                btn.classList.remove('active-filter');
                btn.style.backgroundColor = '';
                btn.style.color = '';
            } else {
                // Reset others (optional, maybe we allow multi-select)
                // btn.classList.add('active-filter');
                btn.style.backgroundColor = 'var(--primary)';
                btn.style.color = 'white';

                // Show simulated loading state
                const grid = document.querySelector('.masonry-grid');
                grid.style.opacity = '0.5';
                grid.style.transform = 'translateY(10px)';
                grid.style.transition = 'all 0.3s';

                setTimeout(() => {
                    grid.style.opacity = '1';
                    grid.style.transform = 'translateY(0)';
                    showToast(`Filtered by ${btn.textContent.trim()}`);
                }, 500);
            }
        });
    });

    // === 8. MAP WIDGET INTERACTION ===
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            showToast('Opening Live Map Discovery...');
            // In a real app, this would navigate
        });
    }

    console.log('FoodAI Advanced Prototype Initialized 🚀');
});

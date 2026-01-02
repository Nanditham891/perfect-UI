document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        const nav = document.querySelector('.nav');
        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', String(!expanded));
            if (nav) {
                nav.classList.toggle('open');
                // Inline style to override CSS hide on small screens
                if (nav.classList.contains('open')) {
                    nav.style.display = 'flex';
                } else {
                    nav.style.display = '';
                }
            }
            hamburger.classList.toggle('is-active');
        });

        // Ensure menu resets when resizing to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && nav) {
                nav.style.display = '';
                nav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.classList.remove('is-active');
            }
        });
    }

    // --- Product Section Logic ---

    // Carousel Logic
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumb');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    let currentIndex = 0;

    function updateCarousel(index) {
        currentIndex = index;
        const newSrc = thumbnails[currentIndex].getAttribute('data-src');
        mainImage.src = newSrc;

        // Update active states
        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnails[currentIndex].classList.add('active');

        dots.forEach(d => d.classList.remove('active'));
        if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            let index = currentIndex - 1;
            if (index < 0) index = thumbnails.length - 1;
            updateCarousel(index);
        });

        nextBtn.addEventListener('click', () => {
            let index = currentIndex + 1;
            if (index >= thumbnails.length) index = 0;
            updateCarousel(index);
        });
    }

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => updateCarousel(index));
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateCarousel(index));
    });

    // Selection Logic
    const optionCards = document.querySelectorAll('.option-card');
    const fragranceOptions = document.querySelectorAll('.fragrance-option');
    const addToCartBtn = document.getElementById('add-to-cart');

    let selectedSubscription = 'Single';

    function updateAddToCartUrl() {
        if (addToCartBtn) {
            const activeCard = document.querySelector('.option-card.active');
            if (!activeCard) return;

            selectedSubscription = activeCard.getAttribute('data-type');
            const fragrances = activeCard.querySelectorAll('.fragrance-selector .fragrance-option.active');
            let fragranceParams = '';
            
            if (fragrances.length > 1) {
                fragrances.forEach((f, i) => {
                    fragranceParams += `&fragrance${i+1}=${f.getAttribute('data-fragrance')}`;
                });
            } else if (fragrances.length === 1) {
                fragranceParams = `&fragrance=${fragrances[0].getAttribute('data-fragrance')}`;
            }

            addToCartBtn.href = `/add?subscription=${selectedSubscription}${fragranceParams}`;
            console.log('Updated URL:', addToCartBtn.href);
        }
    }

    optionCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const radio = card.querySelector('input[type="radio"]');
            
            optionCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            if (radio) radio.checked = true;
            updateAddToCartUrl();
        });
    });

    // Allow selecting option-card via radio change (keyboard accessibility)
    const subscriptionRadios = document.querySelectorAll('.option-card input[type="radio"]');
    subscriptionRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const card = radio.closest('.option-card');
            if (!card) return;
            optionCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            updateAddToCartUrl();
        });
    });

    fragranceOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click trigger
            
            const parentSelector = option.closest('.fragrance-selector');
            if (parentSelector) {
                parentSelector.querySelectorAll('.fragrance-option').forEach(o => o.classList.remove('active'));
            }
            
            option.classList.add('active');
            updateAddToCartUrl();
        });
    });

    // Initialize
    updateAddToCartUrl();
    // Initialize carousel to first image and sync active states
    if (thumbnails.length > 0) updateCarousel(0);

    // Accordion Logic
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            accordionItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-icon').textContent = '+';
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                item.querySelector('.accordion-icon').textContent = '−';
            }
        });
    });

    // Stats Animation Logic
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsNumbers.forEach(num => statsObserver.observe(num));
});

// Image Gallery
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('mainImage');

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    thumbnails.forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
    mainImage.src = thumbnail.dataset.src;
  });
});

// Color Variants
const swatches = document.querySelectorAll('.swatch');
const selectedColor = document.getElementById('selectedColor');

swatches.forEach(swatch => {
  swatch.addEventListener('click', () => {
    swatches.forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');
    selectedColor.textContent = swatch.dataset.color;
    mainImage.src = swatch.dataset.img;
    thumbnails.forEach(t => {
      if (t.dataset.src === swatch.dataset.img) {
        thumbnails.forEach(t => t.classList.remove('active'));
        t.classList.add('active');
      }
    });
    localStorage.setItem('selectedColor', swatch.dataset.color);
  });
});

// Size Selection Persistence
const sizeSelect = document.getElementById('sizeSelect');
sizeSelect.addEventListener('change', () => {
  localStorage.setItem('selectedSize', sizeSelect.value);
});

// Load Persisted Selections
window.addEventListener('load', () => {
  const savedColor = localStorage.getItem('selectedColor');
  const savedSize = localStorage.getItem('selectedSize');
  if (savedColor) {
    swatches.forEach(swatch => {
      if (swatch.dataset.color === savedColor) {
        swatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        selectedColor.textContent = savedColor;
        mainImage.src = swatch.dataset.img;
        thumbnails.forEach(t => {
          if (t.dataset.src === swatch.dataset.img) {
            thumbnails.forEach(t => t.classList.remove('active'));
            t.classList.add('active');
          }
        });
      }
    });
  }
  if (savedSize) {
    sizeSelect.value = savedSize;
  }
  updateButtonStates();
});

// Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

// Modal Handling
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Size Chart Modal
document.querySelector('.size-chart').addEventListener('click', () => openModal('sizeChartModal'));

// Compare Colors Modal
document.querySelector('.compare-colors').addEventListener('click', () => openModal('compareColorsModal'));

// Wishlist Modal
document.querySelector('.wishlist-toggle').addEventListener('click', () => openModal('wishlistModal'));

// Cart Modal
document.querySelector('.cart-toggle').addEventListener('click', () => openModal('cartModal'));

// Close Modals
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    closeModal(closeBtn.closest('.modal').id);
  });
});

// Close Modal on Overlay Click
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal(modal.id);
  });
});

// Close Modal on ESC Key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => closeModal(modal.id));
  }
});

// Wishlist Functionality
function addToWishlist(button) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const item = {
    name: button.dataset.name,
    price: parseFloat(button.dataset.price),
    image: button.closest('.product-card') ? button.closest('.product-card').querySelector('img').src : mainImage.src,
    color: button.closest('.product-options') ? selectedColor.textContent : 'N/A',
    size: button.closest('.product-options') ? sizeSelect.value : 'N/A'
  };
  const isLiked = wishlist.some(w => w.name === item.name && w.color === item.color && w.size === item.size);
  if (isLiked) {
    const updatedWishlist = wishlist.filter(w => !(w.name === item.name && w.color === item.color && w.size === item.size));
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    button.classList.remove('liked');
  } else {
    wishlist.push(item);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    button.classList.add('liked');
  }
  renderWishlist();
  document.getElementById('wishlistCount').textContent = wishlist.length;
}

function renderWishlist() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistItems = document.getElementById('wishlistItems');
  wishlistItems.innerHTML = wishlist.length ? '' : '<p>Your wishlist is empty.</p>';
  wishlist.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('wishlist-item');
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <p>${item.name} ${item.color !== 'N/A' ? `(${item.color}, ${item.size})` : ''}</p>
        <p>₹${item.price.toFixed(0)}</p>
        <button onclick="removeFromWishlist(${index})">Remove</button>
      </div>
    `;
    wishlistItems.appendChild(itemElement);
  });
  document.getElementById('wishlistCount').textContent = wishlist.length;
}

function removeFromWishlist(index) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist.splice(index, 1);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  renderWishlist();
  updateButtonStates();
}

function updateButtonStates() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  document.querySelectorAll('.like-button').forEach(button => {
    const isLiked = wishlist.some(item => item.name === button.dataset.name && (button.closest('.product-options') ? item.color === selectedColor.textContent && item.size === sizeSelect.value : item.color === 'N/A'));
    button.classList.toggle('liked', isLiked);
  });
}

// Cart Functionality
function addToCart(button) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = {
    name: button.dataset.name,
    price: parseFloat(button.dataset.price),
    image: button.closest('.product-card') ? button.closest('.product-card').querySelector('img').src : mainImage.src,
    color: button.closest('.product-options') ? selectedColor.textContent : 'N/A',
    size: button.closest('.product-options') ? sizeSelect.value : 'N/A'
  };
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = cart.length ? '' : '<p>Your cart is empty.</p>';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <p>${item.name} ${item.color !== 'N/A' ? `(${item.color}, ${item.size})` : ''}</p>
        <p>₹${item.price.toFixed(0)}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartItems.appendChild(itemElement);
  });
  document.getElementById('cartTotal').textContent = `₹${total.toFixed(0)}`;
  document.getElementById('cartCount').textContent = cart.length;
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Add to Cart and Wishlist Event Listeners
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => addToCart(button));
});

document.querySelectorAll('.like-button').forEach(button => {
  button.addEventListener('click', () => addToWishlist(button));
});

// Add Bundle to Cart
const addBundleButton = document.querySelector('.add-bundle');
addBundleButton.addEventListener('click', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({
    name: 'Classic T-Shirt',
    price: 2100,
    image: 'assets/tshirt-blue.jpg',
    color: 'Blue',
    size: 'M'
  });
  cart.push({
    name: 'Slim Fit Jeans',
    price: 4200,
    image: 'assets/jeans.jpg',
    color: 'Blue',
    size: '32'
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
});

// Initialize
renderWishlist();
renderCart();
# Shopify Product Page Assessment

## Overview
This project is a fully responsive product page mimicking a Shopify storefront, built using vanilla HTML, CSS, and JavaScript. It includes all required features from the coding assessment, such as a scrollable image gallery, product variants, modals, tabs, and recommendation sections, along with bonus features like image zoom, localStorage persistence, and micro-interactions.

## Features Implemented
1. **Scrollable Product Images Gallery**:
   - Main image with clickable thumbnails below.
   - Supports scrolling for more than 4-5 images.
   - Updates main image on thumbnail click.
   - Bonus: Image zoom on hover.

2. **Size Chart Button with Modal**:
   - "Size Chart" button opens a modal with a size chart table.
   - Modal is dismissible via close button, ESC key, or overlay click.
   - Accessible and responsive.

3. **Product Variants**:
   - Color variants as swatches with visual feedback.
   - Size variants in a dropdown.
   - Updates product state (color label and main image).
   - Bonus: Persists selected color and size using localStorage.

4. **Compare Colors Button**:
   - Opens a modal with side-by-side color swatches.
   - Allows selection of multiple colors for comparison.

5. **Pair Well With**:
   - Horizontal scrollable carousel with 4 complementary products.
   - Each product card includes image, title, price, and "Add to Cart" button.

6. **Product Bundle Suggestion**:
   - Static bundle with two products (T-Shirt and Jeans).
   - Displays individual and total prices.
   - Includes an "Add Bundle to Cart" button.

7. **Tabs for Product Info**:
   - Three tabs: Description, Product Information, Shipping Details.
   - Toggles content using pure JavaScript.
   - Bonus: Smooth fade-in animation on tab switch.

8. **Related Products Section**:
   - Grid of 4 product cards with image, name, price, and badges ("New", "Popular").

9. **Technical Requirements**:
   - Uses vanilla HTML, CSS, and JavaScript (no external libraries).
   - Modular, well-commented code.
   - Fully responsive for mobile, tablet, and desktop.
   - Placeholder images and data used.
   - Bonus: Micro-interactions (hover effects, transitions, tab animations).

## Folder Structure
```
shopify-product-page/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   ├── tshirt-blue.jpg
│   ├── tshirt-red.jpg
│   ├── tshirt-black.jpg
│   ├── tshirt-white.jpg
│   ├── tshirt-green.jpg
│   ├── jeans.jpg
│   ├── sneakers.jpg
│   ├── jacket.jpg
│   ├── hat.jpg
│   ├── hoodie.jpg
│   ├── polo.jpg
│   ├── sweater.jpg
│   └── shorts.jpg
└── README.md
```

## How to Run Locally
1. Clone the repository or download the ZIP folder.
2. Ensure all files are in the correct folder structure as shown above.
3. Open `index.html` in a web browser (e.g., Chrome, Firefox).
   - Alternatively, use a local server (e.g., `python -m http.server` or VS Code Live Server) to avoid CORS issues with assets.
4. Note: Placeholder image paths are used (`assets/*.jpg`). Replace with actual images or use dummy images from a service like `https://via.placeholder.com/300`.

## Notes
- The project is optimized for performance and accessibility.
- Micro-interactions enhance the user experience without compromising load times.
- LocalStorage ensures user selections persist across page reloads.
- The codebase is modular, with separate concerns for styling (`styles.css`) and interactivity (`script.js`).
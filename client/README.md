# JewelHub E-commerce Application

A full-featured jewelry e-commerce web application built with React, Redux, and React Router.

## Features

### 🛍️ Product Shopping

- Browse jewelry products by categories (Rings, Necklaces, Bracelets, Earrings, Watches)
- Search and filter products
- View detailed product information
- Add products to cart with quantity selection
- Wholesale and retail options

### 💎 Jewelry Customization

- Custom jewelry design workflow
- Add personalized text, images, videos, or audio to jewelry pieces
- Step-by-step customization process
- Save customizations for later
- View all previous customizations

### 🛒 Shopping Cart

- Add/remove items from cart
- Update product quantities
- View cart summary with totals
- Support for both regular and customized products

### 💳 Checkout Process

- Multi-step checkout workflow
- Shipping information form
- Payment details collection
- Order review before placement

### 🎨 User Experience

- Responsive design for all devices
- Modern UI with smooth animations
- Intuitive navigation with navbar and footer
- Real-time cart badge updates

## Tech Stack

- **React** - UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Routing
- **Axios** - HTTP client (for future API integration)

## Project Structure

```
client/
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── ProductCard.js
│   │   └── CustomizationCard.js
│   ├── pages/             # Page components
│   │   ├── Home.js
│   │   ├── Products.js
│   │   ├── ProductDetail.js
│   │   ├── Customization.js
│   │   ├── CreateCustomization.js
│   │   ├── Cart.js
│   │   └── Checkout.js
│   ├── redux/             # Redux store and slices
│   │   ├── store.js
│   │   └── slices/
│   │       ├── productsSlice.js
│   │       ├── cartSlice.js
│   │       ├── customizationSlice.js
│   │       └── userSlice.js
│   ├── utils/             # Utility functions
│   ├── assets/            # Static assets
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── public/
└── package.json
```

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Installation

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install
```

### Running the Application

```bash
# Start development server
npm start
```

The application will open at `http://localhost:3000`

## Available Routes

- `/` - Home page with featured categories
- `/products` - All products with filtering and search
- `/products/:id` - Individual product details
- `/customization` - Customization hub with previous customizations
- `/customization/create` - Create new customization workflow
- `/cart` - Shopping cart
- `/checkout` - Checkout process

## Redux State Management

### Slices

1. **Products Slice**

   - Manages product catalog
   - Handles filtering and search
   - Categories management

2. **Cart Slice**

   - Cart items management
   - Quantity updates
   - Total calculations

3. **Customization Slice**

   - Current customization workflow
   - Saved customizations
   - Step tracking

4. **User Slice**
   - User authentication state
   - User information

## Customization Workflow

The customization feature follows a 4-step process:

1. **Select Item** - Choose jewelry to customize
2. **Add Customizations** - Add text, images, video, or audio
3. **Additional Notes** - Provide special instructions
4. **Review** - Review and save or add to cart

## Future Enhancements

- Backend API integration
- User authentication and registration
- Order history and tracking
- Payment gateway integration
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard for product management
- Email notifications
- Advanced filtering options

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

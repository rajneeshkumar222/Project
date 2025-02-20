import React, { useState } from "react";
import { Star } from "lucide-react";

const Header = () => (
  <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold shadow-md">
    Welcome to Our Store
  </header>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white p-6 text-center mt-10 text-lg shadow-md">
    &copy; 2025 Handmade Crafts. All Rights Reserved.
  </footer>
);

const Button = ({ children, onClick, variant = "default" }) => (
  <button
    onClick={onClick}
    className={`px-5 py-3 rounded-lg transition duration-300 ease-in-out font-semibold shadow-md ${
      variant === "outline"
        ? "border border-gray-500 text-black hover:bg-gray-200"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }`}
  >
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`border border-gray-300 rounded-lg p-5 shadow-lg bg-white ${className}`}>{children}</div>
);

const CardContent = ({ children }) => <div className="p-3">{children}</div>;

const Popup = ({ message, onClose }) => (
  <div className="fixed top-10 right-10 bg-green-500 text-white p-4 rounded shadow-lg animate-fadeIn">
    {message}
    <button onClick={onClose} className="ml-4 text-sm underline">Close</button>
  </div>
);

const StarRating = ({ rating, setRating }) => (
  <div className="flex mt-2">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`cursor-pointer ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
        onClick={() => setRating(i + 1)}
      />
    ))}
  </div>
);

const ProductPage = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [popup, setPopup] = useState(null);
  const [userRating, setUserRating] = useState(0);

  const product = {
    id: 1,
    name: "Handmade Ceramic Vase",
    price: "$45.00",
    images: [
      "https://tse3.mm.bing.net/th?id=OIP.IznRO5459ielOF9-4aVzbQHaHa&pid=Api&P=0&h=180",
      "https://tse4.mm.bing.net/th?id=OIP.ySoH33YdlZb_W-9NOdcbRAHaHa&pid=Api&P=0&h=180",
    ],
    artisan: {
      name: "Maria Lopez",
      bio: "A skilled ceramic artist from Mexico with 20 years of experience.",
    },
    reviews: [
      { user: "Alice", rating: 5, comment: "Beautiful craftsmanship!" },
      { user: "John", rating: 4, comment: "Great quality, but a bit pricey." },
    ],
  };

  const addToCart = () => {
    setCart([...cart, product]);
    setPopup("Added to cart");
    setTimeout(() => setPopup(null), 2000);
  };

  const addToWishlist = () => {
    setWishlist([...wishlist, product]);
    setPopup("Added to wishlist");
    setTimeout(() => setPopup(null), 2000);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <Header />
      <div className="p-8 max-w-6xl mx-auto relative flex-grow">
        {popup && <Popup message={popup} onClose={() => setPopup(null)} />} 
        <h1 className="text-4xl font-bold text-black text-center lg:text-left">{product.name}</h1>
        <p className="text-xl text-black text-center lg:text-left mt-2">{product.price}</p>
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Product"
              className="w-40 h-40 rounded-md cursor-pointer hover:scale-105 transition transform duration-200 shadow-md"
            />
          ))}
        </div>
        <div className="mt-8 text-center lg:text-left">
          <h2 className="text-2xl font-semibold text-black">About the Artisan</h2>
          <p className="text-black text-lg mt-2">{product.artisan.name} - {product.artisan.bio}</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-4 mt-6 items-center lg:items-start">
          <Button onClick={addToCart}>Add to Cart</Button>
          <Button variant="outline" onClick={addToWishlist}>Add to Wishlist</Button>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-black">Customer Reviews</h2>
          {product.reviews.map((review, index) => (
            <Card key={index} className="mt-4">
              <CardContent>
                <p className="font-bold text-black text-lg">{review.user}</p>
                <div className="flex mt-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-black text-lg mt-2">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-black">Rate this product</h2>
            <StarRating rating={userRating} setRating={setUserRating} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;

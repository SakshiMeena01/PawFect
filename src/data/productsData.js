import fashionImg from "../assets/fashion.jpg";
import foodImg from "../assets/food.jpg";
import groomingImg from "../assets/grooming.jpg";
import toysImg from "../assets/toys.jpg";

export const productsData = [
  {
    id: "1",
    brand: "Zigly Lifestyle",
    name: "ZL Winterized Crimson Cozy Red Cable Knit Dog Sweater",
    category: "Fashion & Apparel",
    price: 1049,
    oldPrice: 1499,
    discount: "30% OFF",
    description:
      "Keep your dog warm and stylish with this cozy red cable-knit sweater. Made from soft acrylic yarn for comfort and warmth during winter walks.",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    images: [fashionImg, fashionImg, fashionImg],
  },
  {
    id: "2",
    name: "Premium Dog Food - Chicken & Rice",
    category: "Premium Food & Nutrition",
    price: 799,
    oldPrice: 999,
    discount: "20% OFF",
    description: "Nutritious and tasty meal for all breeds.",
    image: foodImg,
  },
  {
    id: "3",
    name: "Dog Grooming Kit - Clippers & Brush Combo",
    category: "Grooming & Care",
    price: 599,
    oldPrice: 749,
    discount: "15% OFF",
    description: "Professional grooming kit with clippers and brush.",
    image: groomingImg,
  },
  {
    id: "4",
    name: "Interactive Dog Toys - Ball & Rope Combo",
    category: "Interactive Toys & Games",
    price: 499,
    oldPrice: 699,
    discount: "25% OFF",
    description: "Fun and safe toys to keep your pets active and playful.",
    image: toysImg,
  },
];

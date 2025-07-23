// lib/api.js
export async function fetchProducts() {
  return [
    {
      id: 1,
      name: "iPhone 14",
      category: "Phones",
      price: 999,
      image: "/images/iphone14.jpg",
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      category: "Phones",
      price: 899,
      image: "/images/galaxy-s23.jpg",
    },
    {
      id: 3,
      name: "AirPods Pro",
      category: "Accessories",
      price: 249,
      image: "/images/airpods.jpg",
    },
  ];
}

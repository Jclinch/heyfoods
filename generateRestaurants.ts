import { writeFile } from 'fs/promises';

const states = [
  "Lagos", "Abuja", "Rivers", "Kano", "Kaduna", "Oyo", "Enugu", "Delta", "Ogun", "Anambra",
  "Edo", "Plateau", "Benue", "Kwara", "Niger", "Cross River", "Akwa Ibom", "Ondo", "Ekiti", "Osun",
  "Borno", "Yobe", "Bauchi", "Gombe", "Taraba", "Adamawa", "Kebbi", "Zamfara", "Sokoto", "Jigawa", "Katsina", "Nasarawa", "Ebonyi", "Bayelsa", "Abia", "Kogi", "Imo"
];

const foodTags = [
  "Rice", "Chicken", "Fastfood", "Pounded Yam", "Goat meat", "Spicy", "Fries", "Burgers",
  "Pizza", "Drinks", "Local", "Soups", "Swallow", "Smoothies", "Desserts", "Barbecue",
  "Grilled Fish", "Jollof", "Plantain", "Fried Rice", "Snacks"
];

const discounts = [
  "5% off order", "Free delivery, up to ₦500", "10% off first order",
  "Buy 1 Get 1 Free", "Free delivery on weekends", "15% off orders above ₦2000",
  "20% off orders above ₦3000", "Free drink with every order",
  "Free delivery on first order", "Buy 2 Get 1 Free", "10% off orders above ₦5000",
  "Free drink with every dessert", "Free drink with every snack",
  "Free drink with every barbecue", "5% off all orders", ""
];

const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const getRandomTags = () => {
  const shuffled = [...foodTags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3 + 2)).join(", ");
};

const generateRestaurants = () => {
  const restaurants = [];

  for (let i = 1; i <= 600; i++) {
    const hasNotice = Math.random() < 0.5;
    const restaurant = {
      id: i,
      name: `Restaurant ${i}`,
      tags: getRandomTags(),
      rating: +(Math.random() * 2 + 3).toFixed(1), // between 3.0 and 5.0
      reviews: `${Math.floor(Math.random() * 500) + 1}+ Ratings`,
      discount: getRandom(discounts),
      image: `/images/${Math.floor(Math.random() * 18 + 1)}.jpg`,
      location: `${getRandom(states)}, Nigeria`,
      opensAt: `${String(Math.floor(Math.random() * 3 + 8)).padStart(2, '0')}:${Math.random() < 0.5 ? '00' : '30'}`,
      closesAt: `${String(Math.floor(Math.random() * 4 + 20)).padStart(2, '0')}:${Math.random() < 0.5 ? '00' : '30'}`,
      ...(hasNotice && { notice: "Special discounts available today!" }),
    };

    restaurants.push(restaurant);
  }

  return restaurants;
};

const main = async () => {
  const data = generateRestaurants();
  await writeFile('restaurantData.json', JSON.stringify(data, null, 2));
  console.log("✅ 600 restaurant records saved to restaurantData.json");
};

main();

import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";

// Import images from assets
import burgerImg from "../assets/burger.png";
import pizzaImg from "../assets/pizza.png";
import noodlesImg from "../assets/noodles.png";
import chocoshakeImg from "../assets/chocoshake.png";
import friesImg from "../assets/fries.png";
import garlicBreadImg from "../assets/garlicbread.png";
import pastaImg from "../assets/pasta.png";
import sandwichImg from "../assets/sandwiches.png";

// Food rewards with adjusted points
const foodRewards = [
  { id: 1, name: "Veg Burger", cost: 150, image: burgerImg },
  { id: 2, name: "Pizza Slice", cost: 200, image: pizzaImg },
  { id: 3, name: "Noodles", cost: 180, image: noodlesImg },
  { id: 4, name: "Choco Shake", cost: 120, image: chocoshakeImg },
  { id: 5, name: "French Fries", cost: 160, image: friesImg },
  { id: 6, name: "Garlic Bread", cost: 170, image: garlicBreadImg },
  { id: 7, name: "Pasta", cost: 190, image: pastaImg },
  { id: 8, name: "Sandwich", cost: 140, image: sandwichImg },
];

export default function Points() {
  const { user, updateUser } = useContext(UserContext); // use updateUser
  const [selectedReward, setSelectedReward] = useState(null);

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-500">
        Please login to redeem food items.
      </div>
    );
  }

  if (selectedReward) {
    return (
      <RedeemCheckout
        reward={selectedReward}
        user={user}
        updateUser={updateUser} // pass updateUser
        onBack={() => setSelectedReward(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-rose-100 to-yellow-100 py-10 px-4">
      <div className="max-w-5xl mx-auto rounded-xl shadow-xl p-8 bg-gradient-to-r from-orange-50 via-rose-50 to-yellow-50">
        <h2 className="text-3xl font-extrabold mb-6 text-orange-700 text-center drop-shadow">
          🎁 Redeem Your Food Items
        </h2>
        <div className="text-center mb-8">
          <span className="text-3xl font-bold text-green-600">
            {user.points || 0}
          </span>
          <span className="ml-2 text-gray-700 font-medium">
            Points Available
          </span>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodRewards.map((food, index) => (
            <div
              key={food.id}
              className="rounded-xl shadow-md flex flex-col items-center p-5 transition-transform transform hover:scale-105 hover:shadow-xl"
              style={{
                background:
                  index % 4 === 0
                    ? "linear-gradient(135deg, #ffe6cc, #ffd1a3)" // peach
                    : index % 4 === 1
                    ? "linear-gradient(135deg, #fff2cc, #ffe680)" // soft yellow
                    : index % 4 === 2
                    ? "linear-gradient(135deg, #e6ffe6, #b3ffb3)" // fresh green
                    : "linear-gradient(135deg, #ffe6f2, #ffb3d9)", // pink-coral
              }}
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-28 h-28 object-contain rounded mb-3 drop-shadow-md"
              />
              <div className="font-bold text-lg mb-1 text-gray-900">
                {food.name}
              </div>
              <div className="text-red-600 font-extrabold text-lg mb-3">
                {food.cost} pts
              </div>
              <button
                disabled={(user.points || 0) < food.cost}
                onClick={() => setSelectedReward(food)}
                className={`w-full px-4 py-2 rounded-lg font-semibold shadow transition-all duration-300 ${
                  (user.points || 0) >= food.cost
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-red-600 hover:to-orange-600 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Redeem
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// RedeemCheckout Component
function RedeemCheckout({ reward, user, updateUser, onBack }) {
  const [form, setForm] = useState({
    name: user?.name || "",
    address: "",
    paymentMode: "None",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!form.name.trim() || !form.address.trim()) {
      setError("Please fill all fields.");
      setIsSubmitting(false);
      return;
    }

    // Simulate redeem API call and deduct points
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmed(true);
      // Update user points everywhere
      if (updateUser) {
        updateUser({ ...user, points: (user.points || 0) - reward.cost });
      }
      // Optionally, call backend API to update points here
    }, 1200);
  };

  if (confirmed) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-700">
          ✅ Redemption Successful!
        </h2>
        <img
          src={reward.image}
          alt={reward.name}
          className="w-24 h-24 object-contain rounded mx-auto mb-4"
        />
        <p className="mb-2">
          You have redeemed <b>{reward.name}</b> for{" "}
          <b>{reward.cost} points</b>.
        </p>
        <p className="mb-2">It will be delivered to:</p>
        <p className="mb-4 font-semibold">{form.address}</p>
        <p className="mt-6 text-gray-700">
          Thank you for using your points! 🎉
        </p>
        <button
          onClick={onBack}
          className="mt-6 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold"
        >
          Back to Rewards
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-gradient-to-br from-orange-50 to-yellow-100 rounded-xl shadow-lg p-8">
      <button
        onClick={onBack}
        className="mb-4 text-orange-600 font-semibold hover:underline"
      >
        &larr; Back
      </button>
      <h2 className="text-2xl font-bold mb-4 text-orange-700 text-center">
        Redeem: {reward.name}
      </h2>
      <img
        src={reward.image}
        alt={reward.name}
        className="w-20 h-20 object-contain rounded mx-auto mb-4"
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="p-2 rounded border bg-orange-50 focus:ring-2 focus:ring-orange-400"
          required
        />
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Delivery Address"
          className="p-2 rounded border bg-orange-50 focus:ring-2 focus:ring-orange-400"
          required
        />
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-600 hover:to-orange-600 text-white py-2 rounded font-semibold transition-all duration-300"
        >
          {isSubmitting ? "Processing..." : "Confirm Redemption"}
        </button>
      </form>
    </div>
  );
}

import { useState, useEffect } from "react";
import { FaSmile, FaUtensils, FaAward, FaLeaf, FaTruck, FaStar } from "react-icons/fa";
import chef from "../assets/chef.png"
import manager from "../assets/manager.png"
import delivery_lead from "../assets/delivery_lead.png"

export default function About() {
  const [stats, setStats] = useState({
    customers: 0,
    meals: 0,
    years: 0,
  });

  useEffect(() => {
    const targetStats = { customers: 1200, meals: 5000, years: 5 };
    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;

    let stepCount = 0;
    const counter = setInterval(() => {
      stepCount++;
      setStats({
        customers: Math.floor((targetStats.customers / steps) * stepCount),
        meals: Math.floor((targetStats.meals / steps) * stepCount),
        years: Math.floor((targetStats.years / steps) * stepCount),
      });

      if (stepCount === steps) clearInterval(counter);
    }, interval);
  }, []);

  return (
    <div className="pt-10 px-5 bg-gradient-to-b from-red-50 to-amber-300">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        About Us
      </h1>

      {/* Intro */}
      <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed text-center">
        Welcome to our fast food restaurant! We are passionate about serving 
        delicious, freshly made food that satisfies your cravings. Our menu 
        is crafted with love and features a variety of flavors to make sure 
        there's something for everyone.
      </p>

      <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-700 leading-relaxed text-center">
        Our mission is to bring people together over great meals. Whether 
        you're here for a quick snack, a hearty meal, or just to catch up 
        with friends, we’re always happy to serve you.
      </p>

      {/* Stats Section */}
      <div className="flex justify-center gap-10 mt-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600">{stats.customers}+</h2>
          <p className="text-gray-600">Happy Customers</p>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600">{stats.meals}+</h2>
          <p className="text-gray-600">Meals Served</p>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600">{stats.years}</h2>
          <p className="text-gray-600">Years in Business</p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: <FaUtensils />, title: "Freshly Cooked", desc: "We prepare every meal fresh with quality ingredients." },
            { icon: <FaLeaf />, title: "Healthy Options", desc: "Delicious meals that are also good for your health." },
            { icon: <FaTruck />, title: "Fast Delivery", desc: "Hot and fresh food delivered right to your door." },
            { icon: <FaAward />, title: "Award Winning", desc: "Recognized for excellence in taste and service." },
            { icon: <FaStar />, title: "Top Rated", desc: "Loved by thousands of happy customers." },
            { icon: <FaSmile />, title: "Friendly Service", desc: "Our team always serves you with a smile." },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              <div className="text-red-500 text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-16 pb-10">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: "Chef Antonio", role: "Head Chef", img: chef },
            { name: "Sarah Lee", role: "Manager", img: manager },
            { name: "John Doe", role: "Delivery Lead", img: delivery_lead },
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md p-4  w-60 text-center hover:shadow-lg transition-shadow"
            >
              <img
              src={member.img}
              alt={member.name}
              className="w-32 h-32 mx-auto rounded-full mb-3 object-cover border-4 border-red-200 shadow-md"
            />

              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

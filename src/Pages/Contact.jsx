import { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000); // Hide after 3s
    }
  };

  return (
    <div className="py-10 px-5">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Contact Us
      </h1>
      <p className="max-w-2xl mx-auto text-lg text-gray-700 text-center mb-10">
        Have questions, feedback, or want to place an order? We'd love to hear from you!
      </p>

      <form
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            rows="4"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
        >
          Send Message
        </button>

        {submitted && (
          <p className="mt-4 text-green-600 text-center font-medium">
            ✅ Message sent successfully!
          </p>
        )}
      </form>

      {/* Contact Details */}
      <div className="mt-10 text-center text-gray-700 space-y-2">
        <p>📍 Sion, Mumbai, India</p>
        <p>📞 +91 98765 43210</p>
        <p>✉️ FastFood@gmail.com</p>
        <p>🕒 Mon - Sun: 10:00 AM - 11:00 PM</p>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center gap-5 mt-6 text-red-600 text-2xl">
        <a href="#"><FaFacebook /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaWhatsapp /></a>
      </div>

      {/* Google Map Embed */}
      <div className="mt-10 max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
        <iframe
          title="Restaurant Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.356641215464!2d72.857155!3d19.044452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c62c3e933e81%3A0x92b58cfb3a3c3d8d!2sSion%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1678100000000!5m2!1sen!2sin"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

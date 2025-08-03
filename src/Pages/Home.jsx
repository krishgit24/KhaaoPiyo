import React from "react";
import Card from "../Components/Card.jsx";

export default function Home() {
  return (
    <div className="bg-amber-200 min-h-screen py-10 px-5">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-10">
        Fast Food
      </h1>
      
      <div className="flex flex-wrap justify-center gap-8">
        <Card />
      </div>
    </div>
  );
}

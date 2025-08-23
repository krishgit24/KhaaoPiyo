import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function Profile() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div className="text-center mt-10 text-red-500">Please login to view your profile.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow p-8">
      <h2 className="text-3xl font-bold mb-4 text-red-600">Profile</h2>
      <p className="mb-2"><strong>Name:</strong> {user.name}</p>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>
      <p className="mb-2"><strong>Points:</strong> <span className="bg-yellow-400 text-white px-2 py-1 rounded">{user.points || 0}</span></p>
      <p className="mt-6 text-gray-500">More profile features coming soon!</p>
    </div>
  );
}
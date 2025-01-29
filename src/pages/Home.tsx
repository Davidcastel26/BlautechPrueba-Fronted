import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "../typescript/interfaces";
import api from "../lib/api";
import Navbar from "./Navbar";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get<User[]>("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const onClickRemoveUser = async (userId: number) => {
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;

    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

    try {
      await api.delete(`/users/${userId}`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
              >
                <h2 className="text-xl font-semibold text-gray-800 text-center">{user.name} {user.last_name}</h2>
                <p className="text-gray-600 text-center">{user.email}</p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    to={`/profile/${user.id}`}
                    className="block w-full text-center text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 transition"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => onClickRemoveUser(user.id)}
                    className="block w-full text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

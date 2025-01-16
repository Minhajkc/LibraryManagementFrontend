import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserCircle, Book, RefreshCcw, Check, Loader2, Clock } from "lucide-react";

const BorrowingsOverview = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalActiveBorrowings: 0,
    users: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/borrow/borrowingsOverview", {
          withCredentials: true,
        });
        console.log(response.data)
        setData(response.data);
      } catch (error) {
        console.error("Error fetching borrowings overview:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateStatus = async (userId, borrowId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/borrow/updateStatus/${borrowId}`,
        { status: "returned", userId },
        { withCredentials: true }
      );
      const response = await axios.get("http://localhost:5000/api/borrow/borrowingsOverview", {
        withCredentials: true,
      });
      setData(response.data);
      console.log(response,'minhajjaja')
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2 text-blue-600">
          <Loader2 className="animate-spin" size={24} />
          <span className="text-lg font-semibold">Loading borrowings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Book className="text-blue-500" size={28} />
            Borrowings Overview
          </h1>
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-blue-600 font-medium">
              Active Borrowings: {data.totalActiveBorrowings}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Borrowings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.users.map((user) => {
                const filteredBorrowings = user.borrowingHistory
                  .filter((borrow) => borrow.status === "delivered" || borrow.status === "returned")
                  .sort((a, b) => (a.status === "delivered" ? -1 : 1));

                return filteredBorrowings.length > 0 ? (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <UserCircle className="text-gray-400" size={20} />
                        <span className="font-medium text-gray-700">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <ul className="space-y-3">
                        {filteredBorrowings.map((borrow) => (
                          <li
                            key={borrow.bookId._id}
                            className={`flex items-center justify-between p-2 rounded-lg ${
                              borrow.status === "delivered"
                                ? "bg-green-50 hover:bg-green-100 cursor-pointer"
                                : "bg-blue-50"
                            }`}
                            onClick={() =>
                              borrow.status === "delivered" && updateStatus(user._id, borrow._id)
                            }
                          >
                            <div className="flex items-center gap-2">
                              <Book size={16} className={borrow.status === "delivered" ? "text-green-500" : "text-blue-500"} />
                             
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {new Date(borrow.borrowedAt).toLocaleDateString()}
                              </span>
                              <span className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                                borrow.status === "delivered" 
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}>
                                {borrow.status === "delivered" ? (
                                  <RefreshCcw size={14} />
                                ) : (
                                  <Check size={14} />
                                )}
                                {borrow.status}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BorrowingsOverview;
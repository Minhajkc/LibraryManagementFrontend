import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCircle, Package, Clock, CheckCircle, Loader2 } from 'lucide-react';

const PendingUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/borrow/borrowingsOverviewPending",
          {
            withCredentials: true,
          }
        );
        setData(response.data.users);
      } catch (error) {
        console.error("Error fetching borrowings overview:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (id, userId) => {
    // Prompt user for confirmation before updating status
    const confirmAction = window.confirm("Are you sure you want to mark this item as delivered?");
    
    if (!confirmAction) {
      return; // If user cancels, do nothing
    }

    try {
      // First API call to update the status
      await axios.put(
        `http://localhost:5000/api/borrow/${id}/updateStatus`,
        { status: "delivered", userId },
        { withCredentials: true }
      );
  
      // Update local state to reflect the change
      setData((prevData) =>
        prevData.map((user) => ({
          ...user,
          borrowingHistory: user.borrowingHistory.map((borrowing) =>
            borrowing._id === id ? { ...borrowing, status: "delivered" } : borrowing
          ),
        }))
      );
  
      // Second API call to get the updated borrowings overview
      const updatedResponse = await axios.get(
        "http://localhost:5000/api/borrow/borrowingsOverview",
        { withCredentials: true }
      );
  
      // Optionally, update the state with the new data from the server
      setData(updatedResponse.data.users);
  
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2 text-blue-600">
          <Loader2 className="animate-spin" size={24} />
          <span className="text-lg font-semibold">Loading...</span>
        </div>
      </div>
    );
  }

  // Filter only users who have at least one pending borrowing
  const usersWithPendingBorrowings = data.filter((user) => 
    user.borrowingHistory.some((borrowing) => borrowing.status === 'pending')
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Clock className="text-blue-500" size={28} />
          Pending Users
        </h1>

        {usersWithPendingBorrowings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No pending borrowings found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {usersWithPendingBorrowings.map((user) => (
              <div key={user._id} className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <UserCircle className="text-blue-500" size={24} />
                  {user.name}
                </h2>

                <div className="ml-8 space-y-3">
                  {user.borrowingHistory
                    .filter((borrowing) => borrowing.status === 'pending')
                    .map((borrowing) => (
                      <div 
                        key={borrowing._id}
                        className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-700 font-medium mb-1">
                              <Package className="inline mr-2 text-blue-500" size={16} />
                              {borrowing.bookId.title}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock size={14} />
                              Status: {borrowing.status}
                            </p>
                          </div>
                          <button
                            onClick={() => handleStatusChange(borrowing._id, user._id)}
                            className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                          >
                            <CheckCircle size={16} />
                            Mark as Delivered
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingUsers;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Book, Library, AlertCircle, User } from "lucide-react";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", { withCredentials: true });
        const { name, email, borrowingHistory } = response.data;
        setUserInfo({ name, email });
        setBorrowedBooks(borrowingHistory);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Categorize books based on status
  const pendingBooks = borrowedBooks.filter((book) => book.status === "pending");
  const deliveredBooks = borrowedBooks.filter((book) => book.status === "delivered");
  const returnedBooks = borrowedBooks.filter((book) => book.status === "returned");

  const BookGrid = ({ books, emptyMessage }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.length === 0 ? (
        <div className="col-span-full flex items-center gap-2 text-gray-500">
          <AlertCircle size={20} />
          <p>{emptyMessage}</p>
        </div>
      ) : (
        books.map((book) => (
          <div
            key={book.bookId}
            className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 shadow-sm"
          >
            <Book className="text-blue-500" size={20} />
            <div>
              <p className="text-gray-700 font-medium">{book.bookId.title}</p>
              <p className="text-sm text-gray-500">
                Borrowed: {new Date(book.borrowedAt).toLocaleDateString()} | 
                Status: {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* User Info */}
        <div className="bg-blue-100 p-4 rounded-lg flex items-center gap-4">
          <User className="text-blue-500" size={32} />
          <div>
            <h1 className="text-xl font-bold text-gray-800">{userInfo.name || "Loading..."}</h1>
            <p className="text-gray-600">{userInfo.email || "Loading..."}</p>
          </div>
        </div>

        {/* Library Overview Header */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
          <Library className="text-blue-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Your Library Overview</h2>
        </div>

        <div className="space-y-6">
          {/* Pending Books */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-700">
              <Book className="text-blue-500" size={20} />
              Pending Books
            </h3>
            <BookGrid books={pendingBooks} emptyMessage="No pending books." />
          </div>

          {/* Delivered Books */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-700">
              <Book className="text-blue-500" size={20} />
              In Hand Books
            </h3>
            <BookGrid books={deliveredBooks} emptyMessage="No books in hand." />
          </div>

          {/* Returned Books */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-700">
              <Book className="text-blue-500" size={20} />
              Returned Books
            </h3>
            <BookGrid books={returnedBooks} emptyMessage="No returned books." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

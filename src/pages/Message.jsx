// Message.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Message() {
  const [message, setMessage] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchMessage = async () => {
    try {
      const response = await axios.get('https://dashboard-mvei.onrender.com/message');
      if (response.status === 200) {
        setMessage(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSave = async () => {
    try {
      const newMessage = { name, email, phoneno };
      const response = await axios.post('https://dashboard-mvei.onrender.com/message', newMessage);
      if (response.status === 200) {
        fetchMessage();
        clearForm();
      }
    } catch (error) {
      console.error('Error saving the message:', error);
    }
  };

  const handleUpdate = async (messageId) => {
    try {
      const updatedMessage = { name, email, phoneno };
      const response = await axios.put(`https://dashboard-mvei.onrender.com/message/${messageId}`, updatedMessage);
      if (response.status === 200) {
        fetchMessage();
        clearForm();
      }
    } catch (error) {
      console.error('Error updating the message:', error);
    }
  };

  const handleDelete = async (messageId) => {
    try {
      const response = await axios.delete(`https://dashboard-mvei.onrender.com/message/${messageId}`);
      if (response.status === 200) {
        fetchMessage();
      } else {
        console.error('Error deleting the message:', response.data.remark);
      }
    } catch (error) {
      console.error('Error deleting the message:', error);
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPhoneno("");
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border mb-4"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border mb-4"
          required
        />
        <input
          type="tel"
          value={phoneno}
          onChange={(e) => setPhoneno(e.target.value)}
          placeholder="Phone Number"
          className="w-full p-2 border mb-4"
          required
        />
        <button
          type="submit"
          className='bg-sky-500 p-2 rounded text-white'
        >
          Add New Message
        </button>
      </form>
      <div className="mt-4">
        {message.length > 0 ? (
          <ul className="list-disc pl-5">
            {message.map((message) => (
              <li key={message._id} className="mb-2">
                <div>
                  <strong>{message.name}</strong><br />
                  Email: {message.email}<br />
                  Phone Number: {message.phoneno}
                </div>
                <button
                  onClick={() => { setName(message.name); setEmail(message.email); setPhoneno(message.phoneno); handleUpdate(message._id); }}
                  className='bg-yellow-500 text-white px-2 py-1 ml-2 text-sm'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(message._id)}
                  className='bg-red-500 text-white px-2 py-1 ml-2 text-sm'
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages available</p>
        )}
      </div>
    </div>
  );
}

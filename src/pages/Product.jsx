import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth } from '../context/AuthContext'; // Adjust import path as needed

export default function Product() {
  const [product, setProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [variants, setVariants] = useState("");
  const { isAuthenticated, logout } = useAuth(); // Use context

  useEffect(() => {
    if (isAuthenticated) {
      fetchProduct();
    } else {
      // Redirect to login or show a message
      // window.location.href = '/login'; // Uncomment if you want to redirect
    }
  }, [isAuthenticated]);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem('token'); // Adjust based on your token storage
      const response = await axios.get('https://dashboard-mvei.onrender.com/product', {
        headers: {
          'Authorization': `Bearer ${token}` // Add Authorization header
        }
      });
      if (response.status === 200) {
        const productsWithSrNo = response.data.data.map((product, index) => ({
          ...product,
          srNo: index + 1, // Add srNo field
        }));
        setProduct(productsWithSrNo);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      if (error.response.status === 401) {
        logout(); // Log out user if unauthorized
        // Redirect to login page
        // window.location.href = '/login'; // Uncomment if you want to redirect
      }
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token'); // Adjust based on your token storage
      const newProduct = { title, description, price, variants };
      const response = await axios.post('https://dashboard-mvei.onrender.com/product', newProduct, {
        headers: {
          'Authorization': `Bearer ${token}` // Add Authorization header
        }
      });
      if (response.status === 200) {
        fetchProduct();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving the product:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token'); // Adjust based on your token storage
      const updatedProduct = { title, description, price, variants };
      const response = await axios.put(`https://dashboard-mvei.onrender.com/product/${currentProduct._id}`, updatedProduct, {
        headers: {
          'Authorization': `Bearer ${token}` // Add Authorization header
        }
      });
      if (response.status === 200) {
        fetchProduct();
        closeModal();
      }
    } catch (error) {
      console.error('Error updating the product:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('token'); // Adjust based on your token storage
      const response = await axios.delete(`https://dashboard-mvei.onrender.com/product/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Add Authorization header
        }
      });
      if (response.status === 200) {
        fetchProduct(); // Refresh the list of products
      } else {
        console.error('Error deleting the product:', response.data.remark);
      }
    } catch (error) {
      console.error('Error deleting the product:', error);
    }
  };

  const openModal = (product = null) => {
    setIsEditing(!!product);
    setCurrentProduct(product);
    setTitle(product?.title || "");
    setDescription(product?.description || "");
    setPrice(product?.price || "");
    setVariants(product?.variants || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
    setPrice("");
    setVariants("");
  };

  const columns = [
    {
      field: 'srNo',
      headerName: 'Sr No',
      width: 100,
    },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'variants', headerName: 'Variants', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <div>
          <button 
            onClick={() => openModal(params.row)}
            className='bg-black text-white px-2 py-1 m-1 text-sm'
          >
            Edit
          </button>
          <button 
            onClick={() => handleDelete(params.row._id)}
            className='bg-black text-white px-2 py-1 m-1 text-sm'
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="w-full">
        {product.length > 0 ? (
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={product}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              getRowId={(row) => row._id}
            />
          </div>
        ) : (
          <p>No product available</p>
        )}
      </div>
      <button 
        onClick={() => openModal()}
        className='bg-sky-500 p-2 fixed top-10 right-10 rounded'
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
        </svg>
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Product' : 'Write Product'}</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Name"
              className="w-full p-2 border mb-4"
            />
            <input
              type="text"
              value={variants}
              onChange={(e) => setVariants(e.target.value)}
              placeholder="Variants"
              className="w-full p-2 border mb-4"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type your description here..."
              className="w-full p-2 border mb-4"
            ></textarea>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full p-2 border mb-4"
            />
            <div className="flex justify-end">
              <button 
                onClick={isEditing ? handleUpdate : handleSave} 
                className='bg-black text-white px-4 py-2 mr-2'
              >
                {isEditing ? 'Update' : 'Save'}
              </button>
              <button onClick={closeModal} className='bg-gray-500 text-white px-4 py-2'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

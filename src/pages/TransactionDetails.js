import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Header from '../components/Header';

export default function TransactionDetails() {
    const { id } = useParams(); // Assuming you're using React Router to get the transaction ID from the URL
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await axios.get(`/api/transactions/${id}`);
                setTransaction(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransaction();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <h1>Transaction Details</h1>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Transaction ID: {transaction.TransactionsId}</h5>
                        <p className="card-text">User: {transaction.User}</p>
                        <p className="card-text">Order Date: {new Date(transaction.OrderDate).toLocaleString()}</p>
                        <p className="card-text">Total Price: ${transaction.TotalPrice.toFixed(2)}</p>
                        <p className="card-text">Total Quantity: {transaction.TotalQuantity}</p>
                        <h5 className="mt-4">Items:</h5>
                        <ul className="list-group">
                            {transaction.Items.map(item => (
                                <li key={item.ItemSlug} className="list-group-item">
                                    <p><strong>Item Name:</strong> {item.ItemName}</p>
                                    <p><strong>Quantity:</strong> {item.Quantity}</p>
                                    <p><strong>Price:</strong> ${item.Price.toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
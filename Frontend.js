// TransactionsTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [month, setMonth] = useState('March');

    useEffect(() => {
        fetchTransactions();
    }, [search, page, month]);

    const fetchTransactions = async () => {
        const response = await axios.get(`/api/transactions?search=${search}&page=${page}&month=${month}`);
        setTransactions(response.data);
    };

    return (
        <div>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
                {/* Options for months */}
            </select>
            <input
                type="text"
                placeholder="Search transactions"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction._id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.price}</td>
                            <td>{transaction.sold ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => setPage(page - 1)}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default TransactionsTable;

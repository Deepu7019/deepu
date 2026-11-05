
import React, { useState, useEffect } from "react";
import axios from "axios";

function DisplayInventory() {

    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [qty, setQty] = useState("");
    const [price, setPrice] = useState("");

    // Display inventory
    useEffect(() => {
        axios.get("http://localhost:8000/")
            .then(res => setData(res.data));
    }, []);

    // Add new product
    const add = async (e) => {
        e.preventDefault();

        const item = {
            id: Number(id),
            prodname: name,
            qty: Number(qty),
            price: Number(price)
        };

        const res = await axios.post(
            "http://localhost:8000/add", item
        );

        setData(res.data);

        setId("");
        setName("");
        setQty("");
        setPrice("");
    };

    return (
        <div>
            <h2>Inventory Management</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((x, i) => (
                        <tr key={i}>
                            <td>{x.id}</td>
                            <td>{x.prodname}</td>
                            <td>{x.qty}</td>
                            <td>{x.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Inventory Management1</h2>

            <form onSubmit={add}>
                <table>
                    <tbody>
                        <tr>
                            <td>id</td>
                            <td>
                                <input type="number"
                                    value={id}
                                    onChange={e => setId(e.target.value)}
                                    required />
                            </td>
                        </tr>

                        <tr>
                            <td>Product Name</td>
                            <td>
                                <input type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required />
                            </td>
                        </tr>

                        <tr>
                            <td>Quantity</td>
                            <td>
                                <input type="number"
                                    value={qty}
                                    onChange={e => setQty(e.target.value)}
                                    required />
                            </td>
                        </tr>

                        <tr>
                            <td>Price</td>
                            <td>
                                <input type="number"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    required />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <button type="submit">Submit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default DisplayInventory;

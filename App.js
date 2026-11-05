import React from "react";
import ReactDOM from "react-dom/client";
import DisplayInventory from "./to_inventory";
import "./index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <React.StrictMode>
        <DisplayInventory />
    </React.StrictMode>
);
                               index.js



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
                                                                                              (to_inventory.js)

---same src file---



  const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let inventory = [
    {id:1, prodname:"prod1", qty:12, price:12},
    {id:2, prodname:"prod2", qty:1, price:13},
    {id:3, prodname:"prod3", qty:10, price:14},
    {id:4, prodname:"prod4", qty:19, price:16}
];

app.get("/", (req, res) => {
    res.json(inventory);
});

app.post("/add", (req, res) => {
    const item = {
        id: Number(req.body.id),
        prodname: req.body.prodname,
        qty: Number(req.body.qty),
        price: Number(req.body.price)
    };

    inventory.push(item);
    res.json(inventory);
});

app.listen(8001, () => {
    console.log("Server running on port 8001");
});                                                                                               (myinventory.js)



mkdir inventory-backend    , cd inventory-backend , npm init -y , npm install express cors ,  after u paste (myinventory.js), node myinventory.js



open new terminal and do npm start




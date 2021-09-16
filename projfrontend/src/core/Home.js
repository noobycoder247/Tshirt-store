import React, { useState, useEffect } from 'react';
import Base from './base';
import { getProducts } from './helper/Coreapicalls';
import Card from './Card';

import "../styles.css";


export default function Home() {

    const [products, setProduct] = useState([])
    const [error, setError] = useState(false)

    const loadAllProducts = () => {
        getProducts().then((data) => {
            if (data.error) {
                setError(data.error);
                console.log(error);
            }
            else {
                setProduct(data);
            }

        });
    };

    useEffect(() => {
        loadAllProducts();
    }, [])

    return (
        <Base title="My T-Shirt Store :)" description="Welcome to T-shirt store">
            <h1>Home</h1>
            <div className="row">
                {products.map((product, index) => {
                    return (
                        <div key={index} className="col-4 mb-4">
                            <Card product={product} />
                        </div>
                    )
                })}
            </div>
        </Base>
    )
}



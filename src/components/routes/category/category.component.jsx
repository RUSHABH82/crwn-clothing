import React, {Fragment, useEffect, useState} from "react";

import "./category.styles.scss";
import {useParams} from "react-router-dom";
import {ProductCard} from "../../product-card/product-card.component";
import {useSelector} from "react-redux";
import {selectCategoriesMap} from "../../../store/categories/categories.selector";

export const Category = () => {
    const {category} = useParams()
    console.log("render/rerender Category")
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        console.log("useEffect Category fired")
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className="category-container">
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
            </div>
        </Fragment>
    );
};

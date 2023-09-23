import React, {Fragment, useEffect, useState} from "react";

import "./category.styles.scss";
import {useParams} from "react-router-dom";
import {ProductCard} from "../../product-card/product-card.component";
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../../store/categories/categories.selector";
import {Spinner} from "../../spinner/spinner.component";

export const Category = () => {
    const {category} = useParams()
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            {isLoading ? <Spinner/> : <div className="category-container">
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
            </div>}
        </Fragment>
    );
};

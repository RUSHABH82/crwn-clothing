import React, {Fragment, useEffect, useState} from "react";

import "./category.styles";
import {useParams} from "react-router-dom";
import {ProductCard} from "../../product-card/product-card.component";
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../../store/categories/categories.selector";
import {Spinner} from "../../spinner/spinner.component";
import {CategoryContainer, CategoryTitle} from "./category.styles";

type CategoryRouteParams = {
    category: string
}

export const Category = () => {
    const {category} = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {isLoading ? <Spinner/> : <CategoryContainer>
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
            </CategoryContainer>}
        </Fragment>
    );
};

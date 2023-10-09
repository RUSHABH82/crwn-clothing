import {Route, Routes} from "react-router-dom";
import {CategoriesPreview} from "../categories-preview/categories-preview.component";
import {Category} from "../category/category.component";
import {useEffect} from "react";
import {getCategoriesAndDocuments} from "../../../utils/firebase/firebase.utils";
import {useDispatch} from "react-redux";
import {setCategories} from "../../../store/categories/categories.slice";

export const Shop = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const getCategories = async () => {
            const categories = await getCategoriesAndDocuments();
            dispatch(setCategories(categories))
        };
        getCategories();
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=":category" element={<Category/>}/>
        </Routes>
    );
};

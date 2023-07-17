import React, { createContext, useEffect, useState } from "react";

import { SHOP_DATA } from "../../shop-data.js";
import {
  addCollectionAndDocument,
  getCategoriesAndDocuments,
} from "../../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoryProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    // addCollectionAndDocument("categories", SHOP_DATA);
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap)
    };
    getCategoriesMap();
  }, []);

  const value = {
    categoriesMap,
  };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

import {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {Home} from "./components/routes/home/home.component";
import {Navigation} from "./components/routes/navigation/navigation.component";
import {Authentication} from "./components/routes/authentication/authentication.component";
import {Shop} from "./components/routes/shop/shop.component";
import {Checkout} from "./components/routes/checkout/checkout.component";
import {useDispatch} from "react-redux";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user.slice";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            const pickedUser = user && (({accessToken, email,displayName}) => ({accessToken, email,displayName}))(user)
            dispatch(setCurrentUser(pickedUser));
        });

        return unsubscribe;
    }, [dispatch]);

    return (<Routes>
            <Route path='/' element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path='shop/*' element={<Shop/>}/>
                <Route path='auth' element={<Authentication/>}/>
                <Route path='checkout' element={<Checkout/>}/>
            </Route>
        </Routes>);
};

export default App;

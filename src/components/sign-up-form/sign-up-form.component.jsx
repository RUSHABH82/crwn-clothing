import React, {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth,} from "../../utils/firebase/firebase.utils";
import {FormInput} from "../form-input/form-input.componet";
import "./sign-up-form.styles.scss";
import {Button} from "../button/button.component";
import {useDispatch} from "react-redux";
import {signUpStart} from "../../store/user/user.action";

const defaultField = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

export const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultField);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => setFormFields(defaultField);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("password is not matching");
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName))
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                    required
                />
                <FormInput
                    label="Email"
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={email}
                    required
                />
                <FormInput
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={password}
                    required
                />
                <FormInput
                    label="Confirm Password"
                    type="password"
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    required
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

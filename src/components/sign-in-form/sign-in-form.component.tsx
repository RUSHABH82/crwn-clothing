import React, {ChangeEvent, FormEvent, useState} from "react";
import {FormInput} from "../form-input/form-input.componet";
import {Button, BUTTON_TYPE_CLASSES} from "../button/button.component";
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../store/user/user.action";
import {ButtonsContainer, SignInContainer} from "./sign-in-form.styles";

const defaultField = {
    email: "",
    password: "",
};

export const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultField);
    const {email, password} = formFields;

    const resetFormFields = () => setFormFields(defaultField);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email, password))
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const logGoogleUser = () => {
        dispatch(googleSignInStart());
    };

    return (
        <SignInContainer>
            <h2>I already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button
                        type="button"
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={logGoogleUser}
                    >
                        google Sign-In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

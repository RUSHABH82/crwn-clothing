import React, {useState} from "react";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {FormContainer, PaymentButton, PaymentFormContainer} from "./payment-form.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartTotal} from "../../store/cart/cart.selector";
import {selectCurrentUser} from "../../store/user/user.selector";
import {clearCart} from "../../store/cart/cart.slice";

export const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const currentUser = useSelector(selectCurrentUser)
    const amount = useSelector(selectCartTotal);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const dispatch = useDispatch();

    const paymentHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsProcessingPayment(true)
        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: "post", headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({amount: amount * 100}),
        }).then((res) => res.json());

        const {paymentIntent: {client_secret}} = response;
        console.log(client_secret)

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement), billing_details: {
                    name: currentUser ? currentUser.displayName : "Guest"
                }
            }
        })
        setIsProcessingPayment(false)
        if (paymentResult.error) {
            alert(paymentResult.error.message)
        } else {
            if (paymentResult.paymentIntent.status === "succeeded") {
                alert("Payment successful!")
                dispatch(clearCart())
            }
        }
    }

    return (<PaymentFormContainer>
        <FormContainer onSubmit={paymentHandler}>
            <h2>Credit card Payment:</h2>
            <CardElement/>
            <PaymentButton
                isLoading={isProcessingPayment}
                buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</PaymentButton>
        </FormContainer>
    </PaymentFormContainer>);
};
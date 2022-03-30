import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

//const PUBLIC_KEY = process.env.STRIPE_PUBLISHABLE_KEY;

const stripeTestPromise = loadStripe("pk_test_51IVeTDI0afQjVTUZZFz5U9wIsGA4395DyqF1aak9aMcoW3AMZD1VbUxZTZyK0smbLWETe2aOTO8qY4aUrh4HLO6o00Sk2qKOAB");

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
			test
		</Elements>
	)
}

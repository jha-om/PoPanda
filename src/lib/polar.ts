import { Polar } from "@polar-sh/sdk";

export const polarAPI = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    server: "sandbox",
});

export const createCheckoutSession = async ({ userEmail, userId }: {
    userEmail: string,
    userId: string,
}) => {
    try {
        const checkout = await polarAPI.checkouts.create({
            products: [process.env.POLAR_PRODUCT_ID!],
            customerEmail: userEmail,
            successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
            metadata: {
                userId,
                userEmail,
            }
        })

        console.log("polar checkout created successfully", checkout.id);
        return checkout;
    } catch (error) {
        console.log("error creating the polar checkout::", error);
        throw new Error("failed to create checkout session")
    }
}

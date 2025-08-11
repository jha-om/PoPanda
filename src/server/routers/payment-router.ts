import { createCheckoutSession } from "@/lib/polar";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";

export const paymentRouter = router({
    createCheckoutSession: privateProcedure.mutation(async ({ c, ctx }) => {
        const { user } = ctx;
        console.log("user::", user);
        console.log("POLAR_PRODUCT_ID::", process.env.POLAR_PRODUCT_ID);
        console.log("POLAR_ACCESS_TOKEN exists:", !!process.env.POLAR_ACCESS_TOKEN);

        const checkout = await createCheckoutSession({
            userEmail: user.email,
            userId: user.id
        })

        console.log("checkout::", checkout)

        return c.json({ url: checkout.url });
    }),
    getUserPlan: privateProcedure.query(async ({ c, ctx }) => {
        const { user } = ctx;
        return c.json({ plan: user.plan });
    })
})
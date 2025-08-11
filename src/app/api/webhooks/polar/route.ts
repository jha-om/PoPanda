import { db } from "@/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("webhook-signature");

    if (!signature) {
        console.log("no webhook signature found");
        return NextResponse.json({
            message: "No signature found",
        })
    }

    let event;
    try {
        // Verify webhook signature (if Polar provides verification method)
        event = JSON.parse(body);
    } catch (error) {
        console.error("Invalid webhook payload:", error);
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    console.log("Received webhook event:", event.type);

    switch (event.type) {
        case "checkout.updated":
        case "checkout.completed":
            await handleCheckoutCompleted(event.data);
            break;
    }
}

async function handleCheckoutCompleted(checkoutData: any) {
    try {
        console.log("Processing completed checkout:", checkoutData.id);

        // Extract user information from metadata
        const userId = checkoutData.metadata?.userId;

        if (!userId) {
            console.error("No userId found in checkout metadata");
            return;
        }

        // Check if checkout is actually completed/confirmed
        if (checkoutData.status !== "confirmed") {
            console.log(`Checkout ${checkoutData.id} is not confirmed, status: ${checkoutData.status}`);
            return;
        }

        await db.user.update({
            where: { id: userId },
            data: {
                plan: "PRO",
            },
        });

        console.log(`Successfully upgraded user ${userId} to PRO plan`);
        
        return new Response("OK");
    } catch (error) {
        console.log("error handling checkout completion");
        throw error;
    }
}
"use client"

import { Card } from "@/components/ui/card";
import { client } from "@/lib/client";
import { Plan } from "@prisma/client"
import { useMutation, useQuery } from "@tanstack/react-query";
import { BarChart } from "lucide-react";
import { useRouter } from "next/navigation"
import { format } from "date-fns";

export const UpgradePageContent = ({ plan }: { plan: Plan }) => {
    const router = useRouter();

    const { mutate: createCheckoutSession } = useMutation({
        mutationFn: async () => {
            const res = await client.payment.createCheckoutSession.$post();
            return await res.json();
        },
        onSuccess: ({ url }) => {
            if (url) {
                console.log("url:::", url);
                router.push(url);
            } else {
                // Handle cases where the URL might be missing even on success
                console.error("Checkout session created, but no URL was returned.");
                alert("Could not redirect to payment. Please try again.");
            }
        },
        onError: (error) => {
            console.error("Error creating checkout session:", error);
            alert("An error occurred while setting up the payment page. Please check the console for details.");
        }
    })

    const { data: usageData } = useQuery({
        queryKey: ["usage"],
        queryFn: async () => {
            const res = await client.project.getUsage.$get();
            return await res.json();
        }
    })

    console.log("usageData", usageData);

    return (
        <div className="max-w-3xl flex flex-col gap-8">
            <div>
                <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">
                    {plan === "PRO" ? "Plan: Pro" : "Plan: Free"}
                </h1>
                <p className="text-sm/6 text-gray-600 max-w-prose">
                    {plan === "PRO" ? "Thank you for supporting PoPanda. Find your increased usage limits below." : "Get Access to more events, categories and premium support."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-2 border-brand-700">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <p className="text-sm/6 font-medium">Total Events</p>
                        <BarChart className="size-4 text-muted-foreground" />
                    </div>

                    <div>
                        <p className="text-2xl font-bold">{usageData?.eventsUsed || 0} of {" "} {usageData?.eventsLimit.toLocaleString() || 150}</p>
                        <p className="text-xs/5 text-muted-foreground">
                            Events this period
                        </p>
                    </div>
                </Card>
                <Card>
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <p className="text-sm/6 font-medium">Event Categories</p>
                        <BarChart className="size-4 text-muted-foreground" />
                    </div>

                    <div>
                        <p className="text-2xl font-bold">{usageData?.categoriesUsed || 0} of {" "} {usageData?.categoriesLimit.toLocaleString() || 3}</p>
                        <p className="text-xs/5 text-muted-foreground">
                            Active Categories
                        </p>
                    </div>
                </Card>
            </div>

            <p className="text-sm text-gray-500">
                Usage will reset {usageData?.resetDate ? format(usageData.resetDate, "MMM d, yyyy") : (
                    <span className="animate-pulse w-8 h-4 bg-orange-200"></span>
                )}

                {plan !== "PRO" ? (
                    <span
                        onClick={() => createCheckoutSession()}
                        className="flex flex-col cursor-pointer underline text-brand-600"> or upgrade now to increase your limit &rarr;</span>
                ) : null}
            </p>
        </div>
    )
}
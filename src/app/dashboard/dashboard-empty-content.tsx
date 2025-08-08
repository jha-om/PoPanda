import { EventCategoryModal } from "@/components/create-event-category-modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const DashboardEmptyContent = () => {
    const queryClient = useQueryClient();

    const { mutate: insertQuickStartCategories, isPending } = useMutation({
        mutationFn: async () => {
            await client.category.insertQuickStartCategories.$post();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-event-categories"], });
        },
    })


    return (
        <Card className="flex flex-col items-center justify-center rounded-2xl flex-1 text-center p-6">
            <div className="flex justify-center w-full">
                <img
                    src="/brand-asset-wave.png"
                    alt="No categories"
                    className="size-48 -mt-24"
                />
            </div>

            <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">No event  Categories Yet!</h1>
            <p className="text-sm/6 text-gray-600 max-w-prose mt-2 mb-8">
                Start tracking events by creating your first category.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-2">
                <Button
                    variant={"outline"}
                    className="flex items-center space-x-2 w-full sm:w-auto border-brand-500"
                    onClick={() => insertQuickStartCategories()}
                    disabled={isPending}
                >
                    <span className="size-5">🚀</span>
                    <span>{isPending ? "Creating..." : "Quickstart"}</span>
                    <span className="motion-safe:animate-bounce">
                        <svg width="256px" height="256px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#6991d2" stroke-width="1.2" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" stroke-width="1.584"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z" fill="#6991d2"></path> </g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z" fill="#6991d2"></path> </g></svg>
                    </span>
                </Button>

            </div>
        </Card>
    )
}
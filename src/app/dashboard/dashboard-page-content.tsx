"use client"
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { client } from "@/lib/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { format, formatDistanceToNow } from "date-fns"
import { ArrowRight, BarChart2, Clock, Database, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DashboardEmptyContent } from "./dashboard-empty-content";

export const DashboardPageContent = () => {
    // we will store the state of "are u sure u want to delete this event after a user clicks on delete icon";
    const [deletingCategory, setDeletingCategory] = useState<string | null>(null)
    const queryClient = useQueryClient();

    const { data: categories, isPending: isEventCategoriesLoading } = useQuery({
        queryKey: ["user-event-categories"],
        queryFn: async () => {
            const res = await client.category.getEventCategories.$get();
            const { categories } = await res.json();
            return categories;
        }
    });

    const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation({
        mutationFn: async (name: string) => {
            await client.category.deleteCategory.$post({ name })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-event-categories"], });
            setDeletingCategory(null);
        }
    })

    // after this we want to refetch the entire thing to show the updated data on the browser;
    // therefore we can use queryClient onsuccess re-validate those queries;

    if (isEventCategoriesLoading) {
        return (
            <div className="flex items-center justify-center flex-1 h-full w-full">
                <LoadingSpinner />
            </div>
        )
    }

    if (!categories || categories.length === 0) {
        return (
            <DashboardEmptyContent />
        )
    }
    return (
        <>
            <ul className="grid max-w-6xl grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <li key={category.id} className="relative group z-10 transition-all duration-200 hover:-translate-y-0.5">
                        <div className="absolute z-0 inset-px rounded-lg bg-white" />

                        <div className="pointer-events-none z-0 absolute inset-px rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md ring-1 ring-black/5" />
                        <div className="pointer-events-none absolute inset-px max-w-0 group-hover:max-w-1.5 bg-brand-600 rounded-tr-lg rounded-br-lg transition-all duration-500 ml-auto" />

                        <div className="relative p-6 z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className="size-12 rounded-full"
                                    style={{
                                        backgroundColor: category.color ? `#${category.color.toString(16).padStart(6, "0")}` : "#f3f4f6",
                                    }}
                                />

                                <div>
                                    <h3 className="text-lg/7 font-medium tracking-tight text-gray-950">
                                        {category.emoji || '📂'} {category.name}
                                    </h3>
                                    <p className="text-sm/6 text-gray-600">
                                        {format(category.createdAt, "MMM dd, yyyy")}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-sm/5 text-gray-600">
                                    <Clock className="size-4 mr-2 text-brand-500" />
                                    <span className="font-medium">Last Event:</span>
                                    <span className="ml-1">
                                        {category.lastEvent ? formatDistanceToNow(category.lastEvent) + " ago" : "Never"}
                                    </span>
                                </div>
                                <div className="flex items-center text-sm/5 text-gray-600">
                                    <Database className="size-4 mr-2 text-brand-500" />
                                    <span className="font-medium">Unique Fields:</span>
                                    <span className="ml-1">
                                        {category.uniqueFieldCount || 0}
                                    </span>
                                </div>
                                <div className="flex items-center text-sm/5 text-gray-600">
                                    <BarChart2 className="size-4 mr-2 text-brand-500" />
                                    <span className="font-medium">Events this month:</span>
                                    <span className="ml-1">
                                        {category.eventsCount || 0}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <Link
                                    href={`/dashboard/category/${category.name}`}
                                    className={buttonVariants({
                                        variant: "outline",
                                        size: "sm",
                                        className: "flex items-center gap-2 text-sm"
                                    })}
                                >
                                    View All
                                    <ArrowRight className="size-4" />
                                </Link>
                                <Button
                                    variant={"ghost"}
                                    size="sm"
                                    className="text-gray-500 hover:text-red-600 transition-colors"
                                    aria-label={`Delete ${category.name} category`}
                                    onClick={() => setDeletingCategory(category.name)}
                                >
                                    <Trash2 className="size-5" />
                                </Button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <Modal
                showModal={!!deletingCategory}
                setShowModal={() => setDeletingCategory(null)}
                className="max-w-md p-8"
            >
                <div className="space-y-6">
                    <div>

                        <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
                            Delete Category
                        </h2>
                        <p className="text-sm/6">
                            Are you sure? You want to delete the category <span className="font-semibold underline">{deletingCategory}</span>?
                            This action can&apos;t be undone.
                        </p>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <Button variant="outline" onClick={() => setDeletingCategory(null)}>Cancel</Button>
                        <Button
                            variant={"destructive"}
                            className="bg-red-500"
                            onClick={() => {
                                deletingCategory && deleteCategory(deletingCategory)
                            }}
                            disabled={isDeletingCategory}
                        >{ isDeletingCategory? "Deleting..." : "Delete" }</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
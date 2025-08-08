"use client"

import { EventCategory } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { EmptyCategoryState } from "./empty-category-state"

interface CategoryPageContentProps {
    hasEvents: boolean,
    category: EventCategory
}
export const CategoryPageContent = ({ hasEvents: initialHasEvents, category }: CategoryPageContentProps) => {
    // why initialHasEvents -> wherever we're calling this categorypagecontent is rendering all the content beforehand on server side, and then sending it to the client with intractivity
    // that's why huge and first time seeing this things;
    const { data: pollingData } = useQuery({
        queryKey: ["category", category.name, "hasEvents"],
        initialData: { hasEvents: initialHasEvents }
    });

    if (!pollingData.hasEvents) {
        return <EmptyCategoryState categoryName={category.name} />
    }
}
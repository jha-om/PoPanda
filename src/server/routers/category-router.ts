import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { startOfMonth } from "date-fns"
import { z } from "zod";

export const categoryRouter = router({
    getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
        const categories = await db.eventCategory.findMany({
            where: {
                userId: ctx.user.id
            },
            select: {
                id: true,
                name: true,
                emoji: true,
                color: true,
                updatedAt: true,
                createdAt: true,
            },
            orderBy: { updatedAt: 'desc' }
        });

        const categoriesWithcounts = await Promise.all(categories.map(async (category) => {
            const now = new Date();
            const firstDayOfMonth = startOfMonth(now);

            const [uniqueFieldCount, eventsCount, lastEvent] = await Promise.all([
                // db call to find all sorts of events happened from a particaluar date;
                db.event.findMany({
                    where: {
                        EventCategory: { id: category.id },
                        createdAt: { gte: firstDayOfMonth },
                    },
                    select: { fields: true },
                    distinct: ["fields"],
                }).then((events) => {
                    const fieldNames = new Set<String>();
                    events.forEach((event) => {
                        Object.keys(event.fields as object).forEach((fieldName) => {
                            fieldNames.add(fieldName);
                        })
                    })
                    return fieldNames.size;
                }),

                // db call to count all the total events happened up until now;
                db.event.count({
                    where: {
                        EventCategory: { id: category.id },
                        createdAt: { gte: firstDayOfMonth },
                    },
                }),
                // db call to know the last event happened for our saas;
                db.event.findFirst({
                    where: {
                        EventCategory: { id: category.id },
                    },
                    orderBy: { createdAt: 'desc' },
                    select: { createdAt: true },
                })
            ])

            return {
                ...category,
                uniqueFieldCount,
                eventsCount,
                lastEvent: lastEvent?.createdAt || null,
            }
        }))


        return c.superjson({
            categories: categoriesWithcounts
        });
    }),
    // if name is not provided from whereever i'm calling this method, then the request will automatically gets rejected; 
    deleteCategory: privateProcedure.input(z.object({
        name: z.string()
    })).mutation(async ({ c, input, ctx }) => {
        const { name } = input;

        await db.eventCategory.delete({
            where: {
                // how this name_userId comes, look in the schema.prisma file
                // in the eventCategory, there is a unique identifier with name and userId
                // so here both has to be unique not individually;
                name_userId: {name, userId: ctx.user.id}
            }
        })
        return c.json({
            success: true,
        })
    })
})
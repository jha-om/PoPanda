import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { startOfMonth } from "date-fns"
import { z } from "zod";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validator/category-validator";
import { parseColor } from "@/lib/utils";

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
                name_userId: { name, userId: ctx.user.id }
            }
        })
        return c.json({
            success: true,
        })
    }),

    //  to create a router for adding category;
    addCategory: privateProcedure.input(z.object({
        name: CATEGORY_NAME_VALIDATOR,
        color: z.
            string().
            min(1, "Color is required").
            regex(/^#[0-9A-F]{6}$/i, "Invalid color format"),
        emoji: z.string().emoji("Invalid emoji").optional(),
    })).mutation(async ({ c, ctx, input }) => {
        const { user } = ctx;
        const { color, name, emoji } = input;

        // todo: add paid plan logic;

        const eventCategory = await db.eventCategory.create({
            data: {
                name: name.toLowerCase(),
                // here the input is string, but we're in schema expecting a int from color;
                color: parseColor(color),
                emoji,
                userId: user.id
            }
        })
        return c.json({
            eventCategory
        })
    })
})
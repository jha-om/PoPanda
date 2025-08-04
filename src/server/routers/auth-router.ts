import { currentUser } from "@clerk/nextjs/server";
import { router } from "../__internals/router";
import { publicProcedure } from "../procedures";
import { db } from "@/db";

export const authRouter = router({
    getDatabaseSyncStatus: publicProcedure.query(async ({ c, ctx }) => {
        const auth = await currentUser();
        
        if (!auth) {
            return c.json({
                isSynced: false,
                reason: 'not_authenticated'
            })
        }

        const user = await db.user.findFirst({
            where: {
                externalId: auth.id
            }
        })

        if (!user) {
            try {
                await db.user.create({
                    data: {
                        quotaLimit: 100,
                        email: auth.emailAddresses[0]?.emailAddress,
                        externalId: auth.id,
                    }
                })
                
                return c.json({
                    isSynced: true,
                    reason: 'user_created'
                })
            } catch (error) {
                return c.json({
                    isSynced: false,
                    reason: 'creation_failed'
                })
            }
        }
        
        return c.json({
            isSynced: true,
            reason: 'already_synced'
        })
    }),
})

// in same route.ts structure
// export const GET = (req: Request) => {
//     return new Response(JSON.stringify({
//         status: "success",
//     }))
// }
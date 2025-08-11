import { app } from "@/server";

export const runtime = "edge"

const handler = (req: Request) => app.fetch(req);

export const GET = handler;
export const POST = handler;

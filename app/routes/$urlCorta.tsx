import { LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/utils/db.server";

export async function loader({ request, params }: LoaderArgs) {

    const { urlCorta } = params;

    const link = await db.link.findFirst({
        where: { 
            short: urlCorta
        }
    })

    if(!link) {
        return json({ error: 'No link found'},  { status: 404 });
    }

    return redirect(`${link.original.indexOf('http') != -1 ? link.original : 'http://' + link.original}`, { status: 301 });
}
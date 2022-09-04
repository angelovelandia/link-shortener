import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

export async function action({ request }: ActionArgs) {

    /* Obteniendo datos */
    const formData = await request.formData();
    const original = formData.get('original') as string;
    const short = formData.get('short') as string;
    
    /* Consultando si ya existe */
    const isShortAvailable = await db.link.findFirst({
        where: {
            short
        }
    })
    /* Ya existe, se envia error */
    if(isShortAvailable){
        return redirect('/?error=unavailable')
    }
    /* No existe, se guarda */
    const newLink = await db.link.create({
        data: {
            original,
            short
        }
    })

    return redirect(`/?success=${newLink.short}`);
}
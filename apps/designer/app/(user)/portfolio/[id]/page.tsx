import { redirect } from "next/navigation";


export default function ModelsPage({ params }: { params: {id: string} }) 
{
    redirect(`./${params.id}/infor`);
}
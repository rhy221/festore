
import EditForm from "./edit-form";



export default async function EditModelPage({
    params,
}: {
  params: Promise<{ id: string }>;
}) 
{
  const { id } = await params;
 return (
  <EditForm id={id}/>
 )
}





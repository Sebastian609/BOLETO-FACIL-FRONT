import VentaClient from "@/components/VentaClient"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{
    referal: string;
    id: string;
  }>;
};

export default async function VentaPage(props: PageProps) {
  const { referal, id } = await props.params;

  if (!referal || !id) {
    return <p>Faltan parámetros requeridos</p>;
  }
  const token = (await cookies()).get("token")?.value;

  if(!token){
    redirect("/login")
  }

  const res = await fetch(`http://localhost:3000/api/event/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    method: "GET",
  });

  if(!res.ok){
    redirect("/login")
  }

  const event = await res.json();

  return <VentaClient eventLocation={event} referal={referal} />;
}

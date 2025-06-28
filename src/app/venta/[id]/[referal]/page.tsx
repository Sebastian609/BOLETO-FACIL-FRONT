import VentaClient from "@/components/VentaClient"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function VentaPage({
  params,
}: {
  params: {
    referal: string;
    id: string;
  };
}) {
  const { referal, id } = await params;

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
      Autorization: `Bearer ${token}`,
    },

    method: "GET",
  });

  if(!res.ok){
    redirect("/login")
  }

  const event = await res.json();

  return <VentaClient eventLocation={event} referal={referal} />;
}

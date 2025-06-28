import { env } from "@/config/env.config";
import { NextApiResponse } from "next";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
      const { email, password } = await request.json();
      
      const response = await fetch(`${env.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      // Improved error handling for the external API response
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if(response.status === 401){
          NextResponse.redirect("/login")
        }

        throw new Error(errorData.message || `Error al consultar la API externa: ${response.status} ${response.statusText}`);
      }
      
      const responseData = await response.json();
      
      // Validate expected response structure from your backend
      if (!responseData.token || !responseData.data) {
        throw new Error('Estructura de respuesta inválida desde la API de autenticación');
      }

      const { token, data: userData } = responseData;
      
      // Validate user data structure within the response
      if (!userData.id || !userData.email || !userData.name) {
        throw new Error('Estructura de datos de usuario inválida en la respuesta');
      }

      // Log success in development for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log('Autenticación exitosa:', {
          userId: userData.id,
          email: userData.email,
          role: userData.rol?.name // Ensure 'rol' exists before accessing 'name'
        });
      }
      
      const res = NextResponse.json(
           { message: `¡Bienvenido ${userData.name}!` },
           { status: 200 }
         );

        // --- COOKIE SETTINGS ---
        // These settings ensure the cookie is secure and accessible throughout your app
        res.cookies.set("token", token, {
            httpOnly: true, // IMPORTANT: Prevents client-side JavaScript from accessing the cookie, enhancing security against XSS.
            // Set 'secure' to true only in production to ensure the cookie is only sent over HTTPS.
            // During development (http://localhost), setting 'secure: true' would prevent the cookie from being set.
            secure: process.env.NODE_ENV === 'production', 
            path: "/", // Makes the cookie available to all paths in your application.
            sameSite: 'lax', // Protects against CSRF attacks, a good balance between security and usability.
            maxAge: 60 * 60 * 24 * 7, // Cookie will last for 7 days (in seconds). Adjust as needed.
        });
        
        return res;

    } catch (error  ) { // Use 'any' or more specific type if known for error object
      // Log the full error in development for better debugging
      if (process.env.NODE_ENV === 'development') {
        console.error("Error during authentication POST request:", error);
      }
      return NextResponse.json(
        {
          message: "Credenciales inválidas. " + (error.message || "Ocurrió un error desconocido."),
        },
        {
          status: 401, // Unauthorized
        }
      );
    }
}
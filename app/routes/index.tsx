import { useLoaderData } from "@remix-run/react";
import { LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const errorParam = url.searchParams.get('error');
  const successParam = url.searchParams.get('success');

  const data = {
    error: errorParam,
    success: successParam,
  }

  return json(data);
}

const main = {
  width: "100%",
  height: "100vh",
  display: "grid",
  placeItems: "center"
}

const formContainer = {
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  width: "350px",
  backgroundColor: "black",
  padding: "35px",
  borderRadius: "20px",
}

const logo = {
  width: "150px",
  marginBottom: "48px",
  justifySelf: "center",
  borderRadius: "15px",
}

const input = {
  border: "none",
  fontSize: "16px",
  height: "30px",
  borderRadius: "8px",
  padding: "6px",
  marginBottom: "12px"
}

const button = {
  color: "black",
  backgroundColor: "white",
  border: "none",
  fontSize: "16px",
  borderRadius: "8px",
  padding: "12px",
  marginBottom: "12px",
  cursor: "pointer",
}

const form = {
  display: "flex",
  flexDirection: "column",
}

const label = {
  color: "white",
  fontSize: "14px",
  fontWeight: "bold",
  marginBottom: "4px",
}

const title = {
  color: "white",
  fontSize: "18px",
  marginBottom: "12px",
  textAlign: "center",
}

const subtitle = {
  color: "white",
  fontSize: "16px",
  fontWeight: "300",
  marginTop: 0,
  marginBottom: "32px",
  textAlign: "center"
}

const error = {
  color: "red",
  marginBottom: "15px",
  fontSize: "18px",
}

const success = {
  color: "#60BC65",
  marginBottom: "15px",
  fontSize: "18px",
  textDecoration: "none",
}

const url = {
  color: "white",
}

export default function Index() {

  const data = useLoaderData();
  
  return (
    <div style={main}>
        <div style={formContainer}>
            <img src="./img/logo.jpg" alt="logo" style={logo} />

            <h1 style={title}>
              Link Shortener By <a target="_blank" style={{ color: "white", textDecoration: "none"}} href="https://twitter.com/AngeloVelandia4">@angelovelandia</a>
            </h1>
            <p style={subtitle}>
              Acorta cualquier enlace de forma gratuita.
            </p>

            <form method="post" action="/url" style={form}>
                <label htmlFor="original" style={label}>URL</label>
                <input 
                  type="text" 
                  name="original" 
                  id="original" 
                  placeholder="www.google.com" style={input} />

                <label htmlFor="short" style={label}>Dale un nombre a tu URL</label>
                <input 
                  type="text" 
                  name="short" 
                  id="short" 
                  placeholder="HolaMundo..." style={input} />

                <small style={data.error ? error : success}>
                  { data.error && ("El nombre ingresado ya existe..." )}
                </small>

                <input type="submit" value="Short" style={button} />
            </form>

            <small style={data.error ? error : success}>
              { data.success && (
                <>
                  <p>
                    ¡Listo! Tu URL acortada es <a style={url} target="_blank" href={data.success}>{data.success}</a>
                  </p>
                </>
                )}
            </small>

        </div>
    </div>
  );
}

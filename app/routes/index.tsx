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
  background: "rgb(8,29,33) linear-gradient(90deg, rgba(8,29,33,1) 3%, rgba(65,65,149,1) 40%, rgba(19,54,107,1) 67%, rgba(1,28,34,1) 88%)",
  padding: "24px",
  borderRadius: "12px",
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
  marginBottom: "12px",
  backgroundColor: "transparent",
  color: "white"
}
const form = {
  display: "flex",
  "flex-direction": "column",
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
  marginBottom: "62px",
  "text-align": "center",
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

  const css = `
        button {
        background: linear-gradient(-45deg, #3f00b5, #9f69fe, #27c8b7, #3f00b5);
        background-size: 800% 400%;
        padding: 1em 2em;
        display: inline-block;
        border: none;
        border-radius: 10px;
        font-size: 17px;
        font-weight: 700;
        color: white;
        transition: all .5s ease-in-out;
        animation: gradient 10s infinite cubic-bezier(.62, .28, .23, .99) both;
        }

        button:hover {
        animation: gradient 3s infinite;
        transform: scale(1.05);
        }

        button:active {
        animation: gradient 3s infinite;
        transform: scale(0.8);
        }

        @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }

        50% {
          background-position: 100% 50%;
        }

        100% {

          background-position: 0% 50%;
        }
        }
      `
  
  return (
    <div style={main}>
        <style>
          {css}
        </style>
        <div style={formContainer}>
            <img src="./img/logo.jpg" alt="logo" style={logo} />

            <h1 style={title}>
              Link Shortener By <a target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "none"}} href="https://twitter.com/AngeloVelandia4">@angelovelandia</a>
            </h1>

            <form method="post" action="/url" style={form}>
                <label htmlFor="original" style={label}>URL</label>
                <input 
                  type="text" 
                  name="original" 
                  id="original" 
                  required
                  placeholder="www.google.com" style={input} />

                <label htmlFor="short" style={label}>Dale un nombre a tu URL</label>
                <input 
                  type="text" 
                  name="short" 
                  id="short"
                  required 
                  placeholder="HolaMundo..." style={input} />

                <small style={data.error ? error : success}>
                  { data.error && ("El nombre ingresado ya existe..." )}
                </small>

                <button type="submit"> Short  </button>
            </form>

            <small style={data.error ? error : success}>
              { data.success && (
                <>
                  <p>
                    ¡Listo! Tu URL acortada es <a style={url} target="_blank" rel="noreferrer" href={data.success}>{data.success}</a>
                  </p>
                </>
                )}
            </small>

        </div>
    </div>
  );
}

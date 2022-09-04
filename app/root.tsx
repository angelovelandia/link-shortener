import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

const all = {
  margin: 0,
  padding: 0,
  color: "white",
  background: "linear-gradient(90deg, rgba(9,84,99,1) 3%, rgba(55,88,110,1) 12%, rgba(25,61,113,1) 19%, rgba(16,31,118,1) 32%, rgba(95,95,218,1) 40%, rgba(13,47,130,1) 61%, rgba(27,76,153,1) 67%, rgba(1,39,47,1) 77%, rgba(2,61,74,1) 88%)"
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body style={all}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

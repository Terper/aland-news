import { parseStringPromise, processors } from "xml2js";
import {
  convertAlandsradio,
  convertAlandstidningen,
  convertNyaaland,
} from "./utils.ts";
import type {
  alandstidningen,
  alandsradio,
  nyaaland,
  standardizedItem,
} from "./types/items";

const options = {
  trim: true,
  explicitArray: false,
  normalize: true,
  async: true,
  tagNameProcessors: [processors.stripPrefix],
};

async function xmlFetch(url: string) {
  try {
    const response = await (await fetch(url)).text();
    return await parseStringPromise(response, options);
  } catch (error) {
    console.log(error);
  }
}

const server = Bun.serve({
  async fetch(request, server) {
    const items = new Array<standardizedItem>();
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(Bun.file("public/index.html"));
    }

    if (url.pathname === "/api/alandstidningen" || url.pathname === "/api") {
      const data: alandstidningen[] = (
        await xmlFetch("https://www.alandstidningen.ax/rss/allt")
      ).rss.channel.item;
      items.push(...convertAlandstidningen(data));
    }

    if (url.pathname === "/api/alandsradio" || url.pathname === "/api") {
      const data: alandsradio[] = (await xmlFetch("https://alandsradio.ax/rss"))
        .rss.channel.item;
      items.push(...convertAlandsradio(data));
    }

    if (url.pathname === "/api/nyaaland" || url.pathname === "/api") {
      const data: nyaaland[] = (await xmlFetch("https://www.nyan.ax/feed")).rss
        .channel.item;
      items.push(...convertNyaaland(data));
    }

    if (items.length === 0) {
      return new Response("404");
    }

    const sorted = items.sort(
      (a, b) => +new Date(b.pubDate) - +new Date(a.pubDate)
    );

    return new Response(JSON.stringify({ items: sorted }), {
      headers: { "Content-Type": "application/json" },
    });
  },
  port: Bun.env.PORT,
});

console.log(`Listening on http://localhost:${server.port} ...`);

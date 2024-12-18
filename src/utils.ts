import type {
  alandstidningen,
  standardizedItem,
  alandsradio,
  nyaaland,
} from "./types/items";

const pubDateToJSON = (pubDate: string) => {
  return new Date(pubDate).toJSON();
};

const convertAlandstidningen = (
  items: alandstidningen[]
): standardizedItem[] => {
  return items.map((item) => {
    const result: standardizedItem = {
      ...item,
      pubDate: pubDateToJSON(item.pubDate),
      catagory: new Array<string>(),
      encoded: "",
      enclosure: {
        $: {
          url: "",
          lenght: "",
          type: "",
        },
      },
    };

    return result;
  });
};

const convertAlandsradio = (items: alandsradio[]): standardizedItem[] => {
  return items.map((item) => {
    const result: standardizedItem = {
      ...item,
      pubDate: pubDateToJSON(item.pubDate),
      catagory: new Array<string>(),
      encoded: "",
      enclosure: {
        $: {
          url: "",
          lenght: "",
          type: "",
        },
      },
    };

    return result;
  });
};

const convertNyaaland = (items: nyaaland[]): standardizedItem[] => {
  return items.map((item) => {
    const result: standardizedItem = {
      ...item,
      pubDate: pubDateToJSON(item.pubDate),
    };

    return result;
  });
};

export { convertAlandstidningen, convertAlandsradio, convertNyaaland };

type alandstidningen = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  creator: string;
  guid: {
    _: string;
    $: {
      isPermaLink: string;
    };
  };
};

type alandsradio = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  creator: string;
  guid: {
    _: string;
    $: {
      isPermaLink: string;
    };
  };
};

type nyaaland = {
  title: string;
  link: string;
  creator: string;
  pubDate: string;
  category: string[];
  guid: {
    _: string;
    $: {
      isPermaLink: string;
    };
  };
  description: string;
  catagory: string[];
  encoded: string;
  enclosure: {
    $: {
      url: string;
      lenght: string;
      type: string;
    };
  };
};

type standardizedItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  creator: string;
  guid: {
    _: string;
    $: {
      isPermaLink: string;
    };
  };
  catagory: string[];
  encoded: string;
  enclosure: {
    $: {
      url: string;
      lenght: string;
      type: string;
    };
  };
};

export type { alandstidningen, alandsradio, nyaaland, standardizedItem };

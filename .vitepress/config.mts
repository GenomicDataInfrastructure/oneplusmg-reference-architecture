import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

import { buildSidebar } from "./sidebar";

import renderMarkdownImage from "./renderMarkdownImage";

const srcExclude = undefined; // nothing excluded (at the moment)

// An empty sub-items is added to make all top-level sidebar items appear the same way.
const sidebarItems = buildSidebar("./docs", "", srcExclude)?.items?.map(
  (item) => ({ ...item, collapsed: true, items: item.items ?? [] })
);

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  title: "1+MG Reference Architecture",
  description: "1+MG Reference Architecture",
  srcDir: "./docs",
  srcExclude,
  base: "/",
  lang: "en-GB",
  head: [
    ["link", { rel: "icon", href: "/architecture/figures/favicon.ico" }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // logo: "/figures/logotype.svg",
    nav: [
      { text: "Home", link: "/" },
    ],

    sidebar: sidebarItems,

    socialLinks: [
      { icon: "github", link: "https://github.com/GenomicDataInfrastructure/oneplusmg-reference-architecture" },
    ],
    editLink: {
      text: "Edit this page on GitHub",
      pattern:
        "https://github.com/GenomicDataInfrastructure/oneplusmg-reference-architecture/blob/main/docs/:path",
    },
    lastUpdated: {
      text: "Last Updated",
      formatOptions: {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        forceLocale: true,
      },
    },
    search: {
      provider: "local",
    },
  },
  vite: {
    assetsInclude: ["**/*.puml"],
  },
  vue: {
    template: {
      transformAssetUrls: {
        Img: ["src"],
      },
    },
  },
  markdown: {
    config: (md) => {
      md.renderer.rules.image = renderMarkdownImage;
    },
  },
}));

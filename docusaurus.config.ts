// SPDX-FileCopyrightText: 2025 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "1+MG Reference Architecture",
  tagline:
    "1+ Million Genomes (1+MG) initiative aims to enable secure access to genomics and the corresponding clinical data across Europe for better research, personalised healthcare and health policy making.",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  plugins: [require.resolve("docusaurus-lunr-search")],

  // Set the production url of your site here
  url: "https://genomicdatainfrastructure.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/oneplusmg-reference-architecture/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "GenomicDataInfrastructure", // Usually your GitHub org/user name.
  projectName: "oneplusmg-reference-architecture", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "1+MG Reference Architecture",
      logo: {
        alt: "1+MG Reference Architecture Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "right",
          label: "Home",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Home",
          items: [
            {
              label: "Introduction and Goals",
              to: "/docs/introduction-and-goals",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/GenomicDataInfrastructure",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/gdi-euproject/posts",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "1+MG Framework",
              href: "https://github.com/GenomicDataInfrastructure/oneplusmg-reference-architecture",
            },
            {
              label: "B1MG",
              href: "https://b1mg-project.eu/",
            },
            {
              label: "B1MGplus",
              href: "https://b1mgplus.onemilliongenomes.eu/",
            },
            {
              label: "GDI",
              href: "https://gdi.onemilliongenomes.eu/",
            },
            {
              label: "Genome of Europe",
              href: "https://genomeofeurope.eu/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Luxembourg National Data Service (LNDS). It is a brand of PNED G.I.E., an economic interest group established by the Luxembourg government and public institutes 2023. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

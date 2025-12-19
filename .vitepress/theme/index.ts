// SPDX-FileCopyrightText: 2025 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import LayoutWithFrontmatterTitle from "./LayoutWithFrontmatterTitle.vue";
import C4 from "./C4.vue";
import Img from "./Img.vue";

export default {
  extends: DefaultTheme,
  Layout: LayoutWithFrontmatterTitle,

  enhanceApp({ app }) {
    app.component("Img", Img);
  },
} satisfies Theme;

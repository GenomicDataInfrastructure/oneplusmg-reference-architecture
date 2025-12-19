<!--
SPDX-FileCopyrightText: 2025 PNED G.I.E.

SPDX-License-Identifier: Apache-2.0
-->

<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";

const { Layout } = DefaultTheme;
const { frontmatter } = useData();
</script>

<template>
  <Layout>
    <template #doc-before>
      <div class="vp-doc">
        <h1>{{ frontmatter.title }}</h1>
      </div>
    </template>
  </Layout>
</template>

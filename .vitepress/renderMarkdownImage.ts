// SPDX-FileCopyrightText: 2025 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

const renderMarkdownImage = (tokens, idx, _options, _env, _self) => {
  const token = tokens[idx];
  return `<ClientOnly><Img src="${token.attrGet("src")}" alt="${token.attrGet(
    "alt"
  )}" /></ClientOnly>`;
};

export default renderMarkdownImage;

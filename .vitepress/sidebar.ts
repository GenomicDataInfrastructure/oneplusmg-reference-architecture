// SPDX-FileCopyrightText: 2025 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import micromatch from "micromatch";

/*
 * Type from: `vitepress/types/default-theme.d.ts`
 */
export type SidebarItem = {
  text?: string;
  link?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
  order?: number; // new
};

function pathBaseNameWithoutExtension(filePath: string): string {
  return path.parse(filePath).name;
}

// Updated to support `hiddenInSidebar`
function readFrontmatter(markdownFilePath: string): SidebarItem | null {
  const frontMatter = matter(fs.readFileSync(markdownFilePath, "utf-8")).data;

  // Skip if marked hidden
  if (frontMatter.hiddenInSidebar) {
    return null;
  }

  const pathBaseNameValue = pathBaseNameWithoutExtension(markdownFilePath);
  return {
    text: frontMatter.title ?? pathBaseNameValue,
    ...(frontMatter.order !== undefined ? { order: frontMatter.order } : {}),
    ...(pathBaseNameValue ? { link: pathBaseNameValue } : {}),
  };
}

function findIndexFileInDirectory(directoryPath: string): string | undefined {
  const indexFileIndexMd = path.join(directoryPath, "index.md");
  const indexFileDirnameMd = path.format({
    dir: directoryPath,
    name: path.basename(directoryPath),
    ext: ".md",
  });
  if (fs.existsSync(indexFileIndexMd)) {
    return indexFileIndexMd;
  } else if (fs.existsSync(indexFileDirnameMd)) {
    return indexFileDirnameMd;
  }
}

function readSidebarItemsFromSubdirectory(
  directoryPath: string,
  publicUrlPath: string,
  srcExclude?: string[],
  indexFile?: string
): SidebarItem[] {
  let items = (
    srcExclude === undefined
      ? fs.readdirSync(directoryPath) // no sources excluded
      : micromatch.not(fs.readdirSync(directoryPath), srcExclude, {
        contains: true,
      })
  )
    .filter((fileName) => !indexFile || fileName !== path.basename(indexFile))
    .map((fileName) =>
      buildSidebar(
        path.join(directoryPath, fileName),
        publicUrlPath + "/" + fileName,
        srcExclude
      )
    )
    .filter(
      (item) => item !== null && (item.link || item.items)
    ) as SidebarItem[];

  items.sort(
    (a, b) =>
      (a.order ?? Number.MAX_SAFE_INTEGER) -
      (b.order ?? Number.MAX_SAFE_INTEGER)
  );

  return items;
}

export function buildSidebar(
  fileOrDirectoryPath: string,
  publicUrlPath: string,
  srcExclude?: string[]
): SidebarItem | null {
  if (fs.statSync(fileOrDirectoryPath).isDirectory()) {
    let indexFile = findIndexFileInDirectory(fileOrDirectoryPath);
    console.log(
      `buildSidebar(DIR)(${fileOrDirectoryPath}, ${publicUrlPath}) indexFile=${indexFile}`
    );

    const items = readSidebarItemsFromSubdirectory(
      fileOrDirectoryPath,
      publicUrlPath,
      srcExclude,
      indexFile
    ).map((item) => ({
      ...item,
      ...(item.link ? { link: publicUrlPath + "/" + item.link } : {}),
    }));

    let frontmatter;
    if (indexFile) {
      frontmatter = readFrontmatter(indexFile);

      // Skip whole section if index file is marked hidden
      if (!frontmatter) {
        return null;
      }

      frontmatter.link = frontmatter.link + "/" + frontmatter.link;
    } else {
      frontmatter = { text: pathBaseNameWithoutExtension(fileOrDirectoryPath) };
    }

    return { ...frontmatter, ...(items.length !== 0 ? { items } : {}) };
  } else if (fileOrDirectoryPath.endsWith(".md")) {
    return readFrontmatter(fileOrDirectoryPath);
  } else {
    return null;
  }
}

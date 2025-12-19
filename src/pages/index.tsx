// SPDX-FileCopyrightText: 2025 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function Homepage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div>
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/introduction-and-goals"
            >
              Start reading
            </Link>
          </div>
        </div>
      </header>
      <main>
        <div className="container margin-vert--lg">
          <h1>Structure</h1>
          <span>This document is organized as follows:</span>
          <ol>
            <li>
              <a href="./docs/introduction-and-goals">Introduction and goals</a>. Includes the background, business goals, essential requirements and roles.
            </li>
            <li>
              <a href="./docs/glossary">Glossary</a>. Includes domain terms and acronyms.
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Homepage />
    </Layout>
  );
}

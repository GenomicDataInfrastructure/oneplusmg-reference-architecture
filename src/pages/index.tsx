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
          <span>
            This document provides a comprehensive view on the architecture of
            the 1+MG Network, following the guidelines of the{" "}
            <a href="https://arc42.org" target="_blank">
              arc42.org
            </a>{" "}
            template. It is organized as follows:
          </span>
          <br />
          <br />
          <ol>
            <li>
              <a href="./docs/introduction-and-goals">Introduction and goals</a>
              : Short description of the requirements, driving forces, extract
              (or abstract) of requirements. and roles.
            </li>
            <li>
              <a href="./docs/constraints">Constraints</a>: Anything that
              constrains teams in design and implementation decisions or
              decision about related processes.
            </li>
            <li>
              <a href="./docs/context-and-scope">Context and scope</a>: Delimits
              the system from its (external) communication partners (neighboring
              systems and users). Specifies the external interfaces.
            </li>
            <li>
              <a href="./docs/solution-strategy">Solution Strategy</a>: Summary and fundamental decisions or solution strategies that shape the architecture.
            </li>
            <li>
              <a href="./docs/category/data-onboarding">Data Onboarding</a>: Detailed description of the architecture processes for Data Onboarding, including building block, runtime, and deployment views.
            </li>
            <li>
              <a href="./docs/category/data-provider-onboarding">Data Provider Onboarding</a>: Detailed description of the architecture for Data Provider Onboarding.
            </li>
            <li>
              <a href="./docs/category/data-subject-onboarding">Data Subject Onboarding</a>: Detailed description of the architecture for Data Subject Onboarding.
            </li>
            <li>
              <a href="./docs/category/user-organisation-onboarding">User Organisation Onboarding</a>: Detailed description of the architecture for User Organisation Onboarding.
            </li>
            <li>
              <a href="./docs/cross-cutting-concepts">Cross-cutting Concepts</a>:
              Overall, principal regulations and solution approaches relevant in
              multiple parts (→ cross-cutting) of the system.
            </li>
            <li>
              <a href="./docs/architectural-decisions">
                Architectural Decisions
              </a>
              : Important, expensive, critical, large scale or risky
              architecture decisions including rationales.
            </li>
            <li>
              <a href="./docs/quality-requirements">Quality Requirements</a>:
              Quality requirements as scenarios, with quality tree to provide high-level overview. The most important quality goals should have been described in section 1.2. (quality goals).
            </li>
            <li>
              <a href="./docs/risks-and-technical-debt">Risk and Technical Debt</a>: Known technical risks or technical debt. What potential problems exist within or around the system? What does the development team feel miserable about?
            </li>
            <li>
              <a href="./docs/glossary">Glossary</a>: Important domain and
              technical terms that stakeholders use when discussing the system.
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

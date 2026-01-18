---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 2
---

# Architecture Constraints

The architectural constraints outlined in this section shape the design decisions for the 1+MG Network. They are non-negotiable limitations imposed by regulation, politics, or organization.

## 1. Regulatory & Legal Constraints (Must Have)

| ID      | Constraint                          | Description                                                                                                                                                                                                                                                               |
| :------ | :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **L01** | **GDPR & National Derogations**     | The system must comply with GDPR Art. 9 (Special Categories of Data). Crucially, it must support **27+ distinct national implementations**, as Member States have derogations for genetic data processing. A "one-size-fits-all" consent model is legally impossible.[^1] |
| **L02** | **Territoriality (Data Residency)** | Raw genomic data and associated cryptographic keys must **never** leave the jurisdiction of the participating Member State (EEA), unless an explicit Adequacy Decision exists. All storage and processing must occur on sovereign soil.[^1]                               |
| **L03** | **EU AI Act Compliance**            | Any component providing clinical decision support (e.g., "Variant Interpretation") classifies as **High-Risk AI** (EU AI Act, Annex III). It requires strict Conformity Assessments, Human Oversight measures, and Data Governance logging.[^2]                           |
| **L04** | **EHDS Integration**                | The system must act as a **Health Data Access Body (HDAB)** node under the European Health Data Space (EHDS). It must implement the secure processing environments and metadata cataloging standards mandated by HealthData@EU to enable secondary use.[^3]               |
| **L05** | **Data Governance Act (DGA)**       | The framework must support **Data Altruism** mechanisms, allowing citizens to voluntarily donate data for science. Technical workflows must manage specific altruism consent forms and recognized data altruism organizations.[^4]                                        |
| **L06** | **NIS2 Directive (Cybersecurity)**  | As a "Critical Entity" (Health Sector), the infrastructure must implement state-of-the-art cyber hygiene, mandatory incident reporting (24h warning/72h full report), and supply chain security auditing.[^5]                                                             |

## 2. Political Constraints (The "Why")

| ID      | Constraint                             | Description                                                                                                                                                                                                       |
| :------ | :------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P01** | **Local Sovereignty (The "Red Line")** | The architecture must ensure that **Local Data Authorities (DACs)** retain absolute vetting power over every access request. No "Central Super-Admin" can exist who can view data without local approval.[^6]     |
| **P02** | **Equity & Inclusivity**               | The system must support smaller Member States with limited infrastructure. It cannot mandate expensive hardware (e.g., proprietary HPC) that would exclude less-resourced nations (The "Widening" principle).[^7] |

## 3. Organizational Constraints

| ID      | Constraint                     | Description                                                                                                                                                                    |
| :------ | :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **O01** | **Mandatory Data Stewardship** | Nodes must use the **Data Stewardship Wizard (DSW)** and the "GDI Knowledge Model" to standardise Data Management Plans (DMPs). Machine-actionability of DMPs is required.[^8] |
| **O02** | **Sustainability Model**       | The architecture must transition from project funding (GDI) to Member State fees (Genome EDIC). Operational costs must be minimized to ensure long-term viability.[^9]         |

## 4. Technical Constraints

| ID      | Constraint              | Description                                                                                                                                                                                                            |
| :------ | :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **T01** | **Federated Design**    | **No Central Lake.** Data stays local; Compute moves to data (GA4GH WES). This is a hard architectural constraint derived from L02 and P01.[^10]                                                                       |
| **T02** | **Open Standards Only** | All interfaces must use open standards (GA4GH Beacon, WES, DRS). Vendor-locked protocols are prohibited to ensure interoperability across 27 nations.[^11]                                                             |
| **T03** | **EHDS Alignment**      | Metadata publication must align with the **DCAT-AP** standard to facilitate future integration with the European Health Data Space (HealthData@EU).[^12]                                                               |
| **T04** | **Cyber Resilience**    | In line with the Cyber Resilience Act, all software components must be "secure by default" (no default pwds), support automatic updates, and have a disclosed vulnerability handling process (SBOM requirements).[^13] |

[^1]: Bridging the European Data Sharing Divide in Genomic Science. (https://doi.org/10.2196/37236)

[^2]: European AI Act. (https://artificialintelligenceact.eu/)

[^3]: European Health Data Space (EHDS). (https://health.ec.europa.eu/ehealth-digital-health-and-care/european-health-data-space_en)

[^4]: Data Governance Act (DGA). (https://digital-strategy.ec.europa.eu/en/policies/data-governance-act)

[^5]: NIS2 Directive. (https://digital-strategy.ec.europa.eu/en/policies/nis2-directive)

[^6]: GDI Deliverable D2.9 - Evaluation of data governance experiences - Report. (https://zenodo.org/records/10069814)

[^7]: GDI Deliverable D2.1 - First analysis of cost elements for the setup of 1+MG infrastructure. (https://zenodo.org/records/10728049)

[^8]: GDI Deliverable D6.1 - Draft data management policy published including ELSI best practice (https://zenodo.org/records/7956612)

[^9]: GDI Deliverable D2.2 - Infrastructure cost report. (https://zenodo.org/records/11635233)

[^10]: GDI Deliverable D6.3 - Report on requirements for data quality and distributed analysis, as well as external resource interoperability. (https://zenodo.org/records/13920170)

[^11]: GDI Deliverable D8.7 - Report on semantic interoperability scenarios. (https://zenodo.org/records/11550316)

[^12]: 1+MG and EHDS Alignment. (https://framework.onemilliongenomes.eu/ehds-data-lifecycle)

[^13]: Cyber Resilience Act. (https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act)

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
| **L01** | **GDPR & National Derogations**     | The system must comply with GDPR Art. 9 (Special Categories of Data). Crucially, it must support **27+ distinct national implementations**, as Member States have derogations for genetic data processing. A "one-size-fits-all" consent model is legally impossible.[^4] |
| **L02** | **Territoriality (Data Residency)** | Raw genomic data and associated cryptographic keys must **never** leave the jurisdiction of the participating Member State (EEA), unless an explicit Adequacy Decision exists. All storage and processing must occur on sovereign soil.[^4]                               |
| **L03** | **EU AI Act Compliance**            | Any component providing clinical decision support (e.g., "Variant Interpretation") classifies as **High-Risk AI** (EU AI Act, Annex III). It requires strict Conformity Assessments, Human Oversight measures, and Data Governance logging.[^1]                           |

## 2. Political Constraints (The "Why")

| ID      | Constraint                             | Description                                                                                                                                                                                                        |
| :------ | :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P01** | **Local Sovereignty (The "Red Line")** | The architecture must ensure that **Local Data Authorities (DACs)** retain absolute vetting power over every access request. No "Central Super-Admin" can exist who can view data without local approval.[^17]     |
| **P02** | **Equity & Inclusivity**               | The system must support smaller Member States with limited infrastructure. It cannot mandate expensive hardware (e.g., proprietary HPC) that would exclude less-resourced nations (The "Widening" principle).[^15] |

## 3. Organizational Constraints

| ID      | Constraint                     | Description                                                                                                                                                                     |
| :------ | :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **O01** | **Mandatory Data Stewardship** | Nodes must use the **Data Stewardship Wizard (DSW)** and the "GDI Knowledge Model" to standardise Data Management Plans (DMPs). Machine-actionability of DMPs is required.[^14] |
| **O02** | **Sustainability Model**       | The architecture must transition from project funding (GDI) to Member State fees (Genome EDIC). Operational costs must be minimized to ensure long-term viability.[^5]          |

## 4. Technical Constraints

| ID      | Constraint              | Description                                                                                                                                               |
| :------ | :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **T01** | **Federated Design**    | **No Central Lake.** Data stays local; Compute moves to data (GA4GH WES). This is a hard architectural constraint derived from L02 and P01.[^3]           |
| **T02** | **Open Standards Only** | All interfaces must use open standards (GA4GH Beacon, WES, DRS). Vendor-locked protocols are prohibited to ensure interoperability across 27 nations.[^8] |
| **T03** | **EHDS Alignment**      | Metadata publication must align with the **DCAT-AP** standard to facilitate future integration with the European Health Data Space (HealthData@EU).[^19]  |

[^1]: European AI Act. (https://artificialintelligenceact.eu/)

[^3]: GDI Deliverable D6.3 - Data Quality & Analysis Requirements. (https://zenodo.org/records/13920170)

[^4]: Bridging the European Data Sharing Divide. (https://doi.org/10.2196/37236)

[^5]: GDI Infrastructure Cost Report (D2.2). (https://zenodo.org/records/11635233)

[^8]: GDI D8.7 Semantic Interoperability. (https://zenodo.org/records/11550316)

[^14]: GDI D6.1 Data Management Policy. (https://zenodo.org/records/7956612)

[^15]: GDI D2.1 Cost Analysis. (https://zenodo.org/records/10728049)

[^17]: GDI D2.9 Data Governance Experiences. (https://zenodo.org/records/10069814)

[^19]: 1+MG and EHDS Alignment. (https://framework.onemilliongenomes.eu/ehds-data-lifecycle)

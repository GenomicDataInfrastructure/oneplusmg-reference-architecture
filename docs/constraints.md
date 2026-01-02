---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 2
---

# Constraints

The architectural constraints outlined in this section shape the design decisions for the 1+MG Network architecture, including:

## Legal Constraints

| No. | Constraint                      | Description                                                                                                                                                                                                                                               |
| --- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Territoriality (Data Residency) | Under DEP/Genome of Europe rules, sensitive genomic data storage and WGS activities must strictly take place within the territory of eligible countries (EU Member States and associated countries). Data cannot be stored in non-eligible jurisdictions. |
| 2   | GDPR & National Derogations     | The system must comply with GDPR but also accommodate 27+ distinct national interpretations regarding genetic data (e.g., differing definitions of pseudonymization/anonymization).                                                                       |
| 3   | Sovereignty of Access           | The final decision to grant access rests inalienably with the Local Data Authorities (DACs). The central infrastructure cannot bypass local authorization workflows.                                                                                      |

## Organisational Constraints

| No. | Constraint                     | Description                                                                                                                                                                                   |
| --- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Mandatory Data Stewardship     | All nodes are required to maintain a Data Management Plan (DMP) using the Data Stewardship Wizard (DSW) and the "GDI knowledge model" to ensure DMPs are machine-actionable and standardized. |
| 2   | National Resource Commitment   | The architecture must be deployable and operable within the estimated national resource limit of 5-8 FTEs per node, ensuring feasibility for smaller Member States.                           |
| 3   | Dependency on National Consent | The central hub cannot directly interface with patients for consent withdrawal; it depends entirely on national systems for the data subject interface.                                       |
| 4   | Sustainability                 | The architecture must transition from a grant-funded model (GDI) to a sustainable operating model funded by Member State fees (EDIC), requiring cost-efficient long-term maintenance.         |

## Technical Constraints

| No. | Constraint                   | Description                                                                                                                                                                                                                                              |
| --- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Mandatory Federated Design   | There is no central repository of raw genomic data (BAM/CRAM/VCF). Data must physically reside in the country of origin or a designated national cloud. Analysis follows the "bring compute to data" paradigm via Secure Processing Environments (SPEs). |
| 2   | Open Standards Compliance    | All nodes must implement GA4GH standards (Beacon v2, Passports, WES/TES, Crypt4GH). The use of proprietary standards that lock in vendors is prohibited to ensure long-term interoperability.                                                            |
| 3   | Alignment with EHDS          | The architecture must align technically with the European Health Data Space (EHDS) infrastructure (HealthData@EU), specifically regarding the use of DCAT-AP for metadata publication.                                                                   |
| 4   | National Resource Commitment | The architecture must be deployable and operable within the estimated national resource limit of 5-8 FTEs per node, ensuring feasibility for smaller Member States.                                                                                      |
| 5   | Scope Limitation (SMPC)      | The development and certification of Secure Multi-Party Computation (SMPC) protocols are currently out of scope for the initial GDI implementation phases; the architecture relies on SPEs for now.                                                      |
| 6   | Infrastructure Heterogeneity | The architecture must function across diverse environments, including commercial clouds, private government clouds, and academic HPCs.[^1]                                                                                                                   |

[^1]: This is the first footnote.
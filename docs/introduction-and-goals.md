---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 1
---

# Introduction and Goals

The 1+ Million Genomes (1+MG) initiative[^1] represents an unprecedented pan-European effort to enable secure access to corresponding genomic and clinical data across Europe. The overarching goal is to facilitate better research, personalized healthcare, and health policy-making. This reference architecture defines the framework to operationalize this ambition through the Genome European Digital Infrastructure Consortium (Genome EDIC) and the national nodes, enabling four key types of data reuse:[^22]

1.  **Scientific Research:** Understanding diseases and developing new treatments.
2.  **Policy Development:** Informing health system improvements and strategic decision-making.
3.  **Quality Management:** Benchmarking healthcare provision and outcomes.
4.  **Healthcare Reuse:** Finding evidence or inspiration for patient treatment (e.g., rare diseases).

This reference architecture provides a high-level blueprint for implementing that vision, targeting technical teams, policymakers, and infrastructure providers.

The architecture is driven by the following high-level business goals:

- **Enable Personalized Medicine & Research:** The primary goal is to make at least one million sequenced genomes accessible for secondary use. A key milestone is the **Genome of Europe** initiative, creating a reference database of **>500,000 Whole Genome Sequences (WGS)** representing **40+ distinct ancestry subgroups** to capture European diversity.[^1] [^24]
- **Ensure Data Sovereignty:** The system must adhere to a federated model where data remains within the jurisdiction of the Member State (National Nodes), respecting local ethical and legal frameworks while enabling cross-border analysis.[^4]
- **Sustainable Operation:** The transition from project-based funding (GDI) to the Genome European Digital Infrastructure Consortium (Genome EDIC) requires a cost-effective, sustainable infrastructure model funded by Member States and supported by proven business models.[^5] [^6] [^7]
- **Trust and Social Acceptance:** The architecture must enforce a robust Trust Framework to maintain public trust. This includes **Participatory Governance**, ensuring that citizens and patients are not just passive subjects but contributing voices in the governance structure (e.g., via Participant Panels), and implementing **Data Protection by Design and Default (DPbDD)** principles.[^8] [^25] [^30]
- **Support Advanced Use Cases:** The infrastructure must support complex domain-specific needs, including evidence-based policy making, infectious disease surveillance, outbreak preparedness, and cancer precision medicine (longitudinal T0/T1/T3 queries).[^26] [^27] [^30]
- **Enable Federated Processing:** The infrastructure must support the execution of standardized analysis workflows (packaged as RO-Crates) directly within the secure node environment (TRE/SPE) where the data resides (Move-Code-To-Data).[^14]
- **Virtualize Data Access:** Shift from a "download and analyze" model to a "virtualized access" model, where researchers analyze data within secure, monitored environments (Secure Processing Environments - SPEs) close to the data source.[^30] [^31]
- **Harmonize Semantics:** To enable effective cross-border queries, all clinical and phenotypic data must be mapped to common data models (OMOP CDM, Phenopackets) following the **Sunflower Model** (Core + Rings + Petals) strategy and exposed via standardized metadata profiles (HealthDCAT-AP).[^12]
- **Evolve into a Knowledge Base:** Transition from a data repository to a **Knowledge Base**, where data is not just stored but curated, harmonized, and annotated to support advanced discovery and re-use.[^4] [^9]

## Requirements Overview

To achieve these business goals, the system must provide the following core functions:

| ID   | Name                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR01 | Data Governance & Compliance             | The platform must enforce the governance rules of the 1+MG Data Access and Use Governance Framework. This means integrating workflows for data provider compliance checks (ensuring that only datasets meeting ethical/legal criteria and data quality standards are made available). The National Contact Point (NCP) or delegate must be able to validate that each dataset and its metadata comply with 1+MG inclusion requirements (e.g. proper consent, ethics approval, standardized format) before it’s listed in the catalogue. Additionally, the system should support recording and honouring any data use restrictions (DUA) or data subject consent preferences attached to datasets (ELSIs metadata).[^9] [^10] [^11] [^30] |
| FR02 | Cross-border Discovery                   | A core requirement is to maintain an up-to-date metadata catalogue of all 1+MG datasets. This catalogue will store descriptive information (cohort descriptions, data dictionary, etc.). Researchers should be able to easily find what data exists (e.g. via the central 1+MG portal) and see high-level info without accessing the raw data. The system must expose search and discovery features (e.g. ability to query by disease, variant, etc.) and return aggregate results to inform researchers before they make access requests. This includes the ability to perform population-level queries (counts of individuals matching criteria) as a form of feasibility analysis.[^12]                                               |
| FR03 | Federated Access Request Management      | The solution requires a mechanism for users to request access to datasets following the **Single Access Principle**. Requests submitted via a central portal are reviewed by the **Central 1+MG DAC** for scientific and ELSI compliance. The system must then route the recommendation to the relevant National Data Access Bodies for final validation (Veto/Approval). It should collect project proposals, track decisions, and if approved, grant data access in a controlled manner. The system should enforce conditions on usage (e.g. read-only access within SPE, no re-identification) and be able to revoke access if needed.[^13] [^30]                                                                                     |
| FR04 | Federated Analysis & Secure Processing   | The system must support the "bring compute to data" paradigm (Federated Analysis). Raw genomic data remains within the National Node and is not moved to a central repository. Authorized users submit analysis workflows (using standards like GA4GH WES/TES) which are dispatched to the local **Secure Processing Environments (SPEs)** of the relevant nodes. The SPE executes the containerized workflow on the local data in isolation, preventing raw data exfiltration, and returns only non-sensitive, aggregated results to the central user. This requirement also covers support for Federated Learning scenarios where models are trained locally and only weight updates are shared.[^4] [^13] [^14] [^15] [^16]           |
| FR05 | Semantic Harmonization & Data Onboarding | The platform must include processes to onboard new data sources continuously. This involves technical connectors or ETL scripts from hospitals, labs, or research databases into the Node. It should support periodic updates (e.g. adding new genome sequences or updating clinical follow-up data for an existing cohort) without compromising data integrity. Data onboarding also encompasses data cleaning and standardization tasks (for example, harmonizing phenotype codes to agreed ontologies). The system should provide administrators with tools to perform these tasks and validate that each update maintains compliance (no unauthorized data).[^12] [^17] [^10]                                                        |
| FR06 | Alignment with EHDS and National eHealth | The system design should anticipate upcoming EHDS interoperability requirements for secondary use. For example, if the EHDS mandates certain APIs or data formats for health data access bodies, our implementation should be compatible. Additionally, while not the primary focus, the solution should be able to interface with national eHealth systems where necessary – for instance, verifying patient consents via national health registries or retrieving updated clinical data. Ensuring this alignment means the 1+MG infrastructure can become an integral part of the broader health data ecosystem and take advantage of future EU health data exchange mechanisms.[^12] [^13] [^18] [^30]                                |

## Quality Goals

The architecture is shaped by specific quality attributes that guide design decisions:

| ID  | Quality Goal                  | Description                                                                                                                                                                                                                                           | Motivation                                                                                                                                               | Concrete Scenario (Testable)                                                                                                                                                                 |
| --- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QG1 | Interoperability              | The ability of diverse national systems and **Global Resources** (UK Biobank, All of Us) to exchange data and compute instructions using open standards (GA4GH, FHIR).                                                                                | Essential to overcome the fragmentation of national systems and enable global benchmarking.[^12] [^20] [^27]                                             | A researcher submits a GA4GH WES workflow to Node A (Finland) and Node B (Spain) and receives comparable results without code modification.                                                  |
| QG2 | Security & Compliance (DPbDD) | Implementation of **Data Protection by Design and Default (DPbDD)**. Nodes must offer ISO 27001 certified (or equivalent) **Secure Processing Environments (SPEs)**.                                                                                  | A single breach could undermine the entire political initiative. Compliance with GDPR and the emerging EHDS is mandatory.[^10] [^23] [^30]               | A Node validates that a data request carries a valid DAC Approval Token signed by the Data Authority before granting read access.                                                            |
| QG3 | Scalability                   | The capacity to handle petabytes of genomic data and high-throughput analysis requests.                                                                                                                                                               | The system must scale to effectively store and process the estimated **150-300 Petabytes** of raw WGS data generated by the Genome of Europe alone.[^24] | The Discovery Portal returns aggregate counts for a query across 1M genomes in < 5 seconds.                                                                                                  |
| QG4 | Transparency                  | Visibility into how data is used and processed, including a dedicated **Information Portal** for citizens.                                                                                                                                            | Required for auditing and to maintain the trust of data subjects (citizens). Includes **Notification of incidental findings** workflows.[^19] [^30]      | A Citizen logs into the Preference Portal and views a ledger of exactly which research projects have accessed their data.                                                                    |
| QG5 | Usability                     | Streamlined user journeys for researchers, clinicians, and policymakers.                                                                                                                                                                              | Reducing the administrative burden of finding data and applying for access (DACs), and enabling distinct interfaces for different user types.[^13]       | A Researcher finds a relevant cohort, requests access, and receives a DAC decision notification within the same dashboard interface.                                                         |
| QG6 | Serviceability                | The ability to effectively monitor performance and resolve incidents in a federated manner (Federated Helpdesk).                                                                                                                                      | Based on **FitSM** standards. Vital for maintaining trust and operational uptime across autonomous National Nodes.[^28] [^29]                            | A user reports an issue via the Central Helpdesk; the ticket is automatically routed to the correct National Node's local support team.                                                      |
| QG7 | Composability                 | The architecture must ensure technical interoperability between software components, allowing for agility and the ability to change, improve, and mix different service modules (e.g., Beacon, REMS, Data Catalogue) in varying configurations [^31]. | Essential for future-proofing the infrastructure and adapting to evolving scientific and technical needs.                                                | A new data catalogue service can be integrated into the existing infrastructure without requiring a complete re-architecture.                                                                |
| QG8 | Ethical Compliance            | The system must automate and enforce complex ethical workflows, specifically the **Incidental Findings** policy and **Re-contacting** procedures, ensuring that feedback loops respect the hierarchy of User -> Node -> Subject [^34] [^30].          | Essential for maintaining public trust and adherence to ethical guidelines in genomic data sharing.                                                      | A researcher submits a query that triggers an incidental finding, and the system automatically routes the finding to the appropriate Node and then to the subject via a predefined workflow. |

## Stakeholders

The stakeholders of the 1+MG Network include all roles and organizations that influence/depend on the architecture documentation, i.e., those who need to understand the architecture, interact with the system, or work with the source code. An overview of the key stakeholders is provided below.

| Role                        | Contact | Description                                                                                                                                                   | Expectations                                                                                                                                                                                  |
| --------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Genome EDIC                 | TBD     | The governing legal entity responsible for coordinating the initiative and infrastructure.                                                                    | Requires a sustainable and compliant service catalog to offer Member States. Success is measured by country uptake and the volume of data made available.                                     |
| National Coordination Point | TBD     | Technical teams in Member States (e.g., GDI nodes) implementing the local infrastructure. Often referred to as **GDI Node** or **National Node**.             | Need clear specifications on what services to implement (the "GDI Starter Kit") and instructions on how to connect their local systems to the central hub.                                    |
| 1+MG Central DAC            | TBD     | The central committee reviewing cross-border access requests for scientific excellence and general ELSI compliance.[^30]                                      | Needs a unified workflow platform to receive, review, and issue recommendations on access requests efficiently.                                                                               |
| National Data Access Body   | TBD     | The national or institutional bodies. Retain ultimate veto power over access to their national data.                                                          | Retain full sovereignty over access decisions; require transparent, digitized workflow tools to receive Central DAC recommendations and issue final validations.                              |
| Data Providers              | TBD     | Hospitals, research institutes, and national biobanks that physically steward the data. Distinct from National Coordination Point, they are the legal owners. | Ensure that metadata sharing complies with local laws and that they retain ultimate control over who accesses the data (Data Sovereignty).                                                    |
| User Organisations          | TBD     | Legal entity (e.g., University, Research Institute, Hospital) employing the end user. Acts as the legal counterparty in Data Access Agreements.               | Requires clear liability boundaries, manageable administrative processes for signing agreements, and guidance on deploying secure local infrastructure (SPEs) to mitigate institutional risk. |
| Researchers                 | TBD     | Academic scientists and industry partners conducting secondary analysis on genomic cohorts.                                                                   | Expect a "one-stop shop" to discover datasets and streamlined access procedures (fast DAC responses) to analyze cross-border data without administrative bottlenecks.                         |
| Clinicians                  | TBD     | Healthcare professionals using genomic data for primary care, diagnosis, and treatment planning.                                                              | Require easy-to-use tools to query the network for similar cases or validate variants for rare disease diagnosis and decision support.                                                        |
| Policymakers                | TBD     | National ministries and the European Commission providing funding and regulation.                                                                             | Need evidence of impact (healthcare improvement, economic efficiency) to justify continued investment and support.                                                                            |
| Service Providers           | TBD     | Cloud providers and other service providers offering infrastructure and services to the 1+MG Network.                                                         | Need clear specifications on what services to implement and instructions on how to connect their local systems to the central hub.                                                            |

[^1]: European 1+ Million Genomes. (https://digital-strategy.ec.europa.eu/en/policies/1-million-genomes)



[^4]: GDI Deliverable D6.3 - Report on requirements for data quality and distributed analysis, as well as external resource interoperability. (https://zenodo.org/records/13920170)

[^5]: GDI Deliverable D2.2 - Infrastructure cost report. (https://zenodo.org/records/11635233)

[^6]: B1MGplus Project. (https://www.cnag.eu/projects/beyond-1-million-genomes-plus)

[^7]: GDI Deliverable D2.1 - First analysis of cost elements for the setup of 1+MG infrastructure. (https://zenodo.org/records/10728049)

[^8]: B1MG Deliverable D1.5 - Stakeholders trust in genomic data sharing landscape analysis. (https://zenodo.org/records/6382431)

[^9]: GDI Deliverable D6.6 - Report outlining the recommendations on data curation and ELSI compliance. (https://zenodo.org/records/10723494)

[^10]: GDI Deliverable D6.1 - Draft data management policy published including ELSI best practice (https://zenodo.org/records/7956612)

[^11]: GDI Deliverable D2.9 - Evaluation of data governance experiences - Report. (https://zenodo.org/records/10069814)

[^12]: GDI Deliverable D8.7 - Report on semantic interoperability scenarios. (https://zenodo.org/records/11550316)

[^13]: B1MG Deliverable D2.4 - Report on data access and governance framework. (https://zenodo.org/records/8411102)

[^14]: GDI Deliverable D8.8 - Evaluation of distributed analysis and federated learning infrastructure solutions and recommendations for adoption (https://zenodo.org/records/10887366)

[^15]: GDI Deliverable D8.5 - Report on federated learning technologies (https://zenodo.org/records/11550561)

[^16]: GDI Deliverable D3.8 - Feedback on the recommendation of infrastructure solutions for distributed analysis and federated learning (https://zenodo.org/records/15366621)

[^17]: B1MG Deliverable D3.8 - Documented best practices in sharing and linking phenotypic and genetic data —2v0. (https://zenodo.org/records/7342855)

[^18]: 1+MG and EHDS Alignment. (https://framework.onemilliongenomes.eu/ehds-data-lifecycle)

[^19]: 1+MG Transparency and Consent Guidance - version for 1+MG Framework (https://zenodo.org/records/8279851)

[^20]: GA4GH.(https://www.ga4gh.org/our-products/)

[^22]: Masterdocument data governance. (extracted from Masterdocument_data-governance_recovered-formatting.docx)

[^23]: B1MG / 1+MG - IT infrastructure requirements based on a data protection by design and default approach(https://zenodo.org/records/8399393)

[^24]: GDI Deliverable D1.4 - Genome of Europe plan (https://zenodo.org/records/8017856)

[^25]: B1MG Deliverable D1.6 - Citizen engagement and public trust (https://zenodo.org/records/7913029)

[^26]: GDI Milestone MS26 - Initial set of questions by the use cases. (https://zenodo.org/records/8289477)

[^27]: GDI Deliverable D6.4 - Report on global resources suitable for inclusion into the GDI. (https://zenodo.org/records/17580079)

[^28]: GDI Deliverable D4.1 - Helpdesk roadmap. (https://zenodo.org/records/8017873)

[^29]: GDI Deliverable D5.5 - Report outlining QoS metrics, reporting processes, and node TRLs defined. (https://zenodo.org/records/10256902)

[^30]: B1MG Deliverable D2.4 - Report on data access and governance framework. (https://zenodo.org/records/8411102)

[^31]: GDI Deliverable D8.4 - Report on the implementation of the secure processing environment standards.(https://zenodo.org/records/11550561)

[^34]: B1MG / 1+MG - Incidental Findings Policy - Summary and Recommendations - version for 1+MG Framework. (https://zenodo.org/records/8279737)

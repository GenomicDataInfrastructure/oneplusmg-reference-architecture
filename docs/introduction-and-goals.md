---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 1
---

# Introduction and Goals

The 1+ Million Genomes (1+MG) initiative[^1] represents an unprecedented pan-European effort to enable secure access to corresponding genomic and clinical data across Europe. The overarching goal is to facilitate better research, personalized healthcare, and health policy-making by making at least one million sequenced genomes accessible for secondary (research) and primary (clinical) use. This reference architecture defines the technical, semantic, and legal frameworks necessary to operationalize this ambition through the Genome European Digital Infrastructure Consortium (Genome EDIC) and the national nodes implemented via the Genomic Data Infrastructure (GDI) project[^2] [^3].

This reference architecture provides a high-level blueprint for implementing that vision. It targets technical teams in national genomics programs, policymakers, infrastructure providers, and the emerging Genome EDIC (the central coordinating body for 1+MG) – helping them understand what services each Member State must implement nationally and what services the Genome EDIC must provide centrally to end users.

The architecture is driven by the following high-level business goals:

- **Enable Personalized Medicine & Research:** The primary goal is to make at least one million sequenced genomes accessible for secondary use (research) and primary use (clinical care), supporting the development of personalized treatments and better health policy-making.[^1]
- **Ensure Data Sovereignty:** The system must adhere to a federated model where data remains within the jurisdiction of the Member State (National Nodes), respecting local ethical and legal frameworks while enabling cross-border analysis.[^4]
- **Sustainable Operation:** The transition from project-based funding (GDI) to the Genome European Digital Infrastructure Consortium (Genome EDIC) requires a cost-effective, sustainable infrastructure model funded by Member States.[^5] [^6] [^7]
- **Trust and Social Acceptance:** The architecture must enforce a robust Trust Framework to maintain public trust in genomic data sharing, ensuring that citizens' data is handled securely and ethically.[^8]

## Requirements Overview

To achieve these business goals, the system must provide the following core functions:

| ID   | Name                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR01 | Data Governance & Compliance             | The platform must enforce the governance rules of the 1+MG Secondary Use Framework. This means integrating workflows for data provider compliance checks (ensuring that only datasets meeting ethical/legal criteria and data quality standards are made available). The National Contact Point (NCP) or delegate must be able to validate that each dataset and its metadata comply with 1+MG inclusion requirements (e.g. proper consent, ethics approval, standardized format) before it’s listed in the catalogue. Additionally, the system should support recording and honouring any data use restrictions or data subject consent preferences attached to datasets (ELSIs metadata).[^9] [^10] [^11]               |
| FR02 | Cross-border Discovery                   | A core requirement is to maintain an up-to-date metadata catalogue of all 1+MG datasets. This catalogue will store descriptive information (cohort descriptions, data dictionary, etc.). Researchers should be able to easily find what data exists (e.g. via the central 1+MG portal) and see high-level info without accessing the raw data. The system must expose search and discovery features (e.g. ability to query by disease, variant, etc.) and return aggregate results to inform researchers before they make access requests. This includes the ability to perform population-level queries (counts of individuals matching criteria) as a form of feasibility analysis.[^12]                                 |
| FR03 | Federated Access Request Management      | The solution requires a mechanism for users to request access to datasets and for those requests to be reviewed and approved by the appropriate authorities. Functionally, this will be implemented via an Access Management portal/workflow integrated with the 1+MG User Portal. It should collect project proposals from researchers, route them to the national review committee, track decisions, and if approved, grant data access in a controlled manner. The system should enforce conditions on usage (e.g. read-only access within secure environment, no re-identification attempts) and be able to revoke access if needed.[^13]                                                                              |
| FR04 | Federated Analysis & Secure Processing   | The system must support the "bring compute to data" paradigm (Federated Analysis). Raw genomic data remains within the National Node and is not moved to a central repository. Authorized users submit analysis workflows (using standards like GA4GH WES/TES) which are dispatched to the local Secure Processing Environments (SPEs) of the relevant nodes. The SPE executes the containerized workflow on the local data in isolation, preventing raw data exfiltration, and returns only non-sensitive, aggregated results to the central user. This requirement also covers support for Federated Learning scenarios where models are trained locally and only weight updates are shared.[^4] [^13] [^14] [^15] [^16] |
| FR05 | Semantic Harmonization & Data Onboarding | The platform must include processes to onboard new data sources continuously. This involves technical connectors or ETL scripts from hospitals, labs, or research databases into the Node. It should support periodic updates (e.g. adding new genome sequences or updating clinical follow-up data for an existing cohort) without compromising data integrity. Data onboarding also encompasses data cleaning and standardization tasks (for example, harmonizing phenotype codes to agreed ontologies). The system should provide administrators with tools to perform these tasks and validate that each update maintains compliance (no unauthorized data).[^12] [^17] [^10]                                          |
| FR06 | Alignment with EHDS and National eHealth | The system design should anticipate upcoming EHDS interoperability requirements for secondary use. For example, if the EHDS mandates certain APIs or data formats for health data access bodies, our implementation should be compatible. Additionally, while not the primary focus, the solution should be able to interface with national eHealth systems where necessary – for instance, verifying patient consents via national health registries or retrieving updated clinical data. Ensuring this alignment means the 1+MG infrastructure can become an integral part of the broader health data ecosystem and take advantage of future EU health data exchange mechanisms.[^12] [^13] [^18]                         |

## Quality Goals

The architecture is shaped by specific quality attributes that guide design decisions:

| ID  | Quality Goal       | Description                                                                                                           | Motivation                                                                                                                                         | Concrete Scenario (Testable)                                                                                                                |
| --- | ------------------ | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| QG1 | Interoperability   | The ability of diverse national systems to exchange data and compute instructions using open standards (GA4GH, FHIR). | Essential to overcome the fragmentation of different national healthcare systems and tech stacks.[^12]                                              | A researcher submits a GA4GH WES workflow to Node A (Finland) and Node B (Spain) and receives comparable results without code modification. |
| QG2 | Security & Privacy | Strict adherence to GDPR and national regulations, implementing "Privacy by Design" and "Zero Trust" principles.      | A single breach could undermine the entire political initiative. Compliance with the emerging European Health Data Space (EHDS) is mandatory.[^10] | A Node validates that a data request carries a valid DAC Approval Token signed by the Data Authority before granting read access.           |
| QG3 | Scalability        | The capacity to handle petabytes of genomic data and high-throughput analysis requests.                               | The system must scale from current pilots to >1 million genomes without performance degradation.[^4] [^5] [^9] [^7]                               | The Discovery Portal returns aggregate counts for a query across 1M genomes in < 5 seconds.                                                 |
| QG4 | Transparency       | Visibility into how data is used and processed.                                                                       | Required for auditing and to maintain the trust of data subjects (citizens). [^19]                                                                 | A Citizen logs into the Preference Portal and views a ledger of exactly which research projects have accessed their data.                   |
| QG5 | Usability          | Streamlined user journeys for researchers and clinicians.                                                             | Reducing the administrative burden of finding data and applying for access (DACs) is key to system uptake.[^13]                                     | A Researcher finds a relevant cohort, requests access, and receives a DAC decision notification within the same dashboard interface.        |

## Stakeholders

The stakeholders of the 1+MG Network include all roles and organizations that influence/depend on the architecture documentation, i.e., those who need to understand the architecture, interact with the system, or work with the source code. An overview of the key stakeholders is provided below.

| Role                 | Description                                                                                                                                     | Expectations                                                                                                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Genome EDIC          | The governing legal entity responsible for coordinating the initiative and infrastructure.                                                      | Requires a sustainable and compliant service catalog to offer Member States. Success is measured by country uptake and the volume of data made available.                                     |
| Data Provider        | Technical teams in Member States (e.g., GDI nodes) implementing the local infrastructure.                                                       | Need clear specifications on what services to implement (the "GDI Starter Kit") and instructions on how to connect their local systems to the central hub.                                    |
| Local Data Authority | he national or institutional bodies (e.g., Data Access Committees - DACs) with the legal mandate to grant or deny access to data.               | Retain full sovereignty over access decisions; require transparent, digitized workflow tools to manage requests efficiently without relinquishing control.                                    |
| Data Holder          | Hospitals, research institutes, and national biobanks that physically steward the data.                                                         | Ensure that metadata sharing complies with local laws and that they retain ultimate control over who accesses the data (Data Sovereignty).                                                    |
| User Organisation    | Legal entity (e.g., University, Research Institute, Hospital) employing the end user. Acts as the legal counterparty in Data Access Agreements. | Requires clear liability boundaries, manageable administrative processes for signing agreements, and guidance on deploying secure local infrastructure (SPEs) to mitigate institutional risk. |
| Researcher           | Academic scientists and industry partners conducting secondary analysis on genomic cohorts.                                                     | Expect a "one-stop shop" to discover datasets and streamlined access procedures (fast DAC responses) to analyze cross-border data without administrative bottlenecks.                         |
| Clinician            | Healthcare professionals using genomic data for primary care, diagnosis, and treatment planning.                                                | Require easy-to-use tools to query the network for similar cases or validate variants for rare disease diagnosis and decision support.                                                        |
| Policymaker          | National ministries and the European Commission providing funding and regulation.                                                               | Need evidence of impact (healthcare improvement, economic efficiency) to justify continued investment and support.                                                                            |

[^1]: European 1+ Million Genomes. (https://digital-strategy.ec.europa.eu/en/policies/1-million-genomes)

[^2]: GDI Project. (https://gdi.onemilliongenomes.eu/)

[^3]: 1+MG Use cases. (https://framework.onemilliongenomes.eu/usecases)

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

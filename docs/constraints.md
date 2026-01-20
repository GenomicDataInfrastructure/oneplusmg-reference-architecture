---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 2
---

# Constraints

The architectural constraints outlined in this section shape the design decisions for the 1+MG Network. They are non-negotiable limitations imposed by regulation, politics, or organization.

## 1. Regulatory & Legal Constraints

| ID      | Constraint                               | Description                                                                                                                                                                                                                                                               |
| :------ | :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **L01** | **GDPR & National Derogations**          | The system must comply with GDPR Art. 9 (Special Categories of Data). Crucially, it must support **27+ distinct national implementations**, as Member States have derogations for genetic data processing. A "one-size-fits-all" consent model is legally impossible.[^1] |
| **L02** | **Territoriality (Data Residency)**      | Raw genomic data and associated cryptographic keys must **never** leave the jurisdiction of the participating Member State (EEA), unless an explicit Adequacy Decision exists. All storage and processing must occur on sovereign soil.[^1]                               |
| **L03** | **EU AI Act Compliance**                 | Any component providing clinical decision support (e.g., "Variant Interpretation") classifies as **High-Risk AI** (EU AI Act, Annex III). It requires strict Conformity Assessments, Human Oversight measures, and Data Governance logging.[^2]                           |
| **L04** | **EHDS Integration**                     | The system must act as a **Health Data Access Body (HDAB)** node under the European Health Data Space (EHDS). It must implement the secure processing environments and metadata cataloging standards mandated by HealthData@EU to enable secondary use.[^3]               |
| **L05** | **Data Governance Act (DGA)**            | The framework must support **Data Altruism** mechanisms, allowing citizens to voluntarily donate data for science. Technical workflows must manage specific altruism consent forms and recognized data altruism organizations.[^4]                                        |
| **L06** | **NIS2 Directive (Cybersecurity)**       | As a "Critical Entity" (Health Sector), the infrastructure must implement state-of-the-art cyber hygiene, mandatory incident reporting (24h warning/72h full report), and supply chain security auditing.[^5]                                                             |
| **L07** | **International Transfers (GDPR Ch. V)** | Connections to **Global Resources** (e.g., All of Us, H3Africa) situated in non-EEA countries without an adequacy decision must rely on **Standard Contractual Clauses (SCCs)** or specific derogations (Art. 49).[^27]                                                   |

## 2. Political Constraints

| ID      | Constraint                             | Description                                                                                                                                                                                                       |
| :------ | :------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P01** | **Local Sovereignty (The "Red Line")** | The architecture must ensure that **Local Data Authorities (DACs)** retain absolute vetting power over every access request. No "Central Super-Admin" can exist who can view data without local approval.[^6]     |
| **P02** | **Equity & Inclusivity**               | The system must support smaller Member States with limited infrastructure. It cannot mandate expensive hardware (e.g., proprietary HPC) that would exclude less-resourced nations (The "Widening" principle).[^7] |

## 3. Organizational Constraints

| ID      | Constraint                                   | Description                                                                                                                                                                                                                                                                              |
| :------ | :------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **O01** | **Mandatory Data Stewardship**               | Nodes must use the **Data Stewardship Wizard (DSW)** and the "GDI Knowledge Model" to standardise Data Management Plans (DMPs). Machine-actionability of DMPs is required.[^8]                                                                                                           |
| **O02** | **Sustainability Model**                     | The architecture must transition from project funding (GDI) to Member State fees (Genome EDIC). Operational costs must be minimized to ensure long-term viability.[^9]                                                                                                                   |
| **O03** | **Security Certification**                   | Compliance with **ISO 27001** (Information Security) and **ISO 27701** (Privacy) is required. At a minimum, nodes must undergo external audits, with full certification being the ideal state for data pooling environments.[^15]                                                        |
| **O04** | **Staff Secrecy/Training**                   | All staff with access to the infrastructure must legally sign secrecy clauses and undergo mandatory data protection training specific to their role.[^15]                                                                                                                                |
| **O05** | **Data Protection Impact Assessment (DPIA)** | Every Node must complete a DPIA before joining the production network. This is a mandatory legal requirement under GDPR Art. 35. Note that DPIAs are local responsibilities but must follow the 1+MG template.[^22] [^26]                                                                |
| **O06** | **FitSM Service Management**                 | The GDI Helpdesk and support workflows must adhere to the FitSM standard for IT Service Management (ITSM), ensuring federated incident and problem management [^28].                                                                                                                     |
| **O07** | **No International Record Linkage**          | Data linkage is strictly limited to within national nodes using national linking keys. Cross-border linking of individual records is explicitly out of scope due to legal complexity and risk of subject duplication [^10].                                                              |
| **O08** | **Incidental Findings Path**                 | 1+MG Data Users must report valid, clinically actionable Incidental Findings (IFs) ONLY to the Data Holder (National Node). Direct contact between Data Users and Data Subjects is strictly prohibited to respect local constraints and consent [^25].                                   |
| **O09** | **SOP Source of Truth**                      | All operational processes must be defined in Standard Operating Procedures (SOPs) managed within the official GDI GitHub repository (EU-wide or Node-specific branches) to ensure version control and compliance auditability [^29].                                                     |
| **O10** | **Virtualized Access Mandate**               | Direct download of sensitive individual-level genomic files (FASTQ, BAM, VCF) is strictly prohibited. Access must be provided via **Virtualized Trusted Research Environments (TREs)** or **Smart Layers** (e.g., EGA QuickView) where data egress is controlled/obfuscated [^31] [^30]. |
| **O11** | **Decommissioning Process**                  | Nodes must implement a defined process for dataset decommissioning, allowing for the removal or archival of datasets that are no longer maintained or compliant [^34].                                                                                                                   |
| **O12** | **Query Budgeting (Privacy)**                | The Discovery Portal must implement query budgeting and monitoring to prevent reconstruction attacks (e.g., repeating specific queries to identify individuals in a cohort) [^30].                                                                                                       |
| **O13** | **Time-Limited Access**                      | Data access is strictly temporary. The system must automatically revoke access permissions upon the expiration of the Data Access Agreement (DAA) or project end date [^30].                                                                                                             |
| **O14** | **Project Funding Cycles**                   | Sustainability must be planned beyond typical 3-5 year EU project funding cycles.                                                                                                                                                                                                        |
| **O15** | **Reprocessing Cost Sensitivity**            | The architecture must account for significant cost disparities in data reprocessing (e.g., ~€5 for short-read vs ~€530 for long-read per genome), necessitating careful decisions on when and where to standardize data [^10].                                                           |

## 4. Technical Constraints

| ID      | Constraint                                | Description                                                                                                                                                                                                              |
| :------ | :---------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **T01** | **Federated Design**                      | **No Central Lake.** Data stays local; Compute moves to data (GA4GH WES). This is a hard architectural constraint derived from L02 and P01.[^10]                                                                         |
| **T02** | **Open Standards Only**                   | All interfaces must use open standards (GA4GH Beacon, WES, DRS). Vendor-locked protocols are prohibited to ensure interoperability across 27 nations.[^11] [^14]                                                         |
| **T03** | **EHDS Alignment**                        | Metadata publication must align with the **DCAT-AP** standard to facilitate future integration with the European Health Data Space (HealthData@EU).[^12]                                                                 |
| **T04** | **Cyber Resilience**                      | In line with the Cyber Resilience Act, all software components must be "secure by default" (no default pwds), support automatic updates, and have a disclosed vulnerability handling process (SBOM requirements).[^13]   |
| **T05** | **Synthetic Data First**                  | System validation and testing must primarily rely on synthetic datasets to minimize privacy risks before processing real human data [^27].                                                                               |
| **T06** | **Data Integrity Checksums**              | All data transfers (inclusion/access) must be validated via checksums. Data at rest (archived) must undergo periodic integrity verification to detect bit rot or tampering [^30].                                        |
| **T07** | **Workflow Portability (RO-Crate/WfExS)** | Analysis pipelines must be containerized and packaged using **RO-Crate** standards and executable via **WfExS** (Workflow Execution Service) to ensure reproducibility and portability across heterogeneous nodes [^32]. |
| **T08** | **Metadata Standard (HealthDCAT-AP)**     | All dataset metadata exposed for discovery must adhere to the **DCAT-AP 3.0** standard and its health-specific extension (**HealthDCAT-AP**) to ensure compatibility with the European Health Data Space (EHDS) [^11].   |
| **T09** | **Federated Identity**                    | Users authenticate via their Home Organisation, not via a central database. [^34].                                                                                                                                       |
| **T10** | **Remote Visualization (htsget)**         | Nodes should support the **GA4GH htsget** API to enable efficient, remote visualization of large genomic alignments (BAM/CRAM) in client tools (e.g., IGV) without requiring full file download [^32].                   |
| **T11** | **API Transformation (JSLT)**             | To adapt internal data models to required external standards (Beacon v2, DCAT), nodes should employ flexible transformation layers (e.g., using **JSLT** templates) rather than hard-coding mappings [^11].              |
| **T12** | **Separation of Concerns**                | Where possible, genomic and phenotypic data should be logically separated or pseudonymised separately to increase privacy protection [^30].                                                                              |
| **T13** | **Encryption Mandate**                    | Personal data must be encrypted **at rest** and **in transit**. Encryption keys must be managed separately from the data storage [^15].                                                                                  |
| **T14** | **No Raw Data Egress**                    | Raw genomic data files (VCF/BAM) must **never** leave the secure perimeter of the National Node (except for specific authorized download scenarios, which are rare).                                                     |

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

[^14]: GA4GH. (https://www.ga4gh.org/our-products/)

[^15]: B1MG / 1+MG - IT infrastructure requirements based on a data protection by design and default approach(https://zenodo.org/records/8399393)

[^22]: Masterdocument data governance. (extracted from Masterdocument_data-governance_recovered-formatting.docx)

[^25]: B1MG Deliverable D1.6 - Citizen engagement and public trust (https://zenodo.org/records/7913029)

[^26]: B1MG Deliverable D2.3 - Report on legal set-up including DPIA (https://zenodo.org/records/8411067)

[^27]: GDI Deliverable D6.4 - Report on global resources suitable for inclusion into the GDI. (https://zenodo.org/records/17580079)

[^28]: GDI Deliverable D4.1 - Helpdesk roadmap. (https://zenodo.org/records/8017873)

[^29]: GDI Deliverable D5.5 - Report outlining QoS metrics, reporting processes, and node TRLs defined. (https://zenodo.org/records/10256902)

[^30]: B1MG Deliverable D2.4 - Report on data access and governance framework. (https://zenodo.org/records/8411102)

[^32]: GDI Deliverable D8.8 - Evaluation of distributed analysis and federated learning infrastructure solutions and recommendations for adoption. (https://zenodo.org/records/10887366)

[^34]: GDI Deliverable D4.3 - User portal live cataloguing data within the GDI. (https://zenodo.org/records/10156972)

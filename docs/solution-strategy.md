---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 4
---

# Solution Strategy

## 1. Governance & Federation

The fundamental strategic decision for 1+MG is **Federation**.

- **No Central Data Lake:** Genomic data is too sensitive and voluminous to move. It remains legally and physically within the Member State (National Node)[^1].
- **Bring Compute to Data:** Analysis algorithms are containerized (e.g., Nextflow pipelines) and dispatched to the data location, returning only aggregated results.
- **Sovereignty First:** The architecture prioritizes the **Local Data Authority (DAC)**. No access is granted without a cryptographically verifiable token from the local DAC.

## 2. Trust Framework

We employ a **Zero Trust** approach where identity and authorization are decoupled[^2].

- **Identity (Who are you?):** Verified by **LS AAI** (Life Science Authentication and Authorization Infrastructure). Users log in via their home university or research institute.
- **authorization (What can you do?):** Managed by **GA4GH Passports**. DACs issue "Visas" (signed claims) that travel with the user's request. The National Node verifies these Visas before executing any query or workload.

## 3. Technology Stack & Standards

To ensure interoperability across 27+ countries, we rely strictly on open standards[^3].

| Area                 | Standard / Technology        | Motivation                                                                    |
| :------------------- | :--------------------------- | :---------------------------------------------------------------------------- |
| **Discovery**        | **GA4GH Beacon v2**          | enabling feasibility queries without exposing raw data.                       |
| **Data Access**      | **GA4GH DRS** / **htsget**   | Standardized streaming of large genomic files (VCF/CRAM).                     |
| **Compute**          | **GA4GH WES** / **WfExS**    | Abstracting the execution environment. Mandating **RO-Crates** for packaging. |
| **Metadata**         | **HealthDCAT-AP 5.0**        | Alignment with EU Health Data Space (EHDS).                                   |
| **Containerization** | **Docker** / **Singularity** | Ensuring reproducible analysis environments.                                  |
| **Orchestration**    | **Kubernetes**               | Managing the lifecycle of microservices and compute jobs.                     |

## 4. Organizational Strategy

- **GDI Starter Kit:** To support smaller Member States, we provide a "Reference Implementation" (Starter Kit) that can be deployed out-of-the-box to spin up a compliant National Node[^4]. It includes **Galaxy Europe** integration, **Beacon v2**, and **WfExS**.
- **Separation of Concerns:** The **Genome EDIC** handles the catalog and governance logic, while **Member States** handle the storage and compute infrastructure.

[^1]: Bridging the European Data Sharing Divide in Genomic Science. (https://doi.org/10.2196/37236)

[^2]: B1MG Deliverable D1.5 - Stakeholders trust in genomic data sharing landscape analysis. (https://zenodo.org/records/6382431)

[^3]: GDI Deliverable D8.7 - Report on semantic interoperability scenarios. (https://zenodo.org/records/11550316)

[^4]: GDI Deliverable D2.1 - First analysis of cost elements for the setup of 1+MG infrastructure. (https://zenodo.org/records/10728049)

---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 5
description: Static decomposition of the system, abstractions of source-code, shown as hierarchy of white boxes (containing black boxes), up to the appropriate level of detail.
---

# Building Block View

## Whitebox Overall System (Level 1)

The 1+MG Network is decomposed into three primary logical zones:

| System                                | Responsibility                                                                                                                                                                                                                                                                             |
| :------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1+MG User Portal (Central)**        | **Functional Description:** The web-based entry point for researchers to discover data and request access.<br/>**Interfaces:** HTTPS (Web), OIDC (Auth), Beacon API (Query).<br/>**Quality:** High Usability, Public Accessibility.<br/>**Location:** `src/portal`, Hosted by Genome EDIC. |
| **Trust & Identity Broker (Central)** | **Functional Description:** Aggregates Claims from DACs and identities from LS AAI into GA4GH Passports.<br/>**Interfaces:** OIDC, GA4GH Passport API.<br/>**Quality:** High Availability, High Security (Signatures).<br/>**Location:** `src/broker`.                                     |
| **National Node (Federated)**         | **Functional Description:** Stores encrypted genomic data and executes local compute workflows.<br/>**Interfaces:** WES (Compute), DRS (Data), Beacon (Discovery).<br/>**Quality:** High Security (Encryption), Data Sovereignty.<br/>**Location:** `src/node`, Hosted by Member State.    |

## Level 2: 1+MG User Portal

The User Portal is the central entry point for researchers, integrating several distinct services[^4].

| Component             | Responsibility                                                                                                                                                                                                                                    |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Portal UI**         | **Functional Description:** Main web interface for unified user experience.<br/>**Interfaces:** HTTPS, OIDC.<br/>**Location:** `https://portal.gdi.lu`                                                                                            |
| **Dataset Catalogue** | **Functional Description:** Searchable registry of available datasets (CKAN/FAIR).<br/>**Interfaces:** HTTPS.<br/>**Location:** `https://catalogue.portal.gdi.lu`                                                                                 |
| **DAAMS**             | **Functional Description:** Manages the **Single Access Principle** workflow. Routes requests to Central DAC for review and then to National Nodes for Veto/Validation.<br/>**Interfaces:** HTTPS.<br/>**Location:** `https://daam.portal.gdi.lu` |

## Level 2: National Node (GDI Node)

The National Node is the most complex component. It must be deployed by each Member State.

### Discovery Layer (Beacon)

- **Beacon v2 API:** Receives queries (e.g., "Do you have variant X?").
- **Metadata DB:** Stores the HealthDCAT-AP catalogue (Cohorts, Datasets).
- **Response Strategy:** Checks local policies before returning `TRUE`/`FALSE` or counts[^2].

### Secure Processing Environment (SPE) / TRE

This component follows the **TRE-FX** reference architecture for secure computation[^3].

- **Submission Layer (Airlock):** The single monitored entry point. It receives encrypted RO-Crates and validates the user's Passport. It acts as a proxy, severing direct connection between the user and the execution backend.
- **TRE Controller:** An intelligent agent that evaluates the incoming query/workflow against local policy. It decides if the job is "Safe to Run" (e.g., checking allowed docker images).
- **Workflow Execution Service (WfExS) / Galaxy:** The core engine that orchestrates the analysis. It pulls data from the archive and executes containers (Docker/Singularity) in isolation.
- **Task Execution Service (TES):** Dispatches individual steps to the backend batch system (e.g., Slurm, HTCondor, or Kubernetes Jobs).
- **Isolation:** The Compute Nodes have **NO direct internet access**. All dependencies (containers, reference genomes) must be available locally or proxied via the Airlock[^4].
- **Data Staging:** Pulls encrypted data from the Archive for the duration of the job.

### Data Archive

- **Encryption Layer:** Manages keys for data-at-rest encryption (Crypt4GH)[^5].
- **Data Integrity Service:** Ensures file validity using checksums and periodic scrubbing[^4].
- **Object Storage:** S3-compatible storage for VCF, BAM, and CRAM files.
- **Data Repository Service (DRS):** Resolves logical IDs (`drs://gdi...`) to physical signed URLs for internal compute use.

### Data Onboarding & Curation

- **Ingest Pipeline:** Validates quality of incoming data from Data Providers (integrity, format).
- **Pseudonymisation Service:** Replaces direct identifiers with 1+MG specific pseudonyms before long-term storage (Separation of Concerns).
- **Metadata Mapper:** Transforms local metadata into the common GDI model (HealthDCAT-AP).

### Local Access Control

- **Policy Enforcement Point (PEP):** Intercepts every API call. Validates the User's GA4GH Passport and the specific Visas against the dataset's Access Control List (ACL).

[^2]: GA4GH Beacon v2 Specification. (https://www.ga4gh.org/product/beacon-v2/)

[^3]: GDI Deliverable D8.8 - Evaluation of distributed analysis and federated learning infrastructure solutions. (https://zenodo.org/records/10887366)

[^4]: B1MG / 1+MG - IT infrastructure requirements based on a data protection by design and default approach. (https://zenodo.org/records/8399393)

[^5]: GA4GH Crypt4GH Standard. (https://www.ga4gh.org/product/crypt4gh/)

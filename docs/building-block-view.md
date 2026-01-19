---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 5
---

# Building Block View

## 1. Whitebox Overall System (Level 1)

The 1+MG Infrastructure is decomposed into three primary logical zones:

![System Context](./assets/system_context.drawio.png)

| System                                | Responsibility                                                                                                                                                                                                                                                                             |
| :------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1+MG User Portal (Central)**        | **Functional Description:** The web-based entry point for researchers to discover data and request access.<br/>**Interfaces:** HTTPS (Web), OIDC (Auth), Beacon API (Query).<br/>**Quality:** High Usability, Public Accessibility.<br/>**Location:** `src/portal`, Hosted by Genome EDIC. |
| **Trust & Identity Broker (Central)** | **Functional Description:** Aggregates Claims from DACs and identities from LS AAI into GA4GH Passports.<br/>**Interfaces:** OIDC, GA4GH Passport API.<br/>**Quality:** High Availability, High Security (Signatures).<br/>**Location:** `src/broker`.                                     |
| **National Node (Federated)**         | **Functional Description:** Stores encrypted genomic data and executes local compute workflows.<br/>**Interfaces:** WES (Compute), DRS (Data), Beacon (Discovery).<br/>**Quality:** High Security (Encryption), Data Sovereignty.<br/>**Location:** `src/node`, Hosted by Member State.    |


## 2. Level 2: 1+MG User Portal

The User Portal is the central entry point for researchers, integrating several distinct services[^4].

| Component               | Responsibility                                                                                                                                              |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Portal UI**           | **Functional Description:** Main web interface for unified user experience.<br/>**Interfaces:** HTTPS, OIDC.<br/>**Location:** `https://portal.gdi.lu`      |
| **Dataset Catalogue**   | **Functional Description:** Searchable registry of available datasets (CKAN/FAIR).<br/>**Interfaces:** HTTPS.<br/>**Location:** `https://catalogue.portal.gdi.lu` |
| **DAAMS**        | **Functional Description:** Manages access requests and DAC workflows (Data Access Application Management System).<br/>**Interfaces:** HTTPS.<br/>**Location:** `https://daam.portal.gdi.lu` |

## 3. Level 2: National Node (GDI Node)


The National Node is the most complex component. It must be deployed by each Member State.

### 2.1. Discovery Layer (Beacon)

- **Beacon v2 API:** Receives queries (e.g., "Do you have variant X?").
- **Metadata DB:** Stores the HealthDCAT-AP catalogue (Cohorts, Datasets).
- **Response Strategy:** Checks local policies before returning `TRUE`/`FALSE` or counts[^1].

### 2.2. Secure Processing Environment (SPE)

- **Workflow Execution Service (WES):** The API entry point for compute.
- **Task Execution Service (TES):** Dispatches individual steps (containers) to the backend batch system (e.g., Slurm, HTCondor, or Kubernetes Jobs).
- **Data Staging:** Pulls encrypted data from the Archive for the duration of the job[^2].
- **Audit Service:** Logs all access attempts and processing steps for compliance (Five Safes)[^5].

### 2.3. Data Archive

- **Encryption Layer:** Manages keys for data-at-rest encryption (Crypt4GH)[^3].
- **Data Integrity Service:** Ensures file validity using checksums and periodic scrubbing[^5].
- **Object Storage:** S3-compatible storage for VCF, BAM, and CRAM files.
- **Data Repository Service (DRS):** Resolves logical IDs (`drs://gdi...`) to physical signed URLs for internal compute use.

[^1]: GA4GH Beacon v2 Specification. (https://www.ga4gh.org/product/beacon-v2/)

[^2]: GDI Deliverable D8.8 - Evaluation of distributed analysis and federated learning infrastructure solutions. (https://zenodo.org/records/10887366)

[^3]: GA4GH Crypt4GH Standard. (https://www.ga4gh.org/product/crypt4gh/)

### 2.4. Local Access Control

- **Policy Enforcement Point (PEP):** Intercepts every API call. Validates the User's GA4GH Passport and the specific Visas against the dataset's Access Control List (ACL).

[^4]: GDI Milestone MS12 - Production user portal deployed. (https://portal.gdi.lu/)

[^5]: IT infrastructure requirements based on a data protection by design and default approach.

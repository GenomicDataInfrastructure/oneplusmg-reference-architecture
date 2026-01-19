---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 8
---

# Cross-cutting Concepts

## 1. Data Strategy

### 1.1. Metadata Model (HealthDCAT-AP)

To ensure semantic interoperability and alignment with the **European Health Data Space (EHDS)**, 1+MG adopts the **HealthDCAT-AP 5.0** standard (a health-specific profile of DCAT-AP)[^1] [^2] [^3].

**Core Entities:**

- **Catalog:** The collection of datasets held by a Node (`dcat:Catalog`).
- **Dataset:** A logical grouping of genomic/clinical data (`dcat:Dataset`).
  - _Must include:_ `healthCategory` (e.g., `Human Genomic Data`).
  - _Must include:_ `accessRights` (mapped to DPV).
- **Distribution:** The physical form (`dcat:Distribution`).
  - _Example:_ VCF File, Beacon API Endpoint, WES Endpoint.

### 1.2. Identifier Schema

All resources within the 1+MG network MUST adhere to the following **Persistent Identifier (PID)** pattern to guarantee global uniqueness across the federation[^1]:

**Pattern:** `^(GOE|GDI)-[A-Z]{2}-[A-Z]+-[0-9]+$`

**Segments:**

1.  **Prefix:** `GOE` (Genome of Europe) or `GDI` (Genomic Data Infrastructure).
2.  **Country:** ISO 3166-1 alpha-2 code (e.g., `FI`, `ES`, `DE`).
3.  **Type:** Resource type code (e.g., `COHORT`, `DATASET`, `SAMPLE`).
4.  **Sequential ID:** Numeric identifier.

**Examples:**

- `GDI-FI-COHORT-001` (First cohort from Finland GDI Node)
- `GOE-ES-SAMPLE-9942` (Genome of Europe sample from Spain)

## 2. Security & Compliance

## 2. Security & Compliance

### 2.1. Data Protection by Design (Five Safes)

We adhere to the **Five Safes** framework to demonstrate compliance with GDPR Data Protection by Design and Default (DPbDD)[^11]:

1.  **Safe Projects:** Is this use of the data appropriate, lawful, ethical? (Handled by DAAMS/DAC).
2.  **Safe People:** Can the users be trusted? (Handled by LS AAI & Passports).
3.  **Safe Data:** Is the data itself safe? (Encryption, Pseudonymisation).
4.  **Safe Settings:** Does the access facility limit unauthorized use? (Secure Processing Environment).
5.  **Safe Outputs:** Is confidentiality maintained for outputs? (Airlock/Egress Control).

### 2.2. Controlled Vocabularies

We rely on the **Data Privacy Vocabulary (DPV)** to express legal bases and consent status in a machine-readable way[^5].

- `dpv:Consent`: Processing based on explicit data subject consent.
- `dpv:LegitimateInterest`: Processing based on legitimate interest (secondary use).

### 2.3. Encryption

- **Data at Rest:** All genomic files (VCF/BAM) are encrypted using **Crypt4GH** (standard container format for encrypted genomic data)[^6].
- **Data in Transit:** TLS 1.3 is mandatory for all APIs.

### 2.4. Authentication & Authorization

- **Authentication:** Federated via **LS AAI**. Users authenticate at their Home Organisation (IdP).
- **Authorization:** Claims are transported via **GA4GH Passports**[^7].
  - **Visas:** Signed JWTs asserting permissions (e.g., `ControlledAccessGrants`).
  - **Verification:** The National Node PEP MUST cryptographically verify the Visa signature against the DAC's public key[^8].

## 3. Observability & Reliability

### 3.1. Logging & Auditing

- **Audit Trails:** Every access to genomic data (successful or denied) MUST be logged.
- **Privacy:** Logs must NOT contain PII (e.g., query parameters with variant details) but MUST record User ID, Resource ID, Timestamp, and Decision[^9].

### 3.2. Error Handling

- **Standard:** APIs must return standard HTTP status codes (401 vs 403 distinction is critical).
- **Format:** Error bodies MUST follow **RFC 7807** (Problem Details for HTTP APIs)[^10].

[^1]: GDI Metadata Model Repository. (https://github.com/GenomicDataInfrastructure/gdi-metadata)

[^2]: HealthDCAT-AP Specification. (https://semiceu.github.io/HealthDCAT-AP/releases/5.0.0/)

[^3]: 1+MG and EHDS Alignment. (https://framework.onemilliongenomes.eu/ehds-data-lifecycle)

[^4]: GDI Deliverable D8.7 - Report on semantic interoperability scenarios. (https://zenodo.org/records/11550316)

[^5]: GDI Deliverable D6.6 - Report outlining the recommendations on data curation and ELSI compliance. (https://zenodo.org/records/10723494)

[^6]: GA4GH Products. (https://www.ga4gh.org/our-products/)

[^7]: GA4GH Passports Specification. (https://www.ga4gh.org/product/passports/)

[^8]: B1MG Deliverable D2.4 - Report on data access and governance framework. (https://zenodo.org/records/8411102)

[^9]: GDI Deliverable D6.6 - Report outlining the recommendations on data curation and ELSI compliance. (https://zenodo.org/records/10723494)

[^10]: IETF RFC 7807 - Problem Details for HTTP APIs. (https://datatracker.ietf.org/doc/html/rfc7807)

[^11]: IT infrastructure requirements based on a data protection by design and default approach.

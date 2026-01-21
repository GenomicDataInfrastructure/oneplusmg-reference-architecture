---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 9
description: Important, expensive, critical, large scale or risky architecture decisions including rationales.
---

# Architectural Decisions (ADRs)

| ADR-ID                                                  | Title                           | Status       | Date       |
| :------------------------------------------------------ | :------------------------------ | :----------- | :--------- |
| [ADR-001](#adr-001-federated-data-access)               | Federated Data Access           | **Accepted** | 2025-01-15 |
| [ADR-002](#adr-002-asynchronous-compute)                | Asynchronous Compute            | **Accepted** | 2025-01-15 |
| [ADR-003](#adr-003-zero-trust-security-model)           | Zero Trust Security             | **Accepted** | 2025-01-20 |
| [ADR-004](#adr-004-secure-processing-environments-spes) | Secure Processing Environments  | **Accepted** | 2025-01-20 |
| [ADR-005](#adr-005-standardized-workflow-execution)     | Standardized Workflow Execution | **Accepted** | 2025-01-20 |

## ADR-001: Federated Data Access

- **Context:** GDPR constraints (L01/L02) prohibit moving sensitive genomic data out of national jurisdictions to a central cloud[^1].
- **Decision:** We will **NOT** build a central data lake. All data resides in National Nodes. Users query metadata centrally but execute analysis locally (Bring Compute to Data).
- **Consequences:** High complexity in orchestration. Requires robust federation API standards (Beacon, WES). Legal sovereignty is preserved.

## ADR-002: Asynchronous Compute

- **Context:** Genomic analysis pipelines (e.g., Variant Calling) take hours or days to run. Synchronous HTTP requests would timeout.
- **Decision:** All compute interfaces (WES) must be **Asynchronous**. Users submit a jobID and poll for status[^2].
- **Consequences:** UI must support "Job History" and "Notification" patterns. Fire-and-forget logic required.

## ADR-003: Zero Trust Security Model

- **Context:** The system spans untrusted networks (public internet) and multiple administrative domains. We cannot rely on perimeter security (firewalls) alone[^1].
- **Decision:** We adopt a **Zero Trust** model based on **GA4GH Passports**.
  - **Identity** is federated via Life Science AAI (LS AAI).
  - **Authorization** is decoupled and carried by the user as cryptographically signed "Visas" (JWTs).
  - Every component (PEP) must verify the signature of the Visa before granting access, assuming no network is safe.
- **Consequences:** High security, decoupled authz allows scaling. Requires PKI infrastructure (Trust Anchor) and complexity in managing key rotation.

## ADR-004: Secure Processing Environments (SPEs)

- **Context:** GDPR Data Protection by Design and Default (DPbDD) requires strict isolation of processing[^3].
- **Decision:** All computation on personal data must occur within a **Secure Processing Environment (SPE)** / **Trusted Research Environment (TRE)**.
  - **Isolation:** The compute nodes must have **NO direct internet access**.
  - **Airlock:** All ingress (code/data) and egress (results) must pass through a monitored "Airlock" or Proxy.
  - **Five Safes:** The implementation must map to the Five Safes framework (Safe Data, Projects, People, Settings, Outputs).
- **Consequences:** GDPR compliance, reduced risk of data exfiltration. Limits user freedom (cannot pip install internet packages on the fly).

## ADR-005: Standardized Workflow Execution

- **Context:** Researchers use diverse workflow languages (Nextflow, Snakemake, Galaxy). Nodes have diverse backends (Slurm, Kubernetes, AWS)[^2] [^3].
- **Decision:** We mandate the **GA4GH WES (Workflow Execution Service)** API and/or **WfExS** (Workflow Execution Service) backend as the standard interface for job submission.
  - Workflows must be packaged as **RO-Crates** (Research Object Crates).
  - Containers (Docker/Singularity) are mandatory for reproducibility.
- **Consequences:** Interoperability, reproducibility, abstraction of underlying hardware. Learning curve for researchers to containerize and RO-Crate their pipelines.

[^1]: Bridging the European Data Sharing Divide in Genomic Science. (https://doi.org/10.2196/37236)

[^2]: GDI Deliverable D8.8 - Evaluation of distributed analysis and federated learning infrastructure solutions. (https://zenodo.org/records/10887366)

[^3]: B1MG / 1+MG - IT infrastructure requirements based on a data protection by design and default approach. (https://zenodo.org/records/8399393)

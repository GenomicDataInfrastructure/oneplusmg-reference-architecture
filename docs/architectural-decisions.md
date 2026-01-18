---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 9
---

# Architectural Decisions (ADRs)

| ADR-ID                                    | Title                 | Status       | Date       |
| :---------------------------------------- | :-------------------- | :----------- | :--------- |
| [ADR-001](#adr-001-federated-data-access) | Federated Data Access | **Accepted** | 2025-01-15 |
| [ADR-002](#adr-002-asynchronous-compute)  | Asynchronous Compute  | **Accepted** | 2025-01-15 |

## ADR-001: Federated Data Access

- **Context:** GDPR constraints (L01/L02) prohibit moving sensitive genomic data out of national jurisdictions to a central cloud[^1].
- **Decision:** We will **NOT** build a central data lake. All data resides in National Nodes. Users query metadata centrally but execute analysis locally (Bring Compute to Data).
- **Consequences:** High complexity in orchestration. Requires robust federation API standards (Beacon, WES).

## ADR-002: Asynchronous Compute

- **Context:** Genomic analysis pipelines (e.g., Variant Calling) take hours or days to run. Synchronous HTTP requests would timeout.
- **Decision:** All compute interfaces (WES) must be **Asynchronous**. Users submit a jobID and poll for status[^2].
- **Consequences:** UI must support "Job History" and "Notification" patterns. Fire-and-forget logic required.

[^1]: Bridging the European Data Sharing Divide in Genomic Science. (https://doi.org/10.2196/37236)

[^2]: GDI Deliverable D8.8 - Evaluation of distributed analysis and federated learning infrastructure solutions. (https://zenodo.org/records/10887366)

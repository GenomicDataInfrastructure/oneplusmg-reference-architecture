---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 3
---

# Context and Scope

## Business Context

The **1+MG Infrastructure** operates as a federated network. It does not store data centrally; instead, it orchestrates access between **Data Users** and **Data Holders** across National borders.

**System Context Diagram:**
![System Context](./assets/system_context.drawio.png)

### Communication Partners

| Role                     | Interaction                                                                         | Input/Output                                                                  |
| :----------------------- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| **Researcher**           | Discovers data and submits analysis jobs.                                           | **In:** Query / WES Workflow<br/>**Out:** Feasibility Count / Analysis Result |
| **Clinician**            | Uses data for decision support.                                                     | **In:** Variant Search<br/>**Out:** Variant Interpretation                    |
| **Data Authority (DAC)** | Approves/Denies access requests.                                                    | **In:** Access Application<br/>**Out:** Approval Token                        |
| **Data Provider**        | Biobanks/Hospitals that steward the physical data.                                  | **In:** Data Management Plan<br/>**Out:** Raw Genomic Data (Ingested by Node) |
| **eHealth System**       | National Electronic Health Records (EHR) systems.                                   | **In:** Patient ID<br/>**Out:** Clinical Phenotypes                           |
| **Genome EDIC (Legal)**  | The legal entity governing the infrastructure (distinct from the software service). | **In:** Governance Policies<br/>**Out:** Compliance Audit Reports             |

## Technical Context

The system relies on secure internet-based channels using standard genomic protocols.

### Channels & Protocols

| Channel           | Protocol                                     | Port | Usage                                                                      |
| :---------------- | :------------------------------------------- | :--- | :------------------------------------------------------------------------- |
| **Discovery API** | HTTPS / GA4GH Beacon v2                      | 443  | Public/Registered search for variant availability.                         |
| **Access API**    | HTTPS / OIDC / GA4GH Passport                | 443  | Authentication and Authorization Claims transfer.                          |
| **Compute API**   | HTTPS / GA4GH WES (Workflow Execution)       | 443  | Submission of containerized pipelines (Nextflow/Snakemake) to Nodes.       |
| **Data API**      | HTTPS / GA4GH htsget / DRS (Data Repository) | 443  | Streaming genomic data (BAM/CRAM/VCF) to authorised local compute buffers. |
| **Trust Anchor**  | PKI / eIDAS                                  | -    | Verification of Node identity and User identity.                           |

### Technical Constraints

- **No Raw Data Egress:** Raw genomic data files (VCF/BAM) must **never** leave the secure perimeter of the National Node (except for specific authorized download scenarios, which are rare).
- **Federated Identity:** Users authenticate via their Home Organisation (LS AAI / LifeScience RI), not a central DB.

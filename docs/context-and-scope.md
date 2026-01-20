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

| Role                                  | Interaction                                                                         | Input/Output                                                                  |
| :------------------------------------ | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| **Data User**                         | Accesses data for Research, Policy, Quality, or Healthcare purposes.[^22]           | **In:** Query / WES Workflow<br/>**Out:** Analysis Result / Feasibility Count |
| **Data Subject**                      | The individual whose data is processed.                                             | **In:** Consent / Transparency Info<br/>**Out:** Rights (Object/Withdraw)     |
| **Helpdesk (Virtual)**                | Single point of contact for technical and procedural support.[^28]                  | **In:** Incident Ticket<br/>**Out:** Resolution / Guidance                    |
| **1+MG Central DAC**                  | Reviews cross-border access requests based on scientific/ELSI criteria.[^30]        | **In:** Access Application<br/>**Out:** Recommendation / Decision             |
| **National DAC**                      | Reviews access requests for national compliance, retains veto power.[^30]           | **In:** Central Recommendation<br/>**Out:** Veto / Validation                 |
| **1+MG CC**                           | Coordination Centre managing the overall infrastructure and central portal.[^22]    | **In:** aggregated metrics<br/>**Out:** Guidance / SOPs                       |
| **Data Provider**                     | The Controller determining purpose/means and making data available.[^22]            | **In:** Data Management Plan<br/>**Out:** Dataset Inclusion                   |
| **Data Holder**                       | The entity physically holding the data (Processing/Hosting).[^22]                   | **In:** Encrypted Storage<br/>**Out:** Data Stream to Compute                 |
| **National Coordination Point (NCP)** | Coordinates national stakeholders and serves as contact point.[^22]                 | **In:** National Policy<br/>**Out:** Governance Reporting                     |
| **Genome EDIC**                       | The legal entity governing the infrastructure (distinct from the software service). | **In:** Governance Policies<br/>**Out:** Compliance Audit Reports             |

### Governance Context

The 1+MG infrastructure operates under a specific governance framework designed to balance cross-border efficiency with national sovereignty.[^30]

- **Single Access Principle:** Users submit one application through a central portal, which is reviewed by a central 1+MG Data Access Committee (DAC).
- **National Veto:** While the central DAC provides a recommendation/decision, the ultimate decision remains with the Data Providers/National DACs, who retain a right of veto.
- **Controller Relationships:**
  - **Data Provider:** Acts as **Controller** for data inclusion, storage, and making data available.
  - **Data User:** Acts as **Controller** for the processing of data for their specific research purpose.
  - **1+MG Infrastructure:** Acts as **Processor** providing the secure environment and tools.
  - **1+MG CC/DAC:** Acts as **Joint Controller** (with Data Providers) for the data disclosure process (provision of access).

### EHDS Alignment

The 1+MG infrastructure is designed to align with the European Health Data Space (EHDS). In the context of EHDS, 1+MG nodes and the central infrastructure aim to function as an **Authorised Participant** in the HealthData@EU infrastructure.[^30]

- **Data Holder Role**: 1+MG nodes fulfill the obligations of "Data Holders" under EHDS (making data available).
- **Secure Processing**: The 1+MG Secure Processing Environments (SPEs) align with EHDS requirements for Secure Processing Environments.

### External Systems

| System                       | Description                                              | Interaction                                                                       |
| :--------------------------- | :------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| **Global Genomic Resources** | Non-EU biobanks (e.g., UK Biobank, All of Us, H3Africa). | **In:** Metadata Interoperability (Benchmarking)<br/>**Out:** Comparative Cohorts |

[^22]: Masterdocument data governance. (extracted from Masterdocument_data-governance_recovered-formatting.docx)

[^28]: GDI Deliverable D4.1 - Helpdesk roadmap. (https://zenodo.org/records/8017873)

[^30]: B1MG Deliverable D2.4 - Report on data access and governance framework. (https://zenodo.org/records/8411102)

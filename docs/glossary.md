---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 12
---

# Glossary

The following table explains the key terms and abbreviations used in this architecture.

| Term                   | Definition                                                                                                                                                   |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1+MG**               | **1+ Million Genomes** initiative. A European declaration to make one million sequenced genomes accessible for research and personalized medicine.           |
| **GDI**                | **Genomic Data Infrastructure**. The project funded by the Digital Europe Programme to implement the technical infrastructure for 1+MG.                      |
| **Genome EDIC**        | **Genome European Digital Infrastructure Consortium**. The legal entity responsible for the long-term governance and operation of the 1+MG infrastructure.   |
| **National Node**      | The infrastructure deployed within a Member State to store and process genomic data. Operates under the jurisdiction of that Member State.                   |
| **DAC**                | **Data Access Committee**. The body responsible for reviewing and approving data access requests.                                                            |
| **SPE**                | **Secure Processing Environment**. A secure computational environment where authorized researchers can analyze sensitive data without extracting it.         |
| **Secondary Use**      | The use of health data for purposes other than the initial reason for collection (e.g., research, policy-making), as opposed to Primary Use (clinical care). |
| **Federated Learning** | A machine learning technique where the algorithm trains on local data samples (at the Node) and only shares model updates, preserving privacy.               |
| **GA4GH**              | **Global Alliance for Genomics and Health**. The standards body defining protocols like Beacon, WES, and DRS.                                                |
| **LS AAI**             | **Life Science Authentication and Authorization Infrastructure**. The federated identity management service used for user authentication.                    |
| **HealthDCAT-AP**      | A metadata profile for describing health datasets, aligned with the European Health Data Space (EHDS).                                                       |
| **WES**                | **Workflow Execution Service**. A GA4GH standard for sending analysis workflows to where the data resides.                                                   |
| **DRS**                | **Data Repository Service**. A GA4GH standard for generic access to data objects.                                                                            |
| **Beacon**             | A GA4GH standard for discovery of genomic variants.                                                                                                          |
| **NCP**                | **National Coordination Point**. The national node responsible for coordinating stakeholders and serving as the contact point for 1+MG in a Member State.    |
| **DPbDD**              | **Data Protection by Design and Default**. A GDPR requirement ensuring privacy and security are embedded into the architecture from the start.               |
| **Five Safes**         | A framework for secure data access: **Safe Projects** (legal use), **Safe People** (trusted researchers), **Safe Data** (non-identifiable), **Safe Settings** (secure IT), **Safe Outputs** (non-disclosive results). |
| **Data Visiting**      | The paradigm where analysis algorithms move to the data (which stays local), and only aggregate results are returned. Distinct from "Data Sharing" (moving data). |
| **Data Subject**       | The natural person (individual) whose personal data is being processed.                                                                                      |
| **Data Custodian**     | An organization collecting and using data, making initial decisions on use, storage, and disposal.                                                           |
| **Permit Authority**   | An entity given authority by legislation to grant or refuse access to data (may be distinct from the Data Holder).                                           |

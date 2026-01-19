---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 7
---

# Deployment View

The deployment architecture respects the **Data Residency** constraints (Constraint L02) by physically separating the Central Services from the National Storage.

## 1. Infrastructure Overview

| Infrastructure Element            | Environment                    | Geography                                       | Responsibility                                    |
| :-------------------------------- | :----------------------------- | :---------------------------------------------- | :------------------------------------------------ |
| **Central Hub (Portal/Registry)** | Cloud (Azure/AWS/OpenStack)    | Brussels (EU Region)                            | Managed by **Genome EDIC**.                       |
| **National Node Infrastructure**  | Regional Cloud / HPC / On-Prem | Country-Specific (e.g., CSC Finland, BSC Spain) | Managed by **Member State**.                      |
| **Network Layer**                 | Public Internet (TLS 1.3)      | Global                                          | Secure encrypted channels over standard internet. |

## 2. Deployment Diagram

_(Placeholder: `assets/deployment_diagram.drawio.png`)_

## 3. Node Requirements (The "Starter Kit")

Each Member State is expected to provision the following baseline resources to run the GDI Starter Kit:

- **Orchestrator:** Kubernetes Cluster (v1.28+).
- **Storage:** S3-compatible Object Storage (MinIO or Cloud provider) for Genomic Data (Petabyte scale).
- **Compute:** High-Memory Nodes for Workflow Execution (e.g., 64GB+ RAM for alignment jobs).
- **Security:** HSM or Key Management Service (KMS) for Crypt4GH keys.

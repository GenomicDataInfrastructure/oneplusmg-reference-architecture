---
# SPDX-FileCopyrightText: 2026 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 7
description: Technical infrastructure with environments, computers, processors, topologies. Mapping of (software) building blocks to infrastructure elements.
---

# Deployment View

This section describes the technical infrastructure used to execute the User Organisation Onboarding processes, mapping the functional building blocks to specific software systems and deployment environments.

## Infrastructure Level 1

The overarching deployment architecture relies on centralizing the onboarding workflow within a robust Service Desk solution, supported by a dedicated Contract Lifecycle Management (CLM) system for legal agreements and a central Identity Provider for access control.

### Mapping of Building Blocks to Infrastructure

1. **Zammad (Service Desk / CRM System)**
   - **Role:** Fulfills the responsibilities of the primary interface, workflow orchestration, Organisation Registry, and Notifications.
   - **Deployment Strategy:** Deployed as a centralized web application within the 1+MG/Central Coordination infrastructure (e.g., via Docker/Kubernetes).
   - **Capabilities Utilized:**
     - _Customer Portal:_ Provides the secure web interface for User Organisations to submit registration tickets.
     - _Organizations Feature:_ Zammad natively supports grouping users into "Organizations", allowing a Signing Official to manage their end-users.
     - _Custom Ticket Attributes:_ Used to track the vetting process and overall approval statuses.
     - _Webhooks / REST API:_ Enables automated triggers to the CLM system (for contract generation) and the IAM Service (for provisioning).

2. **Not defined yet (Contract Lifecycle Management System)**
   - **Role:** Handles the secure generation, distribution, and legally binding e-signing of Joint Controllership and healthcare reuse contracts.
   - **Deployment Strategy:** Deployed either as a managed SaaS solution (if compliant with data residency requirements) or self-hosted on-premise.
   - **Integration:** Integrated with Zammad via API. Once a registration is vetted in Zammad, an API call triggers the CLM to send the contract to the Signing Official. The CLM sends a webhook back to Zammad upon completion to update the ticket status.

3. **Keycloak (Identity and Access Management System)**
   - **Role:** Fulfills the Identity and Access Management (IAM) responsibilities.
   - **Deployment Strategy:** Deployed as a highly available service, acting as the central Identity Provider (IdP) for the federated network.
   - **Integration:** Communicates with Zammad via REST API. When all prerequisites (vetting and signed contracts) are confirmed in Zammad, an integration script provisions the user in Keycloak and assigns the appropriate RBAC roles.

### Motivation

- **Use of COTS & Specialized Tools:** Leveraging existing platforms for Service Desk (Zammad) and E-Signatures prevents "reinventing the wheel" and ensures robust, compliant handling of complex legal signatures.
- **FitSM Alignment:** Zammad provides the Service Request and Customer Relationship workflows out-of-the-box, ensuring processes remain structured and auditable.
- **Separation of Concerns:** Delegating workflow to Zammad, legal agreements to a specialized CLM, and access management to Keycloak ensures that each component excels at its primary function without compromising security or compliance.

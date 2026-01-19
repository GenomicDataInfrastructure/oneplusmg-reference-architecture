---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 10
---

# Quality Requirements

## 1. Quality Tree

The following quality attributes are critical for the success of the 1+MG Node.

| Quality Attribute    | Priority     | Motivation                                                                           |
| :------------------- | :----------- | :----------------------------------------------------------------------------------- |
| **Security**         | **Critical** | Handling sensitive genomic data requires strict adherence to GDPR and National Laws. |
| **Interoperability** | **High**     | The system must function within a European Federation (27+ countries).               |
| **Usability**        | **High**     | The application process must be transparent for researchers.                         |
| **Performance**      | **Medium**   | Discovery queries should be interactive; Compute jobs can be batch/long-running.     |

## 2. Quality Scenarios

These scenarios map to the Sequence Diagrams in the **Runtime View**.

### QS-01: Secure Computation (Security)

- **Scenario:** A researcher executes a workflow on sensitive data.
- **Stimulus:** Submission of a WES request.
- **Response:** The system verifies the GA4GH Passport. The compute node has **NO internet access**. Data is encrypted at rest.
- **Measurement:** No data exfiltration possible. Compliance with "Five Safes".
- **Link:** [Runtime View -> Secure Processing Workflow](../docs/runtime-view.md#2-secure-processing-workflow-tre-fx)

### QS-02: Cross-Border Discovery (Interoperability)

- **Scenario:** A central query is distributed to 27 national nodes.
- **Stimulus:** "Does any node have BRCA1 variants?"
- **Response:** All nodes respond with a count (or error) within 10 seconds.
- **Measurement:** 95% success rate. Standardized Beacon v2 response format.
- **Link:** [Runtime View -> Data Access Workflow](../docs/runtime-view.md#1-data-access-workflow-the-single-access-principle)

### QS-03: Data Sovereignty (Compliance)

- **Scenario:** Additional data access restriction (Veto).
- **Stimulus:** A valid Central DAC approval is received by a National Node.
- **Response:** The National Node (Data Holder) re-evaluates the request against local law and may **Veto** the access.
- **Measurement:** Access is DENIED locally despite Central approval.
- **Link:** [Runtime View -> Data Access Workflow](../docs/runtime-view.md#1-data-access-workflow-the-single-access-principle)

### QS-04: Operational Compliance (Maintainability)

- **Scenario:** New staff member joins the Node.
- **Stimulus:** Onboarding process initiation.
- **Response:** Staff is trained on "EU-wide SOPs" and "Node-specific SOPs" within 2 weeks. Training is recorded.
- **Measurement:** 100% of staff have valid Training Records (Annex 1 of MS13).
- **Link:** [Building Block View -> Management Zone](../docs/building-block-view.md)

### QS-05: Service Management (Compliance)

- **Scenario:** Annual Compliance Assessment.
- **Stimulus:** Audit by GDI Operations Committee.
- **Response:** The Node demonstrates adherence to **FitSM** standards and has a valid "Compliance Assessment Report".
- **Measurement:** 0 Major Non-Conformities.
- **Link:** [Risks -> TR-02 Compliance Maturity](../docs/risks-and-technical-debt.md#tr-02-compliance-assessment-maturity)

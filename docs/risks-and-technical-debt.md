---
sidebar_position: 11
---

# Risks and Technical Debt

## 1. Risk Assessment (STRIDE)

This section applies the STRIDE threat model to the **Secure Processing Workflow** defined in the Runtime View.

| Threat                     | Impact       | Probability | Mitigation Strategy                                                                                                                        | Status       |
| :------------------------- | :----------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| **Spoofing Identity**      | High         | Low         | **Strict Authentication:** Reliance on LS AAI and GA4GH Passports (OIDC) with cryptographic signatures.                                    | ✅ Mitigated |
| **Tampering with Data**    | High         | Low         | **Data Integrity:** All archived data is immutable (WORM) and checksummed. Workflows are packaged in signed RO-Crates.                     | ✅ Mitigated |
| **Repudiation**            | Medium       | Medium      | **Audit Logging:** The SPE must log all container executions and file accesses. **Gap:** Centralized audit aggregation is not yet defined. | ⚠️ Open      |
| **Information Disclosure** | **Critical** | Medium      | **Isolation:** The SPE compute nodes must have **NO Internet Access**. Data egress is strictly controlled via the Airlock.                 | ✅ Mitigated |
| **Denial of Service**      | Medium       | High        | **Resource Quotas:** The WES API must implement rate limiting and job quotas per user/project.                                             | ⚠️ Open      |
| **Elevation of Privilege** | High         | Low         | **Container Security:** Enforce "Rootless Containers" (Podman/Singularity) to prevent container escape vulnerabilities.                    | ✅ Mitigated |

## 2. Technical Risks

### TR-01: Immature Privacy Enhancing Technologies (PETs)

- **Description:** Deliverable `D8.6` indicates that Homomorphic Encryption (HE) and Multiparty Computation (MPC) currently suffer from extreme computational overhead (1000x slowdown) and complexity.
- **Impact:** Real-time or interactive secure analysis is not feasible with these technologies today.
- **Mitigation:** The architecture **MUST NOT** rely on HE/MPC for critical path operations. The primary security control remains the **Secure Processing Environment (SPE)** (Isolation) and **Data Visits** model. PETs should be treated as experimental research tracks.

### TR-02: Compliance Assessment Maturity

- **Description:** Deliverable `MS13` confirms that no GDI node is yet operational (as of Oct 2025), delaying the first compliance assessment.
- **Impact:** There is a lack of empirical evidence that the proposed Reference Architecture works in production.
- **Mitigation:** Focus on **FitSM** adoption and "Step-by-step" SOP implementation as defined in MS13.

## 3. Business Risks (The Pre-Mortem)

**Scenario:** It is 2027, and the GDI Luxembourg Node has failed to attract researchers. **Why?**

1.  **Complexity Overload:** The application process (DAAMS) was too bureaucratic, with users waiting months for 27 national vetoes.
2.  **Performance Bottlebeck:** The "Federated Query" (Beacon) was too slow because 1 or 2 nodes were always offline, causing the whole query to timeout or return partial results.
3.  **Skill Gap:** The requirement for researchers to write complex WfExS/Nextflow workflows packed in RO-Crates was too high a barrier to entry compared to simply "downloading the CSV."

## 4. Technical Debt

- **TD-01 (Missing Quality Gates):** Currently, there is no automated testing pipeline for the Infrastructure-as-Code (Terraform/Ansible).
- **TD-02 (Manual Egress):** The "Airlock" egress check is currently a manual review process by a Data Steward, which scales linearly with people, not compute.

---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 11
description: Known technical risks or technical debt. What potential problems exist within or around the system? What does the development team feel miserable about?
---

# Risks and Technical Debt

## Risk Assessment (STRIDE)

This section applies the STRIDE threat model to the **Secure Processing Workflow** defined in the Runtime View.

| Threat                     | Impact       | Probability | Mitigation Strategy                                                                                                                        | Status       |
| :------------------------- | :----------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| **Spoofing Identity**      | High         | Low         | **Strict Authentication:** Reliance on LS AAI and GA4GH Passports (OIDC) with cryptographic signatures.                                    | ✅ Mitigated |
| **Tampering with Data**    | High         | Low         | **Data Integrity:** All archived data is immutable (WORM) and checksummed. Workflows are packaged in signed RO-Crates.                     | ✅ Mitigated |
| **Repudiation**            | Medium       | Medium      | **Audit Logging:** The SPE must log all container executions and file accesses. **Gap:** Centralized audit aggregation is not yet defined. | ⚠️ Open      |
| **Information Disclosure** | **Critical** | Medium      | **Isolation:** The SPE compute nodes must have **NO Internet Access**. Data egress is strictly controlled via the Airlock.                 | ✅ Mitigated |
| **Denial of Service**      | Medium       | High        | **Resource Quotas:** The WES API must implement rate limiting and job quotas per user/project.                                             | ⚠️ Open      |
| **Elevation of Privilege** | High         | Low         | **Container Security:** Enforce "Rootless Containers" (Podman/Singularity) to prevent container escape vulnerabilities.                    | ✅ Mitigated |

## Technical Risks

### TR-01: Immature Privacy Enhancing Technologies (PETs)

- **Description:** Deliverable `D8.6` indicates that Homomorphic Encryption (HE) and Multiparty Computation (MPC) currently suffer from extreme computational overhead (1000x slowdown) and complexity.
- **Impact:** Real-time or interactive secure analysis is not feasible with these technologies today.
- **Mitigation:** The architecture **MUST NOT** rely on HE/MPC for critical path operations. The primary security control remains the **Secure Processing Environment (SPE)** (Isolation) and **Data Visits** model. PETs should be treated as experimental research tracks.

### TR-02: Compliance Assessment Maturity

- **Description:** Deliverable `MS13` confirms that no GDI node is yet operational (as of Oct 2025), delaying the first compliance assessment.
- **Impact:** There is a lack of empirical evidence that the proposed Reference Architecture works in production.
- **Mitigation:** Focus on **FitSM** adoption and "Step-by-step" SOP implementation as defined in MS13.

### TR-03: Federated Learning Privacy Leakage

- **Description:** Federated Learning is not a privacy silver bullet. Model updates (gradients) can leak sensitive information (Membership Inference Attacks), especially effectively in rare disease cohorts.
- **Impact:** Re-identification of patients leading to GDPR violation.
- **Mitigation:** FL must be combined with PETs (Differential Privacy, SMPC) despite the overhead.

### TR-04: Semantic Interoperability Failure

- **Description:** Aggregating data from 20+ countries with different clinical coding standards may result in scientifically meaningless cohorts.
- **Impact:** Platform technically works but produces no value.
- **Mitigation:** Heavy investment in step 1 & 2 of the "Data Journey" (Ingestion/Normalization) and mandatory ontology mappings.

### TR-05: Record Linkage Ambiguity

- **Description:** Matching algorithms across fragmented national registries (e.g., Cancer vs Mortality registers) is error-prone.
- **Example:** _UK Biobank_ found that establishing rules for handling data ambiguities across England, Scotland, and Wales was a primary challenge.[^38]
- **Mitigation:** Do not attempt "Federated Linkage" on the fly. Linkage must happen _within_ the National Node using validated national identifiers before analysis availability.

## Business Risks (The Pre-Mortem)

**Scenario:** It is 2027, and the GDI Luxembourg Node has failed to attract researchers. **Why?**

1.  **Complexity Overload:** The application process (DAAMS) was too bureaucratic, with users waiting months for 27 national vetoes.
2.  **Performance Bottlebeck:** The "Federated Query" (Beacon) was too slow because 1 or 2 nodes were always offline, causing the whole query to timeout or return partial results.
3.  **Skill Gap:** The requirement for researchers to write complex WfExS/Nextflow workflows packed in RO-Crates was too high a barrier to entry compared to simply "downloading the CSV."
4.  **Public Trust Erosion:** "Public benefit" was not clearly defined, and "opt-in" models were bypassed without transparency. **Example:** The _All of Us_ program faced backlash regarding how race/ethnicity diversity was presented in sequencing results, highlighting the fragility of trust.[^35]
5.  **Siloed Regulatory Compliance:** Nodes were GDPR compliant but violated local "Patient Secrecy" laws, leading to legal liability and node withdrawal.
6.  **Funding Instability:** Reliance on short-term project grants created existential risk. **Example:** The _All of Us_ program faced a ~71% funding drop risk due to legislative changes, delaying pediatric enrollment.[^36]
7.  **Process Paralysis:** The technical data transfer worked, but the administrative "Process and System" bottlenecks (contract signing, legal reviews) took longer than the research itself, a key lesson from the _Swiss Personalized Health Network (SPHN)_.[^37]

## Technical Debt

- **TD-01 (Missing Quality Gates):** Currently, there is no automated testing pipeline for the Infrastructure-as-Code (Terraform/Ansible).
- **TD-02 (Manual Egress):** The "Airlock" egress check is currently a manual review process by a Data Steward, which scales linearly with people, not compute.

[^35]: "All of Us Research Program: Challenges and Lessons Learned" (https://allofus.nih.gov/)

[^36]: "NIH All of Us funding cuts" (https://www.science.org/content/article/nih-s-all-us-project-faces-crippling-budget-cut)

[^37]: "Swiss Personalized Health Network (SPHN) Interoperability Strategy" (https://sphn.ch/network/data-interoperability/)

[^38]: "UK Biobank: 10 Years of Lessons" (https://www.nature.com/articles/s41586-018-0579-z)

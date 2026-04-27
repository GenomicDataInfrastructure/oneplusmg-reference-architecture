---
# SPDX-FileCopyrightText: 2025 PNED G.I.E.
#
# SPDX-License-Identifier: CC-BY-4.0

sidebar_position: 6
description: Behavior of building blocks as scenarios, covering important use cases or features, interactions at critical external interfaces, operation and administration plus error and exception behavior.
---

import TOCInline from '@theme/TOCInline';

# Runtime View

This section details the dynamic behavior and scenarios involved in the Data Onboarding process. It outlines the step-by-step workflows required for data providers to integrate their datasets into the federated network, ensuring proper governance, cataloging, and availability for research purposes.

<TOCInline toc={toc} />

## Overview

![Data Onboarding Runtime](./assets/data_onboarding_runtime.drawio.png)

## Handle samples

The physical collection, preparation, and tracking of biological samples (e.g., blood, tissue) from data subjects, ensuring that all ethical guidelines and consent requirements are strictly followed before sequencing begins.

## Generate raw sequence

Processing the prepared biological samples through high-throughput sequencing instruments. This step yields the foundational raw genomic sequence data (e.g., FASTQ files) that will undergo further bioinformatic processing.

## Collect phenotype data

Gathering associated clinical, demographic, and phenotypic information related to the data subjects. This data is typically sourced from electronic health records, clinical trials, or structured questionnaires.

## Collect Metadata

Capturing comprehensive, structured metadata that describes the study context, sequencing protocols, sample provenance, and consent codes. This is essential for making the resulting datasets FAIR (Findable, Accessible, Interoperable, and Reusable).

## Process Metadata

Harmonizing, mapping, and cleaning the collected metadata to ensure it aligns perfectly with standard 1+MG data models, semantic ontologies, and required schemas.

## Store raw data (phenotype and sequence)

Securely ingesting and archiving the raw, unprocessed genomic and phenotypic files within the Data Provider's or National Node's secure storage infrastructure, establishing a primary data backup.

## Pre-process raw data (phenotype and sequence)

Executing standardized bioinformatics pipelines (such as alignment, quality control, and variant calling) to convert raw genomic reads into usable, standardized formats (e.g., BAM/CRAM, VCF), alongside the curation of raw phenotypic data.

## Store pre-processed data (phenotype and sequence)

Saving the cleaned, standardized, and analysis-ready datasets in the active secure storage environment, staging them for discovery and authorized researcher access.

## Link data

Securely associating the pre-processed genomic sequence files with their corresponding clinical/phenotypic data and metadata using robust, pseudonymized identifiers to protect data subject privacy.

## Run conformity checks on Metadata and Data

Executing automated validation tools and quality assurance scripts to verify that both the datasets and the linked metadata strictly comply with 1+MG technical standards, data models, and quality thresholds.

## Publish Metadata to EDIC Catalogue

Securely transferring the validated, non-identifying metadata to the central 1+MG / Genome EDIC catalog, officially registering the dataset within the federated network infrastructure.

## Make metadata publicly available

The central catalog indexes the submitted metadata and surfaces it on the public discovery portal. This allows external researchers to search, filter, and identify cohorts of interest across the entire European network.

## Ask support about data

Data users querying the central 1+MG helpdesk or portal for clarifications regarding dataset specifics, data access procedures, or technical issues they encounter during discovery.

## Redirect User to NCP

If a user's inquiry is specific to a national dataset's governance, local regulations, or specialized data formats, the central helpdesk automatically routes the ticket to the relevant National Coordination Point (NCP).

## Provide Support to Data User

The NCP, working in tandem with the local Data Provider's technical team, directly assists the researcher by providing the necessary guidance, resolving access issues, or answering complex data queries.

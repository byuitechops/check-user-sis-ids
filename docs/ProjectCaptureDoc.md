# Project Capture Document for (Title of Project)
#### *Author: Cal Wilson*
#### *Stakeholder(s): Joshua McKinny*
#### *Date: 4/17/2019*


## Background
    Josh was running teacher enrollments and noticed that a teacher's sis user id, or INumber, contained characters other than numbers. This causes problems enrolling and updating individuals via the Canvas Web API.
    - sis user id, also called an INumber, is a unique identifier that every individual who works/attends BYU-Idaho is given.

-----

## Definition of Done
I am creating a tool to find all users that contain characters other than numbers in their sis user id.

-----

# Requirements

### General Requirements
- The system shall correctly find all users with characters other than numbers in ther sis user id.
- The system shall create a user friendly report

### Input Requirements
- The system shall accept a CSV or JSON as input
- The system shall accept a filepath

#### Definition of Inputs

CSV: canvas_id
JSON: [{
    canvas_id: 123456789
}...]
User Input: Filepath
Default: All Users in Canvas

#### Source of Inputs
File from a stakeholder

---

### Output Requirements
- The system shall create CSV and JSON 
- The CSV and JSON files shall contain a report of only users with characters other than numbers in their sis user id

#### Definition of Outputs
CSV:
JSON:

#### Destination of Outputs
Send Report to Stakeholder

---

### User Interface
Command Line Style Interface

-----

## Expectations
A report containing only users with characters other than numbers in their sis user id.

### Timeline
- Milestone 1: Finish Design (4/17)
- Milestone 2: Build Core logic to search for users in Canvas (4/17)
- Milestone 3: Connect inputs to core logic and set up outputs (4/17)
- Milestone 4: Deliver the project (4/17)

### Best Mode of Contact
Email

-----

#### *Approved By:* 
#### *Approval Date:*

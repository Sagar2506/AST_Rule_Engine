# AST_Rule_Engine
Developed a simple 3-tier rule engine application(Simple UI, API and Backend, Data) to determine user eligibility based on attributes like age, department, income, spend etc.The system can use Abstract Syntax Tree (AST) to represent conditional rules and allow for dynamic creation,combination, and modification of these rules.
Here’s a suggested GitHub description for your rule engine project:

---

# Rule Engine with Abstract Syntax Tree (AST)

## Overview

This project implements a 3-tier rule engine application that dynamically creates, modifies, and evaluates eligibility rules based on user attributes such as age, department, income, and experience. Utilizing an Abstract Syntax Tree (AST) structure, the rule engine enables flexible management and evaluation of complex rules, providing real-time feedback on user eligibility.

## Features

- **Dynamic Rule Creation**: Users can input rules in string format, which are then parsed and converted into an AST structure.
- **Rule Combination**: The engine allows for the combination of multiple rules into a single AST, optimizing evaluations to minimize redundancy.
- **Rule Evaluation**: The engine evaluates user data against the defined rules, returning boolean results based on conditions met.
- **User Interface**: A simple and intuitive UI built with HTML, CSS, and JavaScript allows users to manage rules effortlessly.
- **Data Persistence**: Rules and user data are stored in JSON format, ensuring data persistence across sessions.
  
## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Data Storage**: JSON files for storing rules and user data

## Getting Started

### Prerequisites

- No specific prerequisites are needed. Just clone the repository and open `index.html` in a web browser.

### Installation

1. Clone the repository:
   ```bash
   git clone (https://github.com/Sagar2506/AST_Rule_Engine)
   ```
2. Open `index.html` in your web browser to run the application.

### Usage

1. **Add Rules**: Input rules in the designated field and click the "Add Rule" button to create new eligibility rules.
2. **Combine Rules**: Click the "Combine Rules" button to merge existing rules into a single rule structure.
3. **Evaluate User Data**: Enter user data in JSON format and click "Evaluate" to see if the user meets the criteria defined by the combined rules.
 
 
 
 ## Result Snapshots
 
![Rule_Engine True](https://github.com/user-attachments/assets/70261695-604c-453c-b609-c230f3181b8b)


![Rule_Engine False](https://github.com/user-attachments/assets/d3cdb322-63e8-4b86-aa4d-ca1a9b0efa54)

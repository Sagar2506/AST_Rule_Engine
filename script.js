// Helper class for AST nodes
class ASTNode {
    constructor(type, value = null, left = null, right = null) {
        this.type = type;     // "operator" or "operand"
        this.value = value;   // e.g., "age > 30" for operands
        this.left = left;     // left child for operators
        this.right = right;   // right child for operators
    }
}

// Parse rule string into an AST node
function createRule(ruleString) {
    // Simplified parser example
    const rootNode = new ASTNode("operator", "AND");
    rootNode.left = new ASTNode("operand", "age > 30");
    rootNode.right = new ASTNode("operand", "department = 'Sales'");
    return rootNode;
}

// Add a new rule from user input
function addRule() {
    const ruleInput = document.getElementById("ruleInput").value;
    const ruleAST = createRule(ruleInput);

    // Save rule in localStorage
    let rules = JSON.parse(localStorage.getItem('rules') || "[]");
    rules.push(ruleAST);
    localStorage.setItem('rules', JSON.stringify(rules));

    // Update UI
    displayRules();
    alert("Rule added successfully!");
}

// Display rules in the UI
function displayRules() {
    const ruleList = document.getElementById("ruleList");
    ruleList.innerHTML = "";
    const rules = JSON.parse(localStorage.getItem('rules') || "[]");
    rules.forEach((rule, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Rule ${index + 1}: ${JSON.stringify(rule)}`;
        ruleList.appendChild(listItem);
    });
}

// Combine rules and display/save them in localStorage
function combineRules() {
    const rules = JSON.parse(localStorage.getItem('rules') || "[]");

    // Combine all rules into a single AST structure
    if (rules.length > 1) {
        const combinedAST = new ASTNode("operator", "AND", rules[0], rules[1]);
        for (let i = 2; i < rules.length; i++) {
            combinedAST.right = new ASTNode("operator", "AND", combinedAST.right, rules[i]);
        }
        
        // Save combined rule in localStorage
        localStorage.setItem('data', JSON.stringify(combinedAST));

        // Display combined rule in UI
        document.getElementById("combinedRule").textContent = JSON.stringify(combinedAST);
        alert("Rules combined successfully!");
    } else {
        alert("Add at least two rules to combine.");
    }
}

// Evaluate a single AST node
function evaluateNode(node, data) {
    if (node.type === "operand") {
        const [attr, operator, value] = node.value.split(" ");
        switch (operator) {
            case ">": return data[attr] > Number(value);
            case "<": return data[attr] < Number(value);
            case "=": return data[attr] === value.replace(/'/g, "");
            default: return false;
        }
    } else if (node.type === "operator") {
        const leftEval = evaluateNode(node.left, data);
        const rightEval = evaluateNode(node.right, data);
        return node.value === "AND" ? leftEval && rightEval : leftEval || rightEval;
    }
}

// Evaluate the combined rule with user data
function evaluateRules() {
    const combinedAST = JSON.parse(localStorage.getItem('data'));
    if (!combinedAST) {
        alert("No combined rule found. Please combine rules first.");
        return;
    }

    const userData = {
        age: Number(document.getElementById("age").value),
        department: document.getElementById("department").value,
        salary: Number(document.getElementById("salary").value),
        experience: Number(document.getElementById("experience").value)
    };
    
    const result = evaluateNode(combinedAST, userData);
    document.getElementById("result").innerText = result ? "Eligible" : "Not Eligible";
    alert("Evaluation Result: " + result);

    // Save evaluation result in localStorage
    localStorage.setItem('output', JSON.stringify({ result }));
}

// Download JSON file
function downloadJSON(filename, data) {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Download rules.json
function downloadRules() {
    const rules = JSON.parse(localStorage.getItem('rules') || "[]");
    downloadJSON('rules.json', rules);
}

// Download data.json (combined rule)
function downloadData() {
    const combinedAST = JSON.parse(localStorage.getItem('data'));
    downloadJSON('data.json', combinedAST);
}

// Download output.json
function downloadOutput() {
    const output = JSON.parse(localStorage.getItem('output'));
    downloadJSON('output.json', output);
}

// Initialize UI with stored rules and combined rule
document.addEventListener("DOMContentLoaded", () => {
    displayRules();
    const combinedAST = JSON.parse(localStorage.getItem('data'));
    if (combinedAST) {
        document.getElementById("combinedRule").textContent = JSON.stringify(combinedAST);
    }
});

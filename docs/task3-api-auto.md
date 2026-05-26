# API Test Automation – Retrieve General Categories (Trade Me)

## Overview

This document outlines the test automation approach for the **Trade Me Retrieve General Categories API**, which returns a hierarchical category tree.

The automation focuses on validating:
- Functional correctness
- Response structure and data integrity
- Negative scenarios and error handling
- Edge cases
- Basic security and performance considerations

---

## API Under Test

**Endpoint:**

GET https://api.trademe.co.nz/v1/categories/{number}.{file_format}


### Description
Retrieves all or part of the Trade Me category tree.

- If no category number is provided → returns root category tree
- Supports query parameters such as:
  - `depth`
  - `with_counts`
- Supports multiple response formats:
  - JSON (default)
  - XML (optional)

---

## Test Approach

The testing approach is structured into the following categories: 

- Positive Testing 
- Negative Testing 
- Edge Case Testing 
- Data Validation (Schema & Type Checks) 
- Security Checks (Basic) 
- Performance Checks (Basic)

---

## Test Scenarios

## Positive Test Cases (Automated)

- Retrieve root category (no category number)
- Retrieve valid category (`0001-`)
- Retrieve valid category in XML format
- Request with `depth=1`
- Request with `with_counts=true`
- Verify correct category tree structure is returned (recursive validation)
- Validate response status = 200

## Negative Test Cases (Partially Automated)

- Invalid category number (`9999-.json`) → fallback or error handling validated
- Invalid file format (`.xmlx`)
- Invalid depth (`-1`)
- Invalid boolean (`with_counts=maybe`)
- Injection-like input (`../../`)

⚠️ Observations / Limitations:
- API responses for invalid inputs are **inconsistent** (200 / 400 / 404 depending on scenario)
- Some validations rely on **allowed status ranges instead of strict assertions**

## Edge Cases (Automated)

- `depth=0` returns only root node
- Very large `depth` value (e.g. 999)
- Deep category traversal (recursive validation)
- Leaf category structure validation (no subcategories when `IsLeaf = true`)
- Root/empty category request handling

## Security Testing (Basic – Partially Covered)

Implemented:

- Missing/invalid parameters
- Injection-like inputs (`../../`, special characters)

Not fully implemented:
- `<script>` injection validation
- advanced fuzz testing
- payload sanitisation verification

## Performance Testing (Basic – Automated)

- Response time validation (< 1000ms threshold)
- Repeated sequential API calls (5 iterations)
- Consistency under repeated requests

Note: This is not load testing, only baseline performance validation.

## Data Validation (Schema & Structure)

Validated in automation via reusable assertion utilities:

- `Name` → string or null
- `Number` → string or null
- `Path` → string or null
- `Subcategories` → array or null
- `Count` → integer (where applicable)
- `IsRestricted` → boolean
- `HasLegalNotice` → boolean
- `HasClassifieds` → boolean
- `IsLeaf` → boolean

### Structural rules enforced:

✔ Subcategories are recursive category objects  
✔ Leaf nodes do not contain further subcategories  
✔ Hierarchy remains consistent across depths  
✔ Type integrity validated via helper functions 

---

## Automation Approach (Playwright)

Automation is implemented using:

- Playwright Test Runner
- API service layer abstraction (`CategoriesService`)
- Fixture-based dependency injection
- Reusable assertion utilities (`assertions.ts`)
- JSON parsing utility (`safeJson`)
- Structured response validation functions

### Key validations:

- HTTP status codes (strict + allowed ranges)
- JSON/XML response handling
- Schema-level validation
- Recursive category tree validation
- Negative input handling
- Response time thresholds

---

## Tooling

- Playwright (API Testing)
- TypeScript
- Node.js

### Optional / Not fully implemented:

- AJV schema validation (not used)
- XML parser (basic string validation only)

---

## Risks & Limitations

- XML validation remains lightweight (string-based checks only)
- API behaviour for invalid inputs is inconsistent
- No authentication layer reduces security test depth
- Performance testing is baseline only (not load testing)
- Some edge cases depend on external API behaviour stability

---

## Conclusion

The Retrieve General Categories API is well covered through Playwright automation, focusing on:

- Functional correctness
- Hierarchical data integrity
- Key edge cases
- Basic negative and performance scenarios

The framework is structured to be:
- Reusable
- Maintainable
- Extensible for future API coverage

This provides a strong foundation for production-level API test automation within the scope of the assessment.
# Playwright Automation Framework (API + UI)

## Overview

This repository contains automated test coverage for:

- Trade Me Categories API
- Search UI functionality

Built using **Playwright Test Runner (TypeScript)** with a focus on:

- API correctness and hierarchical data validation  
- UI behaviour and user flows  
- Reusable assertion utilities (framework-style abstraction layer)  
- Maintainable test architecture (Page Object Model + service layer)  

---

# Installation

## 1. Clone repository
```bash
git clone <your-repo-url>
cd <your-project-folder>
```

## 2. Install dependencies
```bash
npm install
```

## 3. Install Playwright browsers
```bash
npx playwright install
```

---

# How to Run Tests

## Run all tests (API + UI)
```bash
npx playwright test
```

## Run API tests only
```bash
npx playwright test tests/api
```

## Run UI tests only
```bash
npx playwright test tests/ui
```

## Run a specific spec file
```bash
npx playwright test categories.spec.ts
npx playwright test search.spec.ts
```

## Run tests in headed mode
```bash
npx playwright test --headed
```

## Run in UI mode (debugging)
```bash
npx playwright test --ui
```

## Generate HTML report
```bash
npx playwright show-report
```

---

## Test Report

A sample Playwright HTML report from a successful test run is included in:

playwright-report/index.html

Open it in a browser to view:
- test results
- execution logs
- passed/failed status

---

# Project Structure

```
├── fixtures/
│   └── apiFixture.ts
│
├── pages/
│   └── search.page.ts
│
├── playwright-report/
│   └── index.html
│
├── tests/
│   ├── api/
│   │   └── categories.spec.ts
│   │
│   └── ui/
│       └── search.spec.ts
│
├── utils/
│   ├── api/
│   │   ├── safeJson.ts
│   │   ├── responseTime.ts
│   │   ├── validators.ts
│   │   └── assertions.ts
│
├── types/
│   └── category.type.ts
│
├── playwright.config.ts
└── README.md
```

---

## Detailed Test Design

- Task 1 – Testing (Homepage): ./docs/task1-homepage-test.md  
- Task 2 – UI Automation (Search functionality): ./docs/task2-search-ui-auto.md  
- Task 3 – API Automation (Retrieve categories): ./docs/task3-api-auto.md

---

# Framework Design Principles

- Separation of concerns (UI / API / utilities)
- Reusable assertion layer for consistency
- Service-based API abstraction
- Page Object Model for UI maintainability
- Strong typing with TypeScript
- Minimal duplication in test logic
- Behaviour-focused assertions over implementation details

# Tooling

- Playwright
- TypeScript
- Node.js

---

# Coverage Summary

## Fully Covered
- API categories
- UI search flows
- Recursive validation
- Edge cases

## Partial
- XML validation
- Security testing

## Not Covered
- Load testing
- Contract testing
- Authentication

---

# Limitations

- XML validation is lightweight
- Inconsistent API behaviour for invalid inputs across endpoints
- Performance is baseline only

---

# Key Strengths

- Clean architecture separation
- Reusable assertions
- Strong TypeScript typing
- Maintainable structure
- Scalable design

---

# Conclusion

This framework demonstrates production-style QA automation covering API + UI with scalable design and reusable validation layers.
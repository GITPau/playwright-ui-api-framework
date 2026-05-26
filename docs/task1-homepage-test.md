# Home Page Test Scenarios & Automation Mapping

**Application:** https://www.tmsandbox.co.nz/

These test scenarios are defined based on user impact, frequency of use, and risk to core homepage functionality. The goal is to ensure the homepage is stable, usable, and correctly integrated with backend services.

---

## Test Scenarios

| Scenario | Automate | Suite | Why |
|----------|----------|-------|-----|
| Home page loads successfully without errors | Yes | Smoke | Validates system availability and basic application health |
| Page title and branding display correctly | Yes | Smoke | Ensures correct deployment and branding consistency |
| Main navigation menu is visible and functional | Yes | Smoke | Core navigation must be accessible for user journeys |
| Search bar is present and accepts input | Yes | Smoke | Critical entry point for user interaction |
| Search returns results for valid keywords | Yes | Smoke | Core business functionality validation |
| Search handles empty or invalid input gracefully | Yes | Functional Validation | Ensures robust input handling and UX stability |
| Featured listings/items are visible and clickable | Yes | Functional Validation | Confirms homepage content is usable |
| Clicking an item opens the correct detail page | Yes | Functional Validation | Validates end-to-end navigation flow |
| Category sections display correctly | Yes | Regression | Ensures UI consistency across releases |
| Images and thumbnails load correctly | Yes | Regression | Prevents visual/UI degradation |
| Footer links are present and functional | Yes | Regression | Validates secondary navigation paths |
| No broken links are present on homepage | Yes | Regression | Prevents navigation failures |
| Login/Register links are visible and functional | Yes | Regression | Supports key user journeys |
| Responsive behavior across devices | Partial | Regression | Layout can be automated via viewport testing; visual accuracy requires manual or visual regression tools |
| Homepage performance is within acceptable thresholds | No | Performance | Requires dedicated performance testing tools (e.g. k6, Lighthouse) |
| Basic accessibility checks (keyboard navigation, ARIA labels) | Partial | Regression | Automated checks possible, full accessibility validation requires manual testing and axe tools |
| Search results match backend API data | Yes | Integration | Ensures UI is consistent with backend response data |
| Item details reflect backend API data correctly | Yes | Integration | Validates data integrity across UI and backend systems |

---

## Automation Approach (Summary)

Automation for this project will focus on stable and repeatable UI scenarios using Playwright.

- **Smoke Tests**
  - Run on every build/deployment
  - Covers critical application health and core user flows
  - Ensures system is usable after deployment

- **Functional Validation**
  - Validates core homepage features such as search, navigation, and content visibility
  - Run frequently during development cycles

- **Regression Tests**
  - Ensures existing functionality is not broken by new changes
  - Includes UI consistency, navigation, and cross-page stability checks
  - Typically run before release

- **Integration Tests**
  - Validates UI consistency with backend/API responses
  - Ensures data integrity across layers

---

## Notes

- UI automation focuses on functional correctness and user journeys
- Performance, load, and full accessibility testing are handled using dedicated tools
- Visual and responsive validation may require supplemental tools (e.g. visual regression testing)
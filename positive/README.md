# Positive Tests

## Stable scenario: Add to Cart

- **Test file:** `demoblaze.stable.spec.ts`
- **Result:** ✅ 5/5 Passed (Chromium)
- **Artifact:** [report.png](report.png)

### Why stable?
- Uses semantic locators (`role`, `name`)
- Waits for URL change to `/cart.html`
- Verifies that product is shown in the cart

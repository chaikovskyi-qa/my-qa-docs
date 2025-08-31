# Positive Tests

## Stable scenario: Add to Cart
- Test file: `demoblaze.stable.spec.ts`
- Result: ✅ 5/5 Passed (Chromium)
- Artifact: [stable-report.png](stable-report.png)

### Why stable?
- Uses semantic locators (`role`, `name`)
- Waits for URL change to `/cart.html`
- Verifies that the product is actually displayed in the cart

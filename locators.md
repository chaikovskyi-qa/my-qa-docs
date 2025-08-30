# 📌 Locators Cheat Sheet

## ✅ Good Locator Examples

1. `getByRole('button', { name: /login/i })` — semantic, stable, accessible.
2. `getByTestId('cart-icon')` — reliable if `data-testid` is consistent.
3. `locator('#search')` — short and stable ID.
4. `locator('[data-qa="submit-btn"]')` — custom and descriptive attribute.
5. `locator('.product-item').first()` — simple CSS selector, only if it's unique in context.

## ❌ Bad Locator Examples

1. `locator('div:nth-child(5) > span')` — depends on DOM structure, brittle.
2. `locator('//div[@class="x-123"]')` — unstable class name + XPath = bad combo.
3. `locator('text="Click here"')` — non-unique and might change.

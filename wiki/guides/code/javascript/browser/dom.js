// Find, change, listen: run in a real browser
const button = document.querySelector("#buy");
const items = document.querySelectorAll("#todos li");
console.log("found", items.length, "items; first:", items[0].textContent);

button.textContent = "Added!";
button.classList.add("is-done");
button.setAttribute("aria-pressed", "true");
console.log("button now:", button.outerHTML);

document.querySelector("#order").addEventListener("submit", (event) => {
  event.preventDefault();          // stop the page from reloading
  const data = new FormData(event.target);
  console.log("submit prevented, email =", data.get("email"));
});

// Event delegation: one listener handles every current AND future <li>
const list = document.querySelector("#todos");
list.addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (!item) return;
  item.classList.toggle("done");
  console.log("toggled", item.textContent, "->", item.className);
});
const li = document.createElement("li");
li.textContent = "<img src=x onerror=alert(1)>";   // textContent never runs HTML
list.append(li);
console.log("safe li:", li.outerHTML);

// Capture -> target -> bubble
for (const id of ["outer", "inner", "target"]) {
  const el = document.getElementById(id);
  el.addEventListener("click", () => console.log("capture", id), { capture: true });
  el.addEventListener("click", (e) => console.log("bubble ", id, e.eventPhase === 2 ? "(target phase)" : ""));
}
document.getElementById("inner").addEventListener("click", (e) => { if (e.shiftKey) { e.stopPropagation(); console.log("stopPropagation at inner"); } });

localStorage.setItem("cart", JSON.stringify({ items: 2 }));
console.log("localStorage:", JSON.parse(localStorage.getItem("cart")), "| missing key:", localStorage.getItem("nope"));
document.getElementById("out").innerHTML = "<b>trusted HTML only</b>";
console.log("ready");

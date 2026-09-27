// A tiny JSON API with Node's http module, then fetch() against it
import http from "node:http";

const todos = [{ id: 1, title: "Buy milk", done: false }];

const server = http.createServer(async (req, res) => {
  const send = (status, body, headers = {}) => {
    res.writeHead(status, { "Content-Type": "application/json", ...headers });
    res.end(body === undefined ? undefined : JSON.stringify(body));
  };
  if (req.method === "GET" && req.url === "/api/todos") return send(200, todos);
  if (req.method === "POST" && req.url === "/api/todos") {
    let raw = "";
    for await (const chunk of req) raw += chunk;
    let data;
    try { data = JSON.parse(raw); } catch { return send(400, { error: "Invalid JSON" }); }
    if (typeof data.title !== "string" || !data.title.trim()) return send(422, { error: "title is required" });
    const todo = { id: todos.length + 1, title: data.title.trim(), done: false };
    todos.push(todo);
    return send(201, todo, { Location: `/api/todos/${todo.id}` });
  }
  if (req.url === "/slow") return setTimeout(() => send(200, { ok: true }), 3000);
  send(404, { error: "Not found" });
});

server.listen(0, async () => {
  const base = `http://localhost:${server.address().port}`;

  let res = await fetch(`${base}/api/todos`);
  console.log("GET  /api/todos ->", res.status, await res.json());

  res = await fetch(`${base}/api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Buy milk" }),
    signal: AbortSignal.timeout(5000),     // give up after 5 s
  });
  console.log("POST /api/todos ->", res.status, res.statusText, "Location:", res.headers.get("location"), await res.json());

  res = await fetch(`${base}/api/todos`, { method: "POST", body: "{not json" });
  console.log("POST bad JSON   ->", res.status, "res.ok =", res.ok, await res.json());
  res = await fetch(`${base}/api/todos`, { method: "POST", body: JSON.stringify({ title: " " }) });
  console.log("POST empty title->", res.status, await res.json());

  res = await fetch(`${base}/nope`);
  console.log("GET  /nope      ->", res.status, "res.ok =", res.ok, "(fetch did NOT throw)");

  try {
    await fetch(`${base}/slow`, { signal: AbortSignal.timeout(500) });
  } catch (err) {
    console.log("timeout         ->", err.name + ":", err.message);
  }
  try {
    await fetch("http://localhost:59999/");      // nothing listens here
  } catch (err) {
    console.log("no server       ->", err.name + ":", err.message, "/ cause:", err.cause?.code);
  }
  server.closeAllConnections();
  server.close();
});

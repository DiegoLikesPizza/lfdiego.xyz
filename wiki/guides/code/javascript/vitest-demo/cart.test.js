import { describe, it, expect } from "vitest";
import { total } from "./cart.js";

describe("total", () => {
  it("adds prices times quantities", () => {
    expect(total([{ price: 250, qty: 2 }, { price: 400, qty: 1 }])).toBe(900);
  });
});

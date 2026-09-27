export const total = (items) => items.reduce((s, i) => s + i.price * i.qty, 0);

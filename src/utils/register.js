import { address, returnRes } from "./auth";


export function register(email, password) {
  return fetch(`${address}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(returnRes);
}

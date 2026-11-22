import type { Access } from "payload";

// Only signed-in admin users. Every collection that holds customer data
// (orders, enquiries, subscribers) uses this for read/update/delete.
export const signedIn: Access = ({ req }) => Boolean(req.user);

// Public site can read; writes need a login.
export const anyone: Access = () => true;

// Customer-facing records are only ever created by trusted server code
// (server actions call payload.create with overrideAccess: true).
export const nobody: Access = () => false;

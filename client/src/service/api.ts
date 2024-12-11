import APIClient from "probeclient";

export const api = import.meta.env.VITE_API
const client = new APIClient(api);

export default client;

export const server_name = process.env.NODE_ENV === "production" ? "https://punchy.ikindness.cn" : "http://localhost:5500";
export const auth_server = process.env.NODE_ENV === "production" ? "https://auth.ikindness.cn" : "http://localhost:4501";
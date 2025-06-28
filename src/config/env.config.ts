// Environment configuration for the SOA Sales Front application

export const env = {
  // API Configuration
  API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:2222/api",
};

// Type for environment variables
export type EnvConfig = typeof env;

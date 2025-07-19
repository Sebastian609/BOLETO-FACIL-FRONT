// Environment configuration for the SOA Sales Front application

export const env = {
  // API Configuration
  API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:2223/api",
  
  // API Endpoints
  EVENTS_ENDPOINT: "/events/paginated",
  
  // API Settings
  DEFAULT_LIMIT: 10,
  API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000"),
};

// Type for environment variables
export type EnvConfig = typeof env;

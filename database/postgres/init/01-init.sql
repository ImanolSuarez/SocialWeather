CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Log initialization
DO $$
BEGIN
    RAISE NOTICE 'SocialWeather PostgreSQL initialization completed successfully!';
END$$;

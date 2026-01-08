-- =============================================
-- SocialWeather - PostgreSQL Initialization
-- =============================================
-- Note: Tables are created automatically by Sequelize ORM
-- This file is kept for reference and potential future manual setup

-- Create extension for UUID generation (if not exists)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Log initialization
DO $$
BEGIN
    RAISE NOTICE 'SocialWeather PostgreSQL initialization completed successfully!';
END$$;

-- Add external_id and external_source columns to organizations table if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'organizations' AND column_name = 'external_id'
    ) THEN
        ALTER TABLE public.organizations ADD COLUMN external_id TEXT;
    END IF;

    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'organizations' AND column_name = 'external_source'
    ) THEN
        ALTER TABLE public.organizations ADD COLUMN external_source TEXT;
    END IF;
END $$;

-- Create index on external_id and external_source for better performance
CREATE INDEX IF NOT EXISTS idx_organizations_external_id ON public.organizations(external_id);
CREATE INDEX IF NOT EXISTS idx_organizations_external_source ON public.organizations(external_source);


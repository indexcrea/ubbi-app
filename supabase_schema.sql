-- ============================================================
-- SCRIPT DE CRÉATION DE LA BASE DE DONNÉES CENTRALISÉE UBBI
-- À coller directement dans le "SQL Editor" de votre projet Supabase
-- ============================================================

-- 1. Table des Profils Utilisateurs & Organisateurs
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'organizer',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table des Événements
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Concert',
  venue TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  google_maps_url TEXT,
  min_price INTEGER DEFAULT 5000,
  image TEXT,
  organizer_name TEXT DEFAULT 'Mon Organisation Ubbi',
  organizer_avatar TEXT,
  tickets_json JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table des Billets Émis
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number TEXT UNIQUE NOT NULL,
  event_slug TEXT NOT NULL,
  event_title TEXT NOT NULL,
  category TEXT NOT NULL,
  attendee_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  status TEXT DEFAULT 'VALIDE', -- 'VALIDE' ou 'UTILISE'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer Row Level Security (RLS) avec accès public en lecture/écriture pour Ubbi
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles access" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Public events access" ON public.events FOR ALL USING (true);
CREATE POLICY "Public tickets access" ON public.tickets FOR ALL USING (true);

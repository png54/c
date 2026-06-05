-- =============================================
-- KHIDAMATI DATABASE SCHEMA
-- Complete PostgreSQL schema for Supabase
-- =============================================

-- Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy text search
CREATE EXTENSION IF NOT EXISTS "unaccent"; -- For accent-insensitive search

-- =============================================
-- ENUMS
-- =============================================

CREATE TYPE user_role AS ENUM ('client', 'artisan', 'admin');
CREATE TYPE request_status AS ENUM ('pending', 'accepted', 'rejected', 'in_progress', 'completed', 'cancelled');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE report_status AS ENUM ('open', 'under_review', 'resolved', 'dismissed');
CREATE TYPE transaction_status AS ENUM ('pending', 'paid', 'cancelled');
CREATE TYPE notification_type AS ENUM (
  'request_new', 'request_accepted', 'request_rejected', 
  'request_completed', 'review_new', 'message_new', 'system'
);
CREATE TYPE service_category AS ENUM (
  'electrician', 'plumber', 'carpenter', 'painter', 'welder',
  'appliance_repair', 'ac_repair', 'cleaning', 'cctv_technician', 'network_technician'
);

-- =============================================
-- TABLES
-- =============================================

-- Users Table
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'client' NOT NULL,
  wilaya TEXT,
  municipality TEXT,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE NOT NULL,
  last_sign_in TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Artisans Table
CREATE TABLE public.artisans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  category service_category NOT NULL,
  bio TEXT,
  years_experience INTEGER DEFAULT 0 NOT NULL CHECK (years_experience >= 0 AND years_experience <= 60),
  wilaya TEXT NOT NULL,
  municipality TEXT NOT NULL,
  hourly_rate DECIMAL(10, 2) CHECK (hourly_rate > 0),
  is_available BOOLEAN DEFAULT TRUE NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE NOT NULL,
  verification_status verification_status DEFAULT 'pending' NOT NULL,
  id_card_url TEXT,
  rejection_reason TEXT,
  total_jobs INTEGER DEFAULT 0 NOT NULL,
  total_earnings DECIMAL(12, 2) DEFAULT 0,
  average_rating DECIMAL(3, 2) DEFAULT 0 CHECK (average_rating >= 0 AND average_rating <= 5),
  review_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Services Table
CREATE TABLE public.services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category service_category UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Service Requests Table
CREATE TABLE public.service_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  artisan_id UUID REFERENCES public.artisans(id) ON DELETE SET NULL,
  service_category service_category NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  wilaya TEXT NOT NULL,
  municipality TEXT NOT NULL,
  address TEXT,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  budget_min DECIMAL(10, 2) CHECK (budget_min >= 0),
  budget_max DECIMAL(10, 2) CHECK (budget_max >= 0),
  status request_status DEFAULT 'pending' NOT NULL,
  rejection_reason TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  CONSTRAINT budget_check CHECK (budget_max IS NULL OR budget_min IS NULL OR budget_max >= budget_min)
);

-- Reviews Table
CREATE TABLE public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  request_id UUID REFERENCES public.service_requests(id) ON DELETE CASCADE UNIQUE NOT NULL,
  reviewer_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  artisan_id UUID REFERENCES public.artisans(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_verified BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Portfolio Images Table
CREATE TABLE public.portfolio_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  artisan_id UUID REFERENCES public.artisans(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  caption TEXT,
  service_category service_category,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Messages Table
CREATE TABLE public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  request_id UUID REFERENCES public.service_requests(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  CONSTRAINT no_self_message CHECK (sender_id != receiver_id)
);

-- Notifications Table
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type notification_type NOT NULL,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Reports Table
CREATE TABLE public.reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reporter_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  reported_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  reported_artisan_id UUID REFERENCES public.artisans(id) ON DELETE SET NULL,
  request_id UUID REFERENCES public.service_requests(id) ON DELETE SET NULL,
  reason TEXT NOT NULL,
  description TEXT,
  status report_status DEFAULT 'open' NOT NULL,
  admin_note TEXT,
  resolved_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  CONSTRAINT has_reported_entity CHECK (
    reported_user_id IS NOT NULL OR reported_artisan_id IS NOT NULL
  )
);

-- Favorites Table
CREATE TABLE public.favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  artisan_id UUID REFERENCES public.artisans(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, artisan_id)
);

-- Transactions Table
CREATE TABLE public.transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  artisan_id UUID REFERENCES public.artisans(id) ON DELETE CASCADE NOT NULL,
  request_id UUID REFERENCES public.service_requests(id) ON DELETE CASCADE UNIQUE NOT NULL,
  amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
  commission_rate DECIMAL(5, 4) DEFAULT 0.10 NOT NULL,
  commission DECIMAL(12, 2) NOT NULL,
  net_amount DECIMAL(12, 2) NOT NULL,
  status transaction_status DEFAULT 'pending' NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Activity Logs Table
CREATE TABLE public.activity_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- =============================================
-- INDEXES
-- =============================================

-- Users indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_wilaya ON public.users(wilaya);
CREATE INDEX idx_users_is_active ON public.users(is_active);

-- Artisans indexes
CREATE INDEX idx_artisans_user_id ON public.artisans(user_id);
CREATE INDEX idx_artisans_category ON public.artisans(category);
CREATE INDEX idx_artisans_wilaya ON public.artisans(wilaya);
CREATE INDEX idx_artisans_municipality ON public.artisans(municipality);
CREATE INDEX idx_artisans_is_verified ON public.artisans(is_verified);
CREATE INDEX idx_artisans_is_available ON public.artisans(is_available);
CREATE INDEX idx_artisans_average_rating ON public.artisans(average_rating DESC);
CREATE INDEX idx_artisans_category_wilaya ON public.artisans(category, wilaya);
CREATE INDEX idx_artisans_verification_status ON public.artisans(verification_status);

-- Service requests indexes
CREATE INDEX idx_requests_client_id ON public.service_requests(client_id);
CREATE INDEX idx_requests_artisan_id ON public.service_requests(artisan_id);
CREATE INDEX idx_requests_status ON public.service_requests(status);
CREATE INDEX idx_requests_category ON public.service_requests(service_category);
CREATE INDEX idx_requests_wilaya ON public.service_requests(wilaya);
CREATE INDEX idx_requests_created_at ON public.service_requests(created_at DESC);

-- Reviews indexes
CREATE INDEX idx_reviews_artisan_id ON public.reviews(artisan_id);
CREATE INDEX idx_reviews_reviewer_id ON public.reviews(reviewer_id);
CREATE INDEX idx_reviews_created_at ON public.reviews(created_at DESC);

-- Portfolio indexes
CREATE INDEX idx_portfolio_artisan_id ON public.portfolio_images(artisan_id);

-- Messages indexes
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON public.messages(receiver_id);
CREATE INDEX idx_messages_request_id ON public.messages(request_id);
CREATE INDEX idx_messages_is_read ON public.messages(is_read);
CREATE INDEX idx_messages_created_at ON public.messages(created_at DESC);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);

-- Reports indexes
CREATE INDEX idx_reports_reporter_id ON public.reports(reporter_id);
CREATE INDEX idx_reports_status ON public.reports(status);

-- Favorites indexes
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_artisan_id ON public.favorites(artisan_id);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_artisans_updated_at BEFORE UPDATE ON public.artisans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_requests_updated_at BEFORE UPDATE ON public.service_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON public.reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update artisan rating when review is added
CREATE OR REPLACE FUNCTION update_artisan_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.artisans
  SET 
    average_rating = (
      SELECT ROUND(AVG(rating)::NUMERIC, 2)
      FROM public.reviews
      WHERE artisan_id = NEW.artisan_id AND is_verified = TRUE
    ),
    review_count = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE artisan_id = NEW.artisan_id AND is_verified = TRUE
    )
  WHERE id = NEW.artisan_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_artisan_rating_on_review
  AFTER INSERT OR UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_artisan_rating();

-- Update total_jobs when request is completed
CREATE OR REPLACE FUNCTION update_artisan_jobs()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' AND NEW.artisan_id IS NOT NULL THEN
    UPDATE public.artisans
    SET total_jobs = total_jobs + 1
    WHERE id = NEW.artisan_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_artisan_jobs_on_complete
  AFTER UPDATE ON public.service_requests
  FOR EACH ROW EXECUTE FUNCTION update_artisan_jobs();

-- Create user profile on auth signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role, email_verified)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'مستخدم جديد'),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'client'),
    NEW.email_confirmed_at IS NOT NULL
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Search function for artisans
CREATE OR REPLACE FUNCTION search_artisans(
  p_query TEXT DEFAULT NULL,
  p_category service_category DEFAULT NULL,
  p_wilaya TEXT DEFAULT NULL,
  p_municipality TEXT DEFAULT NULL,
  p_min_rating DECIMAL DEFAULT 0,
  p_max_rate DECIMAL DEFAULT NULL,
  p_sort_by TEXT DEFAULT 'rating',
  p_limit INTEGER DEFAULT 12,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE(
  id UUID,
  user_id UUID,
  full_name TEXT,
  avatar_url TEXT,
  category service_category,
  bio TEXT,
  years_experience INTEGER,
  wilaya TEXT,
  municipality TEXT,
  hourly_rate DECIMAL,
  is_available BOOLEAN,
  is_verified BOOLEAN,
  total_jobs INTEGER,
  average_rating DECIMAL,
  review_count INTEGER,
  total_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.user_id,
    u.full_name,
    u.avatar_url,
    a.category,
    a.bio,
    a.years_experience,
    a.wilaya,
    a.municipality,
    a.hourly_rate,
    a.is_available,
    a.is_verified,
    a.total_jobs,
    a.average_rating,
    a.review_count,
    COUNT(*) OVER() as total_count
  FROM public.artisans a
  JOIN public.users u ON a.user_id = u.id
  WHERE
    a.is_verified = TRUE
    AND u.is_active = TRUE
    AND (p_category IS NULL OR a.category = p_category)
    AND (p_wilaya IS NULL OR a.wilaya = p_wilaya)
    AND (p_municipality IS NULL OR a.municipality ILIKE '%' || p_municipality || '%')
    AND a.average_rating >= p_min_rating
    AND (p_max_rate IS NULL OR a.hourly_rate <= p_max_rate)
    AND (
      p_query IS NULL 
      OR u.full_name ILIKE '%' || p_query || '%'
      OR a.bio ILIKE '%' || p_query || '%'
    )
  ORDER BY
    CASE WHEN p_sort_by = 'rating' THEN a.average_rating END DESC NULLS LAST,
    CASE WHEN p_sort_by = 'reviews' THEN a.review_count END DESC NULLS LAST,
    CASE WHEN p_sort_by = 'price' THEN a.hourly_rate END ASC NULLS LAST,
    CASE WHEN p_sort_by = 'newest' THEN a.created_at END DESC NULLS LAST,
    a.average_rating DESC
  LIMIT p_limit OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Platform statistics function
CREATE OR REPLACE FUNCTION get_platform_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_users', (SELECT COUNT(*) FROM public.users WHERE role != 'admin'),
    'total_artisans', (SELECT COUNT(*) FROM public.artisans WHERE is_verified = TRUE),
    'total_requests', (SELECT COUNT(*) FROM public.service_requests),
    'completed_requests', (SELECT COUNT(*) FROM public.service_requests WHERE status = 'completed'),
    'total_wilayas', (SELECT COUNT(DISTINCT wilaya) FROM public.artisans WHERE is_verified = TRUE),
    'average_rating', (SELECT ROUND(AVG(average_rating)::NUMERIC, 1) FROM public.artisans WHERE is_verified = TRUE AND review_count > 0)
  ) INTO result;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Public can view basic user info" ON public.users
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Artisans policies
CREATE POLICY "Anyone can view verified artisans" ON public.artisans
  FOR SELECT USING (is_verified = TRUE);

CREATE POLICY "Artisans can view own profile" ON public.artisans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Artisans can update own profile" ON public.artisans
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create artisan profile" ON public.artisans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Service requests policies
CREATE POLICY "Clients can view their requests" ON public.service_requests
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Artisans can view requests assigned to them" ON public.service_requests
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM public.artisans WHERE id = service_requests.artisan_id
    )
  );

CREATE POLICY "Artisans can view pending requests in their area" ON public.service_requests
  FOR SELECT USING (status = 'pending');

CREATE POLICY "Clients can create requests" ON public.service_requests
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can update their pending requests" ON public.service_requests
  FOR UPDATE USING (auth.uid() = client_id AND status = 'pending');

CREATE POLICY "Artisans can update assigned requests" ON public.service_requests
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT user_id FROM public.artisans WHERE id = service_requests.artisan_id
    )
  );

-- Reviews policies
CREATE POLICY "Anyone can view verified reviews" ON public.reviews
  FOR SELECT USING (is_verified = TRUE);

CREATE POLICY "Clients can create reviews for completed requests" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Portfolio images policies
CREATE POLICY "Anyone can view portfolio images" ON public.portfolio_images
  FOR SELECT USING (TRUE);

CREATE POLICY "Artisans can manage their portfolio" ON public.portfolio_images
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM public.artisans WHERE id = portfolio_images.artisan_id
    )
  );

-- Messages policies
CREATE POLICY "Users can view their messages" ON public.messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can mark messages as read" ON public.messages
  FOR UPDATE USING (auth.uid() = receiver_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can mark own notifications as read" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Reports policies
CREATE POLICY "Users can view their own reports" ON public.reports
  FOR SELECT USING (auth.uid() = reporter_id);

CREATE POLICY "Users can create reports" ON public.reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- Favorites policies
CREATE POLICY "Users can view their favorites" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their favorites" ON public.favorites
  FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- SEED DATA
-- =============================================

-- Insert services
INSERT INTO public.services (category, name, description) VALUES
  ('electrician', 'كهربائي', 'تركيب وإصلاح الأسلاك والتوصيلات الكهربائية'),
  ('plumber', 'سباك', 'إصلاح وتركيب أنابيب المياه والصرف الصحي'),
  ('carpenter', 'نجار', 'تصنيع وإصلاح الأثاث والأبواب والنوافذ الخشبية'),
  ('painter', 'دهان', 'دهان الجدران والأسقف والأسطح الخارجية'),
  ('welder', 'حداد', 'أعمال الحدادة والألمنيوم والدرابزين'),
  ('appliance_repair', 'مصلح أجهزة منزلية', 'إصلاح الثلاجات والغسالات والمدافئ والمكانس'),
  ('ac_repair', 'مصلح مكيفات', 'تركيب وصيانة وإصلاح مكيفات الهواء'),
  ('cleaning', 'عامل تنظيف', 'تنظيف شامل للمنازل والمكاتب والشقق'),
  ('cctv_technician', 'فني كاميرات مراقبة', 'تركيب وبرمجة وصيانة كاميرات المراقبة'),
  ('network_technician', 'فني شبكات', 'تركيب وإصلاح شبكات الإنترنت والتوصيلات');

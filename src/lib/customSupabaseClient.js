import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase

if (url && anonKey) {
  supabase = createClient(url, anonKey)
  console.log('Supabase client initialized with URL:', url)
} else {
  console.warn('Supabase env vars missing. Using mock client. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable real API.')

  const makeQuery = () => {
    const result = { data: [], error: null }
    const q = {
      select: () => q,
      eq: () => q,
      neq: () => q,
      order: () => q,
      limit: () => q,
      single: () => { result.data = null; return q },
      then: (onFulfilled, onRejected) => Promise.resolve(result).then(onFulfilled, onRejected),
      catch: (onRejected) => Promise.resolve(result).catch(onRejected),
    }
    return q
  }

  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: (callback) => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: async () => ({ data: null, error: null }),
      signInWithPassword: async () => ({ data: null, error: null }),
      signOut: async () => ({ error: null }),
    },
    from: () => makeQuery(),
  }
}

export { supabase }

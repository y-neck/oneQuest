console.log("Initialisierung Supabase");

// Supabase Initialisierung
const supabaseUrl = ''
const supabaseKey = ''
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});

export { supa }
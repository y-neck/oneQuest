console.log("Initialisierung Supabase");

// Supabase Initialisierung
const supabaseUrl = 'https://pjxxbglldowolwetvbjb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqeHhiZ2xsZG93b2x3ZXR2YmpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4Mzk2MDIsImV4cCI6MjAxMjQxNTYwMn0.KKZmkcV6LqTmH4adaElotcCnM44NGrgkYBU9eYQcJcU';
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});

export { supa }
const conf = {
    // Clerk authentication keys
    clerkPublishableKey: String(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || ""),
    
    // Database URL for Prisma
    databaseUrl: String(import.meta.env.DATABASE_URL || import.meta.env.VITE_DATABASE_URL || ""),
    
    // TinyMCE editor key
    tinymceApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY || ""),
}


export default conf;
export default async (request, context) => {
    const url = new URL(request.url);
    const userAgent = (request.headers.get("user-agent") || "").toLowerCase();

    // Known executors often use text starting with Roblox or just have it in UA
    const isRoblox = userAgent.includes("roblox");

    // Standard browsers
    const isBrowser = userAgent.includes("mozilla") ||
        userAgent.includes("chrome") ||
        userAgent.includes("safari") ||
        userAgent.includes("firefox") ||
        userAgent.includes("edge");

    // Logic: 
    // If it's a browser AND NOT explicitly Roblox -> Redirect to restricted page
    if (isBrowser && !isRoblox) {
        return Response.redirect(new URL("/restricted.html", url.origin), 302);
    }

    // Allow access for Roblox, curl, wget, or non-browser user agents
    return context.next();
};

export const MEDIA = {
  hero: "/hero.png",
  product: "/product.png",
  meshTexture: "/mesh.png",
  avatars: [
    "https://images.unsplash.com/photo-1641260774125-04d527b376a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA6MDV8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBkaXZlcnNlJTIwc3RhcnR1cCUyMGZvdW5kZXIlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDB8fHx8MTc4MDEzMzU5Mnww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1705645930353-0e335311ef20?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA6MDV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkaXZlcnNlJTIwc3RhcnR1cCUyMGZvdW5kZXIlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDB8fHx8MTc4MDEzMzU5Mnww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA6MDV8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBkaXZlcnNlJTIwc3RhcnR1cCUyMGZvdW5kZXIlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDB8fHx8MTc4MDEzMzU5Mnww&ixlib=rb-4.1.0&q=85",
  ],
};

export const PROBLEM_CARDS = [
  { icon: "Eye", title: "Visibility", body: "Stay discoverable as AI becomes the primary interface to information." },
  { icon: "ShieldCheck", title: "Trust", body: "Help AI systems understand and trust your expertise." },
  { icon: "TrendingUp", title: "Growth", body: "Reach future customers where discovery is actually happening." },
];

export const SOLUTION_CARDS = [
  { icon: "ScanSearch", title: "Understand", body: "See how AI systems perceive your brand.", tone: "indigo" as const },
  { icon: "Sparkles", title: "Improve", body: "Strengthen the signals AI uses to evaluate content.", tone: "orange" as const },
  { icon: "BarChart3", title: "Measure", body: "Track your visibility across the AI ecosystem.", tone: "yellow" as const },
  { icon: "Rocket", title: "Grow", body: "Stay discoverable as search evolves.", tone: "indigo" as const },
];

export const TESTIMONIALS = [
  { quote: "We stopped optimizing for ten blue links and started building for the answer. GeoAI showed us exactly where we were invisible.", name: "Maya Chen", role: "Founder, Northwind", avatar: 0 },
  { quote: "This is the first tool that treats AI discovery as its own category. It feels like getting in early on something genuinely new.", name: "Daniel Okafor", role: "Head of Growth, Lumen", avatar: 1 },
  { quote: "Our mentions inside AI answers went from zero to consistent. GeoAI made the invisible measurable.", name: "Sofia Alvarez", role: "CEO, Tideway", avatar: 2 },
];

export const LOGOS = ["Northwind", "Lumen", "Tideway", "Cobalt", "Verra", "Halo"];

export const METRICS = [
  { label: "Visibility Score", value: 87, suffix: "", hint: "+12 this month" },
  { label: "AI Readiness", value: 94, suffix: "%", hint: "Excellent" },
  { label: "Authority Signals", value: 68, suffix: "", hint: "Strengthening" },
  { label: "Discovery Opportunities", value: 24, suffix: "", hint: "Ready to act" },
];

export const RECOMMENDATIONS = [
  { title: "Clarify your core offering", impact: "High" as const, done: false },
  { title: "Add structured expertise signals", impact: "High" as const, done: true },
  { title: "Strengthen topical authority", impact: "Medium" as const, done: false },
];

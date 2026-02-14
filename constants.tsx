
import { NewsItem, AITool } from './types';

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: "Gemini 3.5 Pro: The Era of 'Reasoning at Scale' Begins",
    excerpt: "Google's latest architecture achieves 99% accuracy on the hardest logic benchmarks while reducing latency by half.",
    content: "The February 14, 2026 update to Gemini marks a turning point in AI history. By moving beyond simple token prediction into native 'logic-gated' reasoning, Gemini 3.5 Pro can now architect entire software systems from a single prompt with verifiable correctness. Engineering teams across Silicon Valley are reporting 4x productivity gains in architectural design phase.",
    category: 'Breaking',
    date: 'Feb 14, 2026',
    author: 'Sarah Chen',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    views: 45200
  },
  {
    id: '2',
    title: "Claude 5 Preview: Emotional Intelligence reaches Human Parity",
    excerpt: "Anthropic's new 'Empathy Engine' allows agents to understand subtle negotiation tactics and human frustration.",
    content: "The roadmap for early 2026 is dominated by agentic behavior. Claude 5 introduces a specialized layer for emotional context, making it the preferred model for customer-facing enterprise agents. Initial benchmarks show that the model can de-escalate customer conflicts with higher success rates than human mediators.",
    category: 'Research',
    date: 'Feb 12, 2026',
    author: 'Marcus Thorne',
    readTime: '10 min',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    views: 128000
  },
  {
    id: '3',
    title: "Nvidia's Vera Chips: The End of Memory Bottlenecks?",
    excerpt: "The 2026 GPU lineup features integrated HBM4 memory directly on the compute die, promising 20x speedups.",
    content: "Nvidia's February 2026 earnings call revealed the Vera architecture, which solves the data-transfer problem that has plagued AI scaling for years. By stacking compute and memory vertically, energy consumption for LLM inference has dropped by 70%.",
    category: 'Business',
    date: 'Feb 9, 2026',
    author: 'Alex Rivera',
    readTime: '5 min',
    imageUrl: 'https://images.unsplash.com/photo-1591815302525-756a9bcc3425?auto=format&fit=crop&q=80&w=800',
    views: 89000
  },
  {
    id: '4',
    title: "WayScript: The OS for AI Agents (Sponsored)",
    excerpt: "Deploy complex agentic workflows in seconds with the new serverless infrastructure designed specifically for LLMs.",
    content: "Building AI agents is hard. Managing their state and infrastructure is harder. WayScript simplifies this with a native environment for Python agents to live and thrive. (Sponsored Content)",
    category: 'Business',
    date: 'Feb 8, 2026',
    author: 'Partner',
    readTime: '3 min',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    views: 12000,
    isSponsored: true
  },
  {
    id: '5',
    title: "OpenAI Sora Pro: Hollywood-Grade Film Production for All",
    excerpt: "The new Sora update allows for consistent 4K characters across multiple shots and complex set changes.",
    content: "Movie studios are officially integrating Sora into their pre-production workflows as of early 2026. The ability to maintain character consistency across an entire 90-minute narrative is the 'holy grail' that has finally been achieved through OpenAI's new Physics-Latent engine.",
    category: 'Breaking',
    date: 'Jan 28, 2026',
    author: 'Elena Rossi',
    readTime: '7 min',
    imageUrl: 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800',
    views: 67000
  },
  {
    id: '6',
    title: "The Open Source AGI Debate: DeepSeek-V5 vs Llama 4",
    excerpt: "Weights for the world's most powerful open models are leaking faster than regulators can track.",
    content: "The open-source community in early 2026 is moving faster than centralized labs. DeepSeek-V5 has achieved parity with GPT-5 in creative writing and coding tasks, sparking a renewed global debate about AI safety and sovereign compute.",
    category: 'Open Source',
    date: 'Jan 15, 2026',
    author: 'David Wu',
    readTime: '4 min',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    views: 94000
  },
  {
    id: '7',
    title: "Apple Vision Pro 3: The Intelligence Layer is Finally Invisible",
    excerpt: "Apple's 2026 wearable focuses on 'Ambient Intelligence' that anticipates user needs before they speak.",
    content: "With the launch of Vision Pro 3 in January 2026, Apple has moved AI from a tool you use to an environment you live in. The system uses eye-tracking and biometric feedback to pre-load information users are likely to ask for.",
    category: 'Business',
    date: 'Jan 4, 2026',
    author: 'James Cook',
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=800',
    views: 52000
  },
  {
    id: '8',
    title: "Local LLMs: The End of the Cloud Monopoly?",
    excerpt: "In 2026, the average high-end smartphone can run a 70B parameter model locally and privately.",
    content: "Privacy concerns in 2025 led to a massive push for local inference. By December 2025, the hardware has finally caught up to the software's demands, allowing users to run fully autonomous personal assistants without ever sending data to the cloud.",
    category: 'Open Source',
    date: 'Dec 10, 2025',
    author: 'Marcus Thorne',
    readTime: '12 min',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800',
    views: 22000
  }
];

export const MOCK_TOOLS: AITool[] = [
  {
    id: 't1',
    name: "Cursor",
    description: "The AI-first code editor that has effectively replaced VS Code for power users. Features native multi-file editing and automated PR generation.",
    category: 'Coding',
    rating: 4.9,
    pricing: 'Freemium',
    tags: ['IDE', 'Auto-complete', 'Python'],
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=200',
    link: 'https://cursor.com'
  },
  {
    id: 't2',
    name: "V0.dev",
    description: "Generate production-ready UI components using simple natural language prompts. Built on top of shadcn/ui and Tailwind CSS.",
    category: 'Productivity',
    rating: 4.8,
    pricing: 'Freemium',
    tags: ['Frontend', 'React', 'UI'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200',
    link: 'https://v0.dev'
  },
  {
    id: 't3',
    name: "LangSmith",
    description: "The essential tool for debugging, testing, and monitoring your LLM applications in 2026. (Sponsored)",
    category: 'Coding',
    rating: 4.9,
    pricing: 'Paid',
    tags: ['Monitoring', 'LLMOps', 'Tracing'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200',
    link: 'https://langchain.com/langsmith',
    is_sponsored: true
  }
];

import { useContext, useState } from 'react';
import { NavContext } from '../App';
import { Search, Sparkles, Shield, Filter, ChevronDown, FileText, Mail, MessageSquare, LayoutGrid, ArrowRight, User, Calendar, Share2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

// --- Types for Search Results ---
interface SearchResult {
    id: string;
    title: string;
    snippet: string;
    source: 'SharePoint' | 'Jira' | 'Slack' | 'Drive' | 'Confluence' | 'Email' | 'GitHub' | 'ServiceNow';
    type: 'Document' | 'Message' | 'Ticket' | 'Sheet' | 'Slide' | 'Code' | 'Incident';
    author: string;
    date: string;
    url: string;
    summary?: string;
    keyPoints?: string[];
}

// --- MOCK DATA GENERATOR ---
const generateMockResults = (_query: string): SearchResult[] => [
    {
        id: 'res-1',
        title: 'Q4 2025 Product Roadmap Walkthrough',
        snippet: '...covering the key milestones for the **pump vibration analysis** module and the new **safety logs** integration. We expect to launch the beta by mid-November...',
        source: 'Drive',
        type: 'Slide',
        author: 'Shane Yeager',
        date: 'Oct 14',
        url: '#',
        summary: 'Detailed roadmap for Q4 2025 focusing on critical infrastructure upgrades and safety module integrations.',
        keyPoints: ['Launch Pump Vibration Analysis module', 'Integrate new Safety Logs', 'Beta testing starts mid-November']
    },
    {
        id: 'res-2',
        title: 'Engineering All-Hands: Safety Protocols Update',
        snippet: '...please review the attached docs regarding the **Lockout/Tagout (LOTO)** procedures. It is critical that all engineers sign off on the new requirements...',
        source: 'Slack',
        type: 'Message',
        author: 'Aimee Leonard',
        date: '2 days ago',
        url: '#',
        summary: 'Mandatory update on LOTO procedures requiring immediate sign-off from all engineering staff.',
        keyPoints: ['Review LOTO procedures', 'Sign-off deadline: Friday', 'Updates affect Sector 4 & 7']
    },
    {
        id: 'res-3',
        title: 'Electrical Safety Policy v4.2',
        snippet: '...purpose of this policy is to establish mandatory requirements for the isolation of **hazardous energy** sources. Scope applies to all employees...',
        source: 'SharePoint',
        type: 'Document',
        author: 'Compliance Team',
        date: 'Sep 21',
        url: '#',
        summary: 'Updated corporate policy regarding hazardous energy isolation and electrical safety standards.',
        keyPoints: ['Use of insulated tools required', 'Minimum approach distances updated', 'Supervisor approval for >1000V work']
    },
    {
        id: 'res-4',
        title: 'INC-2025-009: Pump Rotor Vibration Anomalies',
        snippet: '...investigating the root cause of the excessive vibration in **Sector 7**. Preliminary logs suggest a misalignment in the primary rotor shaft...',
        source: 'Jira',
        type: 'Ticket',
        author: 'Scott Edwards',
        date: 'Nov 01',
        url: '#',
        summary: 'Incident report detailing excessive vibration event in Sector 7 pump assembly.',
        keyPoints: ['Misalignment detected in rotor shaft', 'Maintenance scheduled for downtime', 'Sector 7 operating at 80% capacity']
    },
    {
        id: 'res-5',
        title: 'Weekly Sync Notes - Operations Team',
        snippet: '...Andre Beavers: Is there anything specific you wanted to cover for the **roadmap**? We should definitely touch on the deployment timeline...',
        source: 'Confluence',
        type: 'Document',
        author: 'Andre Beavers',
        date: 'Dec 06',
        url: '#',
        summary: 'Meeting notes from weekly operations sync covering roadmap alignment and deployment schedules.',
        keyPoints: ['Roadmap review', 'Deployment timeline adjustment', 'Staffing needs for Q1']
    }
];

// --- COMPONENTS ---

const DetailPane = ({ result, onClose }: { result: SearchResult; onClose: () => void }) => {
    const { navigate } = useContext(NavContext);

    return (
        <div className="h-full flex flex-col bg-white">
            <div className="p-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
                <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase tracking-wide flex items-center gap-1">
                            <Shield className="w-3 h-3" /> GovGuard Verified
                        </div>
                        <span className="text-xs text-slate-400">{result.type}</span>
                    </div>
                    <h2 className="text-base font-bold text-slate-800 leading-snug">{result.title}</h2>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-50">
                    <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {result.author}</div>
                    <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {result.date}</div>
                </div>

                {/* AI Summary Section */}
                <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-blue-900 mb-3">
                        <Sparkles className="w-4 h-4 text-blue-600" /> AI Summary
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                        {result.summary || "No summary available for this item."}
                    </p>
                    {result.keyPoints && (
                        <div className="space-y-2">
                            <h5 className="text-xs font-semibold text-blue-800 uppercase tracking-wider">Key Points</h5>
                            <ul className="space-y-1.5">
                                {result.keyPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Original Preview (Simulated) */}
                <div className="prose prose-sm prose-slate max-w-none opacity-60 grayscale hover:grayscale-0 transition-all">
                    <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">Original Content Preview</h5>
                    <p className="text-sm text-slate-500 line-clamp-6 italic">
                        "{result.snippet.replace(/\*\*/g, '')} ... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    </p>
                </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-white">
                <button
                    onClick={() => navigate(`/document/${result.id}`)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium shadow-sm transition-all hover:shadow-md"
                >
                    <MessageSquare className="w-4 h-4" /> Chat with this Document
                </button>
            </div>
        </div>
    );
};

const SourceIcon = ({ source }: { source: string }) => {
    switch (source) {
        case 'Drive': return <div className="p-1.5 bg-green-100 text-green-700 rounded"><FileText className="w-4 h-4" /></div>;
        case 'Slack': return <div className="p-1.5 bg-purple-100 text-purple-700 rounded"><MessageSquare className="w-4 h-4" /></div>;
        case 'Jira': return <div className="p-1.5 bg-blue-100 text-blue-700 rounded"><LayoutGrid className="w-4 h-4" /></div>;
        case 'Email': return <div className="p-1.5 bg-orange-100 text-orange-700 rounded"><Mail className="w-4 h-4" /></div>;
        case 'GitHub': return <div className="p-1.5 bg-slate-800 text-white rounded"><Share2 className="w-4 h-4" /></div>;
        case 'ServiceNow': return <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded"><LayoutGrid className="w-4 h-4" /></div>;
        default: return <div className="p-1.5 bg-slate-100 text-slate-700 rounded"><FileText className="w-4 h-4" /></div>;
    }
};

const ResultCard = ({ result, onClick }: { result: SearchResult; onClick: () => void }) => {
    const formattedSnippet = result.snippet.split(/(\*\*.*?\*\*)/g).map((part, i) =>
        part.startsWith('**') ? <strong key={i} className="text-slate-800 font-medium">{part.slice(2, -2)}</strong> : part
    );

    return (
        <div onClick={onClick} className="group py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/70 -mx-2 px-2 rounded-lg transition-all cursor-pointer">
            <div className="flex items-start gap-3">
                <SourceIcon source={result.source} />

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3 className="text-base font-semibold text-blue-600 group-hover:text-blue-700 leading-snug line-clamp-2">
                            {result.title}
                        </h3>
                        <div className="flex-shrink-0 px-2.5 py-0.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-md border border-slate-200">
                            {result.source}
                        </div>
                    </div>


                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                        <span>{result.author}</span>
                        <span className="text-slate-300">•</span>
                        <span>{result.date}</span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-3">
                        {formattedSnippet}
                    </p>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" /> Summarize
                        </button>
                        <span className="text-slate-300">•</span>
                        <button className="text-xs font-medium text-slate-500 hover:text-slate-700">
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ChatPage = () => {
    const { currentUser } = useAppStore();
    const [input, setInput] = useState('');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

    const handleSearch = (term: string = input) => {
        if (!term.trim()) return;
        setQuery(term);
        setIsSearching(true);
        setSelectedResult(null);
        setTimeout(() => {
            setResults(generateMockResults(term));
            setIsSearching(false);
        }, 800);
    };

    if (!query) {
        return (
            <div className="h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="w-full max-w-2xl text-center space-y-8 z-10 animate-in fade-in zoom-in-95 duration-700">
                    <div className="space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl mb-4">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Enterprise Search</h1>
                        <p className="text-lg text-slate-500 max-w-lg mx-auto">Find docs, messages, and people across all connected apps.</p>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg transition-opacity opacity-50 group-hover:opacity-100"></div>
                        <div className="relative flex items-center bg-white shadow-2xl shadow-blue-900/5 rounded-2xl p-2 border border-slate-200 group-focus-within:border-blue-400 group-focus-within:ring-4 group-focus-within:ring-blue-500/10 transition-all">
                            <Search className="w-5 h-5 text-slate-400 ml-4" />
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                                placeholder="Search everything..."
                                className="flex-1 w-full px-4 py-4 text-lg bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400"
                                autoFocus
                            />
                            <button
                                onClick={() => handleSearch()}
                                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-lg shadow-blue-600/20"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="absolute bottom-8 flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <Shield className="w-3 h-3" />
                        <span>Protected by GovGuard™ • Role: {currentUser.role}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-white border-b border-slate-200">
                <div className="px-6 py-4">
                    <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => { setQuery(''); setInput(''); setSelectedResult(null); }}>
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 max-w-3xl relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                                className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white border border-transparent focus:border-blue-300 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none transition-all focus:ring-4 focus:ring-blue-500/10"
                            />
                        </div>
                        <div className="ml-auto flex items-center gap-4">
                            <button className="text-sm font-medium text-blue-600 flex items-center gap-1">
                                <Share2 className="w-4 h-4" /> Share feedback
                            </button>
                            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                {currentUser.avatar}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 no-scrollbar">
                        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200">
                            <Filter className="w-3.5 h-3.5" /> All filters
                        </button>
                        <div className="w-px h-5 bg-slate-300 mx-2"></div>
                        {['Updated', 'From', 'Type', 'Account', 'Owner'].map(f => (
                            <button key={f} className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg whitespace-nowrap">
                                {f} <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden w-full">
                <div className="h-full flex gap-0 relative">

                    <div className="flex-1 overflow-y-auto px-6 py-6 min-w-0 bg-white">
                        {isSearching ? (
                            <div className="space-y-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="animate-pulse flex gap-4">
                                        <div className="w-10 h-10 bg-slate-100 rounded"></div>
                                        <div className="flex-1 space-y-3">
                                            <div className="h-5 bg-slate-100 rounded w-1/2"></div>
                                            <div className="h-4 bg-slate-100 rounded w-full"></div>
                                            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <div className="text-sm text-slate-500 mb-6 flex justify-between items-center">
                                    <span>Found {results.length * 243} results for <strong>"{query}"</strong></span>
                                    <span className="text-xs">Sorted by Relevance</span>
                                </div>
                                <div className="space-y-2">
                                    {results.map(res => (
                                        <div key={res.id} className={selectedResult?.id === res.id ? "bg-blue-50/50 rounded-xl" : ""}>
                                            <ResultCard result={res} onClick={() => setSelectedResult(res)} />
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 text-center">
                                    <button className="px-6 py-3 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors">
                                        Load more results
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-[400px] border-l border-slate-200 bg-slate-50 flex flex-col h-full overflow-hidden">
                        {selectedResult ? (
                            <DetailPane result={selectedResult} onClose={() => setSelectedResult(null)} />
                        ) : (
                            <div className="p-6 overflow-y-auto h-full space-y-8 animate-in fade-in duration-500">
                                <div>
                                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center justify-between">
                                        Source Types <Filter className="w-3 h-3 cursor-pointer" />
                                    </h3>
                                    <div className="space-y-1">
                                        {[
                                            { label: 'All', count: '10k', active: true },
                                            { label: 'Google Drive', count: '1k' },
                                            { label: 'GitHub', count: '142' },
                                            { label: 'Jira (Cloud)', count: '63' },
                                            { label: 'ServiceNow', count: '89' },
                                            { label: 'Slack', count: '1k' },
                                            { label: 'Confluence', count: '218' },
                                        ].map(f => (
                                            <div key={f.label} className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm ${f.active ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>
                                                <span className="flex items-center gap-2">
                                                    {f.active && <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
                                                    {f.label}
                                                </span>
                                                <span className="text-xs text-slate-400 tabular-nums">{f.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                                        Updated
                                    </h3>
                                    <div className="space-y-2 text-sm text-slate-600 pl-3">
                                        <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                                            <input type="radio" name="time" defaultChecked className="text-blue-600" /> Any time
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                                            <input type="radio" name="time" className="text-blue-600" /> Past 24 hours
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                                            <input type="radio" name="time" className="text-blue-600" /> Past week
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                                            <input type="radio" name="time" className="text-blue-600" /> Past month
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

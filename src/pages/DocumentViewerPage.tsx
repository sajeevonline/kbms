import { useState, useContext } from 'react';
import { useAppStore, canAccessDocument } from '../store/useAppStore';
import { Send, ArrowLeft, MoreVertical, FileText, User, Bot, AlertCircle } from 'lucide-react';
import { NavContext } from '../App';
import React from 'react';

export const DocumentViewerPage = () => {
    const { navigate, path } = useContext(NavContext);
    const { documents, currentUser } = useAppStore();
    const [messages, setMessages] = useState<Array<{ id: string; role: 'user' | 'assistant'; content: string }>>([
        { id: '1', role: 'assistant', content: 'Hello! I have analyzed this document. You can ask me about specific sections, summaries, or key takeaways.' }
    ]);
    const [input, setInput] = useState('');

    // Extract ID from path '/document/ID' (Simple mock routing logic)
    const docId = path.split('/')[2];

    // MOCK DATA ALIGNMENT HACK:
    // The search results in ChatPage generated mock IDs like 'res-1', but store has 'doc-001'.
    // For demo purposes, we will try to find the doc by ID, OR if it starts with 'res-', just map it to the first available doc to prevent 404s.
    let doc = documents.find(d => d.id === docId);

    // If not found (likely coming from ChatPage mock results), fallback to first doc for demo
    if (!doc && docId.startsWith('res-')) {
        doc = documents[0];
    }

    const hasAccess = doc && canAccessDocument(currentUser, doc);

    if (!doc || !hasAccess) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
                <p>Document not found or access denied.</p>
                <button onClick={() => navigate('/library')} className="mt-4 text-blue-600 hover:underline">
                    Back to Library
                </button>
            </div>
        );
    }

    const handleSend = () => {
        if (!input.trim()) return;
        const newMsg = { id: Date.now().toString(), role: 'user' as const, content: input };
        setMessages(prev => [...prev, newMsg]);
        setInput('');

        // Mock AI Response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Based on "${doc?.title}", here is the answer found in the section regarding ${newMsg.content.includes('policy') ? 'Compliance' : 'Safety Protocols'}: \n\n lorem ipsum dolor sit amet...`
            }]);
        }, 1000);
    };

    return (
        <div className="h-[calc(100vh-6rem)] animate-in fade-in duration-500 max-w-5xl mx-auto flex flex-col">
            {/* Header */}
            <div className="h-16 mb-6 flex items-center justify-between bg-white px-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/library')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="flex items-center gap-3">
                        <span className={`p-2 rounded-lg ${doc.type === 'Policy' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                            <FileText className="w-5 h-5" />
                        </span>
                        <div>
                            <h2 className="text-base font-bold text-slate-900 leading-tight">{doc.title}</h2>
                            <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">{doc.type} • {doc.sensitivity} • Owned by {doc.domain}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Last updated: {doc.updatedAt}</span>
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Chat Interface (Full Width) */}
            <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                <div className="h-14 border-b border-slate-100 flex items-center justify-between px-6 bg-slate-50/50">
                    <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-slate-700">AI Assistant</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-slate-100 text-slate-600 border border-slate-200' : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'}`}>
                                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                            </div>
                            <div className={`p-4 rounded-2xl text-base leading-relaxed max-w-[80%] shadow-sm ${msg.role === 'user'
                                    ? 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tr-none'
                                    : 'bg-blue-50 text-blue-900 border border-blue-100 rounded-tl-none'
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 border-t border-slate-100 bg-white">
                    <div className="relative flex items-center max-w-4xl mx-auto">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={`Ask anything about "${doc.title}"...`}
                            className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-inner text-lg"
                            autoFocus
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="absolute right-3 p-2.5 bg-blue-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-center text-xs text-slate-400 mt-3">
                        AI can make mistakes. Verify important information from the source document.
                    </p>
                </div>
            </div>
        </div>
    );
};

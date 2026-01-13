import { useContext, useState } from 'react';
import { Search, FileText, Calendar, Tag, Folder, Clock, MoreVertical, Download, Share2, LayoutGrid, List } from 'lucide-react';
import { useAppStore, canAccessDocument } from '../store/useAppStore';
import { NavContext } from '../App';

export const LibraryPage = () => {
    const { navigate } = useContext(NavContext);
    const { currentUser, documents } = useAppStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [activeFolder, setActiveFolder] = useState<string | null>(null);

    const folderStats = [
        { id: 'f1', name: 'Engineering', count: 1240, color: 'bg-blue-100 text-blue-700' },
        { id: 'f2', name: 'Human Resources', count: 85, color: 'bg-purple-100 text-purple-700' },
        { id: 'f3', name: 'Sales & Marketing', count: 342, color: 'bg-green-100 text-green-700' },
        { id: 'f4', name: 'Legal & Compliance', count: 56, color: 'bg-amber-100 text-amber-700' },
        { id: 'f5', name: 'Operations', count: 892, color: 'bg-slate-100 text-slate-700' },
    ];

    // const recentDocs = documents.filter(d => canAccessDocument(currentUser, d)).slice(0, 4);

    // Filter logic
    const allDocs = documents.filter(d => canAccessDocument(currentUser, d));
    const filteredDocs = allDocs.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesFolder = activeFolder ? doc.domain === activeFolder : true;
        return matchesSearch && matchesFolder;
    });

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Knowledge Library</h1>
                        <p className="text-slate-500 mt-1">Centralized repository for all corporate assets.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 shadow-sm transition-colors">
                            <Download className="w-4 h-4" /> Export Report
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
                            <Share2 className="w-4 h-4" /> Share Library
                        </button>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText className="w-5 h-5" /></div>
                            <span className="text-slate-500 text-sm font-medium">Total Documents</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{allDocs.length}</div>
                        <div className="text-xs text-green-600 font-medium mt-1">+12% from last month</div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Folder className="w-5 h-5" /></div>
                            <span className="text-slate-500 text-sm font-medium">Active Folders</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">24</div>
                        <div className="text-xs text-slate-400 font-medium mt-1">Across 8 departments</div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Tag className="w-5 h-5" /></div>
                            <span className="text-slate-500 text-sm font-medium">Tags</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">156</div>
                        <div className="text-xs text-slate-400 font-medium mt-1">Used for classification</div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Clock className="w-5 h-5" /></div>
                            <span className="text-slate-500 text-sm font-medium">Storage Used</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">1.2 TB</div>
                        <div className="text-xs text-slate-400 font-medium mt-1">24% of quota</div>
                    </div>
                </div>
            </div>

            {/* Folder Navigation */}
            <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Browse by Department</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {folderStats.map(folder => (
                        <div
                            key={folder.id}
                            onClick={() => setActiveFolder(activeFolder === folder.name ? null : folder.name)}
                            className={`group p-4 rounded-xl border cursor-pointer transition-all ${activeFolder === folder.name ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/50' : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'}`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <span className={`p-2 rounded-lg ${folder.color} bg-opacity-20`}>
                                    <Folder className="w-6 h-6 fill-current" />
                                </span>
                                <span className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
                                    <MoreVertical className="w-4 h-4" />
                                </span>
                            </div>
                            <h4 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-700">{folder.name}</h4>
                            <p className="text-xs text-slate-500">{folder.count} files</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Files Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="font-semibold text-slate-900">
                        {activeFolder ? `${activeFolder} Documents` : 'Recent Files'}
                    </h3>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Filter..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
                            />
                        </div>
                        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-slate-100">
                    <div className="grid grid-cols-[2fr,1fr,1fr,1fr] px-6 py-3 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <div>Name</div>
                        <div>Date Modified</div>
                        <div>Type</div>
                        <div>Sensitivity</div>
                    </div>
                    {filteredDocs.length > 0 ? (
                        filteredDocs.map(doc => (
                            <div
                                key={doc.id}
                                onClick={() => navigate(`/document/${doc.id}`)}
                                className="grid grid-cols-[2fr,1fr,1fr,1fr] px-6 py-4 hover:bg-slate-50 transition-colors group cursor-pointer items-center"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{doc.title}</div>
                                        <div className="text-xs text-slate-400">{doc.domain}</div>
                                    </div>
                                </div>
                                <div className="text-sm text-slate-600 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-slate-400" /> {doc.updatedAt}
                                </div>
                                <div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                        {doc.type}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${doc.sensitivity === 'Public' ? 'bg-green-100 text-green-800' :
                                        doc.sensitivity === 'Internal' ? 'bg-blue-100 text-blue-800' :
                                            'bg-amber-100 text-amber-800'
                                        }`}>
                                        {doc.sensitivity}
                                    </span>
                                    <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-slate-200 rounded text-slate-500">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 text-center text-slate-400">
                            <Folder className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>No documents found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

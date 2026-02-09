
import React, { useState } from 'react';
import { Theme, Party, SiteInfo } from '../types';
import { 
  Plus, Trash2, Edit, Save, Palette, FileText, 
  Settings, Image as ImageIcon, XCircle, Link as LinkIcon, ExternalLink, Info
} from 'lucide-react';

interface Props {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  parties: Party[];
  setParties: React.Dispatch<React.SetStateAction<Party[]>>;
  siteInfo: SiteInfo;
  setSiteInfo: React.Dispatch<React.SetStateAction<SiteInfo>>;
}

const AdminDashboard: React.FC<Props> = ({ 
  theme, setTheme, parties, setParties, siteInfo, setSiteInfo 
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'theme' | 'parties'>('parties');
  const [editingParty, setEditingParty] = useState<Party | null>(null);

  const deleteParty = (id: string) => {
    if (confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      setParties(parties.filter(p => p.id !== id));
    }
  };

  const saveParty = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingParty) {
      if (parties.find(p => p.id === editingParty.id)) {
        setParties(parties.map(p => p.id === editingParty.id ? editingParty : p));
      } else {
        setParties([...parties, editingParty]);
      }
      setEditingParty(null);
    }
  };

  const createNewParty = () => {
    setEditingParty({
      id: Date.now().toString(),
      title: '새로운 프리미엄 파티',
      date: new Date().toISOString().split('T')[0] + ' 19:00',
      location: '장소를 입력하세요',
      capacity: 10,
      currentApplicants: 0,
      price: 100000,
      description: '파티에 대한 상세 설명을 입력하세요.',
      imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop',
      status: '모집중',
      googleFormUrl: ''
    });
  };

  const updateFeature = (index: number, field: 'title' | 'description', value: string) => {
    const newFeatures = [...siteInfo.aboutFeatures];
    newFeatures[index][field] = value;
    setSiteInfo({ ...siteInfo, aboutFeatures: newFeatures });
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-gray-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl flex flex-col z-10 border-r border-gray-100">
        <div className="p-10 border-b border-gray-50">
          <h2 className="text-2xl font-black tracking-tighter" style={{ color: theme.primaryColor }}>
            ADMIN CENTER
          </h2>
        </div>
        <nav className="flex-1 px-6 py-10 space-y-4">
          <button onClick={() => setActiveTab('parties')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl transition-all ${activeTab === 'parties' ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' : 'hover:bg-gray-50 text-gray-400 font-medium'}`}>
            <FileText size={22} /> 파티 관리
          </button>
          <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl transition-all ${activeTab === 'content' ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' : 'hover:bg-gray-50 text-gray-400 font-medium'}`}>
            <Info size={22} /> 브랜드 스토리
          </button>
          <button onClick={() => setActiveTab('theme')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl transition-all ${activeTab === 'theme' ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' : 'hover:bg-gray-50 text-gray-400 font-medium'}`}>
            <Palette size={22} /> 디자인 설정
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-16 bg-[#F8FAFC]">
        {activeTab === 'parties' && (
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-16">
              <div>
                <h3 className="text-4xl font-light">Party Management</h3>
                <p className="text-gray-400 mt-2">사용자에게 보여질 파티 목록을 관리합니다.</p>
              </div>
              <button onClick={createNewParty} className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-blue-500/20 flex items-center gap-3 hover:-translate-y-1 transition-all">
                <Plus size={20} /> 새 파티 등록
              </button>
            </div>
            <div className="grid gap-6">
              {parties.map(party => (
                <div key={party.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 flex items-center justify-between group hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center gap-8">
                    <img src={party.imageUrl} className="w-24 h-24 rounded-3xl object-cover" />
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold">{party.title}</h4>
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${party.status === '모집중' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{party.status}</span>
                      </div>
                      <p className="text-gray-400 font-light">{party.date} | {party.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setEditingParty(party)} className="p-4 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-2xl transition-colors"><Edit size={22} /></button>
                    <button onClick={() => deleteParty(party.id)} className="p-4 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-2xl transition-colors"><Trash2 size={22} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="max-w-4xl mx-auto space-y-12">
            <div><h3 className="text-4xl font-light mb-4">Brand Story & About</h3><p className="text-gray-400">브랜드 가치와 특징을 정의합니다.</p></div>
            
            <div className="bg-white p-12 rounded-[3rem] shadow-xl space-y-10">
              <div className="space-y-4">
                <label className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em]">About Section Title</label>
                <input type="text" value={siteInfo.aboutTitle} onChange={(e) => setSiteInfo({...siteInfo, aboutTitle: e.target.value})} className="w-full border-b-2 border-gray-100 py-4 text-2xl font-bold outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em]">About Section Description</label>
                <textarea rows={4} value={siteInfo.aboutDescription} onChange={(e) => setSiteInfo({...siteInfo, aboutDescription: e.target.value})} className="w-full bg-gray-50 rounded-3xl p-8 font-light leading-relaxed outline-none focus:bg-white focus:ring-2 ring-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {siteInfo.aboutFeatures.map((feature, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[3rem] shadow-sm space-y-6">
                  <span className="text-[10px] font-black text-gray-300">FEATURE 0{idx + 1}</span>
                  <input type="text" value={feature.title} onChange={(e) => updateFeature(idx, 'title', e.target.value)} className="w-full border-b border-gray-100 py-2 font-bold outline-none focus:border-blue-500" placeholder="특징 제목" />
                  <textarea rows={3} value={feature.description} onChange={(e) => updateFeature(idx, 'description', e.target.value)} className="w-full text-sm text-gray-400 font-light leading-relaxed outline-none border-none p-0 focus:ring-0" placeholder="상세 설명" />
                </div>
              ))}
            </div>

            <div className="bg-white p-12 rounded-[3rem] shadow-sm space-y-10">
              <div className="space-y-4">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Hero Section Title</label>
                <textarea rows={2} value={siteInfo.heroTitle} onChange={(e) => setSiteInfo({...siteInfo, heroTitle: e.target.value})} className="w-full border-b-2 border-gray-100 py-4 text-3xl font-light outline-none focus:border-blue-500 transition-colors" />
              </div>
            </div>
          </div>
        )}

        {/* Theme Settings (Keep Existing) */}
        {activeTab === 'theme' && (
          <div className="max-w-3xl mx-auto bg-white p-16 rounded-[3rem] shadow-xl space-y-16">
            <h3 className="text-3xl font-bold">Theme Settings</h3>
            <div className="grid grid-cols-2 gap-16">
              <div className="space-y-6">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Primary Color</label>
                <div className="flex items-center gap-6">
                  <input type="color" value={theme.primaryColor} onChange={(e) => setTheme({...theme, primaryColor: e.target.value})} className="w-20 h-20 rounded-3xl cursor-pointer border-8 border-gray-50 shadow-inner" />
                  <span className="font-mono text-xl">{theme.primaryColor}</span>
                </div>
              </div>
              <div className="space-y-6">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Accent Color</label>
                <div className="flex items-center gap-6">
                  <input type="color" value={theme.accentColor} onChange={(e) => setTheme({...theme, accentColor: e.target.value})} className="w-20 h-20 rounded-3xl cursor-pointer border-8 border-gray-50 shadow-inner" />
                  <span className="font-mono text-xl">{theme.accentColor}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Editor Modal (Keep Existing with Status Edit) */}
      {editingParty && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-8 backdrop-blur-3xl bg-blue-900/10">
          <div className="bg-white w-full max-w-4xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <form onSubmit={saveParty} className="flex flex-col h-full max-h-[90vh]">
              <div className="p-12 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-3xl font-bold">Edit Party</h3>
                <button type="button" onClick={() => setEditingParty(null)} className="text-gray-300 hover:text-black transition-colors"><XCircle size={40} /></button>
              </div>
              <div className="p-12 overflow-y-auto space-y-10">
                <div className="grid grid-cols-2 gap-10">
                  <div className="col-span-2 space-y-4">
                    <label className="text-[11px] font-black text-gray-400 uppercase">Party Title</label>
                    <input type="text" required value={editingParty.title} onChange={(e) => setEditingParty({...editingParty, title: e.target.value})} className="w-full border-b-2 border-gray-100 py-4 text-2xl font-bold outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-blue-500 uppercase">Status</label>
                    <select value={editingParty.status} onChange={(e) => setEditingParty({...editingParty, status: e.target.value as any})} className="w-full border-b-2 border-gray-100 py-4 font-bold outline-none focus:border-blue-500 bg-transparent">
                      <option value="모집중">🟢 모집중</option>
                      <option value="마감">🔴 마감</option>
                      <option value="진행완료">⚪ 진행완료</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-gray-400 uppercase">Google Form URL</label>
                    <input type="text" required value={editingParty.googleFormUrl || ''} onChange={(e) => setEditingParty({...editingParty, googleFormUrl: e.target.value})} className="w-full border-b-2 border-gray-100 py-4 text-blue-600 outline-none" placeholder="https://forms.google.com/..." />
                  </div>
                  <div className="space-y-4"><label className="text-[11px] font-black text-gray-400 uppercase">Date</label><input type="text" required value={editingParty.date} onChange={(e) => setEditingParty({...editingParty, date: e.target.value})} className="w-full border-b-2 border-gray-100 py-4 outline-none" /></div>
                  <div className="space-y-4"><label className="text-[11px] font-black text-gray-400 uppercase">Location</label><input type="text" required value={editingParty.location} onChange={(e) => setEditingParty({...editingParty, location: e.target.value})} className="w-full border-b-2 border-gray-100 py-4 outline-none" /></div>
                  <div className="space-y-4"><label className="text-[11px] font-black text-gray-400 uppercase">Price</label><input type="number" required value={editingParty.price} onChange={(e) => setEditingParty({...editingParty, price: parseInt(e.target.value)})} className="w-full border-b-2 border-gray-100 py-4 outline-none" /></div>
                  <div className="space-y-4"><label className="text-[11px] font-black text-gray-400 uppercase">Capacity</label><input type="number" required value={editingParty.capacity} onChange={(e) => setEditingParty({...editingParty, capacity: parseInt(e.target.value)})} className="w-full border-b-2 border-gray-100 py-4 outline-none" /></div>
                  <div className="col-span-2 space-y-4">
                    <label className="text-[11px] font-black text-gray-400 uppercase">Description</label>
                    <textarea rows={6} value={editingParty.description} onChange={(e) => setEditingParty({...editingParty, description: e.target.value})} className="w-full bg-gray-50 rounded-[2rem] p-8 outline-none focus:bg-white focus:ring-2 ring-blue-500" />
                  </div>
                </div>
              </div>
              <div className="p-12 bg-gray-50 flex gap-6">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-6 rounded-3xl font-bold flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"><Save size={24} /> 저장하기</button>
                <button type="button" onClick={() => setEditingParty(null)} className="px-16 bg-white border border-gray-200 py-6 rounded-3xl font-bold text-gray-400 hover:bg-gray-100 transition-colors">닫기</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

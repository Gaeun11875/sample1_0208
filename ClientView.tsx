
import React, { useState } from 'react';
import { Theme, Party, SiteInfo } from '../types';
import { Calendar, MapPin, Users, Share2, Instagram, MessageCircle, ChevronRight, X, ExternalLink, ShieldCheck, Target, Heart, Mail } from 'lucide-react';

interface Props {
  theme: Theme;
  parties: Party[];
  siteInfo: SiteInfo;
}

const ClientView: React.FC<Props> = ({ theme, parties, siteInfo }) => {
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);

  const openPartyDetail = (party: Party) => {
    setSelectedParty(party);
    document.body.style.overflow = 'hidden';
  };

  const closePartyDetail = () => {
    setSelectedParty(null);
    document.body.style.overflow = 'auto';
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 backdrop-blur-md border-b border-gray-100 bg-white/80">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-[0.2em] cursor-pointer" style={{ color: theme.primaryColor }} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            {siteInfo.name}
          </h1>
          <nav className="flex gap-8 md:gap-12 text-[11px] font-bold uppercase tracking-widest text-gray-500">
            <button onClick={() => scrollTo('party-grid')} className="hover:text-black transition-colors">Parties</button>
            <button onClick={() => scrollTo('about-section')} className="hover:text-black transition-colors">About Us</button>
            <button onClick={() => scrollTo('footer-section')} className="hover:text-black transition-colors">Contact</button>
          </nav>
          {/* Sign In 버튼 삭제됨 */}
          <div className="hidden md:block w-[100px]"></div> {/* 레이아웃 균형을 위한 빈 공간 */}
        </div>
      </header>

      {/* 1. Hero Section (메인 문구가 가장 먼저 보임) */}
      <section className="relative pt-64 pb-48 px-6 overflow-hidden">
        <div className="absolute top-20 right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: theme.primaryColor }}></div>
        <div className="absolute bottom-10 left-[-5%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-10" style={{ backgroundColor: theme.accentColor }}></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-8 px-5 py-2 border border-gray-200 rounded-full text-[10px] font-black tracking-[0.4em] uppercase text-gray-400">
            Premium Social Club
          </div>
          <h2 className="text-5xl md:text-8xl font-light mb-10 leading-[1] tracking-tighter text-gray-900 whitespace-pre-line">
            {siteInfo.heroTitle.split('\n').map((line, i) => (
              <span key={i} className="block">
                {line.includes('프리미엄') || line.includes('설렘') ? (
                  <span className="font-bold italic" style={{ color: theme.primaryColor }}>{line}</span>
                ) : line}
              </span>
            ))}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-14 max-w-2xl mx-auto font-light leading-relaxed px-4">
            {siteInfo.heroSubTitle}
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => scrollTo('party-grid')}
              className="px-12 py-5 rounded-full font-bold text-sm tracking-widest uppercase shadow-2xl shadow-blue-900/10 hover:-translate-y-1 transition-all"
              style={{ backgroundColor: theme.primaryColor, color: '#FFFFFF' }}
            >
              파티 리스트 확인하기
            </button>
          </div>
        </div>
      </section>

      {/* 2. Party Grid (모집중인 파티 섹션) */}
      <section id="party-grid" className="py-40 px-6 bg-white border-t border-gray-100">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-6">
            <div>
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-gray-400 mb-4 block">Our Events</span>
              <h3 className="text-5xl font-light text-gray-900">진행 중인 프리미엄 파티</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {parties.map((party) => (
              <div key={party.id} onClick={() => openPartyDetail(party)} className="group cursor-pointer">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-10 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                  <img src={party.imageUrl} alt={party.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-8 left-8">
                    <div className="px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-md bg-white/90 text-black shadow-sm">
                      {party.status}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                      <ChevronRight size={28} className="text-black" />
                    </div>
                  </div>
                </div>

                <div className="px-4">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-2xl font-medium text-gray-900 group-hover:text-blue-700 transition-colors leading-tight flex-1 pr-6">{party.title}</h4>
                    <span className="text-xl font-bold" style={{ color: theme.primaryColor }}>₩{party.price.toLocaleString()}</span>
                  </div>
                  <div className="space-y-4 text-sm text-gray-400 font-light border-t border-gray-50 pt-6">
                    <div className="flex items-center gap-4"><Calendar size={16} strokeWidth={1.5} /><span>{party.date}</span></div>
                    <div className="flex items-center gap-4"><MapPin size={16} strokeWidth={1.5} /><span className="line-clamp-1">{party.location}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Us Section (특별함 어필) */}
      <section id="about-section" className="py-40 bg-gray-50/50 px-6 border-t border-gray-100">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <span className="text-[11px] font-bold tracking-[0.5em] uppercase text-blue-500 mb-4 block">Exclusive Membership</span>
            <h3 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight">{siteInfo.aboutTitle}</h3>
            <p className="text-xl text-gray-500 font-light leading-relaxed whitespace-pre-line italic px-4">
              "{siteInfo.aboutDescription}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {siteInfo.aboutFeatures.map((feature, idx) => (
              <div key={idx} className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-50">
                <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {idx === 0 ? <ShieldCheck size={32} strokeWidth={1.5} /> : idx === 1 ? <Target size={32} strokeWidth={1.5} /> : <Heart size={32} strokeWidth={1.5} />}
                </div>
                <h4 className="text-2xl font-bold mb-6 text-gray-900">{feature.title}</h4>
                <p className="text-gray-400 font-light leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal & Footer */}
      {selectedParty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={closePartyDetail}></div>
          <div className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row max-h-[90vh]">
            <button onClick={closePartyDetail} className="absolute top-8 right-8 z-10 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white md:text-gray-300 md:hover:text-black transition-colors">
              <X size={28} />
            </button>
            <div className="w-full md:w-1/2 h-80 md:h-auto"><img src={selectedParty.imageUrl} className="w-full h-full object-cover" /></div>
            <div className="w-full md:w-1/2 p-10 md:p-16 overflow-y-auto">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-blue-500 mb-6 block">Exclusive Party</span>
              <h3 className="text-4xl font-bold text-gray-900 mb-10 leading-tight">{selectedParty.title}</h3>
              <div className="grid grid-cols-2 gap-10 mb-12 border-b border-gray-50 pb-12">
                <div className="space-y-2"><span className="text-[10px] font-black text-gray-300 uppercase">Date</span><div className="text-sm font-medium">{selectedParty.date}</div></div>
                <div className="space-y-2"><span className="text-[10px] font-black text-gray-300 uppercase">Location</span><div className="text-sm font-medium line-clamp-1">{selectedParty.location}</div></div>
                <div className="space-y-2"><span className="text-[10px] font-black text-gray-300 uppercase">Fee</span><div className="text-2xl font-bold text-blue-900">₩{selectedParty.price.toLocaleString()}</div></div>
                <div className="space-y-2"><span className="text-[10px] font-black text-gray-300 uppercase">Entry</span><div className="text-2xl font-bold text-gray-700">{selectedParty.currentApplicants}/{selectedParty.capacity}</div></div>
              </div>
              <p className="text-gray-500 font-light leading-relaxed mb-12 whitespace-pre-line">{selectedParty.description}</p>
              {selectedParty.status === '모집중' ? (
                <a href={selectedParty.googleFormUrl || '#'} target="_blank" className="w-full py-6 rounded-3xl flex items-center justify-center gap-3 text-white font-bold transition-all hover:brightness-110 shadow-2xl shadow-blue-900/20 active:scale-[0.98]" style={{ backgroundColor: theme.primaryColor }}>참여 신청하기 <ExternalLink size={20} /></a>
              ) : (
                <button disabled className="w-full py-6 rounded-3xl bg-gray-100 text-gray-400 font-bold">마감되었습니다</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Section (Contact 정보 포함) */}
      <footer id="footer-section" className="py-40 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-start gap-24">
            <div className="max-w-sm mx-auto md:mx-0">
              <h1 className="text-4xl font-black tracking-widest mb-10" style={{ color: theme.primaryColor }}>{siteInfo.name}</h1>
              <p className="text-gray-400 font-light leading-relaxed text-lg">새로운 만남의 설렘과 고급스러운 신뢰감이 공존하는 프리미엄 플랫폼</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mx-auto md:mx-0">
              <div id="contact-info">
                <h5 className="text-[11px] font-bold tracking-[0.4em] uppercase text-gray-900 mb-10">Contact Us</h5>
                <div className="flex items-center gap-3 justify-center md:justify-start text-blue-600 font-bold text-xl hover:scale-105 transition-transform">
                   <Mail size={24} />
                   <a href={`mailto:${siteInfo.contactEmail}`}>{siteInfo.contactEmail}</a>
                </div>
                <p className="text-gray-400 font-light mt-4 text-sm">문의 사항은 이메일로 보내주시면 24시간 이내에 답변 드립니다.</p>
              </div>
              <div>
                <h5 className="text-[11px] font-bold tracking-[0.4em] uppercase text-gray-900 mb-10">Follow</h5>
                <div className="flex gap-8 justify-center md:justify-start">
                  <a href="#" className="text-gray-300 hover:text-pink-500 transition-colors"><Instagram size={28} /></a>
                  <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors"><MessageCircle size={28} /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-40 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-300 text-[10px] font-bold tracking-widest uppercase italic">© 2024 {siteInfo.name} Premium. All rights reserved.</p>
            <div className="flex gap-10 text-[10px] font-black text-gray-200 uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-gray-400">Terms</a>
              <a href="#" className="hover:text-gray-400">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientView;

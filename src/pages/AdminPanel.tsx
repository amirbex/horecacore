import React, { useState, useEffect } from 'react';
import { mockDb, ProjectRequest, SiteContent } from '../store/mockDb';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Save, LayoutDashboard, MessageSquare, Settings, Users, LogOut, Plus, Trash2 } from 'lucide-react';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'requests' | 'content'>('requests');
  const [contentTab, setContentTab] = useState<'hero' | 'team' | 'network' | 'settings'>('hero');
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [content, setContent] = useState<SiteContent>({ 
    heroTitle: '', heroDescription: '', industryDescription: '', 
    teamMembers: [], networkPartners: [], 
    settings: { contactPhone: '', contactEmail: '', contactAddress: '' } 
  });
  const [saved, setSaved] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('horeca_admin_auth') !== 'true') {
      navigate('/login');
      return;
    }
    setRequests(mockDb.getRequests());
    setContent(mockDb.getContent());
  }, [navigate]);

  const handleStatusChange = (id: string, status: any) => {
    mockDb.updateRequestStatus(id, status);
    setRequests(mockDb.getRequests());
  };

  const handleLogout = () => {
    localStorage.removeItem('horeca_admin_auth');
    navigate('/login');
  };

  const handleContentSave = (e: React.FormEvent) => {
    e.preventDefault();
    mockDb.updateContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-charcoal-dark text-ivory flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal border-l border-white/5 flex flex-col p-6">
        <h2 className="text-xl font-light text-soft-gold mb-8 flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5" />
          پنل مدیریت
        </h2>
        
        <nav className="flex flex-col gap-2 flex-1">
          <button 
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-right ${activeTab === 'requests' ? 'bg-soft-gold text-charcoal-dark font-medium' : 'hover:bg-white/5 text-ivory/80'}`}
          >
            <MessageSquare className="w-4 h-4" />
            درخواست‌های مشاوره
          </button>
          
          <button 
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-right ${activeTab === 'content' ? 'bg-soft-gold text-charcoal-dark font-medium' : 'hover:bg-white/5 text-ivory/80'}`}
          >
            <Settings className="w-4 h-4" />
            مدیریت محتوای سایت
          </button>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-2">
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 transition-colors py-2">
            <LogOut className="w-4 h-4" />
            خروج از سیستم
          </button>
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-dark hover:text-ivory transition-colors py-2">
            <ChevronRight className="w-4 h-4" />
            بازگشت به سایت
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        
        {activeTab === 'requests' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-light">درخواست‌های مشاوره</h1>
              <span className="bg-charcoal px-3 py-1 rounded-full text-sm border border-white/10">{requests.length} درخواست ثبت شده</span>
            </div>
            
            <div className="grid gap-6">
              {requests.length === 0 ? (
                <div className="text-center py-20 bg-charcoal/30 rounded-xl border border-white/5 text-gray-dark">
                  هیچ درخواستی تا کنون ثبت نشده است.
                </div>
              ) : (
                requests.map(req => (
                  <div key={req.id} className="bg-charcoal border border-white/5 rounded-xl p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-medium text-soft-gold mb-1">{req.name}</h3>
                        <div className="text-sm text-gray-dark flex gap-4">
                          <span dir="ltr">{req.phone}</span>
                          <span>|</span>
                          <span>{new Date(req.createdAt).toLocaleDateString('fa-IR')}</span>
                        </div>
                      </div>
                      
                      <select 
                        value={req.status}
                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                        className={`text-sm px-3 py-1.5 rounded-lg border appearance-none outline-none ${
                           req.status === 'pending' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' :
                           req.status === 'reviewing' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                           req.status === 'in_progress' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' :
                           req.status === 'approved' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                           req.status === 'completed' ? 'bg-gray-500/10 border-gray-500/30 text-gray-400' :
                           'bg-red-500/10 border-red-500/30 text-red-500' // rejected
                        }`}
                      >
                        <option value="pending">در انتظار بررسی</option>
                        <option value="reviewing">در حال بررسی</option>
                        <option value="approved">تایید شده</option>
                        <option value="in_progress">در حال اجرا / قرارداد</option>
                        <option value="completed">پایان یافته</option>
                        <option value="rejected">رد شده</option>
                      </select>
                    </div>
                    
                    <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-sm mt-2">
                       <div>
                         <span className="block text-gray-dark mb-1">نوع پروژه:</span>
                         <span className="text-ivory">{req.projectType === 'cafe' ? 'کافه / پتیسری' : req.projectType === 'restaurant' ? 'رستوران' : req.projectType === 'hotel' ? 'هتل بوتیک' : 'مشاوره'}</span>
                       </div>
                       <div>
                         <span className="block text-gray-dark mb-1">توضیحات:</span>
                         <p className="text-ivory/80">{req.description || 'توضیحاتی ثبت نشده است.'}</p>
                       </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'content' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-light">مدیریت محتوای سایت</h1>
            </div>

            <div className="flex gap-4 mb-6 border-b border-white/5 pb-4">
              <button onClick={() => setContentTab('hero')} className={`px-4 py-2 rounded-lg text-sm transition-colors ${contentTab === 'hero' ? 'bg-soft-gold text-charcoal-dark font-medium' : 'bg-charcoal text-ivory/70 hover:bg-white/5'}`}>بخش‌های متنی (معرفی / صنعت)</button>
              <button onClick={() => setContentTab('team')} className={`px-4 py-2 rounded-lg text-sm transition-colors ${contentTab === 'team' ? 'bg-soft-gold text-charcoal-dark font-medium' : 'bg-charcoal text-ivory/70 hover:bg-white/5'}`}>تیم و اعضا</button>
              <button onClick={() => setContentTab('network')} className={`px-4 py-2 rounded-lg text-sm transition-colors ${contentTab === 'network' ? 'bg-soft-gold text-charcoal-dark font-medium' : 'bg-charcoal text-ivory/70 hover:bg-white/5'}`}>پروژه‌ها و شبکه</button>
              <button onClick={() => setContentTab('settings')} className={`px-4 py-2 rounded-lg text-sm transition-colors ${contentTab === 'settings' ? 'bg-soft-gold text-charcoal-dark font-medium' : 'bg-charcoal text-ivory/70 hover:bg-white/5'}`}>تنظیمات ارتباطی</button>
            </div>
            
            <form onSubmit={handleContentSave} className="bg-charcoal border border-white/5 rounded-xl p-8 flex flex-col gap-8 max-w-3xl">
              
              {contentTab === 'hero' && (
                <>
                  <div className="space-y-6">
                    <h3 className="text-xl text-soft-gold border-b border-white/5 pb-2">اسلاید اول (معرفی)</h3>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-ivory/70">تیتر اصلی</label>
                      <input 
                        type="text" 
                        value={content.heroTitle}
                        onChange={(e) => setContent(c => ({...c, heroTitle: e.target.value}))}
                        className="w-full bg-charcoal-dark border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm focus:outline-none focus:border-soft-gold" 
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-ivory/70">توضیحات زیر تیتر</label>
                      <textarea 
                        rows={4}
                        value={content.heroDescription}
                        onChange={(e) => setContent(c => ({...c, heroDescription: e.target.value}))}
                        className="w-full bg-charcoal-dark border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm focus:outline-none focus:border-soft-gold resize-none" 
                      />
                    </div>
                  </div>

                  <div className="space-y-6 pt-4 border-t border-white/5">
                    <h3 className="text-xl text-soft-gold border-b border-white/5 pb-2">اسلاید دوم (چالش صنعت)</h3>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-ivory/70">متن بخش چالش صنعت</label>
                      <textarea 
                        rows={6}
                        value={content.industryDescription}
                        onChange={(e) => setContent(c => ({...c, industryDescription: e.target.value}))}
                        className="w-full bg-charcoal-dark border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm focus:outline-none focus:border-soft-gold resize-none" 
                      />
                    </div>
                  </div>
                </>
              )}

              {contentTab === 'team' && (
                <div className="space-y-6">
                  <h3 className="text-xl text-soft-gold border-b border-white/5 pb-2">ویرایش تیم و هسته مرکزی</h3>
                  
                  {content.teamMembers?.map((member, index) => (
                    <div key={member.id} className="bg-charcoal-dark p-4 rounded-lg border border-white/10 flex flex-col gap-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-soft-gold font-medium">عضو #{index + 1}</span>
                        <button 
                          type="button"
                          onClick={() => {
                            const newTeam = [...content.teamMembers];
                            newTeam.splice(index, 1);
                            setContent(c => ({ ...c, teamMembers: newTeam }));
                          }}
                          className="text-red-400 hover:bg-red-400/10 p-1.5 rounded transition-colors text-xs"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm text-ivory/70">نام</label>
                          <input 
                            type="text" 
                            value={member.name}
                            onChange={(e) => {
                              const newTeam = [...content.teamMembers];
                              newTeam[index].name = e.target.value;
                              setContent({ ...content, teamMembers: newTeam });
                            }}
                            className="w-full bg-charcoal border border-white/10 rounded-lg px-3 py-2 text-ivory text-sm focus:border-soft-gold" 
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm text-ivory/70">سمت</label>
                          <input 
                            type="text" 
                            value={member.role}
                            onChange={(e) => {
                              const newTeam = [...content.teamMembers];
                              newTeam[index].role = e.target.value;
                              setContent({ ...content, teamMembers: newTeam });
                            }}
                            className="w-full bg-charcoal border border-white/10 rounded-lg px-3 py-2 text-ivory text-sm focus:border-soft-gold" 
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-ivory/70">لینک تصویر (URL)</label>
                        <input 
                          type="text" 
                          dir="ltr"
                          value={member.image}
                          onChange={(e) => {
                            const newTeam = [...content.teamMembers];
                            newTeam[index].image = e.target.value;
                            setContent({ ...content, teamMembers: newTeam });
                          }}
                          className="w-full bg-charcoal border border-white/10 rounded-lg px-3 py-2 text-ivory text-sm focus:border-soft-gold text-left" 
                        />
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="button"
                    onClick={() => {
                      const newTeam = [...content.teamMembers, { id: 'm_' + Date.now(), name: 'عضو جدید', role: '-', tasks: [], image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop' }];
                      setContent({ ...content, teamMembers: newTeam });
                    }}
                    className="w-full border border-dashed border-white/20 text-gray-dark hover:text-white rounded-lg py-3 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    افزودن عضو جدید
                  </button>
                </div>
              )}

              {contentTab === 'network' && (
                <div className="space-y-6">
                  <h3 className="text-xl text-soft-gold border-b border-white/5 pb-2">ویرایش شبکه (پروژه‌ها / تامین‌کنندگان / پارتنرها)</h3>
                  
                  {content.networkPartners?.map((partner, index) => (
                    <div key={partner.id} className="bg-charcoal-dark p-4 rounded-lg border border-white/10 flex flex-col gap-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-soft-gold font-medium">{partner.name || `مورد #${index + 1}`} (ID: {partner.id})</span>
                        <button 
                          type="button"
                          onClick={() => {
                            const newList = [...content.networkPartners];
                            newList.splice(index, 1);
                            setContent(c => ({ ...c, networkPartners: newList }));
                          }}
                          className="text-red-400 hover:bg-red-400/10 p-1.5 rounded transition-colors text-xs"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm text-ivory/70">تایتل / نام</label>
                          <input 
                            type="text" 
                            value={partner.name}
                            onChange={(e) => {
                              const newList = [...content.networkPartners];
                              newList[index].name = e.target.value;
                              setContent({ ...content, networkPartners: newList });
                            }}
                            className="w-full bg-charcoal border border-white/10 rounded-lg px-3 py-2 text-ivory text-sm focus:border-soft-gold" 
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm text-ivory/70">نوع</label>
                          <select
                            value={partner.type || 'project'}
                            onChange={(e) => {
                              const newList = [...content.networkPartners];
                              newList[index].type = e.target.value as any;
                              setContent({ ...content, networkPartners: newList });
                            }}
                            className="w-full bg-charcoal border border-white/10 rounded-lg px-3 py-2 text-ivory text-sm focus:border-soft-gold"
                          >
                            <option value="project">پروژه (Project)</option>
                            <option value="partner">پارتنر (Partner)</option>
                            <option value="supplier">تامین‌کننده (Supplier)</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-ivory/70">توضیحات</label>
                        <textarea 
                          rows={2}
                          value={partner.description}
                          onChange={(e) => {
                            const newList = [...content.networkPartners];
                            newList[index].description = e.target.value;
                            setContent({ ...content, networkPartners: newList });
                          }}
                          className="w-full bg-charcoal border border-white/10 rounded-lg px-3 py-2 text-ivory text-sm focus:border-soft-gold resize-none" 
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-ivory/70">حوزه‌های فعالیت / خدمات (با کاما جدا کنید)</label>
                        <input 
                          type="text" 
                          value={partner.activities?.join('، ') || ''}
                          onChange={(e) => {
                            const newList = [...content.networkPartners];
                            newList[index].activities = e.target.value.split('،').map(s => s.trim()).filter(s => s);
                            setContent({ ...content, networkPartners: newList });
                          }}
                          placeholder="مثال: طراحی منو، مهندسی فروش"
                          className="w-full bg-charcoal border border-white/10 rounded-lg px-3 py-2 text-ivory text-sm focus:border-soft-gold" 
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-ivory/70">ارتباطات (شناسه ID بقیه موارد را با کاما جدا کنید)</label>
                        <input 
                          type="text" 
                          dir="ltr"
                          value={partner.connections?.join(', ') || ''}
                          onChange={(e) => {
                            const newList = [...content.networkPartners];
                            newList[index].connections = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            setContent({ ...content, networkPartners: newList });
                          }}
                          placeholder="p1, sp2"
                          className="w-full bg-charcoal border border-white/10 rounded-lg px-3 py-2 text-ivory text-sm focus:border-soft-gold text-left" 
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm text-ivory/70">لینک وب‌سایت (اختیاری)</label>
                          <input 
                            type="text" 
                            dir="ltr"
                            value={partner.website || ''}
                            onChange={(e) => {
                              const newList = [...content.networkPartners];
                              newList[index].website = e.target.value;
                              setContent({ ...content, networkPartners: newList });
                            }}
                            className="w-full bg-charcoal border border-white/10 rounded-lg px-3 py-2 text-ivory text-sm focus:border-soft-gold text-left" 
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm text-ivory/70">لینک تصویر لوگو/کاور (URL)</label>
                          <input 
                            type="text" 
                            dir="ltr"
                            value={partner.image}
                            onChange={(e) => {
                              const newList = [...content.networkPartners];
                              newList[index].image = e.target.value;
                              setContent({ ...content, networkPartners: newList });
                            }}
                            className="w-full bg-charcoal border border-white/10 rounded-lg px-3 py-2 text-ivory text-sm focus:border-soft-gold text-left" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="button"
                    onClick={() => {
                      const newNetwork = content.networkPartners || [];
                      const newList = [...newNetwork, { id: 'nt_' + Date.now(), type: 'project', name: 'همکار/پروژه جدید', description: 'توضیحات', image: '', activities: [], connections: [] }];
                      setContent({ ...content, networkPartners: newList });
                    }}
                    className="w-full border border-dashed border-white/20 text-gray-dark hover:text-white rounded-lg py-3 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    افزودن مورد به شبکه
                  </button>
                </div>
              )}

              {contentTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="text-xl text-soft-gold border-b border-white/5 pb-2">تنظیمات ارتباطی</h3>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-ivory/70">شماره تماس اصلی</label>
                    <input 
                      type="text" 
                      dir="ltr"
                      value={content.settings?.contactPhone || ''}
                      onChange={(e) => setContent(c => ({...c, settings: { ...c.settings, contactPhone: e.target.value }}))}
                      className="w-full bg-charcoal-dark border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm focus:outline-none focus:border-soft-gold" 
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-ivory/70">ایمیل سازمانی</label>
                    <input 
                      type="email" 
                      dir="ltr"
                      value={content.settings?.contactEmail || ''}
                      onChange={(e) => setContent(c => ({...c, settings: { ...c.settings, contactEmail: e.target.value }}))}
                      className="w-full bg-charcoal-dark border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm focus:outline-none focus:border-soft-gold text-left" 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-ivory/70">آدرس دفتر مرکزی</label>
                    <input 
                      type="text" 
                      value={content.settings?.contactAddress || ''}
                      onChange={(e) => setContent(c => ({...c, settings: { ...c.settings, contactAddress: e.target.value }}))}
                      className="w-full bg-charcoal-dark border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm focus:outline-none focus:border-soft-gold" 
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mt-4 pt-6 border-t border-white/5">
                <button type="submit" className="bg-soft-gold text-charcoal-dark px-6 py-2 rounded-lg font-medium hover:bg-white transition-colors flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  ذخیره تغییرات
                </button>
                {saved && (
                  <span className="text-emerald-400 text-sm flex items-center gap-1">
                    تغییرات با موفقیت ذخیره شد
                  </span>
                )}
              </div>
            </form>
          </motion.div>
        )}

      </main>
    </div>
  );
}

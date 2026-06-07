import { useState, useEffect } from 'react';
import { mockDb, ProjectRequest } from '../store/mockDb';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, ArrowRight, Clock, FileText, CheckCircle2, ChevronLeft } from 'lucide-react';

const STATUS_MAP = {
  'pending': { label: 'در انتظار بررسی', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  'reviewing': { label: 'در حال بررسی توسط کارشناسان', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  'approved': { label: 'تایید اولیه / آماده تماس', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  'in_progress': { label: 'در حال تدوین قرارداد / اجرا', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  'completed': { label: 'پایان یافته', color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20' },
  'rejected': { label: 'رد شده / عدم تمایل', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
};

export default function UserDashboard() {
  const [requests, setRequests] = useState<ProjectRequest[]>([]);

  useEffect(() => {
    setRequests(mockDb.getUserRequests());
  }, []);

  return (
    <div className="min-h-screen bg-charcoal-dark text-ivory">
      {/* Header */}
      <header className="border-b border-white/5 bg-charcoal sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <LayoutDashboard className="w-6 h-6 text-soft-gold" />
             <h1 className="text-xl font-light">داشبورد پیگیری پروژه</h1>
          </div>
          
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-dark hover:text-ivory transition-colors">
            <ArrowRight className="w-4 h-4" />
             بازگشت به سایت اصلی
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-3xl font-light mb-8">درخواست‌های شما</h2>
          
          {requests.length === 0 ? (
             <div className="bg-charcoal border border-white/5 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
               <FileText className="w-16 h-16 text-gray-dark mb-4" />
               <h3 className="text-xl font-medium text-ivory mb-2">هنوز درخواستی ثبت نکرده‌اید</h3>
               <p className="text-gray-dark max-w-md mb-8">شما می‌توانید از طریق فرم مشاوره در سایت اصلی، درخواست بررسی پروژه خود را ثبت کنید تا فرآیند پیگیری آغاز شود.</p>
               <Link to="/" className="bg-soft-gold text-charcoal-dark px-6 py-2.5 rounded-lg font-medium hover:bg-white transition-colors">
                 ثبت درخواست جدید
               </Link>
             </div>
          ) : (
            <div className="grid gap-6">
              {requests.map(req => (
                <div key={req.id} className="bg-charcoal border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-soft-gold/30 transition-colors">
                   
                   {/* Status Badge */}
                   <div className={`absolute top-8 left-8 px-4 py-1.5 rounded-full text-xs font-medium border ${STATUS_MAP[req.status].bg} ${STATUS_MAP[req.status].color} ${STATUS_MAP[req.status].border}`}>
                      {STATUS_MAP[req.status].label}
                   </div>

                   <h3 className="text-2xl font-medium text-soft-gold mb-2">{req.projectType === 'cafe' ? 'کافه / پتیسری' : req.projectType === 'restaurant' ? 'رستوران' : req.projectType === 'hotel' ? 'هتل بوتیک' : 'مشاوره بهبود'}</h3>
                   <div className="flex items-center gap-4 text-sm text-gray-dark mb-6">
                     <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> ثبت شده در: {new Date(req.createdAt).toLocaleDateString('fa-IR')}</span>
                   </div>

                   <div className="bg-charcoal-dark border border-white/5 rounded-xl p-6 mt-4">
                      <h4 className="text-sm font-medium text-ivory/80 mb-2">توضیحات ثبت شده:</h4>
                      <p className="text-sm text-gray-dark leading-relaxed">
                        {req.description || 'توضیحاتی ضمیمه نشده است.'}
                      </p>
                   </div>
                   
                   {/* Visual Timeline (Fake but shows progress) */}
                   <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between px-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${req.status !== 'pending' ? 'bg-soft-gold text-charcoal-dark' : 'bg-charcoal-dark border-2 border-soft-gold text-soft-gold'}`}>
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-ivory/70">ثبت درخواست</span>
                      </div>
                      
                      <div className={`flex-1 h-[2px] mx-4 ${req.status !== 'pending' ? 'bg-soft-gold' : 'bg-white/10'}`}></div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${(req.status === 'reviewing' || req.status === 'approved' || req.status === 'in_progress' || req.status === 'completed') ? 'bg-soft-gold text-charcoal-dark' : 'bg-charcoal-dark border-2 border-white/20 text-gray-dark'}`}>
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-ivory/70">بررسی کارشناسی</span>
                      </div>
                      
                      <div className={`flex-1 h-[2px] mx-4 ${(req.status === 'approved' || req.status === 'in_progress' || req.status === 'completed') ? 'bg-soft-gold' : 'bg-white/10'}`}></div>

                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${(req.status === 'in_progress' || req.status === 'completed') ? 'bg-soft-gold text-charcoal-dark' : 'bg-charcoal-dark border-2 border-white/20 text-gray-dark'}`}>
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-ivory/70">جلسه ارزیابی / عقد قرارداد</span>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

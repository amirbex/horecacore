import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, ArrowRight } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication for demo
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('horeca_admin_auth', 'true');
      navigate('/admin');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)', 
        backgroundSize: '100px 100px',
        backgroundPosition: 'center center'
      }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#131416]/90 border border-white/10 rounded-2xl p-8 backdrop-blur-xl relative z-10 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-soft-gold/10 border border-soft-gold/30 flex items-center justify-center text-soft-gold mb-4">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-light text-ivory">کنترل پنل مدیریت</h1>
          <p className="text-gray-dark text-sm mt-2">جهت ورود اطلاعات را کامل کنید</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-ivory/60 pr-1">نام کاربری</label>
            <input 
              type="text" 
              dir="ltr"
              value={username}
              onChange={(e) => {setUsername(e.target.value); setError(false);}}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm focus:outline-none focus:border-soft-gold transition-colors text-right placeholder:text-left" 
              placeholder="admin"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs text-ivory/60 pr-1">رمز عبور</label>
            <input 
              type="password" 
              dir="ltr"
              value={password}
              onChange={(e) => {setPassword(e.target.value); setError(false);}}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm focus:outline-none focus:border-soft-gold transition-colors text-right placeholder:text-left" 
              placeholder="admin"
            />
          </div>

          {error && <p className="text-red-400 text-xs text-center mt-2">نام کاربری یا رمز عبور اشتباه است.</p>}

          <button 
            type="submit" 
            className="mt-6 w-full bg-soft-gold text-charcoal-dark font-medium py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-ivory transition-colors"
          >
            ورود به سیستم
          </button>
          
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="mt-2 text-gray-dark hover:text-white transition-colors text-xs flex items-center justify-center gap-1"
          >
            <ArrowRight className="w-3 h-3" />
            بازگشت به سایت
          </button>
        </form>
      </motion.div>
    </div>
  );
}

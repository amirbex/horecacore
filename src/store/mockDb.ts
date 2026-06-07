export type ProjectStatus = 'pending' | 'reviewing' | 'approved' | 'in_progress' | 'completed' | 'rejected';

export interface ProjectRequest {
  id: string;
  name: string;
  phone: string;
  projectType: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
  userId: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tasks: string[];
  image: string;
}

export interface NetworkPartner {
  id: string;
  name: string;
  description: string;
  image: string;
  type?: 'project' | 'partner' | 'supplier';
  website?: string;
  activities?: string[];
  connections?: string[];
}

export interface SettingsContent {
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
}

export interface SiteContent {
  heroTitle: string;
  heroDescription: string;
  industryDescription: string;
  teamMembers: TeamMember[];
  networkPartners: NetworkPartner[];
  settings: SettingsContent;
}

const DEFAULT_CONTENT: SiteContent = {
  heroTitle: "طراحی، مهندسی و راه‌اندازی پروژه‌های صنعت خوراک و نوشیدنی",
  heroDescription: "ما در HoReCa Core با ترکیب دانش معماری، مهندسی فرآیند و هنر مهمان‌نوازی، پروژه‌های شما را از یک ایده اولیه به کسب‌وکاری پایدار و سودآور تبدیل می‌کنیم.",
  industryDescription: "صنعت هورکا (هتل، رستوران، کافه) یکی از پویاترین و در عین حال پرریسک‌ترین صنایع خدماتی در جهان است. آمارها نشان می‌دهد درصد بالایی از کسب‌وکارهای این حوزه در سال اول فعالیت خود با چالش‌های جدی مواجه می‌شوند. این چالش‌ها غالباً نه از کیفیت محصول، بلکه از ضعف در طراحی مدل کسب‌وکار، انتخاب نادرست تجهیزات، عدم تناسب منابع انسانی با نیازهای واقعی و فقدان سیستم‌های کنترلی ناشی می‌شود. ورود به این صنعت بدون درک یکپارچه از معماری فضا، فرآیندهای عملیاتی و ساختار مالی، ریسک سرمایه‌گذاری را به شدت افزایش می‌دهد.\n\nاما با طراحی و اجرا صحیح می‌توان شانس موفقیت را افزایش داد و ریسک را کاهش داد.",
  teamMembers: [
    {
      id: "1",
      name: "علی آذری",
      role: "بنیان‌گذار و استراتژیست ارشد",
      tasks: ["رهبری چشم‌انداز و پوزیشنینگ برند", "معماری ارزش پیشنهادی", "مدیریت شرکای کلیدی"],
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
    },
    {
      id: "2",
      name: "امیر زمانی",
      role: "مدیر اجرایی و توسعه عملیات",
      tasks: ["نظارت بر استانداردهای سرویس", "مدیریت میدانی راه‌اندازی", "ارزیابی منابع انسانی"],
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop",
    },
    {
      id: "3",
      name: "سارا محبی",
      role: "مدیر توسعه و مهندسی منو",
      tasks: ["طراحی رسپی‌کارت‌های تخصصی", "کالیبراسیون تجهیزات", "آموزش باریستاها"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    }
  ],
  networkPartners: [],
  settings: {
    contactPhone: "+98 (912) 000 0000",
    contactEmail: "strategy@horecacore.com",
    contactAddress: "تهران - دفتر مرکزی معماری ارزش هورکا"
  }
};

class MockDatabase {
  getRequests(): ProjectRequest[] {
    const data = localStorage.getItem('horeca_requests');
    if (data) return JSON.parse(data);
    return [];
  }

  saveRequest(request: Omit<ProjectRequest, 'id' | 'status' | 'createdAt' | 'userId'>): ProjectRequest {
    const requests = this.getRequests();
    
    let userId = localStorage.getItem('horeca_current_user_id');
    if (!userId) {
       userId = 'user_' + Math.random().toString(36).substr(2, 9);
       localStorage.setItem('horeca_current_user_id', userId);
    }

    const newReq: ProjectRequest = {
      ...request,
      id: 'req_' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      userId
    };
    requests.push(newReq);
    localStorage.setItem('horeca_requests', JSON.stringify(requests));
    return newReq;
  }

  updateRequestStatus(id: string, status: ProjectStatus) {
    const requests = this.getRequests();
    const index = requests.findIndex(r => r.id === id);
    if (index !== -1) {
      requests[index].status = status;
      localStorage.setItem('horeca_requests', JSON.stringify(requests));
    }
  }

  getUserRequests(): ProjectRequest[] {
    const requests = this.getRequests();
    const userId = localStorage.getItem('horeca_current_user_id');
    if (!userId) return [];
    return requests.filter(r => r.userId === userId);
  }

  // --- CMS Content ---
  getContent(): SiteContent {
    const val = localStorage.getItem('horeca_content');
    if (val) {
      const parsed = JSON.parse(val);
      // Merge with default to ensure new schema fields exist
      return { ...DEFAULT_CONTENT, ...parsed };
    }
    return DEFAULT_CONTENT;
  }

  updateContent(content: SiteContent) {
    localStorage.setItem('horeca_content', JSON.stringify(content));
  }
}

export const mockDb = new MockDatabase();

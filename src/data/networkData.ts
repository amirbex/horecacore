// توسعه تایپ برای پشتیبانی از موقعیت پروژه‌ها
export type NetworkEntity = {
  id: string;
  type: 'project' | 'partner' | 'supplier';
  name: string;
  logoInitial: string;
  logoUrl?: string;
  website?: string;
  description: string;
  activities: string[];
  images: string[];
  connections: string[];
  location?: string;  // اضافه شد - فقط برای پروژه‌ها
  address?: string;   // اضافه شد - فقط برای پروژه‌ها
};

// ********** PARTNERS **********
const partners: NetworkEntity[] = [
  {
    id: 'pt1',
    type: 'partner',
    name: 'اتحادیه (Etehadie)',
    logoInitial: 'ET',
    logoUrl: '/pic/etehadie.png',
    website: 'https://etehadie.com',
    description: 'اتحادیه طراحان هویت بصری و برندینگ، متشکل از متخصصین خلاق در حوزه هویت‌سازی مدرن. این مجموعه با رویکردی نوآورانه، به برندها کمک می‌کند تا هویتی ماندگار و تأثیرگذار در ذهن مخاطب ایجاد کنند.',
    activities: ['طراحی هویت بصری', 'برندآیتموت (Brand Identity Motion)', 'استراتژی برندینگ', 'مشاوره هویت‌سازی'],
    images: [
      'https://placehold.co/600x400/1a1a2e/white?text=Etehadie+Sample+1',
      'https://placehold.co/600x400/16213e/white?text=Etehadie+Sample+2'
    ],
    connections: ['p1']
  },
  {
    id: 'pt2',
    type: 'partner',
    name: 'TH (طراح هویت بصری)',
    logoInitial: 'TH',
    logoUrl: '/pic/TH.png',
    website: 'https://th-branding.com',
    description: 'متخصص در خلق هویت بصری ماندگار برای برندهای صنعت کافه، رستوران و هتل. TH با درک عمیق از فضای Horeca، المان‌هایی خلق می‌کند که داستان برند را روایت می‌کنند.',
    activities: ['طراحی لوگو و هویت برند', 'طراحی بسته‌بندی (پکیجینگ)', 'طراحی منو و المانهای بصری', 'راهنمای برند (Brand Guideline)'],
    images: [
      'https://placehold.co/600x400/0f3460/white?text=TH+Sample+1',
      'https://placehold.co/600x400/533483/white?text=TH+Sample+2'
    ],
    connections: ['p2', 'p4']
  },
  {
    id: 'pt3',
    type: 'partner',
    name: 'PBL (مسابقه ساختاریافته جذب استعداد)',
    logoInitial: 'PBL',
    logoUrl: '/pic/pbl.png',
    website: 'https://pbl-competition.com',
    description: 'بستری نوآورانه برای برگزاری رقابت‌های ساختاریافته در حوزه مدیریت، صنعت کافه و استعدادیابی حرفه‌ای. PBL بهترین استعدادها را شناسایی و به برندها معرفی می‌کند.',
    activities: ['استعدادیابی تخصصی در صنعت Horeca', 'طراحی و اجرای رویدادهای ارزیابی', 'جذب نیروهای خلاق و مستعد', 'مشاوره منابع انسانی'],
    images: [
      'https://placehold.co/600x400/e94560/white?text=PBL+Sample+1',
      'https://placehold.co/600x400/ff6b6b/white?text=PBL+Sample+2'
    ],
    connections: ['p3', 'p5']
  },
  {
    id: 'pt4',
    type: 'partner',
    name: 'Flair House',
    logoInitial: 'FH',
    logoUrl: '/pic/FLAIR HOUSE LOGO-01.png',
    website: 'https://flairhouse.ir',
    description: 'آکادمی و مرکز تخصصی آموزش نوشیدنی‌های سرد، مدرن و مولکولی برای کافه‌های حرفه‌ای. Flair House هنر ارائه نوشیدنی‌های خاص را با تکنیک‌های روز دنیا آموزش می‌دهد.',
    activities: ['آموزش حرفه‌ای نوشیدنی سرد', 'طراحی منوی تخصصی Cold Drinks', 'مشاوره تخصصی به کافه‌ها', 'برگزاری ورکشاپ‌های فصلی'],
    images: [
      'https://placehold.co/600x400/00b4d8/white?text=Flair+House+Sample+1',
      'https://placehold.co/600x400/90e0ef/white?text=Flair+House+Sample+2'
    ],
    connections: ['p2']
  }
];

// ********** SUPPLIERS **********
const suppliers: NetworkEntity[] = [
  {
    id: 'sp1',
    type: 'supplier',
    name: 'لیماز (Limaz)',
    logoInitial: 'LM',
    logoUrl: '/pic/limaz.png',
    website: 'https://limaz.com',
    description: 'تامین‌کننده تخصصی ظروف، لیوان‌های دبل وال، استینلس استیل و اکسسوری مدرن کافی‌شاپ. لیماز با ارائه محصولات باکیفیت، تجربه نوشیدن را برای مشتریان شما لوکس‌تر می‌کند.',
    activities: ['تامین لیوان‌های حرارتی و سرد', 'ظروف سرو تخصصی قهوه', 'اکسسوری بار و کافی‌شاپ', 'محصولات سفارشی با برند مشتری'],
    images: [
      'https://placehold.co/600x400/2b9348/white?text=Limaz+Sample+1',
      'https://placehold.co/600x400/55a630/white?text=Limaz+Sample+2'
    ],
    connections: ['p1', 'p2']
  },
  {
    id: 'sp2',
    type: 'supplier',
    name: 'ریوان (Rivan)',
    logoInitial: 'RV',
    logoUrl: '/pic/rivan.png',
    website: 'https://rivan.ir',
    description: 'سازنده و تولیدکننده دستگاه‌های سوداساز، گازدارکننده آبمیوه و سیستم‌های نوشیدنی گازدار صنعتی. ریوان تجربه نوشیدنی‌های گازدار حرفه‌ای را برای کافه‌ها ممکن می‌سازد.',
    activities: ['تولید سوداساز صنعتی و نیمه‌صنعتی', 'گازدارکننده آبمیوه و نوشیدنی', 'سیستم‌های تزریق CO2', 'مشاوره و نصب'],
    images: [
      'https://placehold.co/600x400/0077b6/white?text=Rivan+Sample+1',
      'https://placehold.co/600x400/00b4d8/white?text=Rivan+Sample+2'
    ],
    connections: ['p2', 'p4']
  },
  {
    id: 'sp3',
    type: 'supplier',
    name: 'Julius Meinl',
    logoInitial: 'JM',
    logoUrl: '/pic/Julius_Meinl.png',
    website: 'https://juliusmeinl.com',
    description: 'تامین‌کننده بین‌المللی قهوه‌های سوپریوم، با بیش از ۱۵۰ سال سابقه درخشان اروپایی. Julius Meinl نماد کیفیت و اصالت در دنیای قهوه است.',
    activities: ['تامین قهوه سوپریوم درجه یک', 'تجهیزات حرفه‌ای قهوه', 'برگزاری دوره‌های آموزش باریستا', 'مشاوره راه‌اندازی کافی‌شاپ'],
    images: [
      'https://placehold.co/600x400/6f1d1b/white?text=Julius+Meinl+Sample+1',
      'https://placehold.co/600x400/99582a/white?text=Julius+Meinl+Sample+2'
    ],
    connections: ['p2', 'p3']
  },
  {
    id: 'sp4',
    type: 'supplier',
    name: 'TeaStudio',
    logoInitial: 'TS',
    logoUrl: '/pic/teastudio.png',
    website: 'https://teastudio.com',
    description: 'تامین‌کننده چای‌های ارگانیک، دمنوش‌های لوکس و ترکیبات اختصاصی برای کافه‌های سطح بالا. TeaStudio هنر نوشیدن چای را به سطحی جدید ارتقا می‌دهد.',
    activities: ['تامین چای ارگانیک و طبیعی', 'طراحی دمنوش اختصاصی برای برندها', 'بلندینگ تخصصی چای', 'بسته‌بندی سفارشی'],
    images: [
      'https://placehold.co/600x400/2d6a4f/white?text=TeaStudio+Sample+1',
      'https://placehold.co/600x400/40916c/white?text=TeaStudio+Sample+2'
    ],
    connections: ['p4']
  },
  {
    id: 'sp5',
    type: 'supplier',
    name: '30ml',
    logoInitial: '30',
    logoUrl: '/pic/30ml.png',
    website: 'https://30mlcafe.com',
    description: 'آکادمی و فروشگاه تخصصی قهوه، ارائه‌دهنده ابزارآلات حرفه‌ای و برگزارکننده دوره‌های تخصصی باریستا. 30ml پل ارتباطی بین علاقه‌مندان و حرفه‌ای‌های دنیای قهوه است.',
    activities: ['برگزاری دوره‌های حرفه‌ای باریستا', 'فروش تخصصی تجهیزات قهوه', 'مشاوره راه‌اندازی کافی‌شاپ', 'خدمات پس از فروش تخصصی'],
    images: [
      'https://placehold.co/600x400/black/white?text=30ml+Sample+1',
      'https://placehold.co/600x400/333333/white?text=30ml+Sample+2'
    ],
    connections: ['p2', 'p5']
  },
  {
    id: 'sp6',
    type: 'supplier',
    name: 'پرایم (Prime)',
    logoInitial: 'PR',
    logoUrl: '/pic/پرايم.png',
    website: 'https://prime-coffee.com',
    description: 'واردکننده و تامین‌کننده تجهیزات تخصصی صنعت قهوه شامل دستگاه‌های حرفه‌ای، آسیاب و لوازم جانبی. پرایم کیفیت جهانی را به کافه‌های ایران می‌آورد.',
    activities: ['واردات تجهیزات تخصصی قهوه', 'تامین قطعات اورجینال', 'ارائه خدمات پس از فروش و گارانتی', 'مشاوره فنی'],
    images: [
      'https://placehold.co/600x400/c1121f/white?text=Prime+Sample+1',
      'https://placehold.co/600x400/780000/white?text=Prime+Sample+2'
    ],
    connections: ['p1', 'p3']
  },
  {
    id: 'sp7',
    type: 'supplier',
    name: 'فائما (Faema)',
    logoInitial: 'FM',
    logoUrl: '/pic/فائما.png',
    website: 'https://faema.com',
    description: 'تولیدکننده افسانه‌ای دستگاه‌های اسپرسوساز صنعتی، نماد کیفیت ایتالیایی در کافی‌شاپ‌های حرفه‌ای. فائما از ۱۹۴۵ تا امروز، استانداردهای اسپرسو را تعریف کرده است.',
    activities: ['تامین اسپرسوساز صنعتی و نیمه‌صنعتی', 'ارائه سرویس و نگهداری دوره‌ای', 'کالیبراسیون حرفه‌ای', 'تامین قطعات اصلی'],
    images: [
      'https://placehold.co/600x400/8b0000/white?text=Faema+Sample+1',
      'https://placehold.co/600x400/a52a2a/white?text=Faema+Sample+2'
    ],
    connections: ['p2']
  },
  {
    id: 'sp8',
    type: 'supplier',
    name: 'مازر (Mazzer)',
    logoInitial: 'MZ',
    logoUrl: '/pic/mazzer.png',
    website: 'https://mazzer.com',
    description: 'تولیدکننده حرفه‌ترین آسیاب‌های قهوه با دقت میکرومتری و ماندگاری بالا. مازر انتخاب شماره یک حرفه‌ای‌های قهوه در سراسر جهان است.',
    activities: ['تامین آسیاب صنعتی و حرفه‌ای', 'ارائه آسیاب دوزینگ و دوزرلس', 'تامین قطعات تخصصی', 'کالیبراسیون و تنظیم'],
    images: [
      'https://placehold.co/600x400/222222/white?text=Mazzer+Sample+1',
      'https://placehold.co/600x400/444444/white?text=Mazzer+Sample+2'
    ],
    connections: ['p2', 'p5']
  },
  {
    id: 'sp9',
    type: 'supplier',
    name: 'کالیورسان (Calorissan)',
    logoInitial: 'CL',
    logoUrl: '/pic/kia.png',
    website: 'https://calorissan.com',
    description: 'تامین‌کننده تخصصی مواد مصرفی نظافت، ضدعفونی و نگهداری تجهیزات قهوه و کافی‌شاپ. کالیورسان بهداشت حرفه‌ای را برای کسب‌وکار شما تضمین می‌کند.',
    activities: ['تامین مواد شوینده تخصصی صنعت قهوه', 'ضدعفونی‌کننده‌های مخازن و تجهیزات', 'محصولات مراقبت و نگهداری', 'مشاوره بهداشتی'],
    images: [
      'https://placehold.co/600x400/1b4332/white?text=Calorissan+Sample+1',
      'https://placehold.co/600x400/2d6a4f/white?text=Calorissan+Sample+2'
    ],
    connections: ['p4']
  },
  {
    id: 'sp10',
    type: 'supplier',
    name: 'بارهس (Barehs)',
    logoInitial: 'BR',
    logoUrl: '/pic/بارهس.png',
    website: 'https://barehs.com',
    description: 'تولیدکننده سیروپ‌های طبیعی، سس‌های اختصاصی و طعم‌دهنده‌های مخصوص قهوه و نوشیدنی. بارهس طعم‌های ماندگار و طبیعی را به منوی شما اضافه می‌کند.',
    activities: ['تولید سیروپ تخصصی قهوه', 'طعم‌دهنده‌های طبیعی و ارگانیک', 'طراحی محصولات فصلی و ویژه', 'بسته‌بندی اختصاصی'],
    images: [
      'https://placehold.co/600x400/d4a373/white?text=Barehs+Sample+1',
      'https://placehold.co/600x400/faedcd/white?text=Barehs+Sample+2'
    ],
    connections: ['p1', 'p3']
  },
  {
    id: 'sp11',
    type: 'supplier',
    name: 'چای کار (Chaykar)',
    logoInitial: 'CK',
    logoUrl: '/pic/چای کار.png',
    website: 'https://chaykar.com',
    description: 'تامین‌کننده چای سیاه ممتاز، چای سبز و دمنوش‌های سنتی و مدرن. چای‌کار با تکیه بر دانش بومی و استانداردهای جهانی، بهترین برگ‌های چای را ارائه می‌دهد.',
    activities: ['تامین چای سیاه ممتاز درجه یک', 'ارائه چای سبز و سفید', 'طراحی دمنوش سنتی و مدرن', 'بسته‌بندی اختصاصی برای برندها'],
    images: [
      'https://placehold.co/600x400/283618/white?text=Chaykar+Sample+1',
      'https://placehold.co/600x400/606c38/white?text=Chaykar+Sample+2'
    ],
    connections: ['p4']
  },
  {
    id: 'sp12',
    type: 'supplier',
    name: 'کیا گستر (Kia Gostar)',
    logoInitial: 'KG',
    logoUrl: '/pic/kia.png',
    website: 'https://kiagostar.com',
    description: 'تامین‌کننده تخصصی ملزومات، تجهیزات و لوازم مصرفی کافه، رستوران و هتل. کیا گستر پشتیبان کامل نیازهای روزانه کسب‌وکار شماست.',
    activities: ['تامین ملزومات کامل کافی‌شاپ', 'ارائه تجهیزات باریستا حرفه‌ای', 'تامین لوازم مصرفی روزانه', 'مشاوره و تامین یکپارچه'],
    images: [
      'https://placehold.co/600x400/003049/white?text=Kia+Gostar+Sample+1',
      'https://placehold.co/600x400/d62828/white?text=Kia+Gostar+Sample+2'
    ],
    connections: ['p1', 'p2', 'p5']
  }
];

// ********** PROJECTS **********
const projects: NetworkEntity[] = [
  {
    id: 'p1',
    type: 'project',
    name: 'زئوس لانژ (Zeus Lounge)',
    logoInitial: 'ZL',
    logoUrl: '/pic/Zeus Lounge.png',
    website: 'https://zeuslounge.com',
    location: 'تهران، سعادت‌آباد',
    address: 'تهران، سعادت‌آباد، بلوار دریا، پلاک ۱۸، طبقه ۵',
    description: 'لانژ مدرن و لاکچری در قلب تهران، با منوی تخصصی شامل کوکتل‌های مولکولی، قهوه‌های خاص و فضایی الهام گرفته از معماری یونانی. زئوس لانژ مقصدی برای شب‌های به‌یادماندنی.',
    activities: ['طراحی منوی تخصصی کوکتل و قهوه', 'ارتقاء تشریفات و استانداردهای سرویس', 'مدیریت اجرایی و پشتیبانی عملیاتی', 'آموزش تیم حرفه‌ای'],
    images: [
      'https://placehold.co/600x400/1a1a2e/white?text=Zeus+Lounge+Sample+1',
      'https://placehold.co/600x400/16213e/white?text=Zeus+Lounge+Sample+2',
      'https://placehold.co/600x400/0f3460/white?text=Zeus+Lounge+Sample+3'
    ],
    connections: ['pt1', 'sp1']
  },
  {
    id: 'p2',
    type: 'project',
    name: 'تیکانو (Tikano)',
    logoInitial: 'TK',
    logoUrl: '/pic/تیکانو.png',
    website: 'https://tikano.ir',
    location: 'شیراز، حد فاصل دروازه قرآن تا آرامگاه حافظ',
    address: 'شیراز، بلوار کریمخان زند، نبش خیابان احمدی، پلاک ۳۲',
    description: 'کافه رستوران مدرن در شیراز، تلفیقی بی‌نظیر از معماری سنتی شیراز با سرویس قهوه تخصصی و منوی تلفیقی. تیکانو تجربه‌ای از اصالت و مدرنیته را همزمان ارائه می‌دهد.',
    activities: ['طراحی هویت بصری متناسب با فرهنگ شیراز', 'آموزش تخصصی تیم قهوه و سرویس', 'راه‌اندازی و بهینه‌سازی منو', 'مشاوره تجهیزات'],
    images: [
      'https://placehold.co/600x400/2a9d8f/white?text=Tikano+Sample+1',
      'https://placehold.co/600x400/264653/white?text=Tikano+Sample+2'
    ],
    connections: ['pt2', 'sp2', 'sp3']
  },
  {
    id: 'p3',
    type: 'project',
    name: 'فایو لانژ (Five Lounge)',
    logoInitial: 'FL',
    logoUrl: '/pic/five lounge.png',
    website: 'https://fivelounge.com',
    location: 'تهران، شمال تهران، خیابان ولیعصر',
    address: 'تهران، خیابان ولیعصر، بالاتر از نیایش، برج ۵، طبقه ۱۲',
    description: 'لانژ مدرن در شمال تهران، فضایی کاملاً VIP و اختصاصی برای برگزاری رویدادهای خصوصی، جلسات بیزینس و شب‌های خاص. فایو لانژ لوکس‌ترین تجربه را ارائه می‌دهد.',
    activities: ['مدیریت و بهینه‌سازی فضای لانژ', 'طراحی سرویس ویژه VIP', 'برندینگ و هویت‌سازی مدرن', 'برنامه‌ریزی رویدادهای اختصاصی'],
    images: [
      'https://placehold.co/600x400/e9c46a/white?text=Five+Lounge+Sample+1',
      'https://placehold.co/600x400/f4a261/white?text=Five+Lounge+Sample+2'
    ],
    connections: ['pt3', 'sp3']
  },
  {
    id: 'p4',
    type: 'project',
    name: 'ویسپرد (Whisperd)',
    logoInitial: 'WH',
    logoUrl: '/pic/whisperd.png',
    website: 'https://whisperd.cafe',
    location: 'تهران، جردن',
    address: 'تهران، خیابان جردن، کوچه یکم، پلاک ۷',
    description: 'کافی‌شاپ مفهومی با تمرکز بر محیط آرام، دکور مینیمال و ارائه قهوه‌های تک‌خاستگاه از برترین رستری‌های جهان. ویسپرد پناهگاهی برای عاشقان واقعی قهوه است.',
    activities: ['طراحی داخلی مینیمال و آرامش‌بخش', 'طراحی منوی قهوه تخصصی تک‌خاستگاه', 'آموزش حرفه‌ای باریستا', 'مشاوره تجهیزات تخصصی'],
    images: [
      'https://placehold.co/600x400/e76f51/white?text=Whisperd+Sample+1',
      'https://placehold.co/600x400/f4a261/white?text=Whisperd+Sample+2'
    ],
    connections: ['pt2', 'sp4']
  },
  {
    id: 'p5',
    type: 'project',
    name: 'لیویا (Livia)',
    logoInitial: 'LV',
    logoUrl: '/pic/Livia.png',
    website: 'https://livia.gallery',
    location: 'تهران، مرکز، خیابان جمهوری',
    address: 'تهران، خیابان جمهوری، تقاطع خیابان میرزای شیرازی، پلاک ۴۵',
    description: 'کافه گالری هنری در مرکز تهران، تلفیقی بی‌نظیر از هنرهای تجسمی، موسیقی زنده و تجربه قهوه تخصصی. لیویا جایی که هنر و قهوه در هم می‌آمیزند.',
    activities: ['طراحی فضای گالری-کافه', 'برنامه‌ریزی رویدادهای هنری', 'طراحی منوی مدرن و خلاقانه', 'مدیریت فرهنگی فضا'],
    images: [
      'https://placehold.co/600x400/9c89b8/white?text=Livia+Sample+1',
      'https://placehold.co/600x400/b8a9c9/white?text=Livia+Sample+2'
    ],
    connections: ['pt3', 'sp5']
  },
  {
    id: 'p6',
    type: 'project',
    name: 'نغمه کافه (Naghme Cafe)',
    logoInitial: 'NC',
    logoUrl: '/pic/Naghme cafe.png',
    website: 'https://naghmehcafe.com',
    location: 'تهران، تجریش',
    address: 'تهران، خیابان تجریش، بازارچه شمس‌العماره، پلاک ۱',
    description: 'کافه سنتی-مدرن با تمرکز بر موسیقی زنده ایرانی، قهوه‌های تخصصی و فضایی صمیمی. نغمه کافه تلفیقی از نوستالژی و مدرنیته است.',
    activities: ['بازطراحی و بهینه‌سازی منو', 'برندینگ و هویت‌سازی بصری', 'بهبود استانداردهای سرویس و تشریفات', 'مدیریت اجرایی'],
    images: [
      'https://placehold.co/600x400/8ecae6/white?text=Naghme+Cafe+Sample+1',
      'https://placehold.co/600x400/219ebc/white?text=Naghme+Cafe+Sample+2'
    ],
    connections: ['pt4', 'sp1']
  },
  {
    id: 'p7',
    type: 'project',
    name: 'ایوان بوتیک (Eyvan Boutique)',
    logoInitial: 'EB',
    logoUrl: '/pic/Eyvan boutique.png',
    website: 'https://eyvanboutique.ir',
    location: 'کاشان، بافت تاریخی',
    address: 'کاشان، محله تاریخی سرباغ، کوچه نراقی‌ها، پلاک ۲۳',
    description: 'پروژه بوتیک کافه در قلب بافت تاریخی کاشان، با معماری سنتی و تخصص در قهوه‌های خاص. ایوان بوتیک تجربه‌ای از اصالت ایرانی را با کیفیت جهانی ترکیب کرده است.',
    activities: ['طراحی هویت متناسب با معماری سنتی', 'مدیریت کامل پروژه راه‌اندازی', 'آموزش تیم محلی و بومی', 'مشاوره تامین تجهیزات'],
    images: [
      'https://placehold.co/600x400/cf9e6f/white?text=Eyvan+Boutique+Sample+1',
      'https://placehold.co/600x400/e8b86b/white?text=Eyvan+Boutique+Sample+2'
    ],
    connections: ['pt1', 'sp6']
  },
  {
    id: 'p8',
    type: 'project',
    name: 'کافه بیکری نونوبا (Nonoba)',
    logoInitial: 'NN',
    logoUrl: '/pic/nonoba.png',
    website: 'https://nonoba.ir',
    location: 'اراک، خیابان قائم',
    address: 'اراک، خیابان قائم، مجتمع تجاری رز، طبقه همکف',
    description: 'کافه و نانوایی مدرن در اراک، ترکیبی استثنایی از شیرینی‌های فرانسوی، نان‌های تازه و قهوه تخصصی. نونوبا اولین کافه بیکری تخصصی اراک است.',
    activities: ['راه‌اندازی کامل کافه بیکری', 'طراحی منوی شیرینی و نان', 'تجهیز آشپزخانه و نانوایی', 'آموزش تیم'],
    images: [
      'https://placehold.co/600x400/fabc3f/white?text=Nonoba+Sample+1',
      'https://placehold.co/600x400/ffb703/white?text=Nonoba+Sample+2'
    ],
    connections: ['pt2', 'sp7']
  },
  {
    id: 'p9',
    type: 'project',
    name: 'وریا کافه (Voria Cafe)',
    logoInitial: 'VC',
    logoUrl: '/pic/voria cafe.png',
    website: 'https://voriacafe.com',
    location: 'تهران، الهیه',
    address: 'تهران، خیابان الهیه، خیابان ۲۵، پلاک ۸',
    description: 'کافه مدرن در تهران با طراحی مینیمال، نورپردازی حرفه‌ای و تمرکز ویژه بر قهوه‌های دست‌ساز و روش‌های آلترنیتیو.',
    activities: ['تدوین استراتژی تخصصی قهوه', 'آموزش حرفه‌ای تیم کافه', 'طراحی منوی خلاقانه', 'انتخاب و تامین تجهیزات'],
    images: [
      'https://placehold.co/600x400/2b2d42/white?text=Voria+Cafe+Sample+1',
      'https://placehold.co/600x400/8d99ae/white?text=Voria+Cafe+Sample+2'
    ],
    connections: ['pt4', 'sp8']
  },
  {
    id: 'p10',
    type: 'project',
    name: 'Tehran Eyes',
    logoInitial: 'TE',
    logoUrl: '/pic/tehran eyes.png',
    website: 'https://tehraneyes.com',
    location: 'تهران، برج‌های شمالی',
    address: 'تهران، بزرگراه چمران، برج‌های سیمرغ، طبقه ۳۰',
    description: 'لانژ دیدبانی در بالای برج‌های شمال تهران، با چشم‌اندازی ۳۶۰ درجه به شهر، سرویس کوکتل‌های خاص و قهوه‌های سوپریوم. تهران آی‌ز تجربه‌ای فراموش‌نشدنی ارائه می‌دهد.',
    activities: ['طراحی سرویس لوکس و ویژه', 'منوی اختصاصی کوکتل و قهوه', 'ارتقاء استانداردهای تشریفات', 'مدیریت اجرایی'],
    images: [
      'https://placehold.co/600x400/0d1b2a/white?text=Tehran+Eyes+Sample+1',
      'https://placehold.co/600x400/1b263b/white?text=Tehran+Eyes+Sample+2'
    ],
    connections: ['pt1', 'sp9']
  },
  {
    id: 'p11',
    type: 'project',
    name: 'هیلز (Hills)',
    logoInitial: 'HL',
    logoUrl: '/pic/Hills.png',
    website: 'https://hills.cafe',
    location: 'تهران، سعادت‌آباد',
    address: 'تهران، سعادت‌آباد، بلوار فرحزادی، پلاک ۵۴',
    description: 'کافه رستوران مدرن در شمال تهران با فضای باز وسیع، منوی بین‌المللی و تمرکز بر قهوه تخصصی و صبحانه‌های لوکس.',
    activities: ['طراحی و بهینه‌سازی فضای باز', 'طراحی منوی فصلی و بین‌المللی', 'مدیریت اجرایی و عملیاتی', 'آموزش تیم حرفه‌ای'],
    images: [
      'https://placehold.co/600x400/52796f/white?text=Hills+Sample+1',
      'https://placehold.co/600x400/84a98c/white?text=Hills+Sample+2'
    ],
    connections: ['pt3', 'sp10']
  },
  {
    id: 'p12',
    type: 'project',
    name: 'بن کافه (Boon Cafe)',
    logoInitial: 'BN',
    logoUrl: '/pic/boon cafe.png',
    website: 'https://booncafe.com',
    location: 'تهران، ونک',
    address: 'تهران، خیابان ونک، کوچه نهم، پلاک ۲۱',
    description: 'کافه تخصصی صبحانه و برانچ در تهران، با تمرکز بر قهوه تخصصی، صبحانه‌های سالم و منوی متنوع. بن کافه انتخاب اول اهالی صبحانه است.',
    activities: ['طراحی منوی تخصصی برانچ', 'آموزش تیم سرویس و قهوه', 'تجهیز کامل کافه', 'مشاوره برندینگ'],
    images: [
      'https://placehold.co/600x400/a7c957/white?text=Boon+Cafe+Sample+1',
      'https://placehold.co/600x400/6a994e/white?text=Boon+Cafe+Sample+2'
    ],
    connections: ['pt2', 'sp11']
  },
  {
    id: 'p13',
    type: 'project',
    name: 'چاپلین کلاب (Chaplin Club)',
    logoInitial: 'CC',
    logoUrl: '/pic/chaplin club.png',
    website: 'https://chaplinclub.ir',
    location: 'کیش، منطقه گردشگری',
    address: 'کیش، میدان مرجان، پاساژ تجاری، طبقه ۳',
    description: 'کافه کلاب مدرن در جزیره کیش، فضایی لوکس با رویدادهای زنده، موسیقی و منوی خاص. چاپلین کلاب مقصد شماره یک شب‌های کیش است.',
    activities: ['برندینگ لوکس و مدرن', 'طراحی ساختار سرویس ویژه', 'مدیریت و برنامه‌ریزی رویدادها', 'آموزش تیم حرفه‌ای'],
    images: [
      'https://placehold.co/600x400/212529/white?text=Chaplin+Club+Sample+1',
      'https://placehold.co/600x400/343a40/white?text=Chaplin+Club+Sample+2'
    ],
    connections: ['pt4', 'sp12']
  },
  {
    id: 'p14',
    type: 'project',
    name: 'ویو لانژ (View Lounge)',
    logoInitial: 'VL',
    logoUrl: '/pic/view lounge.png',
    website: 'https://viewlounge.ir',
    location: 'تهران، پارک وی',
    address: 'تهران، خیابان پارک وی، برج پارک ویو، طبقه ۲۰',
    description: 'لانژ مدرن با نمای شهری فوق‌العاده، تخصص ویژه در قهوه‌های تخصصی و کوکتل‌های مولکولی. ویو لانژ جایی برای بهترین لحظات شماست.',
    activities: ['طراحی منوی تخصصی', 'آموزش استانداردهای تشریفات', 'مدیریت اجرایی و عملیاتی', 'مشاوره تجهیزات'],
    images: [
      'https://placehold.co/600x400/3b8ea5/white?text=View+Lounge+Sample+1',
      'https://placehold.co/600x400/2c6e7e/white?text=View+Lounge+Sample+2'
    ],
    connections: ['pt1', 'sp2']
  },
  {
    id: 'p15',
    type: 'project',
    name: 'بستنی شاد (Shad Ice Cream)',
    logoInitial: 'SI',
    logoUrl: '/pic/shad ice cream.png',
    website: 'https://shadicecream.com',
    location: 'تهران، فرمانیه',
    address: 'تهران، خیابان فرمانیه، بلوار کامرانیه، پلاک ۵۶',
    description: 'برند تخصصی بستنی و آیس‌کرم با تکنولوژی مدرن ایتالیایی و طعم‌های طبیعی. بستنی شاد طعم شادی را به روزهای شما می‌آورد.',
    activities: ['برندینگ و طراحی هویت مدرن', 'طراحی بسته‌بندی جذاب و لوکس', 'توسعه و بهینه‌سازی منو', 'مشاوره تولید'],
    images: [
      'https://placehold.co/600x400/f4e285/white?text=Shad+Ice+Cream+Sample+1',
      'https://placehold.co/600x400/f4d58c/white?text=Shad+Ice+Cream+Sample+2'
    ],
    connections: ['pt3', 'sp5']
  }
];

export const networkData: NetworkEntity[] = [
  ...partners,
  ...suppliers,
  ...projects
];
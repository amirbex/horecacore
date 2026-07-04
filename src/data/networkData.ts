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

// ========== تابع کمکی برای تصحیح مسیر تصاویر ==========
const getImagePath = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // @ts-ignore - Vite environment variable
  const baseUrl = import.meta.env?.BASE_URL || '/';
  return `${baseUrl}${cleanPath}`;
};
// ======================================================

// ********** PARTNERS **********
const partners: NetworkEntity[] = [
  {
    id: 'pt1',
    type: 'partner',
    name: 'اتحادیه (Etehadie)',
    logoInitial: 'ET',
    logoUrl: getImagePath('/pic/etehadie.png'),
    website: 'https://etehadie.com',
    description: 'اتحادیه طراحان هویت بصری و برندینگ، متشکل از متخصصین خلاق در حوزه هویت‌سازی مدرن. این مجموعه با رویکردی نوآورانه، به برندها کمک می‌کند تا هویتی ماندگار و تأثیرگذار در ذهن مخاطب ایجاد کنند.',
    activities: ['طراحی هویت بصری', 'برندآیتموت (Brand Identity Motion)', 'استراتژی برندینگ', 'مشاوره هویت‌سازی'],
    images: [
      'https://placehold.co/600x400/1a1a2e/white?text=Etehadie+Sample+1',
      'https://placehold.co/600x400/16213e/white?text=Etehadie+Sample+2'
    ],
    connections: ['p1', 'p7']
  },
  {
    id: 'pt2',
    type: 'partner',
    name: 'TH (طراح هویت بصری)',
    logoInitial: 'TH',
    logoUrl: getImagePath('/pic/THm.png'),
    website: 'https://th-branding.com',
    description: 'متخصص در خلق هویت بصری ماندگار برای برندهای صنعت کافه، رستوران و هتل. TH با درک عمیق از فضای Horeca، المان‌هایی خلق می‌کند که داستان برند را روایت می‌کنند.',
    activities: ['طراحی لوگو و هویت برند', 'طراحی بسته‌بندی (پکیجینگ)', 'طراحی منو و المانهای بصری', 'راهنمای برند (Brand Guideline)'],
    images: [
      'https://placehold.co/600x400/0f3460/white?text=TH+Sample+1',
      'https://placehold.co/600x400/533483/white?text=TH+Sample+2'
    ],
    connections: ['p2', 'p4', 'p8', 'p12']
  },
  {
    id: 'pt3',
    type: 'partner',
    name: 'PBL (مسابقه ساختاریافته جذب استعداد)',
    logoInitial: 'PBL',
    logoUrl: getImagePath('/pic/pbl.png'),
    website: 'https://pbl-competition.com',
    description: 'بستری نوآورانه برای برگزاری رقابت‌های ساختاریافته در حوزه مدیریت، صنعت کافه و استعدادیابی حرفه‌ای. PBL بهترین استعدادها را شناسایی و به برندها معرفی می‌کند.',
    activities: ['استعدادیابی تخصصی در صنعت Horeca', 'طراحی و اجرای رویدادهای ارزیابی', 'جذب نیروهای خلاق و مستعد', 'مشاوره منابع انسانی'],
    images: [
      'https://placehold.co/600x400/e94560/white?text=PBL+Sample+1',
      'https://placehold.co/600x400/ff6b6b/white?text=PBL+Sample+2'
    ],
    connections: ['p3', 'p5', 'p11', 'p15']
  },
  {
    id: 'pt4',
    type: 'partner',
    name: 'Flair House',
    logoInitial: 'FH',
    logoUrl: getImagePath('/pic/FLAIR HOUSE LOGO-01.png'),
    website: 'https://flairhouse.ir',
    description: 'آکادمی و مرکز تخصصی آموزش نوشیدنی‌های سرد، مدرن و مولکولی برای کافه‌های حرفه‌ای. Flair House هنر ارائه نوشیدنی‌های خاص را با تکنیک‌های روز دنیا آموزش می‌دهد.',
    activities: ['آموزش حرفه‌ای نوشیدنی سرد', 'طراحی منوی تخصصی Cold Drinks', 'مشاوره تخصصی به کافه‌ها', 'برگزاری ورکشاپ‌های فصلی'],
    images: [
      'https://placehold.co/600x400/00b4d8/white?text=Flair+House+Sample+1',
      'https://placehold.co/600x400/90e0ef/white?text=Flair+House+Sample+2'
    ],
    connections: ['p2', 'p6', 'p9', 'p13']
  },
  {
    id: 'pt5',
    type: 'partner',
    name: 'ایران مال (Iran Mall)',
    logoInitial: 'IM',
    logoUrl: getImagePath('/pic/iranmall.webp'),
    website: 'https://iranmall.com',
    description: 'همکار استراتژیک در برگزاری رویدادهای نمایشگاهی و صنعت Horeca. ایران مال با ارائه فضایی منحصربه‌فرد برای رویدادهای تخصصی، بستر مناسبی برای تعامل فعالان صنعت فراهم می‌کند.',
    activities: ['برگزاری رویدادهای نمایشگاهی تخصصی', 'همکاری در برگزاری فستیوال‌های صنعت غذا', 'میزبانی کنفرانس‌های تخصصی', 'فضاسازی و دکوراسیون رویدادها'],
    images: [
      'https://placehold.co/600x400/2d4059/white?text=Iran+Mall+Sample+1',
      'https://placehold.co/600x400/ea5455/white?text=Iran+Mall+Sample+2'
    ],
    connections: ['p3', 'p10', 'p13']
  },
  {
    id: 'pt6',
    type: 'partner',
    name: 'باشگاه کسب‌وکارهای خوراک و نوشیدنی (F&B Club)',
    logoInitial: 'FB',
    logoUrl: getImagePath('/pic/F&Bclub.png'),
    website: 'https://fnbclub.ir',
    description: 'بستری حرفه‌ای برای گردهمایی، تبادل نظر و هم‌افزایی فعالان صنعت خوراک و نوشیدنی. این باشگاه با برگزاری رویدادهای تخصصی، بستری برای رشد و توسعه کسب‌وکارها فراهم می‌کند.',
    activities: ['برگزاری نشست‌های تخصصی صنعت F&B', 'برنامه‌ریزی رویدادهای شبکه‌سازی', 'ارائه مشاوره تخصصی به اعضا', 'برگزاری ورکشاپ‌های آموزشی'],
    images: [
      'https://placehold.co/600x400/1a3a3a/white?text=F&B+Club+Sample+1',
      'https://placehold.co/600x400/2d5a5a/white?text=F&B+Club+Sample+2'
    ],
    connections: ['p1', 'p5', 'p11', 'p14']
  },
  {
    id: 'pt7',
    type: 'partner',
    name: 'فیدیپر (Feediper)',
    logoInitial: 'FD',
    logoUrl: getImagePath('/pic/feediper.png'),
    website: 'https://feediper.com',
    description: 'آژانس تخصصی مارکتینگ، برندینگ و عکاسی صنعتی برای کسب‌وکارهای خوراک و نوشیدنی. فیدیپر با نگاهی خلاقانه، داستان برندها را از طریق تصاویر و محتوای حرفه‌ای روایت می‌کند.',
    activities: ['عکاسی صنعتی و محصول', 'تدوین استراتژی محتوایی', 'طراحی کمپین‌های تبلیغاتی', 'مدیریت شبکه‌های اجتماعی تخصصی'],
    images: [
      'https://placehold.co/600x400/e07a5f/white?text=Feediper+Sample+1',
      'https://placehold.co/600x400/3d405b/white?text=Feediper+Sample+2'
    ],
    connections: ['p2', 'p6', 'p12', 'p15']
  },
  {
    id: 'pt8',
    type: 'partner',
    name: 'HRCC (شرکت نمایشگاهی صنعت)',
    logoInitial: 'HC',
    logoUrl: getImagePath('/pic/hrcc.png'),
    website: 'https://hrcc-exhibition.com',
    description: 'شرکت تخصصی برگزاری نمایشگاه‌های صنعتی با تمرکز بر صنعت Horeca. HRCC با سال‌ها تجربه، استانداردهای جهانی برگزاری رویداد را به ایران آورده است.',
    activities: ['برگزاری نمایشگاه‌های تخصصی صنعت', 'طراحی غرفه‌های نمایشگاهی', 'برنامه‌ریزی و اجرای رویدادهای B2B', 'مدیریت ارتباط با بازدیدکنندگان'],
    images: [
      'https://placehold.co/600x400/264653/white?text=HRCC+Sample+1',
      'https://placehold.co/600x400/2a9d8f/white?text=HRCC+Sample+2'
    ],
    connections: ['p3', 'p7', 'p10']
  },
  {
    id: 'pt9',
    type: 'partner',
    name: 'نمایشگاه شهر آفتاب (Shahr-e Aftab)',
    logoInitial: 'SA',
    logoUrl: getImagePath('/pic/shahr_e_aftab.png'),
    website: 'https://shahreaftab.com',
    description: 'یکی از بزرگترین مراکز نمایشگاهی ایران با فضایی مدرن و مجهز برای برگزاری رویدادهای ملی و بین‌المللی. شهر آفتاب میزبان رویدادهای تخصصی صنعت خوراک و نوشیدنی است.',
    activities: ['میزبانی نمایشگاه‌های تخصصی صنعت غذا', 'فضاسازی و دکوراسیون رویدادها', 'پشتیبانی لجستیک رویدادها', 'همکاری در برگزاری فستیوال‌های تخصصی'],
    images: [
      'https://placehold.co/600x400/caf0f8/white?text=Shahr-e+Aftab+Sample+1',
      'https://placehold.co/600x400/0077b6/white?text=Shahr-e+Aftab+Sample+2'
    ],
    connections: ['p3', 'p10', 'p14']
  },
  {
    id: 'pt10',
    type: 'partner',
    name: 'ZOE Architecture',
    logoInitial: 'ZA',
    logoUrl: getImagePath('/pic/zoe.png'),
    website: 'https://zoe-architecture.com',
    description: 'استودیو تخصصی طراحی داخلی و دکوراسیون با تمرکز بر صنعت کافه، رستوران و هتل. ZOE با رویکردی مینیمال و مدرن، فضاهایی خلق می‌کند که تجربه مشتری را متحول می‌سازد.',
    activities: ['طراحی داخلی تخصصی کافه و رستوران', 'مشاوره دکوراسیون و المان‌های بصری', 'طراحی نورپردازی حرفه‌ای', 'مدیریت پروژه‌های اجرایی'],
    images: [
      'https://placehold.co/600x400/2b2d42/white?text=ZOE+Sample+1',
      'https://placehold.co/600x400/8d99ae/white?text=ZOE+Sample+2'
    ],
    connections: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15']
  },
  {
    id: 'pt11',
    type: 'partner',
    name: 'جهان تاب (Jahantab)',
    logoInitial: 'JT',
    logoUrl: getImagePath('/pic/jahantab.png'),
    website: 'https://jahantab.com',
    description: 'تولیدکننده و تامین‌کننده مبلمان داخلی با کیفیت بالا و طراحی مدرن برای فضاهای تجاری. جهان تاب با ارائه محصولات منحصربه‌فرد، هویت فضاهای کافه و رستوران را تکمیل می‌کند.',
    activities: ['تامین مبلمان تخصصی کافه و رستوران', 'طراحی و تولید مبل‌های سفارشی', 'مشاوره چیدمان فضا', 'ارائه محصولات با کیفیت اروپایی'],
    images: [
      'https://placehold.co/600x400/6d6875/white?text=Jahantab+Sample+1',
      'https://placehold.co/600x400/b5838d/white?text=Jahantab+Sample+2'
    ],
    connections: ['p1', 'p2', 'p6', 'p11']
  },
  {
    id: 'pt12',
    type: 'partner',
    name: 'گروه فنی مهندسی نبوغ (Nebough)',
    logoInitial: 'NB',
    logoUrl: getImagePath('/pic/nobough.png'),
    website: 'https://nebough.com',
    description: 'مجری تخصصی پروژه‌های خاص و پیچیده در صنعت ساختمان و معماری داخلی. گروه نبوغ با تیم مهندسی مجرب، اجرای پروژه‌های کافه و رستوران را با بالاترین کیفیت ممکن می‌سازد.',
    activities: ['اجرای پروژه‌های معماری خاص', 'مدیریت ساخت و ساز صنعتی', 'نظارت بر پروژه‌های ساختمانی', 'مشاوره فنی و مهندسی'],
    images: [
      'https://placehold.co/600x400/0a0908/white?text=Nebough+Sample+1',
      'https://placehold.co/600x400/22333b/white?text=Nebough+Sample+2'
    ],
    connections: ['p2', 'p4', 'p8', 'p14']
  }
];

// ********** SUPPLIERS **********
const suppliers: NetworkEntity[] = [
  {
    id: 'sp1',
    type: 'supplier',
    name: 'لیماز (Limaz)',
    logoInitial: 'LM',
    logoUrl: getImagePath('/pic/limaz.png'),
    website: 'https://limaz.com',
    description: 'تامین‌کننده تخصصی ظروف، لیوان‌های دبل وال، استینلس استیل و اکسسوری مدرن کافی‌شاپ. لیماز با ارائه محصولات باکیفیت، تجربه نوشیدن را برای مشتریان شما لوکس‌تر می‌کند.',
    activities: ['تامین لیوان‌های حرارتی و سرد', 'ظروف سرو تخصصی قهوه', 'اکسسوری بار و کافی‌شاپ', 'محصولات سفارشی با برند مشتری'],
    images: [
      'https://placehold.co/600x400/2b9348/white?text=Limaz+Sample+1',
      'https://placehold.co/600x400/55a630/white?text=Limaz+Sample+2'
    ],
    connections: ['p1', 'p2', 'p6']
  },
  {
    id: 'sp2',
    type: 'supplier',
    name: 'ریوان (Rivan)',
    logoInitial: 'RV',
    logoUrl: getImagePath('/pic/rivan.png'),
    website: 'https://rivan.ir',
    description: 'سازنده و تولیدکننده دستگاه‌های سوداساز، گازدارکننده آبمیوه و سیستم‌های نوشیدنی گازدار صنعتی. ریوان تجربه نوشیدنی‌های گازدار حرفه‌ای را برای کافه‌ها ممکن می‌سازد.',
    activities: ['تولید سوداساز صنعتی و نیمه‌صنعتی', 'گازدارکننده آبمیوه و نوشیدنی', 'سیستم‌های تزریق CO2', 'مشاوره و نصب'],
    images: [
      'https://placehold.co/600x400/0077b6/white?text=Rivan+Sample+1',
      'https://placehold.co/600x400/00b4d8/white?text=Rivan+Sample+2'
    ],
    connections: ['p2', 'p4', 'p14']
  },
  
  {
    id: 'sp4',
    type: 'supplier',
    name: 'TeaStudio',
    logoInitial: 'TS',
    logoUrl: getImagePath('/pic/teastudio.png'),
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
    id: 'sp6',
    type: 'supplier',
    name: 'پرایم (Prime)',
    logoInitial: 'PR',
    logoUrl: getImagePath('/pic/prime.png'),
    website: 'https://prime-coffee.com',
    description: 'واردکننده و تامین‌کننده تجهیزات تخصصی صنعت قهوه شامل دستگاه‌های حرفه‌ای، آسیاب و لوازم جانبی. پرایم کیفیت جهانی را به کافه‌های ایران می‌آورد.',
    activities: ['واردات تجهیزات تخصصی قهوه', 'تامین قطعات اورجینال', 'ارائه خدمات پس از فروش و گارانتی', 'مشاوره فنی'],
    images: [
      'https://placehold.co/600x400/c1121f/white?text=Prime+Sample+1',
      'https://placehold.co/600x400/780000/white?text=Prime+Sample+2'
    ],
    connections: ['p1', 'p3', 'p7']
  },
  {
    id: 'sp7',
    type: 'supplier',
    name: 'فائما (Faema)',
    logoInitial: 'FM',
    logoUrl: getImagePath('/pic/فائما.png'),
    website: 'https://faema.com',
    description: 'تولیدکننده افسانه‌ای دستگاه‌های اسپرسوساز صنعتی، نماد کیفیت ایتالیایی در کافی‌شاپ‌های حرفه‌ای. فائما از ۱۹۴۵ تا امروز، استانداردهای اسپرسو را تعریف کرده است.',
    activities: ['تامین اسپرسوساز صنعتی و نیمه‌صنعتی', 'ارائه سرویس و نگهداری دوره‌ای', 'کالیبراسیون حرفه‌ای', 'تامین قطعات اصلی'],
    images: [
      'https://placehold.co/600x400/8b0000/white?text=Faema+Sample+1',
      'https://placehold.co/600x400/a52a2a/white?text=Faema+Sample+2'
    ],
    connections: ['p2', 'p8']
  },
  {
    id: 'sp8',
    type: 'supplier',
    name: 'مازر (Mazzer)',
    logoInitial: 'MZ',
    logoUrl: getImagePath('/pic/mazzer.png'),
    website: 'https://mazzer.com',
    description: 'تولیدکننده حرفه‌ترین آسیاب‌های قهوه با دقت میکرومتری و ماندگاری بالا. مازر انتخاب شماره یک حرفه‌ای‌های قهوه در سراسر جهان است.',
    activities: ['تامین آسیاب صنعتی و حرفه‌ای', 'ارائه آسیاب دوزینگ و دوزرلس', 'تامین قطعات تخصصی', 'کالیبراسیون و تنظیم'],
    images: [
      'https://placehold.co/600x400/222222/white?text=Mazzer+Sample+1',
      'https://placehold.co/600x400/444444/white?text=Mazzer+Sample+2'
    ],
    connections: ['p2', 'p5', 'p9']
  },
  {
    id: 'sp9',
    type: 'supplier',
    name: 'کالیورسان (Calorissan)',
    logoInitial: 'CL',
    logoUrl: getImagePath('/pic/cali.png'),
    website: 'https://calorissan.com',
    description: 'تامین‌کننده تخصصی مواد مصرفی نظافت، ضدعفونی و نگهداری تجهیزات قهوه و کافی‌شاپ. کالیورسان بهداشت حرفه‌ای را برای کسب‌وکار شما تضمین می‌کند.',
    activities: ['تامین مواد شوینده تخصصی صنعت قهوه', 'ضدعفونی‌کننده‌های مخازن و تجهیزات', 'محصولات مراقبت و نگهداری', 'مشاوره بهداشتی'],
    images: [
      'https://placehold.co/600x400/1b4332/white?text=Calorissan+Sample+1',
      'https://placehold.co/600x400/2d6a4f/white?text=Calorissan+Sample+2'
    ],
    connections: ['p4', 'p10']
  },
  {
    id: 'sp10',
    type: 'supplier',
    name: 'بارهس (Barehs)',
    logoInitial: 'BR',
    logoUrl: getImagePath('/pic/barhos.png'),
    website: 'https://barehs.com',
    description: 'تولیدکننده سیروپ‌های طبیعی، سس‌های اختصاصی و طعم‌دهنده‌های مخصوص قهوه و نوشیدنی. بارهس طعم‌های ماندگار و طبیعی را به منوی شما اضافه می‌کند.',
    activities: ['تولید سیروپ تخصصی قهوه', 'طعم‌دهنده‌های طبیعی و ارگانیک', 'طراحی محصولات فصلی و ویژه', 'بسته‌بندی اختصاصی'],
    images: [
      'https://placehold.co/600x400/d4a373/white?text=Barehs+Sample+1',
      'https://placehold.co/600x400/faedcd/white?text=Barehs+Sample+2'
    ],
    connections: ['p1', 'p3', 'p11']
  },
  {
    id: 'sp11',
    type: 'supplier',
    name: 'چای کار (Chaykar)',
    logoInitial: 'CK',
    logoUrl: getImagePath('/pic/چای کار.png'),
    website: 'https://chaykar.com',
    description: 'تامین‌کننده چای سیاه ممتاز، چای سبز و دمنوش‌های سنتی و مدرن. چای‌کار با تکیه بر دانش بومی و استانداردهای جهانی، بهترین برگ‌های چای را ارائه می‌دهد.',
    activities: ['تامین چای سیاه ممتاز درجه یک', 'ارائه چای سبز و سفید', 'طراحی دمنوش سنتی و مدرن', 'بسته‌بندی اختصاصی برای برندها'],
    images: [
      'https://placehold.co/600x400/283618/white?text=Chaykar+Sample+1',
      'https://placehold.co/600x400/606c38/white?text=Chaykar+Sample+2'
    ],
    connections: ['p4', 'p12']
  },
  {
    id: 'sp12',
    type: 'supplier',
    name: 'کیا گستر (Kia Gostar)',
    logoInitial: 'KG',
    logoUrl: getImagePath('/pic/kia.png'),
    website: 'https://kiagostar.com',
    description: 'تامین‌کننده تخصصی ملزومات، تجهیزات و لوازم مصرفی کافه، رستوران و هتل. کیا گستر پشتیبان کامل نیازهای روزانه کسب‌وکار شماست.',
    activities: ['تامین ملزومات کامل کافی‌شاپ', 'ارائه تجهیزات باریستا حرفه‌ای', 'تامین لوازم مصرفی روزانه', 'مشاوره و تامین یکپارچه'],
    images: [
      'https://placehold.co/600x400/003049/white?text=Kia+Gostar+Sample+1',
      'https://placehold.co/600x400/d62828/white?text=Kia+Gostar+Sample+2'
    ],
    connections: ['p1', 'p2', 'p5', 'p13']
  },
  {
    id: 'sp13',
    type: 'supplier',
    name: 'وایت پلیت (White Plate)',
    logoInitial: 'WP',
    logoUrl: getImagePath('/pic/whiteplate.png'),
    website: 'https://whiteplate.com',
    description: 'تامین‌کننده تخصصی ظروف سفید و کلاسیک برای رستوران‌های فاین‌داینینگ و کافه‌های لوکس. وایت پلیت با ارائه ظروف مینیمال و باکیفیت، تجربه بصری غذا را ارتقا می‌دهد.',
    activities: ['تامین ظروف چینی سفید درجه یک', 'ارائه ست‌های پذیرایی کلاسیک', 'تامین ظروف مخصوص دسر و نوشیدنی', 'مشاوره سرویس‌دهی'],
    images: [
      'https://placehold.co/600x400/f8f9fa/black?text=White+Plate+Sample+1',
      'https://placehold.co/600x400/e9ecef/black?text=White+Plate+Sample+2'
    ],
    connections: ['p3', 'p5', 'p14']
  },
  {
    id: 'sp14',
    type: 'supplier',
    name: 'پاشا باغچه (Pasha Baghche)',
    logoInitial: 'PB',
    logoUrl: getImagePath('/pic/pasabahce.png'),
    website: 'https://pasabaghce.com',
    description: 'تامین‌کننده ظروف شیشه‌ای و کریستال با کیفیت بالا برای سرو نوشیدنی‌های خاص. پاشا باغچه با طراحی‌های منحصربه‌فرد، جلوهای لوکس به سرویس‌دهی شما می‌بخشد.',
    activities: ['تامین لیوان‌های کریستال و شیشه‌ای', 'ارائه ظروف تزئینی و دکوری', 'طراحی سفارشی ظروف شیشه‌ای', 'مشاوره ست‌های پذیرایی'],
    images: [
      'https://placehold.co/600x400/b8e2f2/black?text=Pasha+Baghche+Sample+1',
      'https://placehold.co/600x400/a2d2ff/black?text=Pasha+Baghche+Sample+2'
    ],
    connections: ['p1', 'p6', 'p9']
  },
  {
    id: 'sp15',
    type: 'supplier',
    name: 'رویال پلیت (Royal Plate)',
    logoInitial: 'RP',
    logoUrl: getImagePath('/pic/royalplate.png'),
    website: 'https://royalplate.com',
    description: 'برند تخصصی ظروف لوکس و کلکسیونی برای رستوران‌های سطح بالا. رویال پلیت با الهام از طراحی‌های سلطنتی، مجموعه‌هایی نفیس برای سرو غذا و نوشیدنی ارائه می‌دهد.',
    activities: ['تامین ظروف چینی لوکس و کلکسیونی', 'ارائه ست‌های پذیرایی سلطنتی', 'تامین ظروف مخصوص مراسم خاص', 'مشاوره دکوراسیون سفره'],
    images: [
      'https://placehold.co/600x400/d4af37/white?text=Royal+Plate+Sample+1',
      'https://placehold.co/600x400/c5a059/white?text=Royal+Plate+Sample+2'
    ],
    connections: ['p2', 'p7', 'p11']
  },
  {
    id: 'sp16',
    type: 'supplier',
    name: 'برشته‌کاری انت (Ant Coffee)',
    logoInitial: 'AC',
    logoUrl: getImagePath('/pic/antcoffee.png'),
    website: 'https://antcoffee.com',
    description: 'تخصصی‌ترین برشته‌کاری قهوه با روش‌های مدرن و دانه‌های درجه یک از بهترین مزارع جهان. آنت کافی با تیم حرفه‌ای، طعم‌های ماندگار را به کافه‌ها ارائه می‌دهد.',
    activities: ['برشته‌کاری قهوه تخصصی', 'تامین قهوه تک‌خاستگاه', 'کالیبراسیون تجهیزات برشته‌کاری', 'برگزاری جلسات کاپینگ تخصصی'],
    images: [
      'https://placehold.co/600x400/4a3728/white?text=Ant+Coffee+Sample+1',
      'https://placehold.co/600x400/6b4c3a/white?text=Ant+Coffee+Sample+2'
    ],
    connections: ['p2', 'p4', 'p8']
  },
  {
    id: 'sp17',
    type: 'supplier',
    name: 'برشته‌کاری سوامی (Swami Coffee)',
    logoInitial: 'SC',
    logoUrl: getImagePath('/pic/swami.png'),
    website: 'https://swamicoffee.com',
    description: 'برشته‌کاری تخصصی با تمرکز بر قهوه‌های ارگانیک و فرآیندهای طبیعی. سوامی با رویکردی پایدار، قهوه‌هایی با طعم‌های متفاوت و خاص ارائه می‌دهد.',
    activities: ['برشته‌کاری قهوه ارگانیک', 'تامین قهوه با فرآیند طبیعی', 'تحلیل طعم و پروفایل قهوه', 'مشاوره تخصصی به کافه‌ها'],
    images: [
      'https://placehold.co/600x400/5c4d3c/white?text=Swami+Sample+1',
      'https://placehold.co/600x400/8b7355/white?text=Swami+Sample+2'
    ],
    connections: ['p1', 'p9', 'p13']
  },
  {
    id: 'sp18',
    type: 'supplier',
    name: 'بار پروداکت (Bar Product)',
    logoInitial: 'BP',
    logoUrl: getImagePath('/pic/barproduct.png'),
    website: 'https://barproduct.com',
    description: 'تامین‌کننده تخصصی مواد اولیه، اکسسوری و تجهیزات بار برای کافه‌ها و لانژهای حرفه‌ای. بار پروداکت با ارائه محصولات باکیفیت، هنر بارتندری را ارتقا می‌دهد.',
    activities: ['تامین اکسسوری تخصصی بار', 'ارائه مواد اولیه کوکتل و نوشیدنی', 'مشاوره طراحی بار حرفه‌ای', 'تامین تجهیزات بارتندری'],
    images: [
      'https://placehold.co/600x400/2d2d2d/white?text=Bar+Product+Sample+1',
      'https://placehold.co/600x400/4a4a4a/white?text=Bar+Product+Sample+2'
    ],
    connections: ['p1', 'p3', 'p10']
  },
  {
    id: 'sp19',
    type: 'supplier',
    name: 'بام تک (Bam Tech)',
    logoInitial: 'BT',
    logoUrl: getImagePath('/pic/bamtech.png'),
    website: 'https://bamtech.com',
    description: 'تولیدکننده تخصصی سقف‌های متحرک، کرکره‌های برقی و سیستم‌های مدرن پوشش فضاهای باز و سرپوشیده. بام تک با ارائه راهکارهای نوین، فضاهای کافه و رستوران را متحول می‌کند.',
    activities: ['طراحی و تولید سقف متحرک', 'سیستم‌های کرکره برقی هوشمند', 'پوشش مدرن فضاهای باز', 'مشاوره و اجرای پروژه‌های خاص'],
    images: [
      'https://placehold.co/600x400/1a3a3a/white?text=Bam+Tech+Sample+1',
      'https://placehold.co/600x400/2d5a5a/white?text=Bam+Tech+Sample+2'
    ],
    connections: ['p2', 'p6', 'p14']
  },
  
];

// ********** PROJECTS **********
const projects: NetworkEntity[] = [
  {
    id: 'p1',
    type: 'project',
    name: 'زئوس لانژ (Zeus Lounge)',
    logoInitial: 'ZL',
    logoUrl: getImagePath('/pic/Zeus Lounge.png'),
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
    connections: ['pt1', 'pt6', 'pt10', 'pt11', 'sp1', 'sp6', 'sp10', 'sp12', 'sp14', 'sp17', 'sp18']
  },
  {
    id: 'p2',
    type: 'project',
    name: 'تیکانو (Tikano)',
    logoInitial: 'TK',
    logoUrl: getImagePath('/pic/takano.png'),
    website: 'https://tikano.ir',
    location: 'شیراز، حد فاصل دروازه قرآن تا آرامگاه حافظ',
    address: 'شیراز، بلوار کریمخان زند، نبش خیابان احمدی، پلاک ۳۲',
    description: 'کافه رستوران مدرن در شیراز، تلفیقی بی‌نظیر از معماری سنتی شیراز با سرویس قهوه تخصصی و منوی تلفیقی. تیکانو تجربه‌ای از اصالت و مدرنیته را همزمان ارائه می‌دهد.',
    activities: ['طراحی هویت بصری متناسب با فرهنگ شیراز', 'آموزش تخصصی تیم قهوه و سرویس', 'راه‌اندازی و بهینه‌سازی منو', 'مشاوره تجهیزات'],
    images: [
      'https://placehold.co/600x400/2a9d8f/white?text=Tikano+Sample+1',
      'https://placehold.co/600x400/264653/white?text=Tikano+Sample+2'
    ],
    connections: ['pt2', 'pt4', 'pt7', 'pt10', 'pt11', 'pt12', 'sp1', 'sp2', 'sp3', 'sp5', 'sp7', 'sp8', 'sp12', 'sp15', 'sp16', 'sp19']
  },
  {
    id: 'p3',
    type: 'project',
    name: 'فایو لانژ (Five Lounge)',
    logoInitial: 'FL',
    logoUrl: getImagePath('/pic/five lounge.png'),
    website: 'https://fivelounge.com',
    location: 'تهران، شمال تهران، خیابان ولیعصر',
    address: 'تهران، خیابان ولیعصر، بالاتر از نیایش، برج ۵، طبقه ۱۲',
    description: 'لانژ مدرن در شمال تهران، فضایی کاملاً VIP و اختصاصی برای برگزاری رویدادهای خصوصی، جلسات بیزینس و شب‌های خاص. فایو لانژ لوکس‌ترین تجربه را ارائه می‌دهد.',
    activities: ['مدیریت و بهینه‌سازی فضای لانژ', 'طراحی سرویس ویژه VIP', 'برندینگ و هویت‌سازی مدرن', 'برنامه‌ریزی رویدادهای اختصاصی'],
    images: [
      'https://placehold.co/600x400/e9c46a/white?text=Five+Lounge+Sample+1',
      'https://placehold.co/600x400/f4a261/white?text=Five+Lounge+Sample+2'
    ],
    connections: ['pt3', 'pt5', 'pt8', 'pt9', 'pt10', 'sp3', 'sp6', 'sp10', 'sp13', 'sp18', 'sp20']
  },
  {
    id: 'p4',
    type: 'project',
    name: 'ویسپرد (Whisperd)',
    logoInitial: 'WH',
    logoUrl: getImagePath('/pic/whisperd.png'),
    website: 'https://whisperd.cafe',
    location: 'تهران، جردن',
    address: 'تهران، خیابان جردن، کوچه یکم، پلاک ۷',
    description: 'کافی‌شاپ مفهومی با تمرکز بر محیط آرام، دکور مینیمال و ارائه قهوه‌های تک‌خاستگاه از برترین رستری‌های جهان. ویسپرد پناهگاهی برای عاشقان واقعی قهوه است.',
    activities: ['طراحی داخلی مینیمال و آرامش‌بخش', 'طراحی منوی قهوه تخصصی تک‌خاستگاه', 'آموزش حرفه‌ای باریستا', 'مشاوره تجهیزات تخصصی'],
    images: [
      'https://placehold.co/600x400/e76f51/white?text=Whisperd+Sample+1',
      'https://placehold.co/600x400/f4a261/white?text=Whisperd+Sample+2'
    ],
    connections: ['pt2', 'pt10', 'pt12', 'sp2', 'sp4', 'sp9', 'sp11', 'sp16']
  },
  {
    id: 'p5',
    type: 'project',
    name: 'لیویا (Livia)',
    logoInitial: 'LV',
    logoUrl: getImagePath('/pic/Livia.png'),
    website: 'https://livia.gallery',
    location: 'تهران، مرکز، خیابان جمهوری',
    address: 'تهران، خیابان جمهوری، تقاطع خیابان میرزای شیرازی، پلاک ۴۵',
    description: 'کافه گالری هنری در مرکز تهران، تلفیقی بی‌نظیر از هنرهای تجسمی، موسیقی زنده و تجربه قهوه تخصصی. لیویا جایی که هنر و قهوه در هم می‌آمیزند.',
    activities: ['طراحی فضای گالری-کافه', 'برنامه‌ریزی رویدادهای هنری', 'طراحی منوی مدرن و خلاقانه', 'مدیریت فرهنگی فضا'],
    images: [
      'https://placehold.co/600x400/9c89b8/white?text=Livia+Sample+1',
      'https://placehold.co/600x400/b8a9c9/white?text=Livia+Sample+2'
    ],
    connections: ['pt3', 'pt6', 'pt10', 'sp5', 'sp8', 'sp12', 'sp13']
  },
  {
    id: 'p6',
    type: 'project',
    name: 'نغمه کافه (Naghme Cafe)',
    logoInitial: 'NC',
    logoUrl: getImagePath('/pic/naghmeh.png'),
    website: 'https://naghmehcafe.com',
    location: 'تهران، تجریش',
    address: 'تهران، خیابان تجریش، بازارچه شمس‌العماره، پلاک ۱',
    description: 'کافه سنتی-مدرن با تمرکز بر موسیقی زنده ایرانی، قهوه‌های تخصصی و فضایی صمیمی. نغمه کافه تلفیقی از نوستالژی و مدرنیته است.',
    activities: ['بازطراحی و بهینه‌سازی منو', 'برندینگ و هویت‌سازی بصری', 'بهبود استانداردهای سرویس و تشریفات', 'مدیریت اجرایی'],
    images: [
      'https://placehold.co/600x400/8ecae6/white?text=Naghme+Cafe+Sample+1',
      'https://placehold.co/600x400/219ebc/white?text=Naghme+Cafe+Sample+2'
    ],
    connections: ['pt4', 'pt7', 'pt10', 'pt11', 'sp1', 'sp14', 'sp19']
  },
  {
    id: 'p7',
    type: 'project',
    name: 'ایوان بوتیک (Eyvan Boutique)',
    logoInitial: 'EB',
    logoUrl: getImagePath('/pic/eyvan.png'),
    website: 'https://eyvanboutique.ir',
    location: 'کاشان، بافت تاریخی',
    address: 'کاشان، محله تاریخی سرباغ، کوچه نراقی‌ها، پلاک ۲۳',
    description: 'پروژه بوتیک کافه در قلب بافت تاریخی کاشان، با معماری سنتی و تخصص در قهوه‌های خاص. ایوان بوتیک تجربه‌ای از اصالت ایرانی را با کیفیت جهانی ترکیب کرده است.',
    activities: ['طراحی هویت متناسب با معماری سنتی', 'مدیریت کامل پروژه راه‌اندازی', 'آموزش تیم محلی و بومی', 'مشاوره تامین تجهیزات'],
    images: [
      'https://placehold.co/600x400/cf9e6f/white?text=Eyvan+Boutique+Sample+1',
      'https://placehold.co/600x400/e8b86b/white?text=Eyvan+Boutique+Sample+2'
    ],
    connections: ['pt1', 'pt8', 'pt10', 'sp6', 'sp15']
  },
  {
    id: 'p8',
    type: 'project',
    name: 'کافه بیکری نونوبا (Nonoba)',
    logoInitial: 'NN',
    logoUrl: getImagePath('/pic/nonoba.png'),
    website: 'https://nonoba.ir',
    location: 'اراک، خیابان قائم',
    address: 'اراک، خیابان قائم، مجتمع تجاری رز، طبقه همکف',
    description: 'کافه و نانوایی مدرن در اراک، ترکیبی استثنایی از شیرینی‌های فرانسوی، نان‌های تازه و قهوه تخصصی. نونوبا اولین کافه بیکری تخصصی اراک است.',
    activities: ['راه‌اندازی کامل کافه بیکری', 'طراحی منوی شیرینی و نان', 'تجهیز آشپزخانه و نانوایی', 'آموزش تیم'],
    images: [
      'https://placehold.co/600x400/fabc3f/white?text=Nonoba+Sample+1',
      'https://placehold.co/600x400/ffb703/white?text=Nonoba+Sample+2'
    ],
    connections: ['pt2', 'pt10', 'pt12', 'sp7', 'sp16']
  },
  {
    id: 'p9',
    type: 'project',
    name: 'وریا کافه (Voria Cafe)',
    logoInitial: 'VC',
    logoUrl: getImagePath('/pic/voria.png'),
    website: 'https://voriacafe.com',
    location: 'تهران، الهیه',
    address: 'تهران، خیابان الهیه، خیابان ۲۵، پلاک ۸',
    description: 'کافه مدرن در تهران با طراحی مینیمال، نورپردازی حرفه‌ای و تمرکز ویژه بر قهوه‌های دست‌ساز و روش‌های آلترنیتیو.',
    activities: ['تدوین استراتژی تخصصی قهوه', 'آموزش حرفه‌ای تیم کافه', 'طراحی منوی خلاقانه', 'انتخاب و تامین تجهیزات'],
    images: [
      'https://placehold.co/600x400/2b2d42/white?text=Voria+Cafe+Sample+1',
      'https://placehold.co/600x400/8d99ae/white?text=Voria+Cafe+Sample+2'
    ],
    connections: ['pt4', 'pt10', 'sp8', 'sp14', 'sp17', 'sp20']
  },
  {
    id: 'p10',
    type: 'project',
    name: 'Tehran Eyes',
    logoInitial: 'TE',
    logoUrl: getImagePath('/pic/tehraneyes.png'),
    website: 'https://tehraneyes.com',
    location: 'تهران، برج‌های شمالی',
    address: 'تهران، بزرگراه چمران، برج‌های سیمرغ، طبقه ۳۰',
    description: 'لانژ دیدبانی در بالای برج‌های شمال تهران، با چشم‌اندازی ۳۶۰ درجه به شهر، سرویس کوکتل‌های خاص و قهوه‌های سوپریوم. تهران آی‌ز تجربه‌ای فراموش‌نشدنی ارائه می‌دهد.',
    activities: ['طراحی سرویس لوکس و ویژه', 'منوی اختصاصی کوکتل و قهوه', 'ارتقاء استانداردهای تشریفات', 'مدیریت اجرایی'],
    images: [
      'https://placehold.co/600x400/0d1b2a/white?text=Tehran+Eyes+Sample+1',
      'https://placehold.co/600x400/1b263b/white?text=Tehran+Eyes+Sample+2'
    ],
    connections: ['pt1', 'pt5', 'pt8', 'pt9', 'pt10', 'sp9', 'sp18']
  },
  {
    id: 'p11',
    type: 'project',
    name: 'هیلز (Hills)',
    logoInitial: 'HL',
    logoUrl: getImagePath('/pic/Hills.png'),
    website: 'https://hills.cafe',
    location: 'تهران، سعادت‌آباد',
    address: 'تهران، سعادت‌آباد، بلوار فرحزادی، پلاک ۵۴',
    description: 'کافه رستوران مدرن در شمال تهران با فضای باز وسیع، منوی بین‌المللی و تمرکز بر قهوه تخصصی و صبحانه‌های لوکس.',
    activities: ['طراحی و بهینه‌سازی فضای باز', 'طراحی منوی فصلی و بین‌المللی', 'مدیریت اجرایی و عملیاتی', 'آموزش تیم حرفه‌ای'],
    images: [
      'https://placehold.co/600x400/52796f/white?text=Hills+Sample+1',
      'https://placehold.co/600x400/84a98c/white?text=Hills+Sample+2'
    ],
    connections: ['pt3', 'pt6', 'pt10', 'pt11', 'sp10', 'sp15']
  },
  {
    id: 'p12',
    type: 'project',
    name: 'بن کافه (Boon Cafe)',
    logoInitial: 'BN',
    logoUrl: getImagePath('/pic/boon.png'),
    website: 'https://booncafe.com',
    location: 'تهران، ونک',
    address: 'تهران، خیابان ونک، کوچه نهم، پلاک ۲۱',
    description: 'کافه تخصصی صبحانه و برانچ در تهران، با تمرکز بر قهوه تخصصی، صبحانه‌های سالم و منوی متنوع. بن کافه انتخاب اول اهالی صبحانه است.',
    activities: ['طراحی منوی تخصصی برانچ', 'آموزش تیم سرویس و قهوه', 'تجهیز کامل کافه', 'مشاوره برندینگ'],
    images: [
      'https://placehold.co/600x400/a7c957/white?text=Boon+Cafe+Sample+1',
      'https://placehold.co/600x400/6a994e/white?text=Boon+Cafe+Sample+2'
    ],
    connections: ['pt2', 'pt7', 'pt10', 'sp11']
  },
  {
    id: 'p13',
    type: 'project',
    name: 'چاپلین کلاب (Chaplin Club)',
    logoInitial: 'CC',
    logoUrl: getImagePath('/pic/chaplin.png'),
    website: 'https://chaplinclub.ir',
    location: 'کیش، منطقه گردشگری',
    address: 'کیش، میدان مرجان، پاساژ تجاری، طبقه ۳',
    description: 'کافه کلاب مدرن در جزیره کیش، فضایی لوکس با رویدادهای زنده، موسیقی و منوی خاص. چاپلین کلاب مقصد شماره یک شب‌های کیش است.',
    activities: ['برندینگ لوکس و مدرن', 'طراحی ساختار سرویس ویژه', 'مدیریت و برنامه‌ریزی رویدادها', 'آموزش تیم حرفه‌ای'],
    images: [
      'https://placehold.co/600x400/212529/white?text=Chaplin+Club+Sample+1',
      'https://placehold.co/600x400/343a40/white?text=Chaplin+Club+Sample+2'
    ],
    connections: ['pt4', 'pt5', 'pt10', 'sp12', 'sp17']
  },
  {
    id: 'p14',
    type: 'project',
    name: 'ویو لانژ (View Lounge)',
    logoInitial: 'VL',
    logoUrl: getImagePath('/pic/viewlounge.png'),
    website: 'https://viewlounge.ir',
    location: 'تهران، پارک وی',
    address: 'تهران، خیابان پارک وی، برج پارک ویو، طبقه ۲۰',
    description: 'لانژ مدرن با نمای شهری فوق‌العاده، تخصص ویژه در قهوه‌های تخصصی و کوکتل‌های مولکولی. ویو لانژ جایی برای بهترین لحظات شماست.',
    activities: ['طراحی منوی تخصصی', 'آموزش استانداردهای تشریفات', 'مدیریت اجرایی و عملیاتی', 'مشاوره تجهیزات'],
    images: [
      'https://placehold.co/600x400/3b8ea5/white?text=View+Lounge+Sample+1',
      'https://placehold.co/600x400/2c6e7e/white?text=View+Lounge+Sample+2'
    ],
    connections: ['pt1', 'pt6', 'pt9', 'pt10', 'pt12', 'sp2', 'sp13', 'sp19']
  },
  {
    id: 'p15',
    type: 'project',
    name: 'بستنی شاد (Shad Ice Cream)',
    logoInitial: 'SI',
    logoUrl: getImagePath('/pic/shad.png'),
    website: 'https://shadicecream.com',
    location: 'تهران، فرمانیه',
    address: 'تهران، خیابان فرمانیه، بلوار کامرانیه، پلاک ۵۶',
    description: 'برند تخصصی بستنی و آیس‌کرم با تکنولوژی مدرن ایتالیایی و طعم‌های طبیعی. بستنی شاد طعم شادی را به روزهای شما می‌آورد.',
    activities: ['برندینگ و طراحی هویت مدرن', 'طراحی بسته‌بندی جذاب و لوکس', 'توسعه و بهینه‌سازی منو', 'مشاوره تولید'],
    images: [
      'https://placehold.co/600x400/f4e285/white?text=Shad+Ice+Cream+Sample+1',
      'https://placehold.co/600x400/f4d58c/white?text=Shad+Ice+Cream+Sample+2'
    ],
    connections: ['pt3', 'pt7', 'pt10', 'sp5', 'sp12', 'sp20']
  },
  {
    id: 'p16',
    type: 'project',
    name: 'کافه بیکری بینو (Bino Bakery Cafe)',
    logoInitial: 'BB',
    logoUrl: getImagePath('/pic/beano.png'),
    website: 'https://binobakery.com',
    location: 'تهران، تجریش',
    address: 'تهران، خیابان تجریش، بازارچه شمس‌العماره، پلاک ۸',
    description: 'کافه و نانوایی تخصصی در قلب تجریش، با نان‌های تازه و شیرینی‌های فرانسوی. بینو با فضایی گرم و صمیمی، مقصدی برای صبحانه‌های به‌یادماندنی است.',
    activities: ['راه‌اندازی خط تولید نان تخصصی', 'طراحی منوی صبحانه و برانچ', 'آموزش تیم نانوایی', 'طراحی فضای داخلی'],
    images: [
      'https://placehold.co/600x400/e8c39e/white?text=Bino+Bakery+Sample+1',
      'https://placehold.co/600x400/d4a373/white?text=Bino+Bakery+Sample+2'
    ],
    connections: ['pt2', 'pt10', 'sp7']
  },
  {
    id: 'p17',
    type: 'project',
    name: 'کافه بیکری BLCK',
    logoInitial: 'BK',
    logoUrl: getImagePath('/pic/blck.png'),
    website: 'https://blckcafe.com',
    location: 'کیش، منطقه گردشگری',
    address: 'کیش، میدان مرجان، مجتمع تجاری رویال، طبقه همکف',
    description: 'کافه بیکری مدرن با طراحی سیاه و سفید لاکچری در جزیره کیش. BLCK با ارائه نان‌های تازه و قهوه تخصصی، تجربه‌ای منحصربه‌فرد در فضایی هنری ارائه می‌دهد.',
    activities: ['طراحی هویت بصری مدرن', 'راه‌اندازی کافه بیکری', 'تامین تجهیزات تخصصی', 'آموزش تیم'],
    images: [
      'https://placehold.co/600x400/1a1a1a/white?text=BLCK+Sample+1',
      'https://placehold.co/600x400/2d2d2d/white?text=BLCK+Sample+2'
    ],
    connections: ['pt10', 'pt12', 'sp16']
  },
  {
    id: 'p18',
    type: 'project',
    name: 'کافه دایا (Daya Cafe)',
    logoInitial: 'DC',
    logoUrl: getImagePath('/pic/daya.png'),
    website: 'https://dayacafe.com',
    location: 'تهران، مرزداران',
    address: 'تهران، خیابان مرزداران، خیابان هفتم، پلاک ۱۲',
    description: 'کافه مدرن با تمرکز بر نوشیدنی‌های تخصصی و فضایی آرام برای کار و مطالعه. دایا با طراحی مینیمال و نورپردازی گرم، محیطی دلنشین برای لحظات خاص فراهم کرده است.',
    activities: ['طراحی فضای کاری-کافه', 'طراحی منوی نوشیدنی تخصصی', 'مدیریت اجرایی', 'آموزش تیم سرویس'],
    images: [
      'https://placehold.co/600x400/f4f1de/black?text=Daya+Cafe+Sample+1',
      'https://placehold.co/600x400/e07a5f/white?text=Daya+Cafe+Sample+2'
    ],
    connections: ['pt3', 'pt10', 'sp1']
  },
  {
    id: 'p19',
    type: 'project',
    name: 'رستوران الزوکو (El Zoco)',
    logoInitial: 'EZ',
    logoUrl: getImagePath('/pic/elzoco.png'),
    website: 'https://elzoco.com',
    location: 'تهران، سعادت‌آباد',
    address: 'تهران، سعادت‌آباد، بلوار دریا، پلاک ۳۲',
    description: 'رستوران اسپانیایی-مدرن با منوی تخصصی تاپاس، پائلا و غذاهای مدیترانه‌ای. الزوکو با فضایی گرم و پرانرژی، طعم‌های اصیل اسپانیا را به تهران آورده است.',
    activities: ['طراحی منوی اسپانیایی تخصصی', 'آموزش تیم آشپزخانه', 'طراحی فضای داخلی با الهام از اسپانیا', 'مدیریت اجرایی'],
    images: [
      'https://placehold.co/600x400/ee6c4d/white?text=El+Zoco+Sample+1',
      'https://placehold.co/600x400/fab840/white?text=El+Zoco+Sample+2'
    ],
    connections: ['pt1', 'pt10', 'sp10']
  },
  {
    id: 'p20',
    type: 'project',
    name: 'خانه کیمیایی (Kimiyaye House)',
    logoInitial: 'KH',
    logoUrl: getImagePath('/pic/kimiyaye.png'),
    website: 'https://kimiyaye.com',
    location: 'تهران، سعادت‌آباد',
    address: 'تهران، سعادت‌آباد، خیابان بخارا، پلاک ۱۵',
    description: 'کافه رستوران تلفیقی با فضایی خاص و منوی خلاقانه. خانه کیمیایی با ترکیبی از طعم‌های ایرانی و مدرن، تجربه‌ای متفاوت از غذا را ارائه می‌دهد.',
    activities: ['طراحی منوی تلفیقی خلاقانه', 'برندینگ و هویت‌سازی', 'مدیریت اجرایی', 'آموزش تیم'],
    images: [
      'https://placehold.co/600x400/6d597a/white?text=Kimiyaye+Sample+1',
      'https://placehold.co/600x400/b56576/white?text=Kimiyaye+Sample+2'
    ],
    connections: ['pt6', 'pt10', 'sp15']
  },
  {
    id: 'p21',
    type: 'project',
    name: 'مینی جوی (Mini Joy)',
    logoInitial: 'MJ',
    logoUrl: getImagePath('/pic/minijoy.png'),
    website: 'https://minijoy.ir',
    location: 'تهران، ونک',
    address: 'تهران، خیابان ونک، خیابان شانزدهم، پلاک ۵',
    description: 'کافه کوچک و دنج با تمرکز بر قهوه تخصصی و دسرهای کوچک. مینی جوی فضایی صمیمی برای لحظات کوتاه اما لذتبخش است.',
    activities: ['طراحی فضای مینیمال', 'بهینه‌سازی منوی قهوه', 'آموزش تیم باریستا', 'مدیریت اجرایی'],
    images: [
      'https://placehold.co/600x400/f8edeb/black?text=Mini+Joy+Sample+1',
      'https://placehold.co/600x400/f9dcc4/black?text=Mini+Joy+Sample+2'
    ],
    connections: ['pt4', 'pt10', 'sp5']
  },
  {
    id: 'p22',
    type: 'project',
    name: 'پلاک هفت (P.7)',
    logoInitial: 'P7',
    logoUrl: getImagePath('/pic/p.7.png'),
    website: 'https://p7cafe.com',
    location: 'تهران، فرمانیه',
    address: 'تهران، خیابان فرمانیه، خیابان یکم، پلاک ۷',
    description: 'کافه مدرن با تمرکز بر معماری خاص و منوی تخصصی نوشیدنی. پلاک هفت با فضایی منحصربه‌فرد، مقصدی برای علاقه‌مندان به طراحی و قهوه است.',
    activities: ['طراحی معماری داخلی خاص', 'طراحی منوی تخصصی', 'مدیریت پروژه', 'آموزش تیم'],
    images: [
      'https://placehold.co/600x400/e5e5e5/black?text=P.7+Sample+1',
      'https://placehold.co/600x400/cccccc/black?text=P.7+Sample+2'
    ],
    connections: ['pt10', 'pt12', 'sp8']
  },
  {
    id: 'p23',
    type: 'project',
    name: 'پرنسا لانژ (Peransa Lounge)',
    logoInitial: 'PL',
    logoUrl: getImagePath('/pic/peransa.png'),
    website: 'https://peransalounge.com',
    location: 'تهران، سعادت‌آباد',
    address: 'تهران، سعادت‌آباد، بلوار دریا، برج پرنسا، طبقه ۱۵',
    description: 'لانژ لوکس با چشماندازی بین‌نظیر از تهران، تخصص در کوکتل‌های مولکولی و قهوه‌های خاص. پرنسا لانژ انتخابی برای شب‌های خاص و رویدادهای خصوصی است.',
    activities: ['طراحی منوی تخصصی کوکتل', 'مدیریت اجرایی لانژ', 'آموزش تیم بارتندری', 'برندینگ لوکس'],
    images: [
      'https://placehold.co/600x400/2d4059/white?text=Peransa+Lounge+Sample+1',
      'https://placehold.co/600x400/ea5455/white?text=Peransa+Lounge+Sample+2'
    ],
    connections: ['pt5', 'pt10', 'sp2', 'sp18']
  },
  {
    id: 'p24',
    type: 'project',
    name: 'بناکار بیسترو (Banakar Bistro)',
    logoInitial: 'BB',
    logoUrl: getImagePath('/pic/banakar.png'),
    website: 'https://banakarbistro.com',
    location: 'اصفهان، بافت تاریخی',
    address: 'اصفهان، میدان نقش جهان، خیابان سپه، پلاک ۱۲',
    description: 'بیسترو مدرن در قلب بافت تاریخی اصفهان، با تلفیقی از معماری اصیل ایرانی و منوی بین‌المللی. بناکار بیسترو تجربه‌ای از طعم‌های مدرن در فضایی تاریخی است.',
    activities: ['طراحی هویت تلفیقی', 'طراحی منوی بیسترو', 'مدیریت اجرایی', 'آموزش تیم'],
    images: [
      'https://placehold.co/600x400/f4a261/white?text=Banakar+Bistro+Sample+1',
      'https://placehold.co/600x400/e76f51/white?text=Banakar+Bistro+Sample+2'
    ],
    connections: ['pt2', 'pt10', 'sp3']
  },
  {
    id: 'p25',
    type: 'project',
    name: 'کافه رستوران آرامش (Aramesh Cafe)',
    logoInitial: 'AC',
    logoUrl: getImagePath('/pic/aramesh.png'),
    website: 'https://aramshcafe.com',
    location: 'اصفهان، خیابان چهارباغ',
    address: 'اصفهان، خیابان چهارباغ بالا، پلاک ۴۵',
    description: 'کافه رستوران با فضایی آرام و دلنشین در یکی از قدیمی‌ترین خیابان‌های اصفهان. آرامش با ارائه غذاهای سنتی و مدرن، تجربه‌ای گرم از میهمانی ایرانی را ارائه می‌دهد.',
    activities: ['طراحی فضای آرامش‌بخش', 'بهینه‌سازی منو', 'آموزش تیم سرویس', 'مدیریت اجرایی'],
    images: [
      'https://placehold.co/600x400/a3b18a/white?text=Aramesh+Cafe+Sample+1',
      'https://placehold.co/600x400/588157/white?text=Aramesh+Cafe+Sample+2'
    ],
    connections: ['pt6', 'pt10', 'sp11']
  },

  {
    id: 'p27',
    type: 'project',
    name: 'لوانت لانژ (Levant Lounge)',
    logoInitial: 'LL',
    logoUrl: getImagePath('/pic/levant.png'),
    website: 'https://levantlounge.com',
    location: 'اصفهان، خیابان چهارباغ عباسی',
    address: 'اصفهان، خیابان چهارباغ عباسی، برج هتل عباسی، طبقه ۱۴',
    description: 'لانژ مدرن با چشماندازی از شهر تاریخی اصفهان، تلفیقی از طعم‌های شرقی و مدرن. لوانت لانژ مقصدی برای شب‌های خاص و منحصربه‌فرد است.',
    activities: ['طراحی منوی تلفیقی شرقی-مدرن', 'مدیریت اجرایی لانژ', 'برندینگ مدرن', 'آموزش تیم حرفه‌ای'],
    images: [
      'https://placehold.co/600x400/264653/white?text=Levant+Lounge+Sample+1',
      'https://placehold.co/600x400/2a9d8f/white?text=Levant+Lounge+Sample+2'
    ],
    connections: ['pt8', 'pt10', 'sp14']
  },
  {
    id: 'p28',
    type: 'project',
    name: 'کافه قنادی نیوشا (Niusha Cafe)',
    logoInitial: 'NC',
    logoUrl: getImagePath('/pic/newsha.png'),
    website: 'https://niushacafe.com',
    location: 'اصفهان، خیابان سپاه',
    address: 'اصفهان، خیابان سپاه، نبش خیابان سلمان، پلاک ۲۰',
    description: 'کافه قنادی سنتی-مدرن با دسرهای خاص و قهوه تخصصی. نیوشا با ارائه شیرینی‌های فرانسوی و ایرانی، طعم‌های اصیل را در فضایی مدرن ارائه می‌دهد.',
    activities: ['طراحی منوی قنادی تخصصی', 'برندینگ و هویت‌سازی', 'آموزش تیم قنادی', 'مدیریت اجرایی'],
    images: [
      'https://placehold.co/600x400/f2cc8f/white?text=Niusha+Cafe+Sample+1',
      'https://placehold.co/600x400/e9c46a/white?text=Niusha+Cafe+Sample+2'
    ],
    connections: ['pt3', 'pt10', 'sp1']
  }
];

export const networkData: NetworkEntity[] = [
  ...partners,
  ...suppliers,
  ...projects
];
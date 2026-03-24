const th = {
  nav: {
    about: "เกี่ยวกับ",
    experience: "ประสบการณ์",
    projects: "ผลงาน",
    skills: "ทักษะ",
    contact: "ติดต่อ",
  },
  header: {
    hireMe: "จ้างฉัน",
  },
  hero: {
    available: "พร้อมรับโอกาสใหม่",
    title: "Full Stack Engineer",
    location: "กรุงเทพฯ ประเทศไทย",
    bio: "เริ่มต้นจากการพัฒนาเกม Unity และสร้าง AR Filter สำหรับ Instagram กับ TikTok แล้วก้าวมาสู่เว็บ — ทั้ง Virtual Tour, E-commerce และแอปหาคู่ ตอนนี้ทำงานอยู่ที่จุดตัดระหว่าง AI กับ Product โดยสร้าง Stable Diffusion Pipeline และเว็บแอปสำหรับผู้บริโภค ฉันสนใจทุกขั้นตอนตั้งแต่ไอเดียจนถึงผลิตภัณฑ์ที่ใช้งานได้จริง",
    viewProjects: "ดูผลงาน",
    getInTouch: "ติดต่อ",
    scroll: "เลื่อน",
    stats: {
      years: "ปีประสบการณ์",
      projects: "โปรเจกต์ที่ส่งมอบ",
      companies: "บริษัท",
    },
  },
  experience: {
    label: "ประวัติการทำงาน",
    title: "ประสบการณ์",
    subtitle: "บริษัทและตำแหน่งที่ฉันเติบโตในฐานะนักพัฒนา",
    location: "ที่ตั้ง",
    items: {
      imai: {
        role: "นักพัฒนา Full Stack",
        highlights: [
          "พัฒนาเว็บแอปพลิเคชัน Full Stack ด้วย Next.js และ FastAPI",
        ],
      },
      vr: {
        role: "นักพัฒนา Full Stack",
        highlights: [
          "สร้างแพลตฟอร์มเว็บแมปใบหน้าด้วย AI โดยใช้ Next.js และ Stable Diffusion รองรับการสร้างภาพแบบ Real-time",
          "พัฒนาระบบ Photobooth แบบ Kiosk พร้อม UI หน้าจอสัมผัสและการส่งภาพผ่านคลาวด์",
          "ออกแบบ Backend API ด้วย FastAPI เพิ่มประสิทธิภาพ Inference Pipeline ลดความล่าช้าในการตอบสนอง",
        ],
      },
      pirsquare: {
        role: "นักพัฒนา Frontend",
        highlights: [
          "สร้างเว็บไซต์ Shopping และ Landing Page แบบ Responsive ด้วย Next.js",
          "พัฒนา UI แอปพลิเคชัน Dating ที่มีฟีเจอร์ครบครันด้วย React",
        ],
      },
      viz: {
        role: "นักพัฒนาเกมและโปรแกรมเมอร์ (ฝึกงาน)",
        highlights: [
          "พัฒนาเว็บไซต์ Virtual Tour และ 3D แบบโต้ตอบบน WordPress",
          "สร้างเกม Unity สำหรับมือถือและเผยแพร่บน iOS และ Android",
          "สร้าง AR Filter สำหรับ Instagram และ TikTok ด้วย Spark AR",
        ],
      },
    },
  },
  projects: {
    label: "ผลงาน",
    title: "โปรเจกต์",
    subtitle: "สิ่งที่ฉันสร้าง — เครื่องมือ AI, แพลตฟอร์มเว็บ, แอปมือถือ และอีกมากมาย",
    showMore: "แสดงอีก {{count}} โปรเจกต์",
    filterAll: "ทั้งหมด",
    filterWeb: "เว็บ",
    filterMobile: "มือถือ",
    filterGame: "เกม",
    filterAr: "AR & ฟิลเตอร์",
    filterOther: "อื่นๆ",
    viewWebsite: "เยี่ยมชมเว็บไซต์",
    viewProject: "ดูโปรเจกต์",
    watchDemo: "ดูวิดีโอ",
    downloadApp: "ดาวน์โหลดแอป",
    close: "ปิด",
    backToProjects: "กลับไปหน้าผลงาน",
    builtWith: "เทคโนโลยีที่ใช้",
    links: "ลิงก์",
    aboutProject: "เกี่ยวกับโปรเจกต์",
    otherProjects: "โปรเจกต์อื่น",
    items: {
      looklike: {
        description: "เครื่องมือสร้างภาพ Photobooth ด้วย AI ที่สร้างภาพพอร์ตเทรตสไตล์จากเซลฟี่ผู้ใช้ โดยใช้ Stable Diffusion และ ComfyUI",
        detail: "Looklike.ai ให้ผู้ใช้อัปโหลดรูปเซลฟี่แล้วรับภาพพอร์ตเทรตที่สร้างโดย AI ในธีมต่างๆ สร้างด้วย Next.js สำหรับฝั่ง Frontend และ FastAPI + Stable Diffusion สำหรับ Inference Pipeline",
      },
      lays: {
        description: "ไมโครไซต์แคมเปญสำหรับ Lay's Thailand ผู้ใช้สามารถสร้างวอลเปเปอร์ AI ส่วนตัวจากรูปภาพในธีม Valentine's Day",
        detail: "เว็บไซต์งาน Valentine's Day (14 กุมภาพันธ์ 2568) สำหรับ Lay's Thailand ผู้ใช้อัปโหลดรูปภาพแล้วรับวอลเปเปอร์ AI ธีม Valentine ที่กำหนดเอง ขับเคลื่อนด้วย ComfyUI",
      },
      sathumart: {
        description: "แพลตฟอร์มเว็บสำหรับสร้างวอลเปเปอร์ธีมพระพิฆเนศด้วย AI ผสมผสานสุนทรียะไทยกับศิลปะสร้างสรรค์",
        detail: "Sathumart สร้างวอลเปเปอร์มงคลพระพิฆเนศด้วย AI ผู้ใช้เลือกสไตล์และรับวอลเปเปอร์ความละเอียดสูงที่ผสมผสานสุนทรียะไทยกับ Diffusion Model",
      },
      gama: {
        description: "เว็บไซต์สมาคมผู้บริหารธุรกิจประกันชีวิตและที่ปรึกษาการเงิน — มีระบบสมาชิก ลงทะเบียน และระบบรางวัล",
        detail: "แพลตฟอร์มสมาคมที่มีฟีเจอร์ครบครัน ได้แก่ ระบบจัดการสมาชิก การสมัครสมาชิก การยืนยันตัวตน และระบบติดตามรางวัล บริหารจัดการผ่านแผงควบคุม Admin บน React",
      },
      kooboon: {
        description: "แอปพลิเคชัน Dating ข้ามแพลตฟอร์ม iOS/Android พร้อมการส่งข้อความ Real-time การจับคู่โปรไฟล์ และการค้นหาตามตำแหน่ง",
        detail: "Kooboon เป็นแอปพลิเคชัน Dating ที่มีฟีเจอร์ครบครันบน iOS และ Android สร้างด้วย React Native สำหรับ Client และ NestJS สำหรับ Backend มีระบบแชทแบบ Real-time และการจับคู่โปรไฟล์",
      },
      gssd: {
        description: "ประสบการณ์ Virtual Tour 3D สำหรับงาน GSSD Expo 2022 — Virtual Tour ที่ใหญ่ที่สุดโดยมีไทยเป็นประเทศร่วมเจ้าภาพในเอเชียแปซิฟิก",
        detail: "เว็บไซต์ Virtual Tour 3D สำหรับงาน Global South-South Development Expo 2022 สร้างด้วย WordPress และ PlayCanvas ช่วยให้ผู้เข้าร่วมนานาชาติสำรวจพาวิลเลียนและนิทรรศการออนไลน์",
      },
      hiddenGhost: {
        description: "เว็บไซต์โปรโมทเกม Detective Mystery บนมือถือ — ได้รับแรงบันดาลใจจาก Phasmophobia พัฒนาในช่วงฝึกงานที่ VIZ STUDIO",
        detail: "เว็บไซต์โปรโมท The Hidden Ghost เกมนักสืบมือถือที่พัฒนาด้วย Unity ระหว่างการฝึกงานที่ VIZ STUDIO เกมได้รับแรงบันดาลใจจาก Phasmophobia มีให้บน iOS และ Android",
      },
      tomthanet: {
        description: "เว็บไซต์ E-commerce สำหรับแบรนด์แฟชั่นไทย Tom Thanet — สร้างด้วย Next.js ระหว่างทำงานที่ Pi R Square",
        detail: "เว็บไซต์ Shopping แบบ Responsive สำหรับ Tom Thanet พัฒนาด้วย Next.js และ Tailwind CSS ระหว่างทำงานที่ Pi R Square",
      },
      pirfloww: {
        description: "เว็บไซต์ Sub-domain สำหรับ Flowwsquare — Landing Page ด้วย Next.js ที่ Pi R Square",
        detail: "Landing Page สำหรับ Flowwsquare พัฒนาด้วย Next.js และ React ระหว่างทำงานที่ Pi R Square",
      },
      alpsAlpine: {
        description: "เว็บไซต์ Virtual Tour 3D สำหรับ Alps Alpine — สร้างด้วย WordPress และ WebGL",
        detail: "ประสบการณ์ Virtual Tour 3D สำหรับ Alps Alpine สร้างระหว่างฝึกงานที่ VIZ STUDIO ด้วย WordPress และ WebGL Viewer",
      },
      siap: {
        description: "เว็บไซต์ Virtual Tour 3D สำหรับ S.I. ASIA PACIFIC CO., LTD. — เดินชมโรงงานแบบดิจิทัล",
        detail: "Virtual Tour 3D เชิงโต้ตอบสำหรับ S.I. ASIA PACIFIC สร้างระหว่างฝึกงานที่ VIZ STUDIO ด้วย WordPress และ PlayCanvas",
      },
      doneEngineering: {
        description: "เว็บไซต์ Virtual Tour สำหรับ Done Engineering and Service Co., Ltd.",
        detail: "เว็บไซต์ Virtual Tour สำหรับ Done Engineering and Service สร้างระหว่างฝึกงานที่ VIZ STUDIO",
      },
      zombieEvil: {
        description: "เกม Zombie Survival แบบ Multiplayer สร้างด้วย Unity และ Photon — ผู้เล่นต้านซอมบี้ออนไลน์ร่วมกัน",
        detail: "Zombie Evil เป็นเกม Multiplayer Real-time สร้างด้วย Unity และ Photon Networking ผู้เล่นเข้าห้องออนไลน์และต้านคลื่นซอมบี้ด้วยกัน พัฒนาเป็น Student Project",
      },
      guessNumber: {
        description: "เกมทายตัวเลข Multiplayer สร้างด้วย Unity และ Photon Networking",
        detail: "เกมทายตัวเลข Real-time Multiplayer ใช้ Unity และ Photon ผู้เล่นแข่งกันทายตัวเลขที่ถูกต้องแบบออนไลน์",
      },
      ellenRaider: {
        description: "เกม 2D Action Platformer สร้างด้วย Unity — Student Project ที่มีตัวละครหลักเป็นผู้หญิง",
        detail: "Ellen Raider เป็น 2D Action Platformer พัฒนาด้วย Unity เป็น Student Project ตัวละครหลักเป็นผู้หญิงที่ต้องต่อสู้ฝ่าด่านต่างๆ",
      },
      eclipse: {
        description: "เกม 2D พัฒนาด้วย Unity ปี 2564 เป็น Student Project",
        detail: "Eclipse เป็นเกม 2D พัฒนาด้วย Unity ในปี 2564 ระหว่างศึกษาปริญญาตรีที่มหาวิทยาลัยรังสิต",
      },
      adventureIsland: {
        description: "Remake เกม Adventure Island คลาสสิก พัฒนาด้วย Unity ปี 2563 เป็น Student Project",
        detail: "Remake ของเกม Adventure Island คลาสสิก พัฒนาด้วย Unity เป็น Student Project ปี 2563 ระหว่างศึกษาปริญญาตรี",
      },
      intoZombieland: {
        description: "เกม 2D Zombie Survival สร้างด้วย Unity — Student Project ยุคแรกในช่วงปริญญาตรี",
        detail: "Into The Zombieland เป็นเกม 2D Unity ยุคแรกที่สร้างระหว่างศึกษาปริญญาตรีที่มหาวิทยาลัยรังสิต",
      },
      jaspal: {
        description: "AR Filter บน Instagram สำหรับคอลเลกชัน Jaspal × Orla Kiely — สร้างด้วย Spark AR",
        detail: "AR Filter บน Instagram สำหรับ Collaboration ระหว่าง Jaspal × Orla Kiely สร้างด้วย Spark AR Studio ให้ผู้ใช้ลองสวมใส่คอลเลกชันแบบดิจิทัล",
      },
      lazada10years: {
        description: "AR Filter บน Instagram สำหรับแคมเปญครบรอบ 10 ปี Lazada — สร้างด้วย Spark AR",
        detail: "AR Filter ฉลองครบรอบ 10 ปี Lazada (#10YearsWithLazada) สร้างด้วย Spark AR Studio ใช้งานบน Instagram และ Facebook",
      },
      ccooDisney: {
        description: "AR Filter บน TikTok สำหรับ Collaboration CC-OO × Disney — สร้างด้วย Spark AR",
        detail: "AR Filter สำหรับ Collaboration CC-OO × Disney สร้างด้วย Spark AR Studio ใช้งานบน TikTok และ Instagram",
      },
      durexPride: {
        description: "AR Filter บน Instagram สำหรับแคมเปญ Durex Come with Pride — ฉลอง Pride Month",
        detail: "AR Filter Pride Month สำหรับแคมเปญ Durex Thailand Come with Pride สร้างด้วย Spark AR Studio ใช้งานบน Instagram",
      },
      fifaQatar: {
        description: "AR Filter สำหรับ FIFA World Cup Qatar 2022 — ฟิลเตอร์ทายผลการแข่งขัน",
        detail: "AR Filter สำหรับ FIFA World Cup Qatar 2022 ให้ผู้ใช้ทายผลการแข่งขันผ่าน Face Tracking Effect สร้างด้วย Spark AR",
      },
      chadchartDance: {
        description: "AR Filter เต้นไวรัลบน TikTok สำหรับแคมเปญหาเสียงผู้ว่าฯ กทม. ชัชชาติ สิทธิพันธุ์",
        detail: "AR Filter เต้นไวรัลสำหรับแคมเปญหาเสียงผู้ว่าฯ กรุงเทพ ชัชชาติ สิทธิพันธุ์ ผู้ใช้สามารถ Overlay หน้าและเต้นตาม สร้างด้วย Spark AR",
      },
      chadchartMask: {
        description: "AR Mask Filter บน Instagram สำหรับแคมเปญหาเสียงผู้ว่าฯ กทม. ชัชชาติ สิทธิพันธุ์",
        detail: "AR Mask Filter บน Instagram สำหรับแคมเปญผู้ว่าฯ ชัชชาติ สิทธิพันธุ์ สร้างด้วย Spark AR Studio",
      },
      portfolio3d: {
        description: "เว็บ Portfolio 3D เชิงทดลองสร้างด้วย Three.js และ WebGL — เวอร์ชัน Beta ปี 2566",
        detail: "Portfolio 3D เชิงโต้ตอบที่สร้างด้วย Three.js และ WebGL เป็นการทดลองสร้างสรรค์ในปี 2566",
      },
      covid19: {
        description: "วิดีโอ Animation 2D เกี่ยวกับการป้องกัน COVID-19 — สร้างเป็น Student Project ปี 2563",
        detail: "สั้น Animation 2D เกี่ยวกับมาตรการป้องกัน COVID-19 สร้างเป็น Student Project ระหว่างศึกษาปริญญาตรี",
      },
    },
  },
  skills: {
    label: "เทคโนโลยี",
    title: "ทักษะ",
    subtitle: "เทคโนโลยีและเครื่องมือที่ฉันใช้งานประจำ",
    categories: {
      frontend: "ฟรอนต์เอนด์",
      backend: "แบ็กเอนด์",
      mobileDesktop: "มือถือและเดสก์ท็อป",
      aiCreative: "AI และ Creative",
      dataCloud: "ข้อมูลและคลาวด์",
      tools: "เครื่องมือ",
    },
  },
  education: {
    label: "ข้อมูลพื้นฐาน",
    title: "การศึกษา",
    subtitle: "พื้นฐานทางวิชาการและใบรับรองด้านภาษา",
    universityLabel: "มหาวิทยาลัย",
    universityName: "มหาวิทยาลัยรังสิต กรุงเทพฯ",
    certsLabel: "ใบรับรอง",
    certsTitle: "ภาษาและความสามารถ",
    items: [
      {
        institution: "มหาวิทยาลัยรังสิต",
        degree: "วิทยาศาสตรมหาบัณฑิต",
        field: "ระบบสารสนเทศเพื่อการจัดการ (MIS)",
        period: "2565 – 2567",
        highlights: [
          "วิจัยระดับบัณฑิตศึกษาด้านระบบสารสนเทศ",
          "เน้นสถาปัตยกรรมซอฟต์แวร์ระดับองค์กร",
        ],
      },
      {
        institution: "มหาวิทยาลัยรังสิต",
        degree: "วิทยาศาสตรบัณฑิต",
        field: "เทคโนโลยีสารสนเทศ",
        period: "2561 – 2565",
        highlights: [
          "จบการศึกษาด้วยเกียรตินิยม",
          "เชี่ยวชาญวิศวกรรมซอฟต์แวร์และการพัฒนาเกม",
        ],
      },
    ],
    certifications: [
      {
        name: "RSU-PET B2",
        framework: "CEFR",
        issuer: "มหาวิทยาลัยรังสิต",
        description: "ความสามารถภาษาอังกฤษ — ระดับกลาง-สูง",
        year: "2566",
      },
    ],
  },
  contact: {
    label: "ติดต่อ",
    title: "มาทำงานด้วยกัน",
    subtitle:
      "ฉันกำลังเปิดรับโอกาสใหม่ ไม่ว่าคุณจะมีโปรเจกต์ในใจหรือแค่ต้องการทักทาย กล่องจดหมายของฉันเปิดตลอดเวลา",
    location: "กรุงเทพฯ ประเทศไทย",
  },
  footer: {
    built: "สร้างด้วย Vite 8 · React · Tailwind CSS",
  },
} as const;

export default th;

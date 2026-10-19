// Translations Dictionary. Texts mirror the CV (CV_RU / CV_EN / CV_AM).
const SKILL_TAGS_COMMON = {
    os: ["Windows 7–11", "Windows Server", "Ubuntu", "Debian", "Linux Mint"],
    remote: ["AnyDesk", "RDP", "Help desk"],
    office: ["MS Office", "Google Workspace", "Figma", "Canva", "Premiere Pro", "CapCut"]
};
const translations = {
    ru: {
        page_title: "Айк Оганнисян — системный администратор",
        nav_about: "Обо мне",
        nav_experience: "Опыт",
        nav_skills: "Навыки",
        nav_projects: "Проекты",
        nav_contact: "Контакты",
        hero_greeting: 'Айк Оганнисян <br><span class="text-gradient">системный администратор</span>',
        hero_prefix: "Я ",
        hero_desc: "IT-поддержка офисов, сети и Wi-Fi, видеонаблюдение и системы безопасности — на выезде, по телефону и удалённо. Ереван.",
        hero_btn_experience: "Опыт работы",
        hero_btn_contact: "Связаться",
        stat_exp: "лет опыта работы",
        stat_it: "лет в IT-поддержке",
        stat_langs: "языка: HY · RU · EN",
        about_title: 'Обо <span class="text-gradient">мне</span>',
        about_subtitle: "Системный администратор и IT-поддержка",
        about_p1: "Более 5 лет практического опыта поддержки офисов. В DG Computers обслуживаю IT клиентов и монтирую системы безопасности. Чем занимаюсь:",
        about_li1: "Поддержкой пользователей 1–2 линии: на выезде, по телефону, через AnyDesk/RDP",
        about_li2: "Настройкой сетей: роутеры, коммутаторы, Wi-Fi, VPN (Tailscale)",
        about_li3: "Монтажом видеонаблюдения Dahua/Hikvision, сигнализации и СКУД",
        about_li4: "Диагностикой и ремонтом ПК, ноутбуков, принтеров и МФУ",
        about_li5: "Автоматизацией рутины на PowerShell и собственными инструментами для админа",
        about_p2: "Быстро осваиваю новое и самостоятельно решаю нестандартные задачи — от кабеля и железа до настройки сервера.",
        about_cv: "Скачать CV",
        cv_file: "files/cv-ru.pdf",
        experience_title: 'Опыт <span class="text-gradient">работы</span>',
        experience: [
            { c: "DG Computers", p: "04.2026 – н. в.", r: "Системный администратор / монтажник систем безопасности", d: [
                "Поддержка пользователей 1–2 линии: на выезде, по телефону, через AnyDesk/RDP",
                "Настройка и обслуживание сетей: роутеры, коммутаторы, Wi-Fi, VPN (Tailscale)",
                "Монтаж и обслуживание видеонаблюдения Dahua/Hikvision (NVR, IP-камеры, ONVIF/RTSP)",
                "Монтаж охранных систем и сигнализации, СКУД",
                "Учёт заявок и отчёты о выполненных работах по каждому клиенту"] },
            { c: "Hotel Orbeli", p: "03.2026 – н. в.", r: "Ночной администратор и системный администратор", d: [
                "Ночные смены на ресепшене; IT-поддержка отеля: ПК, сеть, Wi-Fi, видеонаблюдение"] },
            { c: "Hotel Alpha", p: "02.2024 – 03.2026", r: "Ночной администратор", d: [] },
            { c: "Национальная библиотека Армении", p: "03.2022 – 03.2025", r: "Системный администратор", d: [
                "Техническая поддержка сотрудников: ПК, ноутбуки, принтеры, сканеры, МФУ",
                "Установка и сопровождение Windows, офисного ПО и библиотечных систем",
                "Диагностика неисправностей, ремонт ПК и замена комплектующих",
                "Обслуживание локальной сети: коммутаторы, СКС, проблемы с подключением",
                "Администрирование рабочих мест: обновления, резервное копирование, базовая безопасность",
                "Монтаж и обслуживание видеонаблюдения и контроля доступа",
                "Документирование IT-инфраструктуры и инвентаризация оборудования"] },
            { c: "Energy Plaza", p: "08.2019 – 09.2022", r: "Сотрудник безопасности", d: [] },
            { c: "A-Security", p: "09.2018 – 02.2019", r: "Сотрудник безопасности", d: [] }
        ],
        edu_title: "Образование и курсы",
        edu: [
            ["Национальный университет архитектуры и строительства Армении", "Управление информационными технологиями · 2 года обучения"],
            ["Национальный политехнический университет Армении", "Техническая эксплуатация электрооборудования"],
            ["HTML, CSS и JavaScript — Инновационный центр Microsoft", "08.2022 – 12.2022"]
        ],
        langs_title: "Языки",
        langs: [["Армянский", "родной"], ["Русский", "свободно"], ["Английский", "средний (B1)"]],
        skills_title: 'Мои <span class="text-gradient">навыки</span>',
        skills: [
            ["ОС", SKILL_TAGS_COMMON.os],
            ["Сети", ["TCP/IP", "DHCP", "DNS", "VPN (Tailscale)", "LAN/Wi-Fi", "коммутаторы", "СКС"]],
            ["Системы безопасности", ["Dahua", "Hikvision", "NVR/DVR", "ONVIF", "RTSP", "сигнализация", "СКУД"]],
            ["Удалённая поддержка", SKILL_TAGS_COMMON.remote.concat("1–2 линия")],
            ["Скрипты", ["PowerShell", "Python (изучаю)", "HTML/CSS"]],
            ["Железо", ["ремонт ПК и ноутбуков", "принтеры", "МФУ", "сканеры"]],
            ["Офис и медиа", SKILL_TAGS_COMMON.office]
        ],
        projects_title: 'Мои <span class="text-gradient">проекты</span>',
        btn_view_project: "Подробнее",
        contact_title: 'Давайте <span class="text-gradient">на связи</span>',
        form_name: "Имя",
        form_name_ph: "Ваше имя",
        form_msg: "Сообщение",
        form_msg_ph: "Опишите задачу...",
        form_btn: "Отправить сообщение",
        form_subject: "Сообщение с сайта",
        social_title: "Контакты и ссылки",
        social_desc: "Открыт к предложениям о работе и разовым задачам: сеть, камеры, ПК. Отвечаю быстро!",
        phone: "Телефон",
        footer_text: "&copy; 2026 Айк Оганнисян · Ереван",
        btn_github: "Смотреть на GitHub",
        btn_live: "Live Demo",
        dynamic_texts: [
            "настраиваю сети и Wi-Fi.",
            "монтирую видеонаблюдение.",
            "поддерживаю офисы удалённо и на выезде.",
            "автоматизирую рутину на PowerShell.",
            "чиню ПК и оргтехнику."
        ],
        proj_updated: "Обновлён",
        proj_private: "Приватный",
        proj_project_word: "проект",
        proj_no_desc: "Описание пока не добавлено.",
        proj_error: "Не удалось загрузить проекты.",
        proj_view_profile: "Открыть профиль на GitHub"
    },
    en: {
        page_title: "Hayk Hovhannisyan — System Administrator",
        nav_about: "About",
        nav_experience: "Experience",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_greeting: 'Hayk Hovhannisyan <br><span class="text-gradient">System Administrator</span>',
        hero_prefix: "I ",
        hero_desc: "IT support for offices, networks and Wi-Fi, CCTV and security systems — on-site, by phone and remotely. Yerevan, Armenia.",
        hero_btn_experience: "Experience",
        hero_btn_contact: "Get in Touch",
        stat_exp: "years of work experience",
        stat_it: "years in IT support",
        stat_langs: "languages: HY · RU · EN",
        about_title: '<span class="text-gradient">About</span> Me',
        about_subtitle: "System Administrator & IT Support",
        about_p1: "5+ years of hands-on experience supporting offices. At DG Computers I support client companies and install security systems. What I do:",
        about_li1: "1st–2nd line user support: on-site, by phone, via AnyDesk/RDP",
        about_li2: "Network setup: routers, switches, Wi-Fi, VPN (Tailscale)",
        about_li3: "Dahua/Hikvision CCTV, alarm and access control installation",
        about_li4: "Diagnostics and repair of PCs, laptops, printers and MFPs",
        about_li5: "Automating routine work with PowerShell and my own admin tools",
        about_p2: "Fast learner, used to solving non-standard problems on my own — from cabling and hardware to server setup.",
        about_cv: "Download CV",
        cv_file: "files/Hayk%20Hovhannisyan.pdf",
        experience_title: 'Work <span class="text-gradient">Experience</span>',
        experience: [
            { c: "DG Computers", p: "04/2026 – present", r: "System Administrator / Security Systems Installer", d: [
                "First- and second-line support for client offices: on-site, by phone, via AnyDesk/RDP",
                "Network setup and maintenance: routers, switches, Wi-Fi, VPN (Tailscale)",
                "Installation and maintenance of Dahua/Hikvision CCTV systems (NVR, IP cameras, ONVIF/RTSP)",
                "Installation of security and alarm systems, access control",
                "Request tracking and work reports for each client"] },
            { c: "Hotel Orbeli", p: "03/2026 – present", r: "Night Administrator & System Administrator", d: [
                "Night front desk shift; IT support for the hotel: PCs, network, Wi-Fi, CCTV"] },
            { c: "Hotel Alpha", p: "02/2024 – 03/2026", r: "Night Administrator", d: [] },
            { c: "National Library of Armenia", p: "03/2022 – 03/2025", r: "System Administrator", d: [
                "Technical support for staff: PCs, laptops, printers, scanners, MFPs",
                "Installed and maintained Windows, office software and specialized library systems",
                "Diagnosed hardware and software faults; repaired PCs and replaced components",
                "Maintained the LAN: switches, cabling, connectivity troubleshooting",
                "Workstation administration: updates, backups, basic security",
                "Installed and maintained CCTV and access control systems",
                "Documented IT infrastructure and kept the equipment inventory"] },
            { c: "Energy Plaza", p: "08/2019 – 09/2022", r: "Security Officer", d: [] },
            { c: "A-Security", p: "09/2018 – 02/2019", r: "Security Officer", d: [] }
        ],
        edu_title: "Education & Courses",
        edu: [
            ["National University of Architecture and Construction of Armenia", "Information Technology Management · 2 years of study"],
            ["National Polytechnic University of Armenia", "Technical Maintenance of Electrical Equipment"],
            ["HTML, CSS and JavaScript — Microsoft Innovation Center", "08/2022 – 12/2022"]
        ],
        langs_title: "Languages",
        langs: [["Armenian", "native"], ["Russian", "fluent"], ["English", "intermediate (B1)"]],
        skills_title: 'My <span class="text-gradient">Skills</span>',
        skills: [
            ["Systems", SKILL_TAGS_COMMON.os],
            ["Networks", ["TCP/IP", "DHCP", "DNS", "VPN (Tailscale)", "LAN/Wi-Fi", "switches", "cabling"]],
            ["Security systems", ["Dahua", "Hikvision", "NVR/DVR", "ONVIF", "RTSP", "alarm", "access control"]],
            ["Remote support", SKILL_TAGS_COMMON.remote.concat("1st–2nd line")],
            ["Scripting", ["PowerShell", "Python (learning)", "HTML/CSS"]],
            ["Hardware", ["PC & laptop repair", "printers", "MFPs", "scanners"]],
            ["Office & media", SKILL_TAGS_COMMON.office]
        ],
        projects_title: 'My <span class="text-gradient">Projects</span>',
        btn_view_project: "View Details",
        contact_title: 'Let’s <span class="text-gradient">Talk</span>',
        form_name: "Name",
        form_name_ph: "Your name",
        form_msg: "Message",
        form_msg_ph: "Describe the task...",
        form_btn: "Send Message",
        form_subject: "Message from the website",
        social_title: "Contacts & Links",
        social_desc: "Open to job offers and one-off tasks: networks, cameras, PCs. I reply fast!",
        phone: "Phone",
        footer_text: "&copy; 2026 Hayk Hovhannisyan · Yerevan",
        btn_github: "View on GitHub",
        btn_live: "Live Demo",
        dynamic_texts: [
            "set up networks and Wi-Fi.",
            "install CCTV systems.",
            "support offices on-site and remotely.",
            "automate routine with PowerShell.",
            "repair PCs and office hardware."
        ],
        proj_updated: "Updated",
        proj_private: "Private",
        proj_project_word: "project",
        proj_no_desc: "No description yet.",
        proj_error: "Could not load projects.",
        proj_view_profile: "Open GitHub profile"
    },
    hy: {
        page_title: "Հայկ Հովհաննիսյան — համակարգային ադմինիստրատոր",
        nav_about: "Իմ մասին",
        nav_experience: "Փորձ",
        nav_skills: "Հմտություններ",
        nav_projects: "Նախագծեր",
        nav_contact: "Կապ",
        hero_greeting: 'Հայկ Հովհաննիսյան <br><span class="text-gradient">համակարգային ադմինիստրատոր</span>',
        hero_prefix: "",
        hero_desc: "Գրասենյակների ՏՏ աջակցություն, ցանցեր և Wi-Fi, տեսահսկում և անվտանգության համակարգեր՝ տեղում, հեռախոսով և հեռակա։ Երևան։",
        hero_btn_experience: "Աշխատանքային փորձ",
        hero_btn_contact: "Կապվել",
        stat_exp: "տարվա աշխատանքային փորձ",
        stat_it: "տարի ՏՏ աջակցությունում",
        stat_langs: "լեզու՝ HY · RU · EN",
        about_title: '<span class="text-gradient">Իմ</span> մասին',
        about_subtitle: "Համակարգային ադմինիստրատոր և ՏՏ աջակցություն",
        about_p1: "Գրասենյակների սպասարկման 5+ տարվա գործնական փորձ։ DG Computers-ում սպասարկում եմ հաճախորդների ՏՏ համակարգերը և տեղադրում անվտանգության համակարգեր։ Ինչով եմ զբաղվում.",
        about_li1: "Օգտատերերի աջակցություն (1–2-րդ գիծ)՝ տեղում, հեռախոսով, AnyDesk/RDP-ով",
        about_li2: "Ցանցերի կարգավորում՝ երթուղիչներ, կոմուտատորներ, Wi-Fi, VPN (Tailscale)",
        about_li3: "Dahua/Hikvision տեսահսկման, ազդանշանային և մուտքի վերահսկման համակարգերի տեղադրում",
        about_li4: "Համակարգիչների, նոութբուքերի, տպիչների ախտորոշում և վերանորոգում",
        about_li5: "Առօրյա աշխատանքի ավտոմատացում PowerShell-ով և սեփական գործիքներ",
        about_p2: "Արագ եմ յուրացնում նորը և ինքնուրույն լուծում ոչ ստանդարտ խնդիրներ՝ մալուխից ու սարքավորումից մինչև սերվերի կարգավորում։",
        about_cv: "Ներբեռնել CV",
        cv_file: "files/cv-hy.pdf",
        experience_title: 'Աշխատանքային <span class="text-gradient">փորձ</span>',
        experience: [
            { c: "DG Computers", p: "04.2026 – այժմ", r: "Համակարգային ադմինիստրատոր / անվտանգության համակարգերի մոնտաժող", d: [
                "Օգտատերերի աջակցություն (1–2-րդ գիծ)՝ տեղում, հեռախոսով, AnyDesk/RDP-ով",
                "Ցանցերի կարգավորում և սպասարկում՝ երթուղիչներ, կոմուտատորներ, Wi-Fi, VPN (Tailscale)",
                "Dahua/Hikvision տեսահսկման համակարգերի տեղադրում և սպասարկում (NVR, IP տեսախցիկներ, ONVIF/RTSP)",
                "Անվտանգության և ազդանշանային համակարգերի, մուտքի վերահսկման տեղադրում",
                "Հայտերի հաշվառում և կատարված աշխատանքների հաշվետվություններ"] },
            { c: "Hotel Orbeli", p: "03.2026 – այժմ", r: "Գիշերային ադմինիստրատոր և համակարգային ադմինիստրատոր", d: [
                "Գիշերային հերթափոխ ընդունարանում. հյուրանոցի ՏՏ աջակցություն՝ համակարգիչներ, ցանց, Wi-Fi, տեսահսկում"] },
            { c: "Hotel Alpha", p: "02.2024 – 03.2026", r: "Գիշերային ադմինիստրատոր", d: [] },
            { c: "Հայաստանի ազգային գրադարան", p: "03.2022 – 03.2025", r: "Համակարգային ադմինիստրատոր", d: [
                "Աշխատակիցների տեխնիկական աջակցություն՝ համակարգիչներ, նոութբուքեր, տպիչներ, սկաներներ",
                "Windows-ի, գրասենյակային և գրադարանային մասնագիտացված ծրագրերի տեղադրում և սպասարկում",
                "Անսարքությունների ախտորոշում, համակարգիչների վերանորոգում և մասերի փոխարինում",
                "Տեղային ցանցի սպասարկում՝ կոմուտատորներ, մալուխային ցանց, կապի խնդիրների լուծում",
                "Աշխատատեղերի ադմինիստրավորում՝ թարմացումներ, պահուստավորում, հիմնական անվտանգություն",
                "Տեսահսկման և մուտքի վերահսկման համակարգերի տեղադրում և սպասարկում",
                "ՏՏ ենթակառուցվածքի փաստաթղթավորում և սարքավորումների գույքագրում"] },
            { c: "Energy Plaza", p: "08.2019 – 09.2022", r: "Անվտանգության աշխատակից", d: [] },
            { c: "A-Security", p: "09.2018 – 02.2019", r: "Անվտանգության աշխատակից", d: [] }
        ],
        edu_title: "Կրթություն և դասընթացներ",
        edu: [
            ["Ճարտարապետության և շինարարության Հայաստանի ազգային համալսարան", "Տեղեկատվական տեխնոլոգիաների կառավարում · 2 տարի ուսում"],
            ["Հայաստանի ազգային պոլիտեխնիկական համալսարան", "Էլեկտրական սարքավորումների տեխնիկական շահագործում"],
            ["HTML, CSS և JavaScript — Microsoft-ի նորարարական կենտրոն", "08.2022 – 12.2022"]
        ],
        langs_title: "Լեզուներ",
        langs: [["Հայերեն", "մայրենի"], ["Ռուսերեն", "ազատ"], ["Անգլերեն", "միջին (B1)"]],
        skills_title: 'Իմ <span class="text-gradient">հմտությունները</span>',
        skills: [
            ["ՕՀ", SKILL_TAGS_COMMON.os],
            ["Ցանցեր", ["TCP/IP", "DHCP", "DNS", "VPN (Tailscale)", "LAN/Wi-Fi", "կոմուտատորներ"]],
            ["Անվտանգություն", ["Dahua", "Hikvision", "NVR/DVR", "ONVIF", "RTSP", "ազդանշանային", "մուտքի վերահսկում"]],
            ["Հեռակա աջակցություն", SKILL_TAGS_COMMON.remote.concat("1–2-րդ գիծ")],
            ["Սկրիպտներ", ["PowerShell", "Python (սովորում եմ)", "HTML/CSS"]],
            ["Սարքավորումներ", ["համակարգիչների վերանորոգում", "տպիչներ", "սկաներներ"]],
            ["Գրասենյակ և մեդիա", SKILL_TAGS_COMMON.office]
        ],
        projects_title: 'Իմ <span class="text-gradient">նախագծերը</span>',
        btn_view_project: "Ավելին",
        contact_title: 'Մնանք <span class="text-gradient">կապի մեջ</span>',
        form_name: "Անուն",
        form_name_ph: "Ձեր անունը",
        form_msg: "Հաղորդագրություն",
        form_msg_ph: "Նկարագրեք խնդիրը...",
        form_btn: "Ուղարկել",
        form_subject: "Հաղորդագրություն կայքից",
        social_title: "Կոնտակտներ և հղումներ",
        social_desc: "Բաց եմ աշխատանքի առաջարկների և միանգամյա առաջադրանքների համար՝ ցանց, տեսախցիկներ, համակարգիչներ։ Արագ եմ պատասխանում։",
        phone: "Հեռախոս",
        footer_text: "&copy; 2026 Հայկ Հովհաննիսյան · Երևան",
        btn_github: "Դիտել GitHub-ում",
        btn_live: "Live Demo",
        dynamic_texts: [
            "Կարգավորում եմ ցանցեր և Wi-Fi։",
            "Տեղադրում եմ տեսահսկում։",
            "Սպասարկում եմ գրասենյակներ՝ տեղում և հեռակա։",
            "Ավտոմատացնում եմ աշխատանքը PowerShell-ով։",
            "Վերանորոգում եմ համակարգիչներ։"
        ],
        proj_updated: "Թարմացվել է",
        proj_private: "Փակ",
        proj_project_word: "նախագիծ",
        proj_no_desc: "Նկարագրությունը դեռ ավելացված չէ։",
        proj_error: "Չհաջողվեց բեռնել նախագծերը։",
        proj_view_profile: "Բացել GitHub պրոֆիլը"
    }
};

let currentLang = 'ru';
window.translations = translations;
window.currentLang = currentLang;

// DOM Elements for i18n
const langSelect = document.getElementById('lang-select');
const elementsToTranslate = document.querySelectorAll('[data-i18n]');
const heroGreeting = document.getElementById('hero-greeting');
const aboutTitle = document.getElementById('about-title');
const skillsTitle = document.getElementById('skills-title');
const projectsTitle = document.getElementById('projects-title');
const contactTitle = document.getElementById('contact-title');
const experienceTitle = document.getElementById('experience-title');

function esc(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Experience timeline, education, languages and skill groups are lists, so they
// are rendered from the dictionary instead of one data-i18n per element.
function renderCvSections(dict) {
    document.getElementById('timeline').innerHTML = dict.experience.map(job => `
        <li class="timeline-item">
            <div class="glass-card timeline-card">
                <div class="timeline-head">
                    <h3>${esc(job.c)}</h3>
                    <span class="timeline-period">${esc(job.p)}</span>
                </div>
                <p class="timeline-role">${esc(job.r)}</p>
                ${job.d.length ? `<ul>${job.d.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
            </div>
        </li>`).join('');
    document.getElementById('edu-list').innerHTML = dict.edu
        .map(([title, sub]) => `<li><strong>${esc(title)}</strong><span>${esc(sub)}</span></li>`).join('');
    document.getElementById('langs-list').innerHTML = dict.langs
        .map(([lang, level]) => `<li><strong>${esc(lang)}</strong><span>${esc(level)}</span></li>`).join('');
    document.getElementById('skills-groups').innerHTML = dict.skills.map(([group, tags]) => `
        <div class="glass-card skill-group">
            <h3>${esc(group)}</h3>
            <div class="skill-chips">${tags.map(tag => `<span>${esc(tag)}</span>`).join('')}</div>
        </div>`).join('');
}

function setLanguage(lang) {
    if (!translations[lang]) lang = 'ru';
    currentLang = lang;
    window.currentLang = currentLang;
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch (e) { /* private mode */ }
    const dict = translations[lang];

    elementsToTranslate.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (typeof dict[key] === 'string') {   // '' is valid (hy has no hero prefix)
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = dict[key];
            } else {
                el.innerHTML = dict[key]; // use innerHTML for cases like &copy;
            }
        }
    });

    // Handle special titles with HTML
    heroGreeting.innerHTML = dict.hero_greeting;
    aboutTitle.innerHTML = dict.about_title;
    skillsTitle.innerHTML = dict.skills_title;
    projectsTitle.innerHTML = dict.projects_title;
    contactTitle.innerHTML = dict.contact_title;
    experienceTitle.innerHTML = dict.experience_title;
    document.getElementById('cv-link').href = dict.cv_file;
    renderCvSections(dict);
    
    // Update Document Title
    document.title = dict.page_title;

    // Reset Dynamic Typing
    resetTyping();
}

langSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
});

// Dynamic Typing Effect
const typedTextSpan = document.getElementById("typed-text");
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;
let typeTimeout;

function type() {
    const textArray = translations[currentLang].dynamic_texts;
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        typeTimeout = setTimeout(type, typingDelay);
    } else {
        typeTimeout = setTimeout(erase, newTextDelay);
    }
}

function erase() {
    const textArray = translations[currentLang].dynamic_texts;
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        typeTimeout = setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        typeTimeout = setTimeout(type, typingDelay + 500);
    }
}

function resetTyping() {
    clearTimeout(typeTimeout);
    typedTextSpan.textContent = '';
    textArrayIndex = 0;
    charIndex = 0;
    typeTimeout = setTimeout(type, 500);
}


// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// The inline <head> script already applied the saved theme before first paint;
// here we only sync the toggle's icon with it.
themeToggle.textContent = htmlEl.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    try { localStorage.setItem('theme', newTheme); } catch (e) { /* private mode */ }
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    updateParticlesColor();
});

// The custom cursor is gone: a DOM element can only ever be repainted a frame
// or more after the pointer moves, so it always lagged the real cursor. The
// native one is drawn by the compositor and never lags.

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// 3D tilt + glow tracking. The card's box is measured once on enter instead of
// on every mousemove, so moving the pointer no longer forces a layout per frame.
function attachTilt(el) {
    let rect = null;
    el.addEventListener('mouseenter', () => { rect = el.getBoundingClientRect(); });
    el.addEventListener('mousemove', e => {
        if (!rect) rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
        el.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
    });
    el.addEventListener('mouseleave', () => {
        rect = null;
        el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
}

// Apply interactive effects to dynamically-added project cards (github-projects.js).
window.enhanceProjectCards = function (cards) {
    cards.forEach(card => {
        attachTilt(card);
        observer.observe(card);   // scroll-reveal
    });
};

// Smooth Scrolling
document.querySelectorAll('.nav-links a[href^="#"], .hero-actions a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('.glass-nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// Modal Logic — project cards are injected by github-projects.js, which
// populates and opens this same modal. Here we keep only the close handlers.
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalBackdrop = document.querySelector('.modal-backdrop');

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});

// Contact form — no backend here, so hand the message to the visitor's mail app.
const CONTACT_EMAIL = 'haykohovhann@gmail.com';
document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const from = document.getElementById('email').value;
    const subject = `${translations[currentLang].form_subject}: ${document.getElementById('name').value}`;
    const body = `${document.getElementById('message').value}\n\n${from}`;
    window.location.href =
        `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// 3D Tilt Effect for Cards (also sets --mouse-x/--mouse-y for the glow trace,
// which used to be a second, duplicate mousemove listener on the same cards).
document.querySelectorAll('.tilt-card').forEach(attachTilt);


// Particles Background
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleColor = htmlEl.getAttribute('data-theme') === 'light' ? 'rgba(0, 119, 255, 0.2)' : 'rgba(0, 240, 255, 0.2)';

// Debounced, and ignores height-only changes: on mobile the browser chrome
// hiding/showing fires resize constantly while scrolling.
let resizeTimer;
window.addEventListener('resize', () => {
    if (canvas.width === window.innerWidth) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }, 200);
});

function updateParticlesColor() {
    particleColor = htmlEl.getAttribute('data-theme') === 'light' ? 'rgba(0, 119, 255, 0.4)' : 'rgba(0, 240, 255, 0.2)';
    initParticles();
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.005;

        // Wrap around
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

// Magnetic Elements
const magneticElements = document.querySelectorAll('.btn, .theme-toggle, .lang-select, .modal-close, .social-link-item');
magneticElements.forEach(el => {
    let rect = null;
    el.addEventListener('mouseenter', () => { rect = el.getBoundingClientRect(); });
    el.addEventListener('mousemove', (e) => {
        if (!rect) rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) - rect.width / 2;
        const y = (e.clientY - rect.top) - rect.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
        rect = null;
        el.style.transform = '';
    });
});

// Preloader — hidden as soon as the page is loaded (the old 800ms artificial
// delay just held the finished page behind a spinner).
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    preloader.style.opacity = '0';
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
});

// Scroll Progress Bar — measured once per frame and drawn with scaleX, so
// scrolling no longer triggers a layout read + width change per scroll event.
const scrollProgress = document.getElementById('scroll-progress');
let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollProgress || scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        const progress = scrollable > 0 ? doc.scrollTop / scrollable : 0;
        scrollProgress.style.transform = `scaleX(${progress})`;
        scrollTicking = false;
    });
}, { passive: true });

// Initialization
document.addEventListener("DOMContentLoaded", function() {
    let saved = null;
    try { saved = localStorage.getItem('lang'); } catch (e) { /* private mode */ }
    langSelect.value = translations[saved] ? saved : langSelect.value;
    setLanguage(langSelect.value);

    // Skip the particle loop entirely when the visitor asked for reduced motion.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        initParticles();
        animateParticles();
    }
});

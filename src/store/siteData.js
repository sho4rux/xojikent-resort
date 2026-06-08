import { reactive, watch } from 'vue'

const STORAGE_KEY = 'hojikent_site_data_v2'

export const iconPresets = {
  mountain: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 8C8 10 5.9 16.17 3.82 22"/><path d="M4 6c0 4 8 3.5 8-1S16 0 20 0c0 7-5 12-8 12-3.5 0-8-3.5-8-7"/></svg>`,
  home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  food: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2"/><path d="M18 15c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/></svg>`,
  activity: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  location: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  phone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  email: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  clock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  star: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  wifi: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
  settings: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
  pool: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20"/><path d="M2 16.5c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0"/><path d="M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M14 4l-2 8"/></svg>`,
  spa: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  car: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  mountain_view: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 20h18L12 4z"/><path d="M3 20l4.5-9 4 5 3.5-5L20 20"/></svg>`,
  bed: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16"/><path d="M22 4v16"/><path d="M2 8h20"/><path d="M2 16h20"/><path d="M6 8v8"/><path d="M18 8v8"/></svg>`,
}

export const availableImages = [
  '/images/hero_building.jpg',
  '/images/outdoor_1.jpg',
  '/images/outdoor_2.jpg',
  '/images/outdoor_3.jpg',
  '/images/outdoor_4.jpg',
  '/images/outdoor_5.jpg',
  '/images/outdoor_6.jpg',
  '/images/outdoor_7.jpg',
  '/images/about_1.jpg',
  '/images/about_2.jpg',
  '/images/room_1.jpg',
  '/images/room_2.jpg',
  '/images/room_3.jpg',
  '/images/room_4.jpg',
  '/images/room_5.jpg',
  '/images/room_6.jpg',
  '/images/room_7.jpg',
  '/images/room_8.jpg',
  '/images/room_9.jpg',
  '/images/room_10.jpg',
  '/images/room_11.jpg',
  '/images/room_12.jpg',
  '/images/room_13.jpg',
  '/images/room_14.jpg',
  '/images/room_15.jpg',
  '/images/room_16.jpg',
  '/images/room_17.jpg',
]

const defaultData = {
  nav: {
    about: 'О пансионате',
    services: 'Услуги',
    gallery: 'Галерея',
    contact: 'Контакты',
    book: 'Забронировать',
  },
  hero: {
    badge: 'Пансионат Ходжикент',
    title: 'HOJIKENT',
    titleItalic: 'OROMGOHI',
    subtitle: 'Ваш идеальный отдых\nв сердце горной природы',
    btnBook: 'Забронировать отдых',
    btnLearn: 'Узнать больше',
    scrollText: 'Прокрутите вниз',
    images: [
      { src: '/images/hero_building.jpg', rotation: 0 },
      { src: '/images/outdoor_5.jpg', rotation: 0 },
      { src: '/images/outdoor_2.jpg', rotation: 0 },
      { src: '/images/outdoor_6.jpg', rotation: 0 },
    ],
    stats: [
      { value: '254', label: 'места в пансионате' },
      { value: '24/7', label: 'обслуживание' },
      { value: '3-разовое', label: 'питание включено' },
    ],
  },
  about: {
    sectionLabel: 'О пансионате',
    title: 'Пансионат Ходжикент –\nотдых для души и тела',
    paragraphs: [
      'Расположен в 70 км от Ташкента в Угам-Чаткальском национальном природном парке, в предгорьях Тян-Шаня, на высоте 700 м над уровнем моря.',
      'Чистый горный воздух очищает дыхательные пути, пешие прогулки и экскурсии укрепляют здоровье. Мы предлагаем комфортное размещение, 3-разовое питание, разнообразный досуг и тёплую атмосферу.',
      'Приезжайте и насладитесь отдыхом вдали от городской суеты! Горы, свежий воздух и незабываемые впечатления ждут вас.',
    ],
    features: [
      { title: 'Горный воздух', desc: 'Высота 700 м — чистейший воздух', iconKey: 'mountain' },
      { title: '2 корпуса, 254 места', desc: 'Стандарт и люкс-номера в уютных корпусах', iconKey: 'home' },
      { title: '3-разовое питание', desc: 'Свежие блюда каждый день включены в цену', iconKey: 'food' },
      { title: 'Активный отдых', desc: 'Бассейны, спорт, экскурсии и дискотеки', iconKey: 'activity' },
    ],
    imageMain: { src: '/images/outdoor_5.jpg', rotation: 0 },
    imageSecondary: { src: '/images/outdoor_6.jpg', rotation: 0 },
    badgeNumber: '30+',
    badgeText: 'лет\nработы',
  },
  services: {
    sectionLabel: 'Наши услуги',
    title: 'Мы предлагаем',
    subtitle: 'Всё необходимое для комфортного и незабываемого отдыха',
    note: '* Цены на размещение включают 3-разовое питание',
    items: [
      {
        title: 'Номера и размещение',
        desc: 'Два жилых корпуса на 254 места. Стандарт одноместный, стандарт двухместный и люкс-апартаменты — все цены включают 3-разовое питание.',
        img: '/images/room_1.jpg', rotation: 0, price: '550 000', unit: 'сум / ночь',
        cta: 'Смотреть номера', iconKey: 'home',
      },
      {
        title: 'Питание и банкеты',
        desc: 'Большой уютный столовый зал с 3-разовым питанием из свежих продуктов. В межсезонье — банкеты и фуршеты. Конференц-зал на 240 мест с современным аудио-визуальным оборудованием.',
        img: '/images/outdoor_2.jpg', rotation: 0, price: '120 000', unit: 'сум / день',
        cta: 'Подробнее', iconKey: 'food',
      },
      {
        title: 'Бассейны и развлечения',
        desc: 'Три бассейна (взрослый, подростковый, детский). Зимой: подогреваемый бассейн + сауна. Бильярд, тренажёрный зал, настольный теннис, охраняемая парковка, детская площадка, библиотека и вечерняя дискотека.',
        img: '/images/outdoor_3.jpg', rotation: 0, price: '50 000', unit: 'сум',
        cta: 'Подробнее', iconKey: 'pool',
      },
    ],
  },
  rooms: {
    sectionLabel: 'Номера',
    title: 'Рум тур — выберите свой номер',
    subtitle: 'Комфортные номера со всеми удобствами. Все цены включают 3-разовое питание в день.',
    pricePrefix: 'от', priceUnit: 'сум/сутки',
    viewText: 'Смотреть', bookBtn: 'Забронировать номер', bookBtnModal: 'Забронировать',
    tabs: [
      { id: 'all', label: 'Все номера' },
      { id: 'standard', label: 'Стандарт (1 чел.)' },
      { id: 'double', label: 'Стандарт (2 чел.)' },
      { id: 'suite', label: 'Люкс' },
    ],
    items: [
      { img: '/images/room_14.jpg', rotation: 0, name: 'Стандарт одноместный', type: 'standard', price: '550 000', desc: 'Уютный одноместный номер: 1 кровать, стол, стул, шкаф и личная ванная. Цена включает 3-разовое питание.', details: ['1 кровать', 'Стол и стул', 'Шкаф', 'Ванная', '3-разовое питание'] },
      { img: '/images/room_11.jpg', rotation: 0, name: 'Стандарт одноместный', type: 'standard', price: '550 000', desc: 'Уютный одноместный номер: 1 кровать, стол, стул, шкаф и личная ванная. Цена включает 3-разовое питание.', details: ['1 кровать', 'Стол и стул', 'Шкаф', 'Ванная', '3-разовое питание'] },
      { img: '/images/room_3.jpg',  rotation: 0, name: 'Стандарт одноместный', type: 'standard', price: '550 000', desc: 'Уютный одноместный номер: 1 кровать, стол, стул, шкаф и личная ванная. Цена включает 3-разовое питание.', details: ['1 кровать', 'Стол и стул', 'Шкаф', 'Ванная', '3-разовое питание'] },
      { img: '/images/room_1.jpg',  rotation: 0, name: 'Стандарт двухместный', type: 'double',   price: '1 000 000', desc: 'Комфортный номер для 2 гостей: 2 кровати, стол, стул, шкаф и личная ванная. 3-разовое питание включено.', details: ['2 кровати', 'Стол и стул', 'Шкаф', 'Ванная', '3-разовое питание'] },
      { img: '/images/room_4.jpg',  rotation: 0, name: 'Стандарт двухместный', type: 'double',   price: '1 000 000', desc: 'Комфортный номер для 2 гостей: 2 кровати, стол, стул, шкаф и личная ванная. 3-разовое питание включено.', details: ['2 кровати', 'Стол и стул', 'Шкаф', 'Ванная', '3-разовое питание'] },
      { img: '/images/room_5.jpg',  rotation: 0, name: 'Стандарт двухместный', type: 'double',   price: '1 000 000', desc: 'Комфортный номер для 2 гостей: 2 кровати, стол, стул, шкаф и личная ванная. 3-разовое питание включено.', details: ['2 кровати', 'Стол и стул', 'Шкаф', 'Ванная', '3-разовое питание'] },
      { img: '/images/room_2.jpg',  rotation: 0, name: 'Люкс-апартаменты',    type: 'suite',    price: '1 200 000', desc: 'Просторные 2-комнатные апартаменты (спальня + гостиная): 2 кровати, 2 кресла, ТВ, холодильник, журнальный столик, шкаф и ванная. 3-разовое питание включено.', details: ['2 комнаты', '2 кровати', 'ТВ и холодильник', '2 кресла', '3-разовое питание'] },
      { img: '/images/room_12.jpg', rotation: 0, name: 'Люкс-апартаменты',    type: 'suite',    price: '1 200 000', desc: 'Просторные 2-комнатные апартаменты (спальня + гостиная): 2 кровати, 2 кресла, ТВ, холодильник, журнальный столик, шкаф и ванная. 3-разовое питание включено.', details: ['2 комнаты', '2 кровати', 'ТВ и холодильник', '2 кресла', '3-разовое питание'] },
      { img: '/images/room_13.jpg', rotation: 0, name: 'Люкс-апартаменты',    type: 'suite',    price: '1 200 000', desc: 'Просторные 2-комнатные апартаменты (спальня + гостиная): 2 кровати, 2 кресла, ТВ, холодильник, журнальный столик, шкаф и ванная. 3-разовое питание включено.', details: ['2 комнаты', '2 кровати', 'ТВ и холодильник', '2 кресла', '3-разовое питание'] },
    ],
  },
  gallery: {
    sectionLabel: 'Фотогалерея',
    title: 'Красота природы Ходжикента',
    showAllBtn: 'Показать все фото',
    images: [
      { src: '/images/hero_building.jpg', alt: 'Главный корпус', size: 'wide', rotation: 0 },
      { src: '/images/outdoor_5.jpg', alt: 'Фонтан', size: 'tall', rotation: 0 },
      { src: '/images/outdoor_2.jpg', alt: 'Территория', size: '', rotation: 0 },
      { src: '/images/outdoor_6.jpg', alt: 'Прогулочная зона', size: '', rotation: 0 },
      { src: '/images/outdoor_3.jpg', alt: 'Зона отдыха', size: 'wide', rotation: 0 },
      { src: '/images/outdoor_4.jpg', alt: 'Детская площадка', size: '', rotation: 0 },
      { src: '/images/outdoor_7.jpg', alt: 'Аттракционы', size: '', rotation: 0 },
      { src: '/images/room_14.jpg', alt: 'Номер стандарт', size: 'tall', rotation: 0 },
      { src: '/images/room_1.jpg', alt: 'Двухместный номер', size: '', rotation: 0 },
      { src: '/images/room_2.jpg', alt: 'Люкс-апартаменты', size: '', rotation: 0 },
      { src: '/images/outdoor_1.jpg', alt: 'Внешняя территория', size: 'wide', rotation: 0 },
      { src: '/images/room_11.jpg', alt: 'Стандарт', size: '', rotation: 0 },
    ],
  },
  contact: {
    sectionLabel: 'Наш адрес',
    title: 'Как нас найти',
    address: 'Ташкентская область, Бостанлыкский район, Ходжикент, ул. Оромгох, 1',
    phone: '+998 90 123 45 67',
    email: 'info@hojikentormgohi.uz',
    hours: 'Круглосуточно',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.7!2d69.9723!3d41.4823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef96c4000001%3A0x1!2sXojikent+Oromgohi!5e0!3m2!1sru!2suz!4v1',
    formTitle: 'Забронировать отдых',
    formSubtitle: 'Заполните форму и мы свяжемся с вами в течение 1 часа',
    successMessage: 'Заявка принята! Мы свяжемся с вами скоро.',
    nameLabel: 'Ваше имя *',
    namePlaceholder: 'Иван Иванов',
    phoneLabel: 'Телефон *',
    phonePlaceholder: '+998 90 123 45 67',
    checkinLabel: 'Дата заезда',
    checkoutLabel: 'Дата выезда',
    guestsLabel: 'Количество гостей',
    guestsPlaceholder: 'Выберите...',
    guestSingular: 'гость',
    guestFew: 'гостя',
    guestMany: 'гостей',
    roomTypeLabel: 'Тип номера',
    roomTypeAny: 'Любой',
    messageLabel: 'Дополнительные пожелания',
    messagePlaceholder: 'Укажите ваши пожелания...',
    submitBtn: 'Отправить заявку',
    submittingBtn: 'Отправляем...',
    roomStandard: 'Стандарт (1 чел.)',
    roomDouble: 'Стандарт (2 чел.)',
    roomSuite: 'Люкс',
    labelAddress: 'Адрес',
    labelPhone: 'Телефон',
    labelEmail: 'Email',
    labelHours: 'Режим работы',
  },
  footer: {
    logoMain: 'HOJIKENT',
    logoSub: 'OROMGOHI',
    brandDesc: 'Пансионат Ходжикент — ваш идеальный отдых в сердце горной природы Узбекистана.',
    socialTelegram: '#',
    socialInstagram: '#',
    socialPhone: 'tel:+998901234567',
    navCols: [
      { title: 'Навигация', links: [{ label: 'О пансионате', href: '#about' }, { label: 'Услуги', href: '#services' }, { label: 'Номера', href: '#rooms' }, { label: 'Галерея', href: '#gallery' }] },
      { title: 'Услуги', links: [{ label: 'Номера', href: '#rooms' }, { label: 'Питание', href: '#services' }, { label: 'Экскурсии', href: '#services' }, { label: 'Трансфер', href: '#services' }] },
    ],
    footerAddress: 'Ташкентская обл., Ходжикент',
    footerPhone: '+998 90 123 45 67',
    footerEmail: 'info@hojikentormgohi.uz',
    footerHours: 'Круглосуточно',
    copyright: '© 2026 Hojikent Oromgohi. Все права защищены.',
    privacyLabel: 'Политика конфиденциальности',
    termsLabel: 'Условия использования',
    footerContactTitle: 'Контакты',
  },
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      // Merge top-level keys so any newly added sections (like nav) always exist
      const base = deepClone(defaultData)
      Object.keys(base).forEach(k => {
        if (!(k in parsed)) parsed[k] = base[k]
      })
      return parsed
    }
  } catch {}
  return deepClone(defaultData)
}

export const siteData = reactive(loadData())

export function resetToDefaults() {
  const fresh = deepClone(defaultData)
  Object.keys(fresh).forEach(k => { siteData[k] = fresh[k] })
  try { localStorage.removeItem(STORAGE_KEY) } catch {}
}

watch(siteData, (val) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(val)) } catch {}
}, { deep: true })

export function rotateImage(img, direction) {
  img.rotation = ((img.rotation || 0) + (direction === 'right' ? 90 : -90) + 360) % 360
}

export function imgRotationStyle(rotation) {
  const r = rotation || 0
  return { transform: `rotate(${r}deg) scale(${r % 180 !== 0 ? 1.42 : 1})` }
}

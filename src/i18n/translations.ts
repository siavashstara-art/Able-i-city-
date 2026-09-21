import type { Language, Direction } from '../types.ts';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  dir: Direction;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', dir: 'rtl' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
];

export function getDirection(lang: Language): Direction {
  return lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr';
}

export interface AppTranslations {
  name: string;
  tagline: string;
  version: string;
  fontSizeToggle: string;
  highContrastToggle: string;
  highContrastOn: string;
  highContrastOff: string;
  focusModeToggle: string;
  focusModeOn: string;
  focusModeOff: string;
  skipToContent: string;
  language: string;
  footerText: string;
  online: string;
  offline: string;
  downloadZip: string;
}

export interface BannerTranslations {
  offlineMsg: string;
  checking: string;
  recheck: string;
}

export interface WelcomeTranslations {
  badge: string;
  title: string;
  description: string;
  point1: string;
  point2: string;
  point3: string;
  startBtn: string;
  zipCardTitle: string;
  zipCardDesc: string;
  zipCardBtn: string;
}

export interface ChooseModeTranslations {
  title: string;
  subtitle: string;
  practiceTitle: string;
  practiceDesc: string;
  buildTitle: string;
  buildDesc: string;
  autoSaveNotice: string;
  backToWelcome: string;
}

export interface SimSwitcherTranslations {
  wpSim: string;
  hostingSim: string;
}

export interface WpSimTranslations {
  topBanner: string;
  reset: string;
  resetSuccess: string;
  createPage: string;
  listTitle: string;
  pagesCount: string;
  storageBadge: string;
  emptyList: string;
  statusPublished: string;
  statusDraft: string;
  edit: string;
  preview: string;
  publishLocal: string;
  makeDraft: string;
  delete: string;
  deleteTitle: string;
  deletedSuccess: string;
  statusToggled: string;
  createdSuccess: string;
  editModalTitle: string;
  titleLabel: string;
  titlePlaceholder: string;
  contentLabel: string;
  contentPlaceholder: string;
  honestyNote: string;
  publishBtn: string;
  saveDraftBtn: string;
  cancelBtn: string;
  deleteThisPage: string;
  savedSuccess: string;
  publishedSuccess: string;
  previewModalTitle: string;
  previewEmpty: string;
  editThisPage: string;
  backToList: string;
  goToBuild: string;
  backToMode: string;
  exportHtml: string;
  exportedSuccess: string;
  inspect: string;
  inspectorTitle: string;
  inspectorStatusCode: string;
  inspectorContentType: string;
  inspectorEncoding: string;
  inspectorPageSize: string;
  inspectorClose: string;
  // Visual Builder
  tabVisualBuilder: string;
  tabClassicEditor: string;
  addBlockHeading: string;
  addBlockText: string;
  addBlockImage: string;
  addBlockButton: string;
  blockHeadingPlaceholder: string;
  blockTextPlaceholder: string;
  blockButtonTextPlaceholder: string;
  blockButtonUrlPlaceholder: string;
  blockImagePlaceholder: string;
  moveUp: string;
  moveDown: string;
  removeBlock: string;
  noBlocksPrompt: string;
}

export interface HostingSimTranslations {
  topBanner: string;
  reset: string;
  resetSuccess: string;
  statusPublished: string;
  statusOffline: string;
  tabOverview: string;
  tabFiles: string;
  tabDatabase: string;
  tabDigitalHouse: string;
  digitalHouseTitle: string;
  digitalHouseSubtitle: string;
  dhRoomFilesTitle: string;
  dhRoomFilesDesc: string;
  dhOfficeDbTitle: string;
  dhOfficeDbDesc: string;
  dhPlateDomainTitle: string;
  dhPlateDomainDesc: string;
  dhDoorPublishTitle: string;
  dhDoorPublishDesc: string;
  dhDoorOpen: string;
  dhDoorClosed: string;
  fileCountLabel: string;
  fileCountUnit: string;
  dbStatusLabel: string;
  dbRecordsUnit: string;
  testDomainLabel: string;
  honestyReminder: string;
  publishBtn: string;
  unpublishBtn: string;
  publishedNotice: string;
  unpublishedNotice: string;
  createSiteBtn: string;
  createdSiteNotice: string;
  filesFolderTitle: string;
  addSampleFile: string;
  fileAddedNotice: string;
  deleteFile: string;
  fileDeletedNotice: string;
  downloadFile: string;
  downloadFileSuccess: string;
  dbTitle: string;
  dbNameLabel: string;
  dbRowsLabel: string;
  dbLocationLabel: string;
  dbLocationVal: string;
  addDbRecordBtn: string;
  recordAddedNotice: string;
  backBtn: string;
}

export interface RealSiteTranslations {
  headerTitle: string;
  headerDesc: string;
  noticeTitle: string;
  noticeText: string;
  roadmapTitle: string;
  stepLearnTitle: string;
  stepLearnDesc: string;
  stepPracticeTitle: string;
  stepPracticeDesc: string;
  stepBuildTitle: string;
  stepBuildDesc: string;
  stepPublishTitle: string;
  stepPublishDesc: string;
  stepManageTitle: string;
  stepManageDesc: string;
  statusActiveSim: string;
  statusReady: string;
  statusNextVer: string;
  exploreHostingBtn: string;
  backToModeBtn: string;
  tutorialTitle: string;
  tutorialSubtitle: string;
  tutorialStep1Title: string;
  tutorialStep1Desc: string;
  tutorialStep2Title: string;
  tutorialStep2Desc: string;
  tutorialStep3Title: string;
  tutorialStep3Desc: string;
  tutorialStep4Title: string;
  tutorialStep4Desc: string;
  tutorialActionBtn: string;
  tutorialWebConnectionCallout: string;
}

export interface PublishTranslations {
  title: string;
  desc: string;
  nextBtn: string;
  backBtn: string;
}

export interface DoneTranslations {
  title: string;
  desc: string;
  restartBtn: string;
  bridgeTitle: string;
  bridgeDesc: string;
  bridgeMethod1Title: string;
  bridgeMethod1Desc: string;
  bridgeMethod2Title: string;
  bridgeMethod2Desc: string;
  bridgeMethod3Title: string;
  bridgeMethod3Desc: string;
}

export interface FocusModeTranslations {
  title: string;
  whereAmI: string;
  whatAmIDoing: string;
  whatNext: string;
  stepWelcome: string;
  stepChoose: string;
  stepPractice: string;
  stepBuild: string;
  stepPublish: string;
  stepDone: string;
  doingWelcome: string;
  doingChoose: string;
  doingPractice: string;
  doingBuild: string;
  doingPublish: string;
  doingDone: string;
  nextWelcome: string;
  nextChoose: string;
  nextPractice: string;
  nextBuild: string;
  nextPublish: string;
  nextDone: string;
}

export interface BridgeTranslations {
  title: string;
  subtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  summaryBadge: string;
}

export interface TranslationDictionary {
  app: AppTranslations;
  banner: BannerTranslations;
  welcome: WelcomeTranslations;
  chooseMode: ChooseModeTranslations;
  simSwitcher: SimSwitcherTranslations;
  wpSim: WpSimTranslations;
  hostingSim: HostingSimTranslations;
  realSite: RealSiteTranslations;
  publish: PublishTranslations;
  done: DoneTranslations;
  focusMode: FocusModeTranslations;
  bridge: BridgeTranslations;
}

export const translations: Record<Language, TranslationDictionary> = {
  fa: {
    app: {
      name: 'ICity Core',
      tagline: 'بنیاد یادگیری ساده وب',
      version: 'نسخه',
      fontSizeToggle: 'تغییر اندازه قلم',
      highContrastToggle: 'تغییر کنتراست بالا',
      highContrastOn: 'کنتراست بالا (فعال)',
      highContrastOff: 'کنتراست عادی',
      focusModeToggle: 'حالت تمرکز',
      focusModeOn: 'حالت تمرکز (فعال)',
      focusModeOff: 'حالت عادی',
      skipToContent: 'پرش مستقیم به محتوای اصلی',
      language: 'زبان',
      footerText: 'آی‌سیتی کور — شبیه‌ساز امن و بدون استرس برای همه',
      online: 'آنلاین (متصل)',
      offline: 'آفلاین (حافظه دستگاه)',
      downloadZip: 'دانلود سورس‌کد کامل پروژه (فایل ZIP)',
    },
    banner: {
      offlineMsg: 'اینترنت قطع است؛ می‌توانی همچنان تمرین کنی.',
      checking: 'در حال بررسی...',
      recheck: 'بررسی دوباره',
    },
    welcome: {
      badge: 'بدون استرس، قدم به قدم',
      title: 'سلام! به آی‌سیتی خوش آمدی',
      description: 'یک جای امن و ساده برای اینکه یاد بگیری وب چطور کار می‌کند، بدون هیچ ترسی از اشتباه کردن.',
      point1: 'بدون نیاز به رمز عبور یا ثبت‌نام',
      point2: 'آفلاین و امن در حافظه خود گوشی شما',
      point3: 'طراحی آرام، بدون تبلیغات و بدون شلوغی',
      startBtn: 'ورود و انتخاب مسیر',
      zipCardTitle: 'دریافت مستقیم سورس‌کد پروژه (ZIP)',
      zipCardDesc: 'می‌توانید کل کدهای پروژه را دانلود کرده و بدون دنجرزون دستی روی گیت‌هاب آپلود کنید.',
      zipCardBtn: 'دانلود فایل فشرده پروژه (ZIP)',
    },
    chooseMode: {
      title: 'سلام! دوست داری چه‌کار کنی؟',
      subtitle: 'یکی از دو راه زیر را انتخاب کن:',
      practiceTitle: 'بازی و تمرین',
      practiceDesc: 'شبیه‌ساز آموزشی و تمرین بدون ریسک',
      buildTitle: 'ساخت سایت واقعی',
      buildDesc: 'برای وقتی که می‌خواهی اولین صفحه واقعی‌ات را بسازی',
      autoSaveNotice: 'همه چیز به صورت خودکار در حافظه دستگاه شما ذخیره می‌شود.',
      backToWelcome: 'بازگشت به صفحه خوش‌آمدگویی',
    },
    simSwitcher: {
      wpSim: 'شبیه‌ساز برگه‌ها (WordPress)',
      hostingSim: 'شبیه‌ساز هاست و سرور',
    },
    wpSim: {
      topBanner: 'شبیه‌ساز آموزشی مدیریت برگه‌ها (کاملاً آفلاین و محلی)',
      reset: 'بازنشانی',
      resetSuccess: 'شبیه‌ساز به حالت اولیه بازنشانی شد.',
      createPage: 'ایجاد برگه جدید',
      listTitle: 'فهرست برگه‌ها',
      pagesCount: 'برگه در دستگاه',
      storageBadge: 'ذخیره‌شده در حافظه پایدار',
      emptyList: 'هیچ برگه‌ای وجود ندارد. برای شروع دکمه «ایجاد برگه جدید» را بزن.',
      statusPublished: 'منتشرشده (در شبیه‌ساز)',
      statusDraft: 'پیش‌نویس',
      edit: 'ویرایش',
      preview: 'مشاهده',
      publishLocal: 'انتشار محلی',
      makeDraft: 'پیش‌نویس کن',
      delete: 'حذف',
      deleteTitle: 'حذف برگه',
      deletedSuccess: 'برگه از شبیه‌ساز حذف شد.',
      statusToggled: 'وضعیت انتشار برگه در شبیه‌ساز به‌روزرسانی شد.',
      createdSuccess: 'برگه جدید در حافظه دستگاه ساخته شد.',
      editModalTitle: 'ویرایش برگه در شبیه‌ساز',
      titleLabel: 'عنوان برگه:',
      titlePlaceholder: 'مثلاً: درباره شهر من',
      contentLabel: 'متن محتوا:',
      contentPlaceholder: 'متن خود را اینجا بنویسید...',
      honestyNote: 'یادآوری: فشردن دکمه انتشار، وضعیت این برگه را فقط در حافظه آفلاین همین گوشی «منتشرشده» می‌کند و هنوز در اینترنت بارگذاری نمی‌شود.',
      publishBtn: 'انتشار در شبیه‌ساز (محلی)',
      saveDraftBtn: 'ذخیره تغییرات (پیش‌نویس)',
      cancelBtn: 'انصراف و بازگشت',
      deleteThisPage: 'حذف این برگه',
      savedSuccess: 'تغییرات برگه در حافظه محلی ذخیره شد.',
      publishedSuccess: 'وضعیت برگه به «منتشرشده در شبیه‌ساز محلی» تغییر کرد.',
      previewModalTitle: 'پیش‌نمایش برگه شبیه‌سازی‌شده',
      previewEmpty: 'این برگه هنوز متنی ندارد.',
      editThisPage: 'ویرایش این برگه',
      backToList: 'بازگشت به فهرست',
      goToBuild: 'رفتن به ساخت سایت واقعی',
      backToMode: 'بازگشت به انتخاب مسیر',
      exportHtml: 'خروجی فایل واقعی HTML',
      exportedSuccess: 'فایل HTML واقعی برگه در دستگاه شما دانلود شد.',
      inspect: 'بازرس فنی برگه',
      inspectorTitle: 'بازرس وب — برگه من چطور کار می‌کند؟',
      inspectorStatusCode: 'کد پاسخ سرور:',
      inspectorContentType: 'نوع سند (MIME):',
      inspectorEncoding: 'کدگذاری نویسه‌ها:',
      inspectorPageSize: 'حجم تخمینی فایل:',
      inspectorClose: 'بستن بازرس',
      tabVisualBuilder: 'بلوک‌های دیداری (ساده)',
      tabClassicEditor: 'ویرایشگر متنی',
      addBlockHeading: '+ تیتر (Title)',
      addBlockText: '+ متن (Text)',
      addBlockImage: '+ جایگاه تصویر (Image)',
      addBlockButton: '+ دکمه (Button)',
      blockHeadingPlaceholder: 'عنوان تیتر را بنویسید...',
      blockTextPlaceholder: 'متن یا توضیحات این بخش را بنویسید...',
      blockButtonTextPlaceholder: 'متن روی دکمه (مثلاً: تماس با ما)',
      blockButtonUrlPlaceholder: 'لینک یا برچسب دکمه (اختیاری)',
      blockImagePlaceholder: 'تصویر نمونه / توضیح تصویر (Alt)',
      moveUp: 'بالاتر',
      moveDown: 'پایین‌تر',
      removeBlock: 'حذف بلوک',
      noBlocksPrompt: 'هنوز هیچ بلوکی اضافه نشده است. با زدن دکمه‌های بالا، تیتر، متن، عکس یا دکمه اضافه کنید.',
    },
    hostingSim: {
      topBanner: 'شبیه‌ساز هاست و سرور (آفلاین • بدون نیاز به سرور واقعی)',
      reset: 'بازنشانی',
      resetSuccess: 'شبیه‌ساز هاست به حالت اولیه بازنشانی شد.',
      statusPublished: 'منتشرشده (در شبیه‌ساز)',
      statusOffline: 'آفلاین / پیش‌نویس',
      tabOverview: 'نمای کلی',
      tabDigitalHouse: '🏠 خانه دیجیتال',
      digitalHouseTitle: 'استعاره بصری: خانه دیجیتال (Digital House)',
      digitalHouseSubtitle: 'یک درک شهودی و آرام از کارکرد واقعی اینترنت و وبسایت',
      dhRoomFilesTitle: 'اتاق فایل‌ها (Files)',
      dhRoomFilesDesc: 'صفحات HTML، استایل‌ها، عکس‌ها و کدهای سایت مانند وسایل و اثاثیه داخل این اتاق چیده شده‌اند.',
      dhOfficeDbTitle: 'دفتر اطلاعات (Database)',
      dhOfficeDbDesc: 'دفتر ثبت اسناد و داده‌های پویا، مانند لیست اعضا، یادداشت‌ها یا داده‌های ذخیره‌شده.',
      dhPlateDomainTitle: 'پلاک خانه (Domain)',
      dhPlateDomainDesc: 'آدرسی که دیگران با آن خانه شما را پیدا می‌کنند (مثلاً mysite.com همان پلاک ورودی است).',
      dhDoorPublishTitle: 'در خانه (Publish)',
      dhDoorPublishDesc: 'وقتی در خانه را باز می‌کنید (انتشار)، بازدیدکنندگان می‌توانند وارد خانه دیجیتال شما شوند.',
      dhDoorOpen: 'در خانه باز است (سایت عمومی و در دسترس است)',
      dhDoorClosed: 'در خانه بسته است (سایت شخصی، آفلاین یا در دست ساخت است)',
      tabFiles: 'فایل‌ها',
      tabDatabase: 'پایگاه داده',
      fileCountLabel: 'تعداد فایل‌های هاست:',
      fileCountUnit: 'فایل',
      dbStatusLabel: 'وضعیت پایگاه داده:',
      dbRecordsUnit: 'ردیف اطلاعاتی',
      testDomainLabel: 'آدرس آزمایشی:',
      honestyReminder: 'یادآوری شفاف: این یک شبیه‌ساز آموزشی در حافظه گوشی شماست. هیچ اطلاعات محرمانه، رمز، هاست واقعی یا دامنه‌ای در اینترنت ثبت نشده است.',
      publishBtn: 'انتشار در شبیه‌ساز محلی',
      unpublishBtn: 'لغو انتشار در شبیه‌ساز (آفلاین کردن)',
      publishedNotice: 'وضعیت به «منتشرشده در شبیه‌ساز محلی» تغییر یافت (آفلاین).',
      unpublishedNotice: 'سایت به حالت غیرفعال/پیش‌نویس بازگشت.',
      createSiteBtn: 'ایجاد یک سایت جدید در شبیه‌ساز',
      createdSiteNotice: 'سایت جدید در شبیه‌ساز محلی هاست ساخته شد.',
      filesFolderTitle: 'پوشه فایل‌های عمومی (public_html)',
      addSampleFile: 'افزودن فایل نمونه',
      fileAddedNotice: 'فایل به پوشه شبیه‌ساز اضافه شد.',
      deleteFile: 'حذف فایل',
      fileDeletedNotice: 'فایل از شبیه‌ساز حذف شد.',
      downloadFile: 'دانلود فایل واقعی',
      downloadFileSuccess: 'فایل با موفقیت در دستگاه شما دانلود شد.',
      dbTitle: 'مشخصات دیتابیس شبیه‌سازی‌شده:',
      dbNameLabel: 'نام دیتابیس:',
      dbRowsLabel: 'تعداد سطرهای ذخیره:',
      dbLocationLabel: 'محل ذخیره:',
      dbLocationVal: 'حافظه پایدار مرورگر (IndexedDB)',
      addDbRecordBtn: 'افزودن داده آزمایشی به دیتابیس',
      recordAddedNotice: 'یک ردیف داده به دیتابیس محلی اضافه شد.',
      backBtn: 'بازگشت',
    },
    realSite: {
      headerTitle: 'بنیاد ساخت سایت واقعی',
      headerDesc: 'مسیر یادگیری گام‌به‌گام برای ورود به دنیای وب',
      noticeTitle: 'یادداشت مهم نسخه اولیه (v0.1):',
      noticeText: 'در این نسخه هیچ عملیات واقعی روی اینترنت انجام نمی‌شود تا امنیت و آرامش شما حفظ شود. همه تمرین‌ها به‌صورت آفلاین و شبیه‌سازی‌شده در دستگاه شما انجام می‌گیرند.',
      roadmapTitle: 'نقشه راه آینده ساخت سایت:',
      stepLearnTitle: '۱. یادگیری (Learn)',
      stepLearnDesc: 'آشنایی با مفاهیم ساده وب، چیدمان متن، رنگ‌ها و عکس‌ها با زبانی آسان برای همه.',
      stepPracticeTitle: '۲. تمرین (Practice)',
      stepPracticeDesc: 'کار با شبیه‌سازهای بدون ریسک (مانند شبیه‌ساز برگه‌ها و هاست) در حافظه آفلاین گوشی.',
      stepBuildTitle: '۳. ساخت (Build)',
      stepBuildDesc: 'چیدن قطعه‌های صفحه دلخواه روی دستگاه به‌صورت کاملاً تصویری و لمسی.',
      stepPublishTitle: '۴. انتشار (Publish)',
      stepPublishDesc: 'انتقال و بارگذاری فایل‌ها روی سرور اینترنتی واقعی (با نظارت و بدون پیچیدگی فنی).',
      stepManageTitle: '۵. مدیریت (Manage)',
      stepManageDesc: 'به‌روزرسانی برگه‌ها، مشاهده آمار بازدید و نگهداری آسان سایت.',
      statusActiveSim: 'فعال در شبیه‌ساز',
      statusReady: 'بنیاد اولیه آماده',
      statusNextVer: 'نسخه بعدی',
      exploreHostingBtn: 'کاوش در شبیه‌ساز هاست و سرور (آفلاین)',
      backToModeBtn: 'بازگشت به انتخاب مسیر',
      tutorialTitle: 'آموزش گام‌به‌گام: استخراج فایل HTML و اتصال به وب جهانی',
      tutorialSubtitle: 'چگونه برگه محلی شما می‌تواند به یک سایت واقعی در سراسر جهان تبدیل شود',
      tutorialStep1Title: '۱. ساخت و ویرایش برگه',
      tutorialStep1Desc: 'در شبیه‌ساز برگه‌ها با استفاده از بلوک‌های دیداری (عنوان، متن، عکس و دکمه) صفحه دلخواه خود را طراحی کن.',
      tutorialStep2Title: '۲. استفاده از ویژگی «خروجی HTML»',
      tutorialStep2Desc: 'روی دکمه خروجی (Export Page) کلیک کن تا تمام محتوای طراحی‌شده شما به یک فایل استاندارد وب با نام .html تبدیل و در دستگاه شما دانلود شود.',
      tutorialStep3Title: '۳. آزمایش آفلاین در مرورگر شما',
      tutorialStep3Desc: 'این فایل دانلودی یک کد خالص وب است؛ بدون هیچ نیازی به اینترنت، در هر مرورگری (کروم، فایرفاکس، سافاری) باز می‌شود.',
      tutorialStep4Title: '۴. انتشار در سراسر دنیای وب',
      tutorialStep4Desc: 'کافیست این فایل index.html را در سرویس‌های میزبانی رایگان (مانند GitHub Pages یا Cloudflare) قرار دهی تا هر کسی در هر نقطه دنیا سایتت را ببیند.',
      tutorialActionBtn: 'ورود به شبیه‌ساز برگه‌ها و تمرین گرفتن خروجی',
      tutorialWebConnectionCallout: 'پیوند محلی به اینترنت: کدی که در شبیه‌ساز می‌سازید دقیقاً همان زبان مشترک اینترنت جهانی (HTML5) است. هیچ قفل اختصاصی در کار نیست؛ صفحه شما از لحظه خروجی گرفتن آماده درخشش در وب جهانی است.',
    },
    publish: {
      title: 'آماده‌سازی انتشار',
      desc: 'سایت خود را با دقت بررسی کن و در صورت تمایل منتشر کن.',
      nextBtn: 'مرحله بعد: انتشار در اینترنت',
      backBtn: 'بازگشت به ساخت سایت',
    },
    done: {
      title: 'آفرین! کار تمام شد',
      desc: 'تبریک! اولین سایت ساده خود را ساختی.',
      restartBtn: 'شروع دوباره از اول',
      bridgeTitle: 'پل اتصال به وب واقعی (۳ روش کاملاً رایگان و مستقل)',
      bridgeDesc: 'برگه‌ای که ساختی یک فایل استاندارد وب است. می‌توانی بدون هیچ هزینه‌ای آن را برای همیشه در جهان آنلاین کنی:',
      bridgeMethod1Title: 'روش ۱: دانلود فایل و ارسال به دیگران',
      bridgeMethod1Desc: 'فایل HTML را مستقیماً ذخیره کن و در هر پیام‌رسان بفرست؛ روی هر گوشی یا کامپیوتر بدون نیاز به اینترنت فوراً باز می‌شود.',
      bridgeMethod2Title: 'روش ۲: میزبانی رایگان با GitHub Pages',
      bridgeMethod2Desc: 'یک مخزن رایگان در گیت‌هاب بساز و فایل HTML را در آن قرار بده تا سایتت با آدرس اختصاصی برای همیشه آنلاین بماند.',
      bridgeMethod3Title: 'روش ۳: انتشار فوری با Cloudflare Pages / Netlify',
      bridgeMethod3Desc: 'پوشه سایتت را با کشیدن و رها کردن (Drag & Drop) در ۵ ثانیه بدون کدنویسی روی اینترنت جهانی منتشر کن.',
    },
    focusMode: {
      title: 'راهنمای تمرکز (گام‌به‌گام و آرام)',
      whereAmI: 'الان کجا هستم؟',
      whatAmIDoing: 'چه کاری انجام می‌دهم؟',
      whatNext: 'گام بعدی چیست؟',
      stepWelcome: 'صفحه خوش‌آمدگویی و شروع',
      stepChoose: 'انتخاب مسیر (بازی یا ساخت سایت)',
      stepPractice: 'بخش شبیه‌سازها و تمرین بدون استرس',
      stepBuild: 'نقشه راه ساخت سایت واقعی',
      stepPublish: 'پیش‌نمایش ذخیره محلی و انتشار',
      stepDone: 'پایان موفقیت‌آمیز',
      doingWelcome: 'آشنایی با آی‌سیتی و شروع اولین تجربه',
      doingChoose: 'انتخاب بین شبیه‌ساز آموزشی یا نقشه ساخت سایت',
      doingPractice: 'تمرین آزاد و آفلاین مدیریت برگه‌ها یا فایل‌ها',
      doingBuild: 'مشاهده مسیر ۵ مرحله‌ای برای آینده وب',
      doingPublish: 'مرور فایل‌های ذخیره‌شده در حافظه گوشی',
      doingDone: 'مشاهده پیشرفت ذخیره‌شده در این دستگاه',
      nextWelcome: 'دکمه «ورود و انتخاب مسیر» را لمس کن',
      nextChoose: 'یکی از دو کارت زرد یا سبز را انتخاب کن',
      nextPractice: 'می‌توانی برگه جدید بسازی یا تب‌ها را عوض کنی',
      nextBuild: 'شبیه‌ساز هاست را بررسی کن یا بازگرد',
      nextPublish: 'دکمه تأیید نهایی را لمس کن تا کار تمام شود',
      nextDone: 'دکمه شروع دوباره را بزن تا هر وقت خواستی تمرین جدیدی شروع کنی',
    },
    bridge: {
      title: 'پل ارتباطی به وب واقعی',
      subtitle: 'چگونه صفحات شبیه‌سازی‌شده خود را بدون هزینه در اینترنت واقعی آنلاین کنید؟',
      step1Title: '۱. استخراج فایل HTML',
      step1Desc: 'در بخش شبیه‌ساز وردپرس، دکمه «خروجی HTML» را بزنید تا صفحه شما در قالب یک فایل استاندارد وب روی دستگاهتان ذخیره شود.',
      step2Title: '۲. میزبانی رایگان استاتیک',
      step2Desc: 'سرویس‌هایی مانند GitHub Pages، Cloudflare Pages یا Netlify به شما اجازه می‌دهند این فایل HTML را کاملاً رایگان و دائمی در اینترنت مستقر کنید.',
      step3Title: '۳. دامنه شخصی (اختیاری)',
      step3Desc: 'هر زمان آماده شدید، می‌توانید دامنه‌ای مانند yourname.ir یا yourname.com را به این فایل متصل کنید تا یک سایت مستقل داشته باشید.',
      summaryBadge: 'آموزش عملی و بی‌هزینه',
    },
  },

  en: {
    app: {
      name: 'ICity Core',
      tagline: 'Simple Web Learning Foundation',
      version: 'v',
      fontSizeToggle: 'Toggle font size',
      highContrastToggle: 'Toggle high contrast',
      highContrastOn: 'High contrast (On)',
      highContrastOff: 'Normal contrast',
      focusModeToggle: 'Toggle focus mode',
      focusModeOn: 'Focus mode (On)',
      focusModeOff: 'Normal mode',
      skipToContent: 'Skip to main content',
      language: 'Language',
      footerText: 'ICity Core — Stress-free & safe simulator for everyone',
      online: 'Online (Connected)',
      offline: 'Offline (Device Storage)',
      downloadZip: 'Download Full Project Source (ZIP)',
    },
    banner: {
      offlineMsg: 'No internet connection; you can still practice.',
      checking: 'Checking connection...',
      recheck: 'Check again',
    },
    welcome: {
      badge: 'Stress-free, step by step',
      title: 'Hello! Welcome to ICity',
      description: 'A safe and friendly place to learn how the web works, with zero fear of making mistakes.',
      point1: 'No passwords or registration required',
      point2: 'Offline and secure in your device storage',
      point3: 'Calm design, no ads, no clutter',
      startBtn: 'Enter & Choose Path',
      zipCardTitle: 'Direct Project Source (ZIP)',
      zipCardDesc: 'Download the entire source code to manually push to your GitHub safely.',
      zipCardBtn: 'Download Project Source (ZIP)',
    },
    chooseMode: {
      title: 'Hello! What would you like to do?',
      subtitle: 'Choose one of the two paths below:',
      practiceTitle: 'Practice & Play',
      practiceDesc: 'Educational simulator & zero-risk practice',
      buildTitle: 'Build a Real Website',
      buildDesc: 'For when you want to build your first real web page',
      autoSaveNotice: 'Everything is automatically saved to your device memory.',
      backToWelcome: 'Back to Welcome',
    },
    simSwitcher: {
      wpSim: 'Pages Simulator (WordPress)',
      hostingSim: 'Hosting & Server Simulator',
    },
    wpSim: {
      topBanner: 'Educational Pages Simulator (Fully offline & local)',
      reset: 'Reset',
      resetSuccess: 'Simulator was reset to initial state.',
      createPage: 'Create New Page',
      listTitle: 'Pages List',
      pagesCount: 'pages on device',
      storageBadge: 'Saved in persistent storage',
      emptyList: 'No pages yet. Tap "Create New Page" to start.',
      statusPublished: 'Published (in simulator)',
      statusDraft: 'Draft',
      edit: 'Edit',
      preview: 'Preview',
      publishLocal: 'Publish locally',
      makeDraft: 'Make draft',
      delete: 'Delete',
      deleteTitle: 'Delete Page',
      deletedSuccess: 'Page deleted from simulator.',
      statusToggled: 'Page status updated in simulator.',
      createdSuccess: 'New page created in device storage.',
      editModalTitle: 'Edit Page in Simulator',
      titleLabel: 'Page Title:',
      titlePlaceholder: 'e.g., About My City',
      contentLabel: 'Page Content:',
      contentPlaceholder: 'Write your content here...',
      honestyNote: 'Reminder: Tapping publish only marks this page as "Published" locally in offline storage; it is not uploaded to the internet.',
      publishBtn: 'Publish in Simulator (Local)',
      saveDraftBtn: 'Save Changes (Draft)',
      cancelBtn: 'Cancel & Back',
      deleteThisPage: 'Delete This Page',
      savedSuccess: 'Page changes saved locally.',
      publishedSuccess: 'Status changed to "Published in Local Simulator".',
      previewModalTitle: 'Simulated Page Preview',
      previewEmpty: 'This page has no text yet.',
      editThisPage: 'Edit This Page',
      backToList: 'Back to List',
      goToBuild: 'Go to Real Site Foundation',
      backToMode: 'Back to Mode Selection',
      exportHtml: 'Export Real HTML File',
      exportedSuccess: 'Real HTML file downloaded to your device.',
      inspect: 'Inspect Page',
      inspectorTitle: 'Web Inspector — How does my page work?',
      inspectorStatusCode: 'Server Response:',
      inspectorContentType: 'Document Type (MIME):',
      inspectorEncoding: 'Character Encoding:',
      inspectorPageSize: 'Estimated File Size:',
      inspectorClose: 'Close Inspector',
      tabVisualBuilder: 'Visual Blocks (Simple)',
      tabClassicEditor: 'Classic Text Editor',
      addBlockHeading: '+ Title',
      addBlockText: '+ Text',
      addBlockImage: '+ Image Placeholder',
      addBlockButton: '+ Button',
      blockHeadingPlaceholder: 'Enter section heading...',
      blockTextPlaceholder: 'Enter paragraph text...',
      blockButtonTextPlaceholder: 'Button label (e.g., Contact Us)',
      blockButtonUrlPlaceholder: 'Button target or link (optional)',
      blockImagePlaceholder: 'Image sample / alt description',
      moveUp: 'Move Up',
      moveDown: 'Move Down',
      removeBlock: 'Remove Block',
      noBlocksPrompt: 'No visual blocks added yet. Click above to add a Title, Text, Image placeholder, or Button.',
    },
    hostingSim: {
      topBanner: 'Hosting & Server Simulator (Offline • No real server needed)',
      reset: 'Reset',
      resetSuccess: 'Hosting simulator was reset to default.',
      statusPublished: 'Published (in simulator)',
      statusOffline: 'Offline / Draft',
      tabOverview: 'Overview',
      tabDigitalHouse: '🏠 Digital House',
      digitalHouseTitle: 'Visual Metaphor: Digital House',
      digitalHouseSubtitle: 'An intuitive, calm mental model of how the web actually functions',
      dhRoomFilesTitle: 'Files Room (Files)',
      dhRoomFilesDesc: 'HTML documents, stylesheets, images, and assets arranged like furniture inside this room.',
      dhOfficeDbTitle: 'Information Office (Database)',
      dhOfficeDbDesc: 'The ledger and dynamic filing cabinet storing member lists, user notes, and structured records.',
      dhPlateDomainTitle: 'House Plaque (Domain)',
      dhPlateDomainDesc: 'The street address and plate through which guests locate your home (e.g., mysite.com).',
      dhDoorPublishTitle: 'Front Door (Publish)',
      dhDoorPublishDesc: 'Opening the front door allows guests to step inside and view your public digital house.',
      dhDoorOpen: 'Front door is open (Site is public & accessible)',
      dhDoorClosed: 'Front door is closed (Site is offline, private, or draft)',
      tabFiles: 'Files',
      tabDatabase: 'Database',
      fileCountLabel: 'Host files count:',
      fileCountUnit: 'files',
      dbStatusLabel: 'Database status:',
      dbRecordsUnit: 'data rows',
      testDomainLabel: 'Test address:',
      honestyReminder: 'Clear Transparency: This is an educational simulator in your device memory. No credentials, passwords, real hosting, or domains exist on the internet.',
      publishBtn: 'Publish in Local Simulator',
      unpublishBtn: 'Unpublish in Simulator (Take Offline)',
      publishedNotice: 'Status changed to "Published in Local Simulator" (offline).',
      unpublishedNotice: 'Site returned to inactive/draft status.',
      createSiteBtn: 'Create New Site in Simulator',
      createdSiteNotice: 'New site created in hosting simulator.',
      filesFolderTitle: 'Public Files Folder (public_html)',
      addSampleFile: 'Add Sample File',
      fileAddedNotice: 'File added to simulator folder.',
      deleteFile: 'Delete file',
      fileDeletedNotice: 'File deleted from simulator.',
      downloadFile: 'Download Real File',
      downloadFileSuccess: 'File downloaded successfully to your device.',
      dbTitle: 'Simulated Database Specs:',
      dbNameLabel: 'Database name:',
      dbRowsLabel: 'Stored rows count:',
      dbLocationLabel: 'Storage location:',
      dbLocationVal: 'Browser Persistent Storage (IndexedDB)',
      addDbRecordBtn: 'Add Test Record to Database',
      recordAddedNotice: 'Data row added to local database.',
      backBtn: 'Back',
    },
    realSite: {
      headerTitle: 'Real Website Foundation',
      headerDesc: 'Step-by-step learning roadmap to enter the web',
      noticeTitle: 'Important Note for Initial Version (v0.1):',
      noticeText: 'In this version, no live operations are performed on the internet to protect your safety and peace of mind. All exercises are run offline and simulated on your device.',
      roadmapTitle: 'Future Website Creation Roadmap:',
      stepLearnTitle: '1. Learn',
      stepLearnDesc: 'Understanding simple web concepts, text layout, colors, and pictures in easy language for everyone.',
      stepPracticeTitle: '2. Practice',
      stepPracticeDesc: 'Working with risk-free simulators (like pages and hosting) in offline phone storage.',
      stepBuildTitle: '3. Build',
      stepBuildDesc: 'Assembling blocks for your custom page on device with full visual touch controls.',
      stepPublishTitle: '4. Publish',
      stepPublishDesc: 'Uploading files to a real internet server (supervised and without technical friction).',
      stepManageTitle: '5. Manage',
      stepManageDesc: 'Updating pages, viewing visitor stats, and simple site maintenance.',
      statusActiveSim: 'Active in Simulator',
      statusReady: 'Foundation Ready',
      statusNextVer: 'Next Version',
      exploreHostingBtn: 'Explore Hosting & Server Simulator (Offline)',
      backToModeBtn: 'Back to Mode Selection',
      tutorialTitle: 'Step-by-Step Guide: Exporting Your Page & Connecting to the Wider Web',
      tutorialSubtitle: 'How your local device creation connects seamlessly to the real worldwide internet',
      tutorialStep1Title: '1. Build & Style Your Page',
      tutorialStep1Desc: 'Design your layout in the Pages Simulator using visual blocks (Heading, Text, Image placeholder, Button) or the classic editor.',
      tutorialStep2Title: '2. Click "Export Page" (HTML)',
      tutorialStep2Desc: 'Click the Download/Export button. Your entire page is instantly packaged into a real, standalone .html file saved directly to your device.',
      tutorialStep3Title: '3. Test Offline in Any Browser',
      tutorialStep3Desc: 'Double click your downloaded HTML file. It opens instantly in Chrome, Safari, or Edge without requiring any internet connection or servers.',
      tutorialStep4Title: '4. Connect to the Wider Web',
      tutorialStep4Desc: 'Upload this exact same HTML file to free hosting services (like GitHub Pages, Cloudflare, or Netlify) to make it accessible to everyone around the world.',
      tutorialActionBtn: 'Open Pages Simulator & Practice Export',
      tutorialWebConnectionCallout: 'Connecting Local Creation to the Wider Web: The HTML code generated by ICity is pure, open web standard. There is no vendor lock-in or hidden simulator syntax — what you create offline is 100% production-ready for the real internet.',
    },
    publish: {
      title: 'Publish Preparation',
      desc: 'Review your site carefully and publish when ready.',
      nextBtn: 'Next Step: Publish to Internet',
      backBtn: 'Back to Site Builder',
    },
    done: {
      title: 'Well done! All complete',
      desc: 'Congratulations! You built your first simple site.',
      restartBtn: 'Start over from beginning',
      bridgeTitle: 'The Bridge to the Real Web (3 Free & Independent Ways)',
      bridgeDesc: 'The page you built is a standard web file. You can host and share it globally for free without paying for servers:',
      bridgeMethod1Title: 'Method 1: Download & Share Directly',
      bridgeMethod1Desc: 'Save the HTML file and send it via any chat app. It opens instantly on any phone or laptop, even completely offline.',
      bridgeMethod2Title: 'Method 2: Free Hosting on GitHub Pages',
      bridgeMethod2Desc: 'Create a free GitHub repository, drop the HTML file inside, and your site stays online permanently with your own URL.',
      bridgeMethod3Title: 'Method 3: Instant Drag & Drop (Cloudflare / Netlify)',
      bridgeMethod3Desc: 'Drag and drop your website folder onto Cloudflare Pages or Netlify Drop to publish globally in seconds.',
    },
    focusMode: {
      title: 'Focus Guide (Step-by-step & calm)',
      whereAmI: 'Where am I?',
      whatAmIDoing: 'What am I doing?',
      whatNext: 'What should I do next?',
      stepWelcome: 'Welcome & Start Screen',
      stepChoose: 'Choose Your Path (Practice or Build)',
      stepPractice: 'Practice & Simulators',
      stepBuild: 'Real Website Roadmap',
      stepPublish: 'Review & Local Publish',
      stepDone: 'Completed',
      doingWelcome: 'Getting to know ICity and beginning first steps',
      doingChoose: 'Deciding between educational simulator or site roadmap',
      doingPractice: 'Practicing page editing or hosting offline',
      doingBuild: 'Reviewing the five simple steps to build a site',
      doingPublish: 'Checking files saved in device memory',
      doingDone: 'Reviewing your completed progress on this device',
      nextWelcome: 'Tap "Enter & Choose Path"',
      nextChoose: 'Select either the yellow or green card',
      nextPractice: 'Create a page or try switching between tabs',
      nextBuild: 'Explore hosting or go back to choose a path',
      nextPublish: 'Tap "Next Step" to complete',
      nextDone: 'Tap "Start over" whenever you want to practice again',
    },
    bridge: {
      title: 'Bridge to the Real Web',
      subtitle: 'How to take your simulated pages online on the real internet with zero cost?',
      step1Title: '1. Export Real HTML',
      step1Desc: 'In the WordPress Simulator, tap "Export HTML" to save your page as a clean standard web file onto your device.',
      step2Title: '2. Free Static Hosting',
      step2Desc: 'Platforms like GitHub Pages, Cloudflare Pages, or Netlify let you host this HTML file permanently for free.',
      step3Title: '3. Custom Domain (Optional)',
      step3Desc: 'Whenever you are ready, attach a custom domain name (e.g., yourname.com) to point directly to your site.',
      summaryBadge: 'Zero-Cost Learning Path',
    },
  },

  ar: {
    app: {
      name: 'ICity Core',
      tagline: 'أساس تعلّم الويب البسيط',
      version: 'إصدار',
      fontSizeToggle: 'تغيير حجم الخط',
      highContrastToggle: 'تبديل التباين العالي',
      highContrastOn: 'تباين عالٍ (مفعّل)',
      highContrastOff: 'تباين عادي',
      focusModeToggle: 'تبديل وضع التركيز',
      focusModeOn: 'وضع التركيز (مفعّل)',
      focusModeOff: 'الوضع العادي',
      skipToContent: 'الانتقال إلى المحتوى الرئيسي',
      language: 'اللغة',
      footerText: 'آي‌سيتي كور — محاكي آمن وخالٍ من التوتر للجميع',
      online: 'متصل بالإنترنت',
      offline: 'غير متصل (ذاكرة الجهاز)',
      downloadZip: 'تحميل كامل كود المشروع (ملف ZIP)',
    },
    banner: {
      offlineMsg: 'الإنترنت مقطوع؛ لا يزال بإمكانك التدرب.',
      checking: 'جارٍ التحقق...',
      recheck: 'إعادة الفحص',
    },
    welcome: {
      badge: 'خطوة بخطوة، دون توتر',
      title: 'مرحباً! أهلاً بك في آي‌سيتي',
      description: 'مكان آمن وبسيط لتتعلم كيف يعمل الويب، دون أي خوف من ارتكاب الأخطاء.',
      point1: 'لا حاجة لكلمات مرور أو تسجيل',
      point2: 'أوفلاين وآمن في ذاكرة جهازك',
      point3: 'تصميم هادئ، بدون إعلانات وبدون فوضى',
      startBtn: 'الدخول واختيار المسار',
      zipCardTitle: 'تحميل مباشر لكود المشروع (ZIP)',
      zipCardDesc: 'يمكنك تنزيل كامل كود المشروع لرفعه يدوياً إلى غيتهاب بأمان تام.',
      zipCardBtn: 'تحميل كود المشروع (ZIP)',
    },
    chooseMode: {
      title: 'مرحباً! ماذا تود أن تفعل؟',
      subtitle: 'اختر أحد المسارين أدناه:',
      practiceTitle: 'اللعب والتدريب',
      practiceDesc: 'محاكٍ تعليمي وتدريب خالٍ من المخاطر',
      buildTitle: 'بناء موقع حقيقي',
      buildDesc: 'عندما ترغب في بناء صفحتك الحقيقية الأولى',
      autoSaveNotice: 'يتم حفظ كل شيء تلقائياً في ذاكرة جهازك.',
      backToWelcome: 'العودة لصفحة الترحيب',
    },
    simSwitcher: {
      wpSim: 'محاكي الصفحات (ووردبريس)',
      hostingSim: 'محاكي الاستضافة والخادم',
    },
    wpSim: {
      topBanner: 'محاكي تعليمي لإدارة الصفحات (محلي وغير متصل بالكامل)',
      reset: 'إعادة ضبط',
      resetSuccess: 'تمت إعادة تعيين المحاكي للحالة الأولية.',
      createPage: 'إنشاء صفحة جديدة',
      listTitle: 'قائمة الصفحات',
      pagesCount: 'صفحات في الجهاز',
      storageBadge: 'محفوظ في الذاكرة الدائمة',
      emptyList: 'لا توجد صفحات بعد. اضغط "إنشاء صفحة جديدة" للبدء.',
      statusPublished: 'منشور (في المحاكي)',
      statusDraft: 'مسودة',
      edit: 'تعديل',
      preview: 'معاينة',
      publishLocal: 'نشر محلي',
      makeDraft: 'تحويل لمسودة',
      delete: 'حذف',
      deleteTitle: 'حذف الصفحة',
      deletedSuccess: 'تم حذف الصفحة من المحاكي.',
      statusToggled: 'تم تحديث حالة الصفحة في المحاكي.',
      createdSuccess: 'تم إنشاء صفحة جديدة في ذاكرة الجهاز.',
      editModalTitle: 'تعديل الصفحة في المحاكي',
      titleLabel: 'عنوان الصفحة:',
      titlePlaceholder: 'مثلاً: عن مدينتي',
      contentLabel: 'محتوى الصفحة:',
      contentPlaceholder: 'اكتب نصك هنا...',
      honestyNote: 'تذكير: زر النشر يغير حالة الصفحة إلى "منشور" فقط داخل ذاكرة هذا الهاتف الأوفلاين، ولم يتم نشرها على الإنترنت.',
      publishBtn: 'نشر في المحاكي (محلي)',
      saveDraftBtn: 'حفظ التغييرات (مسودة)',
      cancelBtn: 'إلغاء وعودة',
      deleteThisPage: 'حذف هذه الصفحة',
      savedSuccess: 'تم حفظ التغييرات محلياً.',
      publishedSuccess: 'تم تغيير الحالة إلى "منشور في المحاكي المحلي".',
      previewModalTitle: 'معاينة الصفحة المحاكاة',
      previewEmpty: 'هذه الصفحة لا تحتوي على نص بعد.',
      editThisPage: 'تعديل هذه الصفحة',
      backToList: 'العودة للقائمة',
      goToBuild: 'الانتقال لبناء موقع حقيقي',
      backToMode: 'العودة لاختيار المسار',
      exportHtml: 'تصدير ملف HTML حقيقي',
      exportedSuccess: 'تم تحميل ملف HTML الحقيقي على جهازك بنجاح.',
      inspect: 'فحص الصفحة تقنياً',
      inspectorTitle: 'مفتش الويب — كيف تعمل صفحتي؟',
      inspectorStatusCode: 'استجابة الخادم:',
      inspectorContentType: 'نوع المستند (MIME):',
      inspectorEncoding: 'ترميز المحارف:',
      inspectorPageSize: 'حجم الملف التقديري:',
      inspectorClose: 'إغلاق المفتش',
      tabVisualBuilder: 'كتل بصرية (بسيطة)',
      tabClassicEditor: 'محرر النصوص التقليدي',
      addBlockHeading: '+ عنوان (Title)',
      addBlockText: '+ نص (Text)',
      addBlockImage: '+ مكان الصورة (Image)',
      addBlockButton: '+ زر (Button)',
      blockHeadingPlaceholder: 'اكتب عنوان القسم...',
      blockTextPlaceholder: 'اكتب فقرة المحتوى هنا...',
      blockButtonTextPlaceholder: 'نص الزر (مثال: اتصل بنا)',
      blockButtonUrlPlaceholder: 'وجهة الزر أو الرابط (اختياري)',
      blockImagePlaceholder: 'نموذج صورة / نص بديل للصورة',
      moveUp: 'للأعلى',
      moveDown: 'للأسفل',
      removeBlock: 'حذف الكتلة',
      noBlocksPrompt: 'لم تتم إضافة أي كتل بصرية بعد. اضغط في الأعلى لإضافة عنوان، نص، صورة أو زر.',
    },
    hostingSim: {
      topBanner: 'محاكي الاستضافة والخادم (أوفلاين • دون الحاجة لخادم حقيقي)',
      reset: 'إعادة ضبط',
      resetSuccess: 'تمت إعادة تعيين محاكي الاستضافة.',
      statusPublished: 'منشور (في المحاكي)',
      statusOffline: 'أوفلاين / مسودة',
      tabOverview: 'نظرة عامة',
      tabDigitalHouse: '🏠 البيت الرقمي',
      digitalHouseTitle: 'استعارة بصرية: البيت الرقمي (Digital House)',
      digitalHouseSubtitle: 'نموذج ذهني بسيط وهادئ لكيفية عمل الويب والمواقع بالفعل',
      dhRoomFilesTitle: 'غرفة الملفات (Files)',
      dhRoomFilesDesc: 'صفحات HTML والأنماط والصور مصفوفة مثل الأثاث داخل هذه الغرفة.',
      dhOfficeDbTitle: 'مكتب المعلومات (Database)',
      dhOfficeDbDesc: 'سجل البيانات الديناميكية وقائمة الأعضاء والملاحظات المحفوظة.',
      dhPlateDomainTitle: 'لوحة المنزل (Domain)',
      dhPlateDomainDesc: 'عنوان الشارع الذي من خلاله يصل الزوار إلى بيتك (مثل mysite.com).',
      dhDoorPublishTitle: 'باب البيت (Publish)',
      dhDoorPublishDesc: 'فتح الباب (النشر) يسمح للزوار بالدخول ورؤية بيتك الرقمي.',
      dhDoorOpen: 'الباب مفتوح (الموقع متاح للجميع وعام)',
      dhDoorClosed: 'الباب مغلق (الموقع غير منشور، أوفلاين أو مسودة)',
      tabFiles: 'الملفات',
      tabDatabase: 'قاعدة البيانات',
      fileCountLabel: 'عدد ملفات الاستضافة:',
      fileCountUnit: 'ملفات',
      dbStatusLabel: 'حالة قاعدة البيانات:',
      dbRecordsUnit: 'سجلات بيانات',
      testDomainLabel: 'العنوان التجريبي:',
      honestyReminder: 'تذكير شفاف: هذا محاكٍ تعليمي في ذاكرة هاتفك. لا توجد أي بيانات سرية أو كلمات مرور أو استضافة حقيقية أو نطاقات مسجلة على الإنترنت.',
      publishBtn: 'نشر في المحاكي المحلي',
      unpublishBtn: 'إلغاء النشر في المحاكي (جعله أوفلاين)',
      publishedNotice: 'تم تغيير الحالة إلى "منشور في المحاكي المحلي" (أوفلاين).',
      unpublishedNotice: 'عاد الموقع لحالة غير نشط/مسودة.',
      createSiteBtn: 'إنشاء موقع جديد في المحاكي',
      createdSiteNotice: 'تم إنشاء موقع جديد في محاكي الاستضافة.',
      filesFolderTitle: 'مجلد الملفات العامة (public_html)',
      addSampleFile: 'إضافة ملف تجريبي',
      fileAddedNotice: 'تمت إضافة الملف لمجلد المحاكي.',
      deleteFile: 'حذف الملف',
      fileDeletedNotice: 'تم حذف الملف من المحاكي.',
      downloadFile: 'تحميل الملف الحقيقي',
      downloadFileSuccess: 'تم تحميل الملف بنجاح على جهازك.',
      dbTitle: 'مواصفات قاعدة البيانات المحاكاة:',
      dbNameLabel: 'اسم قاعدة البيانات:',
      dbRowsLabel: 'عدد الصفوف المحفوظة:',
      dbLocationLabel: 'مكان الحفظ:',
      dbLocationVal: 'الذاكرة الدائمة للمتصفح (IndexedDB)',
      addDbRecordBtn: 'إضافة سجل تجريبي لقاعدة البيانات',
      recordAddedNotice: 'تمت إضافة سجل لقاعدة البيانات المحلية.',
      backBtn: 'رجوع',
    },
    realSite: {
      headerTitle: 'أساس بناء موقع حقيقي',
      headerDesc: 'خريطة طريق تعليمية خطوة بخطوة لدخول عالم الويب',
      noticeTitle: 'ملاحظة مهمة للإصدار الأولي (v0.1):',
      noticeText: 'في هذا الإصدار لا توجد أي عمليات حقيقية على الإنترنت لحماية أمانك وراحتك. تجري جميع التدريبات دون اتصال ومحاكاة على جهازك.',
      roadmapTitle: 'خريطة طريق إنشاء الموقع مستقبلاً:',
      stepLearnTitle: '١. التعلّم (Learn)',
      stepLearnDesc: 'التعرف على مفاهيم الويب البسيطة، تنسيق النصوص والألوان والصور بلغة سهلة للجميع.',
      stepPracticeTitle: '٢. التدريب (Practice)',
      stepPracticeDesc: 'العمل بمحاكيات خالية من المخاطر (كمحاكي الصفحات والاستضافة) في ذاكرة الهاتف دون اتصال.',
      stepBuildTitle: '٣. البناء (Build)',
      stepBuildDesc: 'ترتيب كتل الصفحة المرغوبة على الجهاز بطريقة بصرية ولمسية تماماً.',
      stepPublishTitle: '٤. النشر (Publish)',
      stepPublishDesc: 'رفع الملفات إلى خادم إنترنت حقيقي (تحت الإشراف ودون تعقيد تقني).',
      stepManageTitle: '٥. الإدارة (Manage)',
      stepManageDesc: 'تحديث الصفحات، متابعة الإحصاءات وصيانة الموقع بسهولة.',
      statusActiveSim: 'نشط في المحاكي',
      statusReady: 'الأساس الأولي جاهز',
      statusNextVer: 'الإصدار القادم',
      exploreHostingBtn: 'استكشاف محاكي الاستضافة والخادم (أوفلاين)',
      backToModeBtn: 'العودة لاختيار المسار',
      tutorialTitle: 'دليل خطوة بخطوة: استخراج ملف HTML والاتصال بالويب العالمي',
      tutorialSubtitle: 'كيف تتصل صفحتك المحلية بالإنترنت الحقيقي حول العالم',
      tutorialStep1Title: '١. بناء الصفحة وتصميمها',
      tutorialStep1Desc: 'صمم صفحتك في محاكي الصفحات باستخدام الكتل البصرية (العنوان، النص، الصورة والزر).',
      tutorialStep2Title: '٢. النقر على "تصدير الصفحة" (HTML)',
      tutorialStep2Desc: 'انقر على زر التحميل/التصدير ليتم حفظ كامل الصفحة في ملف .html مستقل على جهازك.',
      tutorialStep3Title: '٣. التجربة دون إنترنت في أي متصفح',
      tutorialStep3Desc: 'افتح ملفك المحمّل مباشرة في المتصفح؛ سيعمل فوراً وبشكل قياسي دون اتصال بالإنترنت.',
      tutorialStep4Title: '٤. النشر على الويب العالمي',
      tutorialStep4Desc: 'ارفع هذا الملف القياسي على منصات الاستضافة المجانية (مثل GitHub Pages) ليكون متاحاً للعالم كله.',
      tutorialActionBtn: 'فتح محاكي الصفحات وتجربة التصدير',
      tutorialWebConnectionCallout: 'الاتصال بالويب العالمي: الكود الذي تُنتجه أداة التصدير هو كود ويب قياسي (HTML5) جاهز 100% للنشر الفوري على أي سيرفر حقيقي في العالم دون أي قيود.',
    },
    publish: {
      title: 'التحضير للنشر',
      desc: 'راجع موقعك بعناية وانشره متى أردت.',
      nextBtn: 'المرحلة التالية: النشر على الإنترنت',
      backBtn: 'العودة لبناء الموقع',
    },
    done: {
      title: 'أحسنت! انتهى العمل',
      desc: 'تهانينا! لقد أنشأت موقعك البسيط الأول.',
      restartBtn: 'البدء من جديد',
      bridgeTitle: 'جسر الاتصال بالويب الحقيقي (٣ طرق مجانية ومستقلة)',
      bridgeDesc: 'الصفحة التي قمت ببنائها هي ملف ويب قياسي. يمكنك نشرها على الإنترنت عالمياً مجاناً ودون أي تكاليف:',
      bridgeMethod1Title: 'الطريقة ١: تحميل الملف وإرساله للآخرين',
      bridgeMethod1Desc: 'احفظ ملف HTML وأرسله عبر أي تطبيق محادثة؛ يفتح فوراً على أي هاتف أو حاسوب دون الحاجة لاتصال بالإنترنت.',
      bridgeMethod2Title: 'الطريقة ٢: استضافة مجانية عبر GitHub Pages',
      bridgeMethod2Desc: 'أنشئ مستودعاً مجانياً على GitHub وضع ملفك بداخله ليبقى موقعك منشوراً برابط خاص للأبد.',
      bridgeMethod3Title: 'الطريقة ٣: النشر الفوري عبر Cloudflare / Netlify',
      bridgeMethod3Desc: 'اسحب وأفلت مجلد موقعك لنشره عالمياً في ٥ ثوانٍ دون تعقيد تقني.',
    },
    focusMode: {
      title: 'دليل التركيز (خطوة بخطوة وبهدوء)',
      whereAmI: 'أين أنا؟',
      whatAmIDoing: 'ماذا أفعل؟',
      whatNext: 'ما الخطوة التالية؟',
      stepWelcome: 'شاشة الترحيب والبداية',
      stepChoose: 'اختيار المسار (تدريب أو بناء)',
      stepPractice: 'محاكي الصفحات والخادم',
      stepBuild: 'خارطة طريق بناء موقع حقيقي',
      stepPublish: 'المراجعة والحفظ المحلي',
      stepDone: 'تم الانتهاء بنجاح',
      doingWelcome: 'التعرف على آي‌سيتي وبدء التجربة الأولى',
      doingChoose: 'الاختيار بين التدريب بالمحاكي أو خارطة الموقع',
      doingPractice: 'التدرب بأمان ودون اتصال على إدارة الصفحات',
      doingBuild: 'الاطلاع على خطوات بناء موقع الويب في المستقبل',
      doingPublish: 'مراجعة ما تم حفظه في ذاكرة جهازك',
      doingDone: 'مشاهدة تقدمك المحفوظ في هذا الجهاز',
      nextWelcome: 'المس زر «الدخول واختيار المسار»',
      nextChoose: 'اختر إحدى البطاقتين الصفراء أو الخضراء',
      nextPractice: 'يمكنك إنشاء برگه جديدة أو استكشاف التبويبات',
      nextBuild: 'استكشف محاكي الاستضافة أو عد لاختيار المسار',
      nextPublish: 'المس زر التأكيد لإتمام الخطوة',
      nextDone: 'المس «البدء من جديد» كلما أردت بدء تمرين جديد',
    },
    bridge: {
      title: 'جسر العبور إلى الويب الحقيقي',
      subtitle: 'كيف تنشر صفحاتك المحاكاة على الإنترنت الحقيقي بدون أي تكلفة؟',
      step1Title: '١. تصدير ملف HTML',
      step1Desc: 'في محاكي ووردبريس، اضغط زر «تصدير HTML» لحفظ صفحتك كملف ويب قياسي على جهازك.',
      step2Title: '٢. استضافة ثابتة مجانية',
      step2Desc: 'تتيح لك منصات مثل GitHub Pages أو Cloudflare Pages رفع هذا الملف واستضافته مجاناً ودائماً.',
      step3Title: '٣. نطاق خاص (اختياري)',
      step3Desc: 'عندما تصبح جاهزاً، يمكنك ربط اسم نطاق خاص بملفك ليصبح لديك موقع مستقل كامل.',
      summaryBadge: 'مسار تعليمي مجاني',
    },
  },

  es: {
    app: {
      name: 'ICity Core',
      tagline: 'Base de aprendizaje web simple',
      version: 'v',
      fontSizeToggle: 'Cambiar tamaño de fuente',
      highContrastToggle: 'Cambiar a alto contraste',
      highContrastOn: 'Alto contraste (Activado)',
      highContrastOff: 'Contraste normal',
      focusModeToggle: 'Cambiar a modo de enfoque',
      focusModeOn: 'Modo de enfoque (Activado)',
      focusModeOff: 'Modo normal',
      skipToContent: 'Saltar al contenido principal',
      language: 'Idioma',
      footerText: 'ICity Core — Simulador seguro y sin estrés para todos',
      online: 'En línea (Conectado)',
      offline: 'Sin conexión (Memoria del dispositivo)',
      downloadZip: 'Descargar código fuente completo (ZIP)',
    },
    banner: {
      offlineMsg: 'Sin conexión a internet; aún puedes practicar.',
      checking: 'Comprobando conexión...',
      recheck: 'Verificar de nuevo',
    },
    welcome: {
      badge: 'Sin estrés, paso a paso',
      title: '¡Hola! Bienvenido a ICity',
      description: 'Un lugar seguro y sencillo para aprender cómo funciona la web, sin miedo a equivocarte.',
      point1: 'Sin contraseñas ni registros necesarios',
      point2: 'Sin conexión y seguro en la memoria de tu dispositivo',
      point3: 'Diseño tranquilo, sin anuncios ni desorden',
      startBtn: 'Entrar y elegir camino',
      zipCardTitle: 'Código fuente directo del proyecto (ZIP)',
      zipCardDesc: 'Descarga todo el código fuente para subirlo manualmente a tu GitHub con seguridad.',
      zipCardBtn: 'Descargar archivo ZIP del proyecto',
    },
    chooseMode: {
      title: '¡Hola! ¿Qué te gustaría hacer?',
      subtitle: 'Elige uno de los dos caminos a continuación:',
      practiceTitle: 'Juego y práctica',
      practiceDesc: 'Simulador educativo y práctica sin riesgos',
      buildTitle: 'Construir un sitio web real',
      buildDesc: 'Para cuando quieras crear tu primera página real',
      autoSaveNotice: 'Todo se guarda automáticamente en la memoria de tu dispositivo.',
      backToWelcome: 'Volver a la bienvenida',
    },
    simSwitcher: {
      wpSim: 'Simulador de páginas (WordPress)',
      hostingSim: 'Simulador de hosting y servidor',
    },
    wpSim: {
      topBanner: 'Simulador educativo de páginas (Totalmente local y sin conexión)',
      reset: 'Restablecer',
      resetSuccess: 'El simulador se restableció al estado inicial.',
      createPage: 'Crear nueva página',
      listTitle: 'Lista de páginas',
      pagesCount: 'páginas en el dispositivo',
      storageBadge: 'Guardado en almacenamiento persistente',
      emptyList: 'No hay páginas aún. Toca "Crear nueva página" para comenzar.',
      statusPublished: 'Publicado (en simulador)',
      statusDraft: 'Borrador',
      edit: 'Editar',
      preview: 'Vista previa',
      publishLocal: 'Publicar localmente',
      makeDraft: 'Hacer borrador',
      delete: 'Eliminar',
      deleteTitle: 'Eliminar página',
      deletedSuccess: 'Página eliminada del simulador.',
      statusToggled: 'Estado de la página actualizado en el simulador.',
      createdSuccess: 'Nueva página creada en el almacenamiento del dispositivo.',
      editModalTitle: 'Editar página en el simulador',
      titleLabel: 'Título de la página:',
      titlePlaceholder: 'p. ej., Acerca de mi ciudad',
      contentLabel: 'Contenido de la página:',
      contentPlaceholder: 'Escribe tu texto aquí...',
      honestyNote: 'Recordatorio: Al presionar publicar, la página solo se marca como "Publicada" localmente en tu dispositivo sin conexión; no se sube a internet.',
      publishBtn: 'Publicar en simulador (local)',
      saveDraftBtn: 'Guardar cambios (borrador)',
      cancelBtn: 'Cancelar y volver',
      deleteThisPage: 'Eliminar esta página',
      savedSuccess: 'Cambios guardados localmente.',
      publishedSuccess: 'Estado cambiado a "Publicado en simulador local".',
      previewModalTitle: 'Vista previa de la página simulada',
      previewEmpty: 'Esta página aún no tiene contenido.',
      editThisPage: 'Editar esta página',
      backToList: 'Volver a la lista',
      goToBuild: 'Ir a la base del sitio real',
      backToMode: 'Volver a elegir modo',
      exportHtml: 'Exportar archivo HTML real',
      exportedSuccess: 'Archivo HTML real descargado en tu dispositivo.',
      inspect: 'Inspeccionar página',
      inspectorTitle: 'Inspector Web: ¿Cómo funciona mi página?',
      inspectorStatusCode: 'Respuesta del servidor:',
      inspectorContentType: 'Tipo de documento (MIME):',
      inspectorEncoding: 'Codificación:',
      inspectorPageSize: 'Tamaño estimado:',
      inspectorClose: 'Cerrar inspector',
      tabVisualBuilder: 'Bloques visuales (Simple)',
      tabClassicEditor: 'Editor de texto clásico',
      addBlockHeading: '+ Título (Title)',
      addBlockText: '+ Texto (Text)',
      addBlockImage: '+ Espacio de imagen (Image)',
      addBlockButton: '+ Botón (Button)',
      blockHeadingPlaceholder: 'Escribe el título de la sección...',
      blockTextPlaceholder: 'Escribe el párrafo o contenido aquí...',
      blockButtonTextPlaceholder: 'Texto del botón (ej: Contáctanos)',
      blockButtonUrlPlaceholder: 'Destino o enlace del botón (opcional)',
      blockImagePlaceholder: 'Muestra de imagen / descripción alt',
      moveUp: 'Subir',
      moveDown: 'Bajar',
      removeBlock: 'Eliminar bloque',
      noBlocksPrompt: 'Aún no hay bloques visuales. Pulsa los botones de arriba para añadir un Título, Texto, Imagen o Botón.',
    },
    hostingSim: {
      topBanner: 'Simulador de hosting y servidor (Sin conexión • Sin servidor real)',
      reset: 'Restablecer',
      resetSuccess: 'Simulador de hosting restablecido al inicio.',
      statusPublished: 'Publicado (en simulador)',
      statusOffline: 'Sin conexión / Borrador',
      tabOverview: 'Resumen',
      tabDigitalHouse: '🏠 Casa Digital',
      digitalHouseTitle: 'Metáfora visual: La Casa Digital (Digital House)',
      digitalHouseSubtitle: 'Un modelo mental intuitivo y tranquilo de cómo funciona la web en la realidad',
      dhRoomFilesTitle: 'Habitación de archivos (Files)',
      dhRoomFilesDesc: 'Documentos HTML, estilos e imágenes ordenados como muebles dentro de esta habitación.',
      dhOfficeDbTitle: 'Oficina de información (Database)',
      dhOfficeDbDesc: 'El libro de registro y datos dinámicos que guarda listas, notas y registros de usuarios.',
      dhPlateDomainTitle: 'Placa de la casa (Domain)',
      dhPlateDomainDesc: 'La dirección de la calle por la que los visitantes encuentran tu hogar (ej: misitio.com).',
      dhDoorPublishTitle: 'Puerta principal (Publish)',
      dhDoorPublishDesc: 'Abrir la puerta (publicar) permite que los visitantes entren y vean tu casa digital.',
      dhDoorOpen: 'Puerta abierta (El sitio es público y accesible)',
      dhDoorClosed: 'Puerta cerrada (El sitio está fuera de línea, privado o en borrador)',
      tabFiles: 'Archivos',
      tabDatabase: 'Base de datos',
      fileCountLabel: 'Archivos en hosting:',
      fileCountUnit: 'archivos',
      dbStatusLabel: 'Estado de base de datos:',
      dbRecordsUnit: 'filas de datos',
      testDomainLabel: 'Dirección de prueba:',
      honestyReminder: 'Transparencia clara: Este es un simulador educativo en la memoria de tu dispositivo. No hay credenciales, contraseñas, hosting real ni dominios en internet.',
      publishBtn: 'Publicar en simulador local',
      unpublishBtn: 'Despublicar en simulador (pasar a sin conexión)',
      publishedNotice: 'Estado cambiado a "Publicado en simulador local" (sin conexión).',
      unpublishedNotice: 'El sitio volvió al estado inactivo/borrador.',
      createSiteBtn: 'Crear nuevo sitio en el simulador',
      createdSiteNotice: 'Nuevo sitio creado en el simulador de hosting.',
      filesFolderTitle: 'Carpeta de archivos públicos (public_html)',
      addSampleFile: 'Añadir archivo de muestra',
      fileAddedNotice: 'Archivo añadido a la carpeta del simulador.',
      deleteFile: 'Eliminar archivo',
      fileDeletedNotice: 'Archivo eliminado del simulador.',
      downloadFile: 'Descargar archivo real',
      downloadFileSuccess: 'Archivo descargado con éxito en tu dispositivo.',
      dbTitle: 'Especificaciones de base de datos simulada:',
      dbNameLabel: 'Nombre de la base de datos:',
      dbRowsLabel: 'Filas almacenadas:',
      dbLocationLabel: 'Ubicación de almacenamiento:',
      dbLocationVal: 'Almacenamiento persistente del navegador (IndexedDB)',
      addDbRecordBtn: 'Añadir registro de prueba a la base de datos',
      recordAddedNotice: 'Fila de datos añadida a la base de datos local.',
      backBtn: 'Volver',
    },
    realSite: {
      headerTitle: 'Base para un sitio web real',
      headerDesc: 'Ruta de aprendizaje paso a paso para entrar en la web',
      noticeTitle: 'Nota importante de la versión inicial (v0.1):',
      noticeText: 'En esta versión no se realizan operaciones reales en internet para preservar tu seguridad y tranquilidad. Todos los ejercicios se realizan sin conexión y simulados en tu dispositivo.',
      roadmapTitle: 'Ruta futura para la creación de sitios web:',
      stepLearnTitle: '1. Aprender (Learn)',
      stepLearnDesc: 'Comprender conceptos web sencillos, maquetación de texto, colores e imágenes en un lenguaje fácil para todos.',
      stepPracticeTitle: '2. Practicar (Practice)',
      stepPracticeDesc: 'Trabajar con simuladores sin riesgo (como páginas y hosting) en la memoria sin conexión del teléfono.',
      stepBuildTitle: '3. Construir (Build)',
      stepBuildDesc: 'Organizar bloques de tu página en el dispositivo de forma totalmente visual y táctil.',
      stepPublishTitle: '4. Publicar (Publish)',
      stepPublishDesc: 'Subir archivos a un servidor de internet real (supervisado y sin fricción técnica).',
      stepManageTitle: '5. Gestionar (Manage)',
      stepManageDesc: 'Actualizar páginas, ver estadísticas de visitas y mantener el sitio fácilmente.',
      statusActiveSim: 'Activo en el simulador',
      statusReady: 'Base inicial lista',
      statusNextVer: 'Próxima versión',
      exploreHostingBtn: 'Explorar simulador de hosting y servidor (sin conexión)',
      backToModeBtn: 'Volver a elegir modo',
      tutorialTitle: 'Guía paso a paso: Exportar página HTML y conectar con la web global',
      tutorialSubtitle: 'Cómo tu creación local se conecta con el internet mundial',
      tutorialStep1Title: '1. Construir y diseñar tu página',
      tutorialStep1Desc: 'Diseña tu página en el Simulador de páginas utilizando bloques visuales (título, texto, imagen y botón).',
      tutorialStep2Title: '2. Clic en "Exportar página" (HTML)',
      tutorialStep2Desc: 'Pulsa el botón de exportación para guardar toda la página en un archivo estándar .html descargado en tu dispositivo.',
      tutorialStep3Title: '3. Probar sin conexión en cualquier navegador',
      tutorialStep3Desc: 'Abre el archivo descargado directamente en Chrome, Safari o Firefox; funciona al instante sin necesidad de internet.',
      tutorialStep4Title: '4. Publicar en la web abierta',
      tutorialStep4Desc: 'Sube este archivo a servicios de hosting gratuitos (como GitHub Pages) para que cualquiera en el mundo pueda visitarlo.',
      tutorialActionBtn: 'Abrir simulador de páginas y probar la exportación',
      tutorialWebConnectionCallout: 'Conexión con la web abierta: El código HTML generado por ICity es estándar web abierto (HTML5). Sin bloqueos propietarios ni dependencias: lo que creas sin conexión está 100% listo para la web real.',
    },
    publish: {
      title: 'Preparación de la publicación',
      desc: 'Revisa tu sitio con cuidado y publica cuando estés listo.',
      nextBtn: 'Siguiente: Publicar en internet',
      backBtn: 'Volver a construir sitio',
    },
    done: {
      title: '¡Bien hecho! Todo listo',
      desc: '¡Felicidades! Creaste tu primer sitio web sencillo.',
      restartBtn: 'Comenzar de nuevo desde el principio',
      bridgeTitle: 'El puente a la web real (3 formas gratuitas e independientes)',
      bridgeDesc: 'La página que creaste es un archivo web estándar. Puedes alojarla y compartirla globalmente sin costo alguno:',
      bridgeMethod1Title: 'Método 1: Descargar y compartir directamente',
      bridgeMethod1Desc: 'Guarda el archivo HTML y envíalo por cualquier aplicación. Se abre al instante en cualquier teléfono o computadora sin conexión.',
      bridgeMethod2Title: 'Método 2: Alojamiento gratis en GitHub Pages',
      bridgeMethod2Desc: 'Crea un repositorio gratuito en GitHub y añade tu archivo HTML para mantener tu sitio en línea de forma permanente con tu propio enlace.',
      bridgeMethod3Title: 'Método 3: Despliegue inmediato en Cloudflare / Netlify',
      bridgeMethod3Desc: 'Arrastra y suelta la carpeta de tu sitio web en Cloudflare Pages o Netlify Drop para publicarlo en internet en pocos segundos.',
    },
    focusMode: {
      title: 'Guía de enfoque (Paso a paso y con calma)',
      whereAmI: '¿Dónde estoy?',
      whatAmIDoing: '¿Qué estoy haciendo?',
      whatNext: '¿Qué debería hacer ahora?',
      stepWelcome: 'Pantalla de bienvenida y comienzo',
      stepChoose: 'Elegir camino (Práctica o Construir)',
      stepPractice: 'Simuladores y práctica sin riesgo',
      stepBuild: 'Mapa de ruta del sitio web real',
      stepPublish: 'Revisión y publicación local',
      stepDone: 'Completado con éxito',
      doingWelcome: 'Conociendo ICity y comenzando tu primera experiencia',
      doingChoose: 'Decidiendo entre el simulador o el mapa de ruta',
      doingPractice: 'Practicando la edición de páginas sin conexión',
      doingBuild: 'Viendo los cinco pasos simples para la web futura',
      doingPublish: 'Revisando los datos guardados en el dispositivo',
      doingDone: 'Viendo tus logros guardados en este dispositivo',
      nextWelcome: 'Toca "Entrar y elegir camino"',
      nextChoose: 'Elige una de las dos tarjetas (amarilla o verde)',
      nextPractice: 'Crea una página o explora las pestañas',
      nextBuild: 'Explora el servidor o vuelve al selector de modo',
      nextPublish: 'Toca el botón de confirmación para terminar',
      nextDone: 'Toca "Comenzar de nuevo" cuando desees otra práctica',
    },
    bridge: {
      title: 'Puente hacia la Web Real',
      subtitle: '¿Cómo poner tus páginas simuladas en línea en la internet real sin costo alguno?',
      step1Title: '1. Exportar HTML Real',
      step1Desc: 'En el Simulador de WordPress, toca "Exportar HTML" para guardar tu página como un archivo web estándar en tu dispositivo.',
      step2Title: '2. Alojamiento Estático Gratuito',
      step2Desc: 'Plataformas como GitHub Pages o Cloudflare Pages te permiten alojar este archivo HTML de forma permanente y gratuita.',
      step3Title: '3. Dominio Personalizado (Opcional)',
      step3Desc: 'Cuando estés listo, puedes conectar un nombre de dominio para tener tu propio sitio independiente.',
      summaryBadge: 'Ruta de Aprendizaje Gratuita',
    },
  },
};

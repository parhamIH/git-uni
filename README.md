# وب‌بوک فارسی Git & GitHub

یک وب‌بوک راست‌به‌چپ و تعاملی برای ارائهٔ دانشجویی به زبان فارسی. این پروژه فقط از HTML، CSS و JavaScript سمت مرورگر استفاده می‌کند و به ابزار build نیاز ندارد.

## فایل‌ها

- `index.html` — محتوای سایت و نمودارهای برداری (SVG)
- `styles.css` — طراحی واکنش‌گرا، پوستهٔ روشن/تیره، حالت چاپ و ارائه
- `script.js` — کپی دستورها، جست‌وجوی فهرست، نوار پیشرفت، آزمون و حالت ارائه
- `content-fa.md` — متن آموزشی مستقل برای یادداشت‌ها و ویرایش
- `.nojekyll` — جلوگیری از پردازش Jekyll در مسیر سادهٔ GitHub Pages

## اجرای محلی

کافی است `index.html` را در مرورگر باز کنی. برای بهترین تجربه، با اینترنت متصل باش تا فونت Vazirmatn از Google Fonts بارگیری شود؛ در حالت آفلاین از فونت‌های جایگزین استفاده می‌شود. کپی کلیپ‌بورد در بعضی مرورگرها فقط در localhost یا HTTPS کامل کار می‌کند.

## انتشار روی GitHub Pages

1. یک repository در GitHub بساز (مثلاً `git-github-webbook`).
2. تمام فایل‌های این پوشه را در ریشهٔ شاخهٔ `main` قرار بده و push کن.
3. در مخزن، وارد `Settings → Pages` شو.
4. در `Build and deployment`، گزینهٔ `Deploy from a branch` را انتخاب کن.
5. شاخهٔ `main` و پوشهٔ `/(root)` را انتخاب کن و `Save` را بزن.
6. پس از اتمام انتشار، آدرس سایت در همان صفحه نمایش داده می‌شود.

برای مسیر کامل، مستند رسمی را ببین: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## قابلیت‌ها

- طراحی RTL فارسی و واکنش‌گرا
- فهرست فصول با جست‌وجو
- حالت ارائه با کلیدهای جهت و Escape
- پوستهٔ روشن و تیره
- کپی سریع فرمان‌ها
- آزمون پنج‌سؤالی همراه با توضیح پاسخ
- نمودارهای SVG مستقل از سرویس تصویر خارجی
- استایل چاپ / ذخیره به PDF

## منابع محتوایی

- Pro Git فارسی: https://git-scm.com/book/fa/v2
- GitHub Docs: https://docs.github.com/en
- Pro Git — Recording Changes: https://git-scm.com/book/fa/v2/%D9%85%D9%82%D8%AF%D9%85%D8%A7%D8%AA-%DA%AF%DB%8C%D8%AA-git-basics-chapter-%D8%AB%D8%A8%D8%AA-%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA-%D8%AF%D8%B1-%D9%85%D8%AE%D8%B2%D9%86-Recording-Changes-to-the-Repository
- Pull Requests: https://docs.github.com/en/pull-requests/get-started/about-pull-requests
- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- GitHub Issues: https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues

> توجه آموزشی: مثال‌ها برای یادگیری و مخزن تمرینی‌اند. پیش از اجرای دستورهای دارای اثر تخریبی، وضعیت مخزن را بررسی کن و به راهنمای همان دستور مراجعه کن.


## حالت ارائه و خوانایی

- فونت متن و مثال‌ها در نسخهٔ به‌روزشده بزرگ‌تر شده تا در نمایشگر کلاس راحت‌تر خوانده شود.
- روی «حالت ارائه» کلیک کن و با کلیدهای جهت‌دار بین فصل‌ها حرکت کن؛ با `Escape` خارج شو.
- برای آماده‌بودن در کلاس، یک نسخهٔ محلی از پروژه را هم نگه دار تا بدون اینترنت قابل نمایش باشد.
- فایل `content-fa.md` نسخهٔ مستقل متن آموزشی است و شامل جزئیات تکمیلی برای مطالعه و یادداشت‌برداری است.


## نسخهٔ تکمیلی آموزشی

این نسخه محتوای عمیق‌تری برای ارائه اضافه می‌کند و هر فصل را با یکی از برچسب‌های **Git**، **GitHub** یا **Git + GitHub** مشخص می‌کند. مباحث تازه شامل VCS/CVCS/DVCS، نصب، تنظیم نام/ایمیل و ویرایشگر، توضیح پوشهٔ `.git`، همهٔ شکل‌های رایج `git diff`، Patch و `git apply`، سوییچ‌های `git log`، `git show`، `git add -A` و `git add -p`، `git commit -a -m`، `git mv`، `restore` و `reset`، `commit --amend`، `commit -s`، Fast-forward و Three-way merge، راهنمای Remote، Rebase و Rollback با Revert است.

**یادآوری امنیتی:** برای احراز هویت GitHub از `git config --global password` استفاده نکنید؛ GitHub برای عملیات Git over HTTPS رمز عادی حساب را نمی‌پذیرد. از Git Credential Manager، GitHub CLI یا SSH استفاده کنید.

محتوای مفصل‌تر برای یادداشت‌های مجری در `content-fa.md` است.


## مسیر عملی از صفر تا Push

نسخهٔ فعلی یک فصل کامل از ساخت حساب GitHub و Repository تا نصب/تنظیم Git، Clone، تغییر README، `git status`، `git diff`، Stage، Commit، Push، Branch و Pull Request دارد. این فصل برای اجرای زنده در کلاس نوشته شده است؛ متن جداگانه در `content-fa.md` نیز به‌روز شده است.


## سرفصل‌های تکمیلی نسخهٔ جدید

- مرور بخش‌های مهم GitHub UI و قابلیت‌های Repository، Profile، Actions، Projects، Discussions، Security، Releases و موارد دیگر
- تفاوت Star، Watch، Fork و Follow، روش استفاده از Explore/Trending و ارزیابی Repositoryهای دیگران
- گردش کامل Issue از ساخت در UI تا نوشتن Comment، ارجاع در Commit message و بستن خودکار از طریق Pull Request
- توضیح کامل‌تر Remoteها، `origin` و `upstream`، Remote-tracking Branch، تغییر URL، چند Remote، خطاهای رایج و همگام‌سازی بعد از Fork
- پاسخ‌نامهٔ ثابت برای آزمون تعاملی پنج‌سؤالی و سه سناریوی اضافه

منابع افزوده‌شده:
- آموزش Git جادی در مکتب‌خونه: https://maktabkhooneh.org/course/%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%DA%AF%DB%8C%D8%AA-%D8%AC%D8%A7%D8%AF%DB%8C-mk12029/
- GitHub Issues Quickstart: https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/quickstart
- GitHub Explore: https://docs.github.com/en/get-started/exploring-projects-on-github
- Managing Remote Repositories: https://docs.github.com/en/get-started/git-basics/managing-remote-repositories

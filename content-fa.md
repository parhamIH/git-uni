# Git و GitHub؛ راهنمای کاربردی برای ارائهٔ دانشجویی

> پیام محوری: قرار نیست همهٔ سناریوهای Git را از حفظ باشیم. هدف، داشتن مدل ذهنی درست، بررسی وضعیت پیش از عملیات و مراجعه به راهنمای معتبر برای دستورهای ناآشناست.

## طرح پیشنهادی ارائه

برای ارائهٔ ۳۵ تا ۴۰ دقیقه‌ای، از مسیر یک داستان استفاده کن: یک پروژهٔ ساده را شروع می‌کنیم، تغییرها را بررسی و Commit می‌کنیم، قابلیت جدیدی را در Branch می‌سازیم، تعارض را تحلیل می‌کنیم و در نهایت پروژه را روی GitHub قرار می‌دهیم.

| بخش | زمان تقریبی | هدف |
|---|---:|---|
| شروع و دلیل Version Control | ۳ دقیقه | طرح مسئله و تفاوت Git و GitHub |
| مدل ذهنی Git | ۴ دقیقه | Working Tree، Stage، Commit |
| چرخهٔ روزمره و دستورها | ۶ دقیقه | Status، Diff، Add، Commit، Log |
| Branch و Merge | ۴ دقیقه | توسعهٔ مستقل و ادغام |
| Conflict | ۵ دقیقه | علت ایجاد تعارض و روش رفع امن |
| GitHub از صفر | ۶ دقیقه | Repository، README، Issue، Pull Request |
| آزمون سناریویی و خطاها | ۵ دقیقه | تعامل با کلاس |
| GitHub Pages و جمع‌بندی | ۳ دقیقه | انتشار همین وب‌بوک |

---

## ۱. Git چه مشکلی را حل می‌کند؟

تصور کنید برنامه دیروز کار می‌کرد اما امروز خراب شده است. وقتی فقط فایل‌های فعلی را داریم، پیدا کردن تغییر خراب‌کننده سخت است. Version Control تاریخچهٔ تغییرها را نگه می‌دارد، امکان مقایسه می‌دهد و بازگشت به وضعیت‌های قبلی را ساده‌تر می‌کند.

### Git در برابر GitHub

- **Git:** سیستم کنترل نسخهٔ توزیع‌شده؛ تاریخچه و تغییرهای پروژه را مدیریت می‌کند. بسیاری از عملیات مهم مانند Commit روی دستگاه محلی انجام می‌شود.
- **GitHub:** سرویس میزبانی و همکاری روی مخازن Git؛ ابزارهایی مانند Pull Request، Issues، Code Review و GitHub Pages دارد.
- بنابراین Git و GitHub یکی نیستند. می‌توان از Git بدون GitHub استفاده کرد.

### اصطلاحات اصلی

- **Repository (Repo):** مخزن پروژه و داده‌های مرتبط با تاریخچه.
- **Commit:** یک وضعیت ثبت‌شده در تاریخچه همراه پیام و اطلاعات نویسنده.
- **Branch:** اشاره‌گری سبک به یک Commit که برای جداکردن مسیر توسعه استفاده می‌شود.
- **Remote:** نام و آدرس مخزنی دیگر، برای مثال `origin` که به GitHub اشاره می‌کند.
- **HEAD:** اشاره‌ای به Commit یا وضعیت فعلی که در آن کار می‌کنیم؛ معمولاً روی شاخهٔ جاری است.

## ۲. مدل ذهنی: Working Tree → Stage → Commit

### Working Tree

فایل‌هایی که در پوشهٔ پروژه می‌بینی و ویرایش می‌کنی. `git diff` تغییرهای فایل‌های دنبال‌شده را که هنوز Stage نشده‌اند نشان می‌دهد.

### Staging Area

منطقه‌ای برای انتخاب دقیق تغییرهایی که می‌خواهی وارد Commit بعدی شوند. `git add` تغییر را Stage می‌کند؛ خودش Commit نمی‌سازد.

### Local Repository

پس از `git commit`، تغییرهای Stage شده در تاریخچهٔ محلی ثبت می‌شوند. این عملیات به‌تنهایی Commit را به GitHub نمی‌فرستد.

### Remote Repository

با `git push` Commitهای محلی را به مخزن راه دور می‌فرستیم. `git fetch` اطلاعات جدید Remote را می‌گیرد، اما آن‌ها را خودکار با شاخهٔ فعلی ادغام نمی‌کند؛ `git pull` دریافت را به Merge یا Rebase طبق تنظیمات متصل می‌کند.

### چرخهٔ اصلی

```bash
git status
git diff
# فایل‌ها را ویرایش کن
git add README.md
git diff --staged
git commit -m "docs: add README"
git log --oneline
git status
```

**نکتهٔ مهم:** اگر پس از `git add` دوباره همان فایل را ویرایش کنی، تغییر جدید به‌طور خودکار وارد Stage قبلی نشده است. دوباره وضعیت را بررسی کن و در صورت نیاز فایل را دوباره Stage کن.

## ۳. پیکربندی اولیه

نام و ایمیلی که Git در Commitها ثبت می‌کند را تنظیم کن. این مقدارها را با اطلاعات خودت جایگزین کن:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --list --show-origin
```

- `--global`: این تنظیم برای کاربر فعلی سیستم اعمال شود، نه فقط مخزن کنونی.
- `--list`: تنظیمات خوانده‌شده را نمایش می‌دهد.
- `--show-origin`: منبع هر مقدار تنظیمات را هم نمایش می‌دهد.

ساخت یک مخزن جدید:

```bash
git init -b main
git status
```

`-b main` شاخهٔ اولیه را `main` نام‌گذاری می‌کند، مشروط به اینکه نسخهٔ Git این گزینه را پشتیبانی کند. اگر در مخزن موجود کار می‌کنی، بی‌دلیل دوباره `git init` نزن.

## ۴. چرا `git status` را زیاد اجرا کنیم؟

`git status` فرمانی ارزان و غیرمخرب برای دیدن وضعیت شاخه و فایل‌هاست. آن را پیش و پس از عملیات‌هایی اجرا کن که نتیجه‌شان برایت روشن نیست.

1. می‌فهمی کدام فایل‌ها Untracked، Modified یا Staged هستند.
2. از Stage کردن تصادفی فایل‌های موقت یا حساس دوری می‌کنی.
3. پس از Merge، Pull، Restore یا حل Conflict می‌بینی Git چه وضعیتی دارد.
4. به‌جای حدس‌زدن، تصمیم بعدی را بر اساس وضع واقعی مخزن می‌گیری.

فرمان مفید: `git status -sb`؛ گزینهٔ `-s` خروجی کوتاه و `-b` اطلاعات شاخه را نشان می‌دهد.

## ۵. چرا Commitهای کوچک و معنادار؟

Commit باید یک واحد منطقی از تغییر را ثبت کند. Commitهای کوچک و هدفمند کمک می‌کنند:

- نقطهٔ بازگشت مشخصی داشته باشیم؛
- مرور و بررسی تغییرها ساده‌تر شود؛
- با `git log` بفهمیم چه کاری و با چه هدفی انجام شده؛
- پیدا کردن Commit مشکل‌ساز با ابزارهایی مثل `git bisect` آسان‌تر شود.

«زیاد Commit کن» یعنی وقتی یک کار کوچک تمام شد، آن را Commit کن؛ مثلاً رفع خطای ورود، اضافه‌کردن فیلتر جست‌وجو یا تکمیل README. لازم نیست برای هر خط یک Commit بسازی. تغییرهای نامربوط را با هم قاطی نکن و کد خراب را بی‌دلیل به شاخهٔ اصلی نفرست. در پروژهٔ گروهی، روش توافق‌شدهٔ تیم را رعایت کن. پیام Commit هم باید بگوید چه چیزی عوض شده است؛ مثلاً `fix: handle empty search` یا `docs: explain setup`.

## ۶. دستورهای بررسی

| دستور | کاربرد | نکته |
|---|---|---|
| `git status` | وضعیت فایل و شاخه | پیش و پس از عملیات مهم |
| `git diff` | تغییرهای خارج از Stage | تغییرهای ثبت‌نشده را می‌بینی |
| `git diff --staged` | تغییرهای آمادهٔ Commit | پیش از Commit مرور کن |
| `git log --oneline` | تاریخچهٔ فشرده | گزینهٔ `--oneline` هر Commit را خلاصه می‌کند |
| `git log --oneline --graph --decorate --all` | گراف تاریخچه | Branch و مسیرهای موازی را بررسی کن |
| `git show` | جزئیات یک Commit | می‌توان SHA یا ref هم داد |
| `git show --stat` | آمار فایل‌های یک Commit | نمای کوتاه از فایل‌های تغییرکرده |
| `git diff --check` | بررسی نشانه‌های رایج فضای سفید | جایگزین تست نرم‌افزار نیست |

## ۷. Branch، Switch و Merge

Branch امکان می‌دهد قابلیتی را جدا از شاخهٔ اصلی توسعه دهیم.

```bash
git switch -c feature/add-intro
git add README.md
git commit -m "docs: add introduction"
git switch main
git merge feature/add-intro
git log --oneline --graph --decorate --all
```

- `git branch`: فهرست شاخه‌های محلی.
- `git switch main`: رفتن به شاخهٔ موجود.
- `git switch -c feature/name`: ساخت شاخهٔ جدید و سوییچ به آن؛ `-c` یعنی create.
  در نسخه‌های قدیمی‌تر Git که `switch` ندارند، معمولاً شکل قدیمی‌تر `git checkout -b feature/name` هم استفاده می‌شد.
- `git merge feature/name`: ادغام شاخهٔ نام‌برده در شاخهٔ فعلی؛ پیش از اجرای آن بررسی کن که روی شاخهٔ مقصد هستی.
- `git branch -d feature/name`: حذف امن شاخهٔ محلی که Git تشخیص دهد ادغام شده است.

Branch در Git یک کپی مستقل کامل از پوشه نیست؛ یک مرجع سبک به Commit است. Merge همیشه به شکل یک Commit جدید ظاهر نمی‌شود؛ اگر تاریخچه اجازه بدهد، امکان Fast-forward هم وجود دارد.

## ۸. Merge Conflict؛ علت و رفع

### چرا تعارض رخ می‌دهد؟

Conflict زمانی رخ می‌دهد که Git نتواند تغییرهای شاخه‌ها را بدون ابهام ادغام کند. سناریوهای معمول:

- دو شاخه یک خط یا محدودهٔ نزدیک از یک فایل را ناسازگار تغییر داده‌اند؛
- یک شاخه فایل را حذف کرده اما شاخهٔ دیگر همان فایل را ویرایش کرده؛
- شاخه‌ها از تاریخچهٔ مشترکی جدا شده و تغییرهای متضاد دارند.

تغییر یک فایل به‌تنهایی تضمین نمی‌کند Conflict رخ دهد؛ Git معمولاً می‌تواند تغییرهای مستقل را ادغام کند. از طرف دیگر، Merge بدون Conflict نیز ممکن است باگ منطقی ایجاد کند.

### نشانه‌های Conflict

```text
<<<<<<< HEAD
تغییر موجود در شاخهٔ فعلی
=======
تغییر موجود در شاخهٔ دیگر
>>>>>>> feature/update-title
```

این نشانگرها باید پس از تصمیم‌گیری حذف شوند؛ باقی ماندن آن‌ها کد نهایی معتبری نیست.

### روش حل امن

1. `git status` را اجرا کن و فایل‌های حل‌نشده را ببین.
2. هر دو تغییر را بخوان و هدفشان را بفهم؛ در صورت نیاز با هم‌تیمی هماهنگ شو.
3. محتوای نهایی را انتخاب یا ترکیب کن و نشانگرهای تعارض را حذف کن.
4. فایل حل‌شده را با `git add path/to/file` Stage کن.
5. Merge را کامل کن. در Merge معمولی ممکن است نیاز به `git commit` باشد؛ اگر Git خودکار Commit ساخته یا عملیات از نوع دیگری بوده است، وضعیت می‌تواند فرق کند.
6. تست‌ها را اجرا کن و دوباره `git status` بزن.

برای کنار گذاشتن Merge در جریان، `git merge --abort` معمولاً تلاش می‌کند وضعیت پیش از Merge را بازیابی کند. اگر پیش از شروع تغییرات محلی داشته باشی، برگشت به حالت دقیق قبلی ممکن است پیچیده شود؛ قبل از Merge وضعیت را بررسی کن.

## ۹. Undo؛ راهکار را بر اساس وضعیت انتخاب کن

| وضعیت | راهکار | هشدار |
|---|---|---|
| خارج کردن فایل از Stage | `git restore --staged file` | تغییرهای محتوای فایل معمولاً باقی می‌مانند |
| دور ریختن تغییر محلی یک فایل | `git restore file` | می‌تواند تغییرهای ثبت‌نشدهٔ آن فایل را از بین ببرد |
| خنثی کردن Commit | `git revert <hash>` | Commit جدید می‌سازد؛ معمولاً برای تاریخچهٔ مشترک مناسب‌تر است |
| اصلاح آخرین Commit محلی | `git commit --amend` | Commit قبلی را جایگزین می‌کند؛ دربارهٔ Commit منتشرشده احتیاط کن |

`git reset` و به‌ویژه `git reset --hard` را بدون درک اثرشان اجرا نکن. بعضی گزینه‌ها اشاره‌گر تاریخچه را جابه‌جا می‌کنند و حالت `--hard` تغییرات فایل‌های محلی را نیز دور می‌ریزد. قبل از عملیات مخرب، وضعیت و راهنمای دستور را بررسی کن.

## ۱۰. GitHub برای کسی که از صفر شروع می‌کند

### Repository

فضای میزبانی پروژه در GitHub. مخزن می‌تواند Public یا Private باشد؛ اما در حالت معمول، سایت منتشرشده با GitHub Pages را عمومی فرض کن. خصوصی بودن Repository به‌تنهایی تضمین نمی‌کند سایت منتشرشده خصوصی باشد؛ قابلیت‌های انتشار خصوصی به پلن و تنظیمات دسترسی وابسته‌اند.

### README.md

صفحهٔ معرفی پروژه: توضیح هدف، پیش‌نیازها، روش نصب و اجرا، نمونهٔ استفاده، مشارکت و مجوز.

### `.gitignore`

الگوهایی برای فایل‌هایی که نباید به‌طور عادی Track شوند؛ مانند محیط مجازی، کش، خروجی build و فایل تنظیمات محلی. فایل‌هایی که قبلاً Track شده‌اند فقط با اضافه کردن اسمشان به `.gitignore` از Track خارج نمی‌شوند.

### Issues

برای ثبت و پیگیری باگ، قابلیت، سؤال و کار تیمی. می‌توان Issue را برچسب‌گذاری، به فردی واگذار و با Pull Request مرتبط کرد.

### Fork، Clone و Pull Request

- **Fork:** ساخت کپی مخزن در فضای حساب GitHub خودت؛ راه رایج برای مشارکت در پروژه‌ای که دسترسی Push مستقیم نداری.
- **Clone:** دریافت یک نسخهٔ محلی از مخزن روی رایانه.
- **Pull Request (PR):** پیشنهاد ادغام تغییرها از شاخه‌ای به شاخهٔ دیگر؛ فضایی برای بررسی کد، بحث و درخواست اصلاح.
- **Code Review:** بررسی تغییرها پیش از ادغام، برای یافتن خطا، بهبود کیفیت و انتقال دانش.

**تفاوت اصطلاح‌ها:** `git pull` فرمان دریافت و ادغام تغییرها از Remote است؛ Pull Request یک قابلیت همکاری در GitHub است. نامشان مشابه است اما کارشان یکی نیست.

### گردش کار معمول

1. یک Issue بساز یا مشخص کن چه کاری باید انجام شود.
2. شاخه‌ای مانند `feature/login` بساز.
3. تغییرهای کوچک و معنادار را Commit کن.
4. شاخه را Push کن.
5. Pull Request باز کن و هدف، جزئیات و تست‌های انجام‌شده را شرح بده.
6. بازبینی و بازخورد را انجام بده، سپس Merge کن.

GitHub به‌طور خودکار با پوشهٔ محلی همگام نمی‌شود: Commit ابتدا محلی است؛ برای ارسال Commitها به Remote از Push استفاده می‌کنی.

### دستورهای Remote

```bash
git remote -v
git clone <url>
git fetch origin
git pull
git push -u origin feature/login
```

- `git remote -v`: URLهای Remote را نمایش می‌دهد.
- `git clone <url>`: مخزن را دریافت می‌کند.
- `git fetch origin`: اطلاعات Remote را می‌گیرد؛ ادغام نمی‌کند.
- `git pull`: Fetch به‌علاوهٔ ادغام طبق تنظیمات.
- `git push -u origin feature/login`: شاخه را Push می‌کند و upstream را تنظیم می‌کند؛ `-u` مخفف `--set-upstream` است.

### امنیت مخزن

رمز، API token، کلید خصوصی و فایل `.env` واقعی را Commit نکن. اگر Secret را Push کرده‌ای، حذف آن در یک Commit بعدی برای بی‌اثر کردن افشا کافی نیست؛ Secret را فوراً باطل/تعویض کن و دربارهٔ پاک‌سازی تاریخچه اقدام کن.

## ۱۱. انتشار وب‌بوک با GitHub Pages

این پروژه HTML، CSS و JavaScript سمت مرورگر است و به build step نیاز ندارد.

1. در GitHub یک Repository بساز.
2. فایل‌های `index.html`، `styles.css`، `script.js`، `README.md`، `content-fa.md` و `.nojekyll` را در ریشهٔ شاخهٔ `main` قرار بده.
3. وارد `Settings → Pages` شو.
4. در قسمت Build and deployment، گزینهٔ `Deploy from a branch` را انتخاب کن.
5. `main` و `/(root)` را به عنوان Branch و Folder انتخاب کن و Save را بزن.
6. پس از پایان انتشار، URL سایت در همان صفحه نشان داده می‌شود.

نمونهٔ ارسال از ترمینال برای مخزن تازه:

```bash
git init -b main
git add .
git status
git commit -m "docs: add Git and GitHub webbook"
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

جای `USERNAME/REPOSITORY` را با آدرس واقعی مخزن جایگزین کن. اگر پوشه از قبل Git دارد، دوباره `git init` نزن. در GitHub Pages اطلاعات خصوصی قرار نده و به خاطر داشته باش که Pages برای اجرای بک‌اند سرور نیست.

## ۱۲. سوییچ‌های رایج دستورها

- `--global`: اعمال تنظیم در سطح کاربر، مثل `git config --global ...`.
- `-m "message"`: پیام Commit، مثل `git commit -m "fix: validate email"`.
- `-s`: خروجی کوتاه `status` در `git status -s`.
- `-b`: در `git status -b` اطلاعات Branch؛ اما معنی سوییچ‌ها وابسته به هر دستور است.
- `--staged`: محدودهٔ تغییرهای انتخاب‌شده برای Commit در دستورهایی مثل `git diff --staged`.
- `--oneline`: تاریخچهٔ فشردهٔ `git log`.
- `--graph`: نمایش خطوط اتصال تاریخچه در `git log`.
- `--decorate`: نمایش نام refها مانند Branch و Tag.
- `--all`: نمایش همهٔ شاخه‌ها و refهای قابل نمایش در تاریخچه.
- `-c`: در `git switch -c` ساخت شاخهٔ جدید.
- `-d`: در `git branch -d` حذف امن شاخهٔ محلیِ ادغام‌شده.
- `-u` یا `--set-upstream`: تنظیم upstream شاخه هنگام Push.

گزینه‌ها میان دستورها معنی یکسان ندارند. همیشه راهنمای همان دستور را بخوان.

### Tag؛ علامت‌گذاری نسخه

Branch مسیری برای ادامهٔ توسعه است؛ Tag معمولاً به یک نقطهٔ معین از تاریخچه، مثلاً نسخهٔ منتشرشده، نام می‌دهد.

```bash
git tag                                  # فهرست Tagها
git tag -a v1.0.0 -m "Release v1.0.0"   # ساخت Annotated Tag
git push origin v1.0.0                   # ارسال Tag مشخص به Remote
```

`-a` یک Annotated Tag می‌سازد که می‌تواند پیام و اطلاعات ثبت داشته باشد. Tag جدید لزوماً با یک `git push` معمولی ارسال نمی‌شود؛ Tag موردنظر را مشخص کن یا آگاهانه از `git push --tags` استفاده کن.

### Alias؛ میان‌بر برای فرمان‌های پرتکرار

```bash
git config --global alias.st status
git st
```

این تنظیم فقط میان‌بر شخصی است؛ هدف آن کوتاه کردن تایپ است، نه جایگزین‌کردن فهم دستور اصلی.

### Hooks و Attributes؛ آشنایی اولیه

- **Git Hooks:** اسکریپت‌هایی که می‌توانند در زمان رخدادهایی مثل `pre-commit` اجرا شوند. Hookهای معمول داخل `.git/hooks` هستند و به‌طور خودکار همراه مخزن Clone نمی‌شوند.
- **`.gitattributes`:** تعیین رفتار Git برای بعضی فایل‌ها، مانند مدیریت پایان خط‌ها و نحوهٔ نمایش تفاوت بعضی فایل‌ها.
- **سیاست تیمی:** اگر اجرای یک بررسی برای همه الزامی است، فقط به Hook محلی اتکا نکن؛ از CI، حفاظت شاخه و قواعد مخزن نیز کمک بگیر.

### Organization و GitHub Actions در یک نگاه

- **Organization:** فضای مشترک برای تیم یا شرکت. می‌توان اعضا را در Teamها گروه‌بندی کرد و دسترسی هر Team را به Repositoryهای مشخص داد. برای هر نفر فقط دسترسی مورد نیاز را فعال کن.
- **GitHub Actions:** ابزار خودکارسازی گردش‌کار، مانند اجرای تست‌ها، lint یا انتشار سایت در پاسخ به Push و Pull Request. فایل‌های گردش‌کار معمولاً زیر `.github/workflows/` نگهداری می‌شوند.

### چند نکتهٔ مهم دربارهٔ Remote

`origin` نام قراردادی و رایج یک Remote است، نه واژه‌ای رزروشده. `main` هم نام متداول شاخهٔ اصلی است، اما نام‌ها ممکن است در پروژه‌های مختلف فرق کنند.

```bash
git remote -v
git remote add origin <url>
git push -u origin main
```

`git remote add` را معمولاً یک بار برای اتصال مخزن محلی به Remote اجرا کن. اگر خطایی گفت `origin` از قبل وجود دارد، فرمان را کورکورانه تکرار نکن؛ ابتدا `git remote -v` را بررسی کن.

### یک سناریوی رایج: کار نیمه‌تمام و تغییر شاخه

اگر نیاز داری تغییرات ثبت‌نشده را موقتاً کنار بگذاری، `git stash` می‌تواند کمک کند؛ اما اول `git status` بزن و مطمئن شو می‌دانی چه چیزی قرار است کنار گذاشته شود.

```bash
git stash push -m "work in progress"
git switch main
# بعداً به شاخهٔ کاری برگرد
git switch feature/login
git stash pop
```

`stash pop` تغییرها را دوباره اعمال می‌کند و در صورت موفقیت، ورودی stash را حذف می‌کند. اگر فایل‌های Untracked هم باید ذخیره شوند، گزینهٔ `-u` را بررسی کن. اگر هنگام اعمال دوباره Conflict رخ داد، مانند سایر تعارض‌ها آن را بررسی و حل کن. Stash جای Commitهای خوب و معنادار را نمی‌گیرد.

## ۱۳. راهنما و Help

```bash
git help
git help commit
git commit -h
git help -g
git config --list --show-origin
```

برای کمک سریع، `git <command> -h` را امتحان کن؛ برای راهنمای مفصل‌تر `git help <command>` را ببین. اگر گزینه‌ای خطرناک یا نامشخص است، قبل از اجرا مستندات رسمی همان دستور را مطالعه کن.

روش پیشنهادی:

1. مسئله را دقیق تعریف کن.
2. `git status` بزن.
3. راهنمای سریع را بخوان.
4. در مخزن تمرینی امتحان کن.
5. با `git status`، `git diff` و `git log` نتیجه را بررسی کن.



## مسیر عملی کامل: از ساخت حساب GitHub تا تغییر یک پروژه

این بخش را به‌عنوان دمو زنده اجرا کن. واژه‌های رایج برنامه‌نویسی مثل Repository، Branch، Commit و Push را همان‌طور نگه می‌داریم، اما معنی هرکدام را در همان جایی که استفاده می‌شوند توضیح می‌دهیم.

### ۱. ساخت حساب GitHub — GitHub

1. به [github.com/signup](https://github.com/signup) برو و فرم ساخت حساب را کامل کن.
2. ایمیل را تأیید کن و نام کاربری را انتخاب کن.
3. برای امنیت از رمز منحصربه‌فرد استفاده کن و در صورت امکان Passkey یا احراز هویت دومرحله‌ای را فعال کن.
4. رمز حساب را در فایل پروژه، دستور Git یا URL قرار نده.

### ۲. ساخت Repository — GitHub

1. پس از ورود، روی **New repository** بزن.
2. نامی مثل `git-class-demo` انتخاب کن.
3. Public یا Private را بر اساس هدف پروژه انتخاب کن؛ محتوای Public برای عموم قابل مشاهده است.
4. برای ساده شدن تمرین، گزینهٔ ساخت `README.md` را فعال کن و Repository را بساز.
5. URL مخزن را کپی کن.

### ۳. نصب و تنظیم Git — Git

در ترمینال اجرا کن:

```bash
git --version
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --list --show-origin
```

`user.name` و `user.email` اطلاعات نویسندهٔ Commit هستند؛ نام کاربری و رمز ورود GitHub نیستند. تنظیم `--global` برای کاربر فعلی سیستم است. تنظیم محلی مخزن می‌تواند مقدار جداگانه‌ای داشته باشد.

### ۴. Clone کردن پروژه — Git + GitHub

```bash
git clone https://github.com/USERNAME/git-class-demo.git
cd git-class-demo
git status
```

نام کاربری و نام Repository را با مقادیر واقعی جایگزین کن. `git clone` یک نسخهٔ محلی از پروژه همراه تاریخچه می‌سازد و معمولاً Remote با نام `origin` را تنظیم می‌کند.

### ۵. تغییر فایل و بررسی آن — Git

فایل `README.md` را باز کن و یک جمله به آن اضافه کن. بعد:

```bash
git status
git diff
```

`git status` وضعیت فایل‌ها را نشان می‌دهد. `git diff` تفاوت نسخهٔ فعلی فایل با آخرین وضعیت Stage شده را نشان می‌دهد. تا اینجا هنوز چیزی به GitHub ارسال نشده است.

### ۶. Stage و Commit — Git

```bash
git add README.md
git diff --staged
git status
git commit -m "docs: update project README"
git log --oneline -5
```

`git add` تغییر را برای Commit بعدی انتخاب می‌کند. `git diff --staged` تغییر انتخاب‌شده را برای بازبینی نشان می‌دهد. `git commit` آن را در تاریخچهٔ محلی ثبت می‌کند؛ هنوز Push نشده است.

### ۷. ارسال به GitHub — Git + GitHub

```bash
git push
```

چون مخزن را با Clone گرفته‌ای، معمولاً شاخهٔ محلی از قبل به Remote وصل است. بعد صفحهٔ Repository را Refresh کن، README را باز کن و Commit را در تاریخچه پیدا کن. اگر احراز هویت خواسته شد، از روش امن و مورد پشتیبانی سیستم استفاده کن؛ رمز عادی حساب را در دستور وارد نکن.

### ۸. ساخت Branch و پیشنهاد تغییر — Git + GitHub

```bash
git status
git switch -c docs/add-usage
# فایل README.md را ویرایش کن
git diff
git add README.md
git diff --staged
git commit -m "docs: add usage instructions"
git push -u origin docs/add-usage
```

در این مثال تغییر در Branch جداگانه ثبت شده است. `-u` شاخهٔ Remote بالادست را تنظیم می‌کند. در GitHub از **Compare & pull request** استفاده کن تا Pull Request بسازی. اعضای تیم می‌توانند تغییر را بررسی و درباره‌اش نظر بدهند و سپس طبق قواعد پروژه آن را Merge کنند.

### ۹. اگر مخزن متعلق به شخص دیگری است

اگر اجازهٔ Push مستقیم نداری، روند رایج این است: Fork مخزن در GitHub، Clone کردن Fork، ساخت Branch، ایجاد Commit، Push به Fork و باز کردن Pull Request به مخزن اصلی.

### نکته‌هایی برای مجری

- در هر مرحله بپرس «این کار در Git انجام شد یا GitHub؟»
- پس از هر عملیات مهم `git status` را اجرا کن تا دانشجوها نتیجه را ببینند.
- پیش از Commit، `git diff --staged` را نشان بده تا معلوم شود دقیقاً چه چیزی قرار است ثبت شود.
- تأکید کن که Commit محلی است؛ Push تغییرها را به Remote می‌فرستد؛ Pull Request ابزار همکاری GitHub است.
- فایل‌های حساس مانند `.env`، رمز و Token را Stage یا Push نکن.
- اگر روی پروژهٔ مشترک کار می‌کنی، پیش از شروع وضعیت را بررسی کن و سیاست تیم برای `fetch`، `pull` و `rebase` را رعایت کن.


## ۱۴. پرسش‌های تعاملی پیشنهادی برای کلاس

### سؤال ۱
**فایلی را تغییر داده‌ای اما `git add` نکرده‌ای؛ آیا در Commit بعدی قرار می‌گیرد؟**

پاسخ: خیر؛ Commit تغییرهای Stage شده را ثبت می‌کند.

### سؤال ۲
**Commit انجام شده اما Push نکرده‌ای؛ آیا Commit روی GitHub است؟**

پاسخ: نه لزوماً. Commit محلی است تا زمانی که به Remote ارسال شود.

### سؤال ۳
**چرا قابلیت جدید را در Branch جدا می‌سازیم؟**

پاسخ: برای جدا نگه‌داشتن کار، بررسی تغییرها و محافظت از شاخهٔ اصلی.

### سؤال ۴
**اگر دو نفر یک خط را ناسازگار تغییر دهند، Git کدام را انتخاب می‌کند؟**

پاسخ: ممکن است Conflict بدهد؛ توسعه‌دهنده باید نتیجهٔ منطقی را انتخاب کند.

### سؤال ۵
**برای خنثی کردن Commit اشتباهی که قبلاً در شاخهٔ مشترک Push شده، کدام گزینه معمولاً امن‌تر است؟**

پاسخ: `git revert <hash>`، چون Commit جدیدی برای معکوس کردن تغییر قبلی می‌سازد و تاریخچه را بازنویسی نمی‌کند.

## منابع رسمی

- [کتاب Pro Git به فارسی](https://git-scm.com/book/fa/v2)
- [Pro Git — ثبت تغییرات در مخزن](https://git-scm.com/book/fa/v2/%D9%85%D9%82%D8%AF%D9%85%D8%A7%D8%AA-%DA%AF%DB%8C%D8%AA-git-basics-chapter-%D8%AB%D8%A8%D8%AA-%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA-%D8%AF%D8%B1-%D9%85%D8%AE%D8%B2%D9%86-Recording-Changes-to-the-Repository)
- [Pro Git — فهرست دستورهای Git](https://git-scm.com/book/fa/v2/%D9%BE%DB%8C%D9%88%D8%B3%D8%AA-C%3A-%D8%AF%D8%B3%D8%AA%D9%88%D8%B1%D8%A7%D8%AA-%DA%AF%DB%8C%D8%AA-Git-Commands-Setup-and-Config)
- [GitHub Docs](https://docs.github.com/en)
- [About Pull Requests](https://docs.github.com/en/pull-requests/get-started/about-pull-requests)
- [About Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues)
- [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

> این وب‌بوک راهنمای مقدماتی برای ارائه است؛ هرگز قبل از فهم اثر یک فرمان، مخصوصاً فرمان‌های بازنویسی تاریخچه یا حذف تغییرها، آن را روی مخزن مهم اجرا نکن.


---

# یادداشت‌های تکمیلی برای ارائهٔ دقیق‌تر

این بخش برای تکمیل سرفصل‌های عملی است. در اسلاید/وب‌بوک، برچسب «Git» به خود ابزار کنترل نسخه، «GitHub» به پلتفرم آنلاین و «هر دو» به گردش کار میان مخزن محلی و پلتفرم اشاره دارد.

## الف) مالک هر قابلیت: Git یا GitHub؟

| قابلیت / اصطلاح | مربوط به | توضیح کوتاه |
|---|---|---|
| VCS، CVCS، DVCS، Working Tree، Index / Staging، Commit، HEAD، Branch، Merge، Rebase، Revert، Diff، Patch، Log، Show | Git | مفاهیم و دستورهای سیستم کنترل نسخه |
| مخزن Hosted، Pull Request، Issue، Code Review، Organization، GitHub Actions، GitHub Pages | GitHub | امکانات سایت برای همکاری، مدیریت پروژه و انتشار |
| Push/Pull/Fetch روی یک Remote میزبانی‌شده، Review یک Branch و Merge PR | هر دو | Git ارتباط و تبادل تاریخچه را انجام می‌دهد؛ GitHub امکانات بازبینی و مدیریت را فراهم می‌کند |

## ب) VCS، SCM، CVCS و DVCS

- **VCS (Version Control System):** سیستم کنترل نسخه؛ روشی برای ثبت تغییرها، مقایسهٔ نسخه‌ها، دیدن تاریخچه و بازگشت به نقاط قبلی.
- **SCM:** معمولاً Source Code Management یا Source Control Management؛ اصطلاح رایج برای مدیریت تغییرهای کد و فرایند نسخه‌گذاری.
- **CVCS (Centralized VCS):** مدل متمرکز؛ سرور مرکزی محور مخزن مشترک است. نمونهٔ تاریخی آن Subversion (SVN) است.
- **DVCS (Distributed VCS):** هر Clone یک مخزن محلی با بخش مهمی از تاریخچه دارد. Git از این نوع است؛ بسیاری از عملیات مانند log، diff و commit محلی بدون اینترنت انجام می‌شوند.
- شکل درست مخفف، معمولاً **CVCS** است، نه CVSC.
- «Commit file» اصطلاحی مستقل و دقیق در Git نیست؛ Commit یک snapshot از وضعیت Stage‌شده می‌سازد که می‌تواند شامل نسخه‌های چند فایل باشد. هر فایل را جداگانه «در تاریخچهٔ مستقل» ذخیره نمی‌کنیم.

## پ) نصب و پیکربندی

مرجع نصب: [git-scm.com/downloads](https://git-scm.com/downloads). پس از نصب، `git --version` را اجرا کن. ویندوز معمولاً Git for Windows / Git Bash، مک ابزارهای خط فرمان یا مدیر بسته و لینوکس مدیر بستهٔ توزیع را به کار می‌برد.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --list --show-origin
```

`user.name` و `user.email` اطلاعات نویسندگی Commit را تعریف می‌کنند؛ این‌ها رمز ورود نیستند. **`git config --global password` روش استاندارد تنظیم رمز GitHub نیست.** برای ارتباط با GitHub از Git Credential Manager، GitHub CLI یا SSH استفاده کن. اگر HTTPS از تو رمز خواست، GitHub برای عملیات Git رمز معمول حساب را پشتیبانی نمی‌کند؛ Personal Access Token یا روش امن دیگری لازم است. رمز و Token را داخل مخزن ننویس.

برای انتخاب ویرایشگر:

```bash
git config --global core.editor "code --wait"
git config --global core.editor "nano"
git config --global core.editor "vi"
```

در nano: `Ctrl+O` ذخیره، `Enter` تأیید و `Ctrl+X` خروج. در vi/vim: `i` برای ورود به حالت ویرایش، سپس `Esc` و `:wq` + Enter برای ذخیره و خروج؛ `:q!` برای خروج بدون ذخیره. در VS Code گزینهٔ `--wait` باعث می‌شود Git تا بسته شدن ویرایشگر صبر کند.

## ت) git init و ساختار `.git`

```bash
git init -b main
git status
```

`git init` یک Git Directory ایجاد می‌کند و پوشهٔ پروژه را به مخزنی برای پیگیری تاریخچه تبدیل می‌کند؛ فایل‌های پروژه را خودش Commit نمی‌کند. بخش‌های داخلی مهم:

- `.git/HEAD`: اشارهٔ فعلی به Branch یا Commit.
- `.git/config`: تنظیمات محلی مخزن.
- `.git/objects/`: آبجکت‌های Commit، Tree، Blob و Tag.
- `.git/refs/`: ارجاع‌هایی مثل Branch و Tag (چیدمان جزئی می‌تواند با نسخه/تنظیمات فرق کند).
- `.git/index`: Stage / Index برای انتخاب نسخهٔ فایل‌ها جهت Commit.

این‌ها را برای مدل ذهنی بشناس؛ محتویات `.git` را دستی تغییر نده.

## ث) وضعیت‌های فایل و رفتار Stage

- **Untracked:** Git فایل را دنبال نمی‌کند.
- **Tracked / Clean:** فایل توسط Git دنبال می‌شود و تغییر ثبت‌نشده ندارد.
- **Modified (unstaged):** فایل Track شده ولی Working Tree نسبت به Index تغییر کرده.
- **Staged:** نسخه‌ای از تغییر در Index انتخاب شده تا در Commit ثبت شود.
- **Deleted:** فایل Trackشده حذف شده؛ حذف نیز باید Stage و Commit شود.
- **Unmerged / conflicted:** فایل هنوز در جریان Merge / تعارض حل نشده است.
- ممکن است یک فایل هم‌زمان تغییر Stageشده و تغییر جدید unstaged داشته باشد؛ بنابراین هم `git diff` و هم `git diff --staged` معنی‌دار هستند.

`git status` را زیاد اجرا کن، چون دستور سریع و غیرمخرب است و وضعیت شاخه، فایل‌های untracked، تغییرهای unstaged، staged و conflictها را روشن می‌کند. قبل از عملیات مهم، پس از آن و در لحظهٔ سردرگمی، Status بهتر از حدس‌زدن است.

## ج) Diff، Patch و دستورهای تاریخچه

نمونهٔ diff:

```diff
--- a/hello.py
+++ b/hello.py
@@ -2 +2 @@
-    return f"Hello, {name}!"
+    return f"Welcome, {name}!"
```

- خط `-` در نسخهٔ قبلی بوده و حذف/جایگزین می‌شود.
- خط `+` به نسخهٔ جدید اضافه می‌شود.
- `@@` محدودهٔ تغییر در فایل را نشان می‌دهد.

| دستور | مفهوم |
|---|---|
| `git diff` | تغییرهای Working Tree نسبت به Index؛ یعنی تغییرهای هنوز Stage نشده |
| `git diff --staged` یا `--cached` | تغییرهای Stageشده نسبت به HEAD |
| `git diff HEAD` | تغییرهای tracked محلی نسبت به Commit جاری، چه Stage شده چه نشده |
| `git diff <commit>` | Working Tree در برابر Commit مشخص |
| `git diff <A> <B>` | تفاوت دو Commit/ref |
| `git diff HEAD~1 HEAD` | تفاوت Commit قبلی و فعلی |
| `git diff --stat` | خلاصهٔ آماری تغییرها |
| `git diff --check` | شناسایی whitespace مشکل‌دار |

Patch فایل متنیِ تفاوت‌هاست که می‌تواند جابه‌جا شود و روی یک نسخهٔ سازگار اعمال شود:

```bash
git diff > changes.patch
git apply --check changes.patch
git apply changes.patch
git status
```

این روش خودکار Commit نمی‌سازد. برای تغییرهای Stageشده از `git diff --staged > staged.patch` استفاده می‌شود. برای بسته‌بندی Commit همراه متادیتا، `git format-patch -1 HEAD` و در مقصد `git am <file.patch>` گزینهٔ دیگری است.

گزینه‌های مفید `git log`:

```bash
git log --oneline
git log --oneline --graph --decorate --all
git log -5 --oneline
git log --stat
git log -p -3
git log --author="Parham"
git log --grep="fix"
git log --since="2 weeks ago"
git log --pretty=format:"%h %ad | %s (%an)" --date=short
```

معنای سوییچ‌ها به دستور وابسته است: `--oneline` خلاصه، `--graph` شکل شاخه‌ای، `--decorate` نام Branch/Tagها، `--all` نمایش refهای قابل دسترسی، `-p` خود Patch هر Commit، `--stat` آمار فایل‌ها، `-5` محدودیت تعداد، `--author` فیلتر نویسنده و `--grep` جست‌وجوی پیام Commit است. در Log معمولی، شناسه، نویسنده، تاریخ و پیام Commit دیده می‌شود.

`git show <commit-id>` پیام و اطلاعات Commit و Diff مربوط به آن را نشان می‌دهد؛ `git show --stat <id>` خروجی را خلاصه می‌کند.

## چ) add و commit

- `git add -A`: فایل‌های جدید، تغییرکرده و حذف‌شده را در محدودهٔ مخزن Stage می‌کند؛ فایل‌های Ignoreشده معمولاً اضافه نمی‌شوند. بعد از آن `git status` و `git diff --staged` را بررسی کن.
- `git add -p file.py`: بخش‌های تغییر را جداگانه نشان می‌دهد. `y` برای Stage، `n` برای رد، `s` برای تقسیم Hunk در صورت امکان و `q` برای خروج. برای دو تغییر مستقل در یک فایل مفید است.
- `git commit -a -m "..."`: تغییر و حذف فایل‌های از قبل Trackشده را Stage و Commit می‌کند؛ **فایل‌های Untracked را اضافه نمی‌کند**.
- `git mv old new`: جابه‌جایی/تغییرنام را انجام می‌دهد و Index را به‌روزرسانی می‌کند. تغییرنام با ابزار سیستم‌عامل نیز ممکن است؛ در آن حالت باید حذف/افزودن را با Git Stage کنی. Git عموماً Rename را با شباهت محتوا تشخیص می‌دهد.
- `git commit --amend`: آخرین Commit را جایگزین می‌کند؛ شناسهٔ Commit تغییر می‌کند. برای Commit محلی یا شاخهٔ شخصی مناسب‌تر است؛ اگر Commit به اشتراک گذاشته شده، هماهنگی و Force Push لازم می‌شود و اغلب ساخت Commit جدید امن‌تر است.
- `git commit -s`: خط `Signed-off-by` را به پیام اضافه می‌کند، معمولاً برای DCO. با `git commit -S` (امضای رمزنگاری‌شده) فرق دارد.

## ح) HEAD، checkout، restore و reset

`HEAD` نشان می‌دهد در تاریخچه کجا ایستاده‌ای؛ معمولاً به Branch جاری اشاره دارد که آن Branch به Commit فعلی اشاره می‌کند. در Detached HEAD، HEAD ممکن است مستقیم به یک Commit اشاره کند.

- `git switch main`: جابه‌جایی Branch.
- `git switch -c feature/name`: ساخت و انتخاب Branch جدید.
- `git checkout -b feature/name`: شکل قدیمی‌تر ساخت و انتخاب Branch.
- `git checkout -- file`: شکل قدیمی برای بازیابی فایل؛ ممکن است تغییر unstaged را دور بریزد.
- `git restore file`: فایل Working Tree را از Index بازیابی می‌کند؛ خطر از دست‌رفتن تغییر محلی دارد.
- `git restore --staged file`: فایل را از Stage خارج می‌کند و معمولاً محتوای Working Tree را حفظ می‌کند.
- `git reset file`: شکل pathدار، Index فایل را به حالت HEAD برمی‌گرداند؛ معمولاً مانند `git restore --staged file` است.

## خ) Branch، Merge و Rebase

```bash
git branch
git branch -v
git branch -vv
git branch -a
git branch --show-current
git switch -c feature/add-search
git branch -d feature/add-search
git branch -D feature/add-search
git push origin --delete feature/add-search
```

`-v` آخرین Commit هر شاخه؛ `-vv` اطلاعات upstream و ahead/behind؛ `-a` شاخه‌های محلی و Remote-tracking را نشان می‌دهد. `-d` حذف محافظه‌کارانه است؛ `-D` حذف اجباری شاخهٔ محلی است. حذف شاخهٔ Remote با `git push origin --delete name` انجام می‌شود.

نام‌گذاری پیشنهادی و قابل‌فهم:

- `feature/add-search`
- `fix/cart-total`
- `docs/installation`
- `refactor/auth-service`
- `test/login-cases`

**Fast-forward:** مقصد در مسیر جد مشترک تا Commit شاخهٔ دیگر عقب مانده و Commit جدیدی در شاخهٔ مقصد ندارد؛ Git می‌تواند اشاره‌گر را جلو ببرد. `--no-ff` Merge Commit را حتی وقتی FF ممکن است می‌سازد؛ `--ff-only` اگر FF ممکن نباشد متوقف می‌شود.

**Three-way merge:** دو شاخه هرکدام نسبت به Base مشترک تغییرهای جداگانه دارند. Git نسخهٔ Base و دو نوک شاخه را مقایسه می‌کند و معمولاً Merge Commit با دو والد می‌سازد. اگر تغییرها قابل ترکیب خودکار نباشند، Conflict رخ می‌دهد.

**Rebase** Commitهای شاخهٔ فعلی را دوباره روی Base جدید اعمال می‌کند. نمودار ساده:

```text
قبل:                 بعد:
A---B---E main       A---B---E---C'---D' feature
     \                           main در E
      C---D feature
```

`C'` و `D'` نسخه‌های بازنویسی‌شده‌اند؛ چون والد Commit تغییر کرده، شناسهٔ آن‌ها نیز متفاوت است. دستورهای رایج:

```bash
git status
git fetch origin
git switch feature/add-search
git rebase origin/main

# در صورت Conflict، فایل را حل کن و سپس:
git add path/to/file
git rebase --continue

# برای لغو عملیات جاری:
git rebase --abort
```

Rebase می‌تواند تاریخچهٔ Branch شخصی را خواناتر کند و با تازه نگه داشتن شاخه، اختلاف‌ها را زودتر نمایان سازد؛ اما Conflict را حذف نمی‌کند. آن را معمولاً فقط روی شاخهٔ شخصی و Commitهایی اجرا کن که هنوز دیگران بر اساس آن‌ها کار نکرده‌اند. روی تاریخچهٔ مشترک بدون هماهنگی Rebase نکن؛ بازنویسی Commit ممکن است همکاران را مجبور به بازیابی تاریخچه و هماهنگی دوباره کند. «زیاد Rebase کن» قانون همگانی نیست؛ «شاخه را طبق سیاست تیم منظم و آگاهانه همگام کن» توصیهٔ امن‌تری است.

## د) Remote و همگام‌سازی

```bash
git remote -v
git remote show origin
git remote update
git remote prune --dry-run origin  # پیش‌نمایش پاک‌سازی refهای منسوخ
git remote prune origin            # پاک‌سازی واقعی پس از بررسی
git fetch origin
git log --oneline --graph HEAD..origin/main
git pull --ff-only
git push -u origin feature/add-search
```

- `git remote show origin` آدرس، شاخه‌های tracked و اطلاعات pull/push را گزارش می‌کند.
- `git remote update` اطلاعات را از Remoteهای پیکربندی‌شده دریافت می‌کند؛ شاخهٔ محلی جاری را Merge نمی‌کند.
- `git remote prune origin` Remote-tracking refهایی را پاک می‌کند که به شاخه‌های حذف‌شدهٔ Remote اشاره می‌کردند؛ برای پیش‌نمایش امن‌تر از `git remote prune --dry-run origin` استفاده کن. این دستور شاخهٔ محلی واقعی را حذف نمی‌کند.
- `git fetch` اطلاعات Remote را می‌آورد، بدون ادغام خودکار در شاخهٔ جاری.
- `git pull` Fetch و سپس Merge یا Rebase (بسته به تنظیمات و گزینه‌ها) است.

رویهٔ مناسب: در شروع نوبت کار تیمی `git status` بزن، سپس `git fetch` کن تا وضعیت Remote را ببینی؛ بعد طبق سیاست تیم تصمیم بگیر چطور همگام شوی. `git pull` خودش Fetch دارد، پس لازم نیست همیشه هر دو را پشت‌سرهم اجرا کنی. Pull را کورکورانه، مخصوصاً وقتی تغییرهای محلی داری، انجام نده. ابتدا تغییرها را Commit یا Stash کن یا وضعیتشان را بفهم.

## ذ) Rollback و Revert

فرض کن قابلیت‌های A و B در Production هستند و Commit مربوط به قابلیت C باعث خطا شده. قبل از اقدام، با `git show <hash>` Commit درست را شناسایی و وضعیت را بررسی کن.

```bash
git status
git log --oneline --graph -10
git revert <bad-commit-hash>
git status
git show --stat HEAD
```

`git revert` Commit قبلی را حذف نمی‌کند؛ یک Commit جدید ایجاد می‌کند تا اثر تغییر قبلی را معکوس کند. پیام Commit یا Pull Request باید توضیح بدهد کدام تغییر خنثی شده و چرا. این روش معمولاً برای Commitهای منتشرشده/مشترک مناسب‌تر از بازنویسی تاریخچه است.

Rollback کامل Deployment از کد وسیع‌تر است: Migration پایگاه داده، ساختار داده، صف‌ها و قابلیت سازگاری نسخهٔ قبلی هم مهم‌اند. Revert کردن کد به‌تنهایی تضمین نمی‌کند تمام سامانه به حالت سالم قبلی برگشته باشد. Revert کردن Merge Commit گزینهٔ `-m` می‌خواهد و باید Parent درست را انتخاب کنی.

## ر) Conflict و کار تیمی

Conflict بخشی طبیعی از توسعهٔ هم‌زمان است؛ نشانهٔ بد بودن Git یا برنامه‌نویس نیست. حالت‌های رایج: تغییر ناسازگار روی یک خط، حذف فایل در یک شاخه و ویرایش آن در دیگری، یا Rename/Edit. حتی Merge بدون Conflict هم ممکن است باگ منطقی داشته باشد.

1. قبل از Merge، `git status` بزن و تغییرهای نیمه‌تمام را Commit یا Stash کن.
2. هنگام Conflict، هر دو قصد تغییر را بفهم؛ کورکورانه «ours/theirs» انتخاب نکن.
3. فایل نهایی را ویرایش کن، علامت‌ها را حذف کن، `git diff` را بازبینی و تست‌ها را اجرا کن.
4. فایل حل‌شده را `git add` کن، سپس Merge را کامل کن.
5. اگر از Merge معمولی منصرف شدی، `git merge --abort` تلاش می‌کند وضعیت قبل از شروع را برگرداند؛ تغییرهای محلی قبل از Merge می‌توانند بازگردانی را پیچیده کنند.
6. Pull Request کوچک، Branch برای هر Feature، Commit پیام‌دار و گفت‌وگوی سریع با هم‌تیمی‌ها Conflict را مدیریت‌پذیر می‌کند.

## ز) Help باید بخشی از عادت کاری باشد

```bash
git --help
git help commit
git commit -h
git help -g
git status
git diff --staged
```

`-h` معمولاً راهنمای کوتاه همان دستور است؛ `git help <command>` راهنمای کامل‌تر می‌دهد. معنی گزینه‌ها در همهٔ دستورها یکسان نیست؛ مثلاً `-s` برای `git status` کوتاه‌نویسی خروجی است، ولی `git commit -s` خط Sign-off اضافه می‌کند. گزینه را همیشه در زمینهٔ همان دستور یاد بگیر.

## منابع مرجع برای این توضیحات

- [Pro Git فارسی](https://git-scm.com/book/fa/v2)
- [راهنمای رسمی Git: git-diff](https://git-scm.com/docs/git-diff)
- [راهنمای رسمی Git: git-add](https://git-scm.com/docs/git-add)
- [راهنمای رسمی Git: git-commit](https://git-scm.com/docs/git-commit)
- [راهنمای رسمی Git: git-apply](https://git-scm.com/docs/git-apply)
- [راهنمای رسمی Git: git-restore](https://git-scm.com/docs/git-restore)
- [راهنمای رسمی Git: git-merge](https://git-scm.com/docs/git-merge)
- [راهنمای رسمی Git: git-revert](https://git-scm.com/docs/git-revert)
- [GitHub Docs — Authentication](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github)
- [GitHub Docs](https://docs.github.com/en)

## جمع‌بندی برای اسلاید آخر

آدم‌ها باید بتوانند کد تو و علت تغییر آن را بفهمند. برای همین:

1. برای هر Feature یک Branch بساز.
2. قبل از شروع کار مشترک، `git status` و وضعیت Remote را بررسی کن؛ `fetch` برای مشاهدهٔ تغییرات جدید امن و مفید است و `pull` را مطابق Workflow تیم انجام بده.
3. نام Branch را بر اساس نوع کار و موضوع انتخاب کن.
4. از Rebase آگاهانه برای مرتب‌سازی Branch شخصی استفاده کن؛ روی تاریخچهٔ مشترک بدون هماهنگی انجام نده.
5. پیام Commit را طوری بنویس که هدف تغییر را توضیح دهد.
6. برای هر تغییر منطقی یک Commit کوچک و معنادار بساز؛ نه لزوماً برای هر خط.
7. Conflict بخشی عادی از همکاری هم‌زمان است؛ مهم این است که آن را بفهمیم، درباره‌اش حرف بزنیم و تست کنیم.
8. از ندانستن نترس: `git status`، `git help <command>` و مستندات رسمی همیشه بخشی از جعبه‌ابزار توسعه‌دهنده‌اند.


## ۱۵. گشت‌وگذار در کل GitHub: UI، Stars، Explore و پروژه‌های دیگران

Git تاریخچه و تغییرات فایل‌ها را مدیریت می‌کند؛ GitHub یک پلتفرم همکاری است که علاوه بر میزبانی مخزن Git، امکاناتی برای گفت‌وگو، مدیریت کار، بازبینی کد، خودکارسازی، انتشار و پیدا کردن پروژه‌های دیگران دارد. همهٔ این امکانات به اجرای دستورهای Git وابسته نیستند.

### قسمت‌های مهم سایت

- **Home / Dashboard:** فعالیت‌ها و مخزن‌هایی را که دنبال می‌کنی نمایش می‌دهد.
- **Search:** برای جست‌وجوی Repository، کد، Issue، Pull Request، کاربر و Organization است. از فیلترها برای دقیق‌تر کردن نتیجه استفاده کن.
- **Profile:** معرفی تو، فعالیت‌های عمومی، مخزن‌های مهم و README پروفایل را نمایش می‌دهد. برای نمونه‌کار، چند پروژهٔ قابل اجرا و README خوب از تعداد زیاد مخزن‌های خالی مفیدتر است.
- **Repository → Code:** فایل‌ها، Branchها، Commitها، README و فایل‌های پروژه را نمایش می‌دهد.
- **Issues:** باگ، سؤال، قابلیت و کارهای قابل پیگیری.
- **Pull requests:** پیشنهاد تغییر، مقایسهٔ Diff، Code Review و Merge.
- **Actions:** اجرای کارهای خودکار مانند تست، Lint و انتشار.
- **Projects:** مدیریت چند کار در نمای Table، Board یا Viewهای دیگر؛ با Issueها و PRها ارتباط دارد.
- **Discussions:** گفت‌وگوهای عمومی‌تر که لزوماً یک باگ مشخص نیستند.
- **Wiki:** مستندات تکمیلی پروژه.
- **Security:** امکانات مرتبط با گزارش و بررسی مسائل امنیتی.
- **Insights:** آمار و نماهایی دربارهٔ فعالیت مخزن.
- **Releases / Tags:** معرفی نسخه‌ها و نقاط مشخص تاریخچه.
- **Pages:** انتشار وب‌سایت‌های ایستا.
- **Organizations / Teams:** مدیریت پروژه و دسترسی در سطح گروه یا شرکت.
- **Packages:** میزبانی بعضی بسته‌ها و Artifactها.
- **Codespaces:** محیط توسعهٔ ابری برای باز کردن پروژه و کدنویسی بدون آماده‌سازی کامل محیط روی رایانه.
- **Copilot:** ابزار کمک برنامه‌نویسی با هوش مصنوعی؛ دسترسی و امکانات آن می‌تواند به حساب یا پلن وابسته باشد.
- **Gists:** اشتراک‌گذاری نمونه‌ها و قطعه‌کدهای کوچک.
- **Marketplace:** پیدا کردن Actions، برنامه‌ها و ابزارهای متصل به GitHub.
- **Notifications / Inbox:** دیدن و مدیریت اعلان‌هایی که دربارهٔ مخزن‌ها و گفتگوها دریافت می‌کنی.
- **GitHub CLI (`gh`):** انجام بعضی کارهای GitHub، مثل ساخت Issue یا بررسی PR، از ترمینال.

همهٔ تب‌ها در هر مخزنی نمایش داده نمی‌شوند؛ بعضی قابلیت‌ها باید فعال باشند و بعضی به دسترسی یا پلن وابسته‌اند.

### تفاوت Star، Watch، Fork و Follow

| گزینه | معنی ساده | چه وقت استفاده کنیم؟ |
|---|---|---|
| **Star** | علامت‌گذاری مخزن یا Topic برای پیدا کردن دوباره و نشان دادن علاقه | وقتی پروژه را مفید یا جالب می‌بینی. به‌تنهایی همهٔ اعلان‌ها را فعال نمی‌کند. |
| **Watch** | دریافت اعلان دربارهٔ فعالیت مخزن طبق تنظیمات | وقتی می‌خواهی از Issueها، PRها یا رویدادهای خاص باخبر شوی. |
| **Fork** | ساخت نسخه‌ای از Repository زیر حساب خودت در GitHub | وقتی می‌خواهی پروژهٔ دیگران را تغییر بدهی و از راه Pull Request پیشنهاد بدهی. |
| **Follow** | دنبال کردن فعالیت عمومی یک کاربر | وقتی می‌خواهی پروژه‌ها و فعالیت‌های آن فرد را بهتر کشف کنی. |

تعداد Star فقط نشانه‌ای تقریبی از علاقه یا محبوبیت است، نه ضمانت کیفیت. برای بررسی واقعی، README، License، تست‌ها، آخرین Commitها، Releaseها، Issueها و نحوهٔ پاسخ سازنده‌ها را ببین.

### Explore و Trending

- [GitHub Explore](https://github.com/explore): برای پیدا کردن Topicها، مخزن‌ها و جامعه‌های مرتبط با علاقه‌ات.
- [GitHub Trending](https://github.com/trending): برای دیدن پروژه‌هایی که در بازهٔ زمانی انتخاب‌شده بیشتر مورد توجه قرار گرفته‌اند. می‌توانی زبان و بازهٔ زمانی را فیلتر کنی.

برای پیدا کردن پروژه‌های پایتونی می‌توانی از موضوع‌هایی مثل `python`، `django`، `machine-learning` یا `developer-tools` شروع کنی. پروژهٔ ترند لزوماً برای استفادهٔ تو مناسب نیست؛ قبل از انتخاب، آن را بررسی کن.

### چطور یک Repository متعلق به فرد دیگری را بررسی کنیم؟

1. **README:** پروژه چه کاری انجام می‌دهد و چگونه اجرا می‌شود؟
2. **License:** آیا اجازهٔ استفاده و تغییر را داری؟ Public بودن به‌تنهایی به معنی اجازهٔ آزاد برای هر نوع استفاده نیست.
3. **ساختار فایل‌ها و زبان‌ها:** این‌ها سرنخ‌اند، نه معیار قطعی کیفیت.
4. **Commitها و Releaseها:** فعالیت پروژه چقدر تازه است؟ آیا نسخهٔ منتشرشده دارد؟
5. **Issues و Pull Requests:** مشکلات و پیشنهادها چطور رسیدگی می‌شوند؟ آیا پاسخ روشنی داده می‌شود؟
6. **Actions یا CI:** آیا تست‌ها اجرا می‌شوند؟ موفق بودن یک اجرا هم تضمین بی‌نقص بودن برنامه نیست.
7. **CONTRIBUTING.md:** اگر می‌خواهی مشارکت کنی، ابتدا شیوهٔ مشارکت و قوانین پروژه را بخوان.

پیشنهاد فعالیت کلاسی: از Explore یا Trending یک Repository پایتونی انتخاب کن. در یک دقیقه هدف پروژه، License، تازه‌ترین Release یا Commit و محل گزارش باگ آن را پیدا کن.

## ۱۶. GitHub Issues؛ از ساختن تا پاسخ دادن و بستن

Issue فقط برای باگ نیست؛ برای سؤال، پیشنهاد قابلیت، کار فنی و بازخورد نیز به کار می‌رود. سه مفهوم را جدا نگه دار:

- **Issue:** مسئله یا کاری که باید درباره‌اش تصمیم بگیریم.
- **Commit:** تغییر ثبت‌شده در تاریخچهٔ Git.
- **Pull Request:** پیشنهاد ادغام تغییرها همراه با Diff، بررسی و گفتگو.

### ساخت Issue از رابط سایت

1. وارد صفحهٔ Repository شو و تب **Issues** را باز کن.
2. روی **New issue** بزن؛ اگر قالب آماده دارد، قالب مرتبط را انتخاب کن.
3. عنوان روشن بنویس؛ مثلاً `Bug: empty search query returns 500`، نه «مشکل دارد».
4. توضیح بده چه اتفاقی افتاده، انتظار چه بوده و چطور می‌توان مشکل را بازتولید کرد.
5. در صورت نیاز Label مثل `bug` یا `question`، مسئول (Assignee)، Project، Milestone یا Issue type انتخاب کن.
6. روی **Submit new issue** بزن و پس از آن با Commentها وضعیت را روشن نگه دار.

### الگوی گزارش باگ

```markdown
## What happened?
شرح کوتاه اتفاقی که افتاد

## Expected behavior
انتظار داشتم چه اتفاقی بیفتد؟

## Steps to reproduce
1. صفحه را باز کن
2. مقدار خالی وارد کن
3. دکمه را بزن

## Environment
OS / Browser / App version

## Logs or screenshots
اطلاعات لازم، بدون رمز، Token یا اطلاعات شخصی
```

### چطور در UI به یک Issue جواب بدهیم؟

به Commentهای داخل همان Issue پاسخ بده؛ از `@username` برای جلب توجه فرد مربوط استفاده کن؛ مراحل بازتولید، نسخهٔ برنامه و نتیجهٔ آزمایش را واضح بنویس. اگر Issue تکراری است به مورد اصلی لینک بده. اگر اصلاحی در حال انجام است، Branch یا Pull Request مرتبط را وصل کن. جواب محترمانه و مشخص بهتر از «درست شد» یا «کار نمی‌کند» است.

**نمونهٔ پاسخ از سمت گزارش‌دهنده:**

```text
Thanks for looking into this.
I can reproduce it on version 1.2.0.
Steps: ...
Expected: ...
Actual: ...
```

**نمونهٔ پاسخ از سمت نگه‌دارندهٔ پروژه:**

```text
Thanks for reporting this.
I can reproduce the issue.
Could you share the app version and steps?
Please remove secrets from logs.
```

در Issue عمومی رمز، Token، کلید خصوصی یا دادهٔ شخصی قرار نده؛ حتی اگر برای عیب‌یابی به نظر مفید برسند.

### ارتباط Issue با Commit message و Pull Request

فرض کن مشکل شمارهٔ `42` است. در Comment یا متن Commit می‌توانی از `#42` برای اشاره به آن استفاده کنی. مثلاً:

```text
fix: handle empty search query (#42)
```

این ارجاع یافتن Issue مرتبط را آسان می‌کند، اما صرف نوشتن `#42` آن را خودکار نمی‌بندد.

اگر واقعاً می‌خواهی پس از ادغام تغییر Issue بسته شود، از کلیدواژه‌های شناخته‌شده استفاده کن. روش پیشنهادی در کار گروهی این است که آن را در توضیح Pull Request بنویسی:

```text
Fixes #42

## What changed?
Handle an empty search query without raising an error.

## Tests
- Added a test for an empty query
- Ran the related test suite
```

کلیدواژه‌های متداول شامل `close`، `closes`، `closed`، `fix`، `fixes`، `fixed`، `resolve`، `resolves` و `resolved` هستند. برای مثال `Closes #42`، `Fixes #42` یا `Resolves #42`. اگر Issue در مخزن دیگری است، از قالبی مانند `Fixes OWNER/REPOSITORY#42` استفاده کن.

در گردش کار معمول، Pull Request باید به شاخهٔ پیش‌فرض مخزن (اغلب `main`) هدف بگیرد؛ با Merge شدن آن PR، Issue مرتبط بسته می‌شود. کلیدواژه در Commit message نیز می‌تواند Issue را ببندد وقتی Commit به شاخهٔ پیش‌فرض ادغام شده باشد. نوشتن `#42` بدون کلیدواژهٔ بستن، به‌تنهایی کافی نیست.

نکته: Commit message برای ثبت تغییر در تاریخچه است؛ Comment در Issue برای گفت‌وگوی انسانی و پیگیری پیشرفت؛ توضیح Pull Request برای شرح تغییر پیشنهادی و شرایط ادغام است. این سه را با هم اشتباه نکن.

## ۱۷. Remoteها؛ مفهوم، دستورها و گردش کار واقعی

**Remote** یک نام محلی برای آدرس مخزن دیگری است. معمولاً روی GitHub میزبانی می‌شود، اما می‌تواند در GitLab، سرور شخصی یا مسیر دیگری از دیسک نیز باشد. یک مخزن محلی می‌تواند چند Remote داشته باشد.

### نام‌های قراردادی

- **`origin`:** نام رایج Remote اصلی؛ بعد از `git clone` معمولاً به مخزنی اشاره می‌کند که از آن Clone گرفته‌ای.
- **`upstream`:** در کار با Fork معمولاً نام مخزن اصلی پروژه است، در حالی که `origin` به Fork تو اشاره می‌کند.
- **`origin/main`:** نامی برای آخرین وضعیت دریافت‌شده از شاخهٔ `main` در Remote؛ یک Remote-tracking Branch است، نه شاخهٔ محلی اصلی.
- **Upstream branch:** Remote branchای که شاخهٔ محلی با آن جفت شده تا مقایسه و Push/Pull ساده‌تر شود.

این نام‌ها قرارداد رایج‌اند؛ `origin` و `upstream` کلمات جادویی یا اجباری Git نیستند.

### دستورهای مهم Remote

```bash
git remote
git remote -v
git remote show origin
git branch -r
git branch -vv
git fetch --all
```

| دستور | کاربرد |
|---|---|
| `git remote` | نمایش نام Remoteها |
| `git remote -v` | نمایش URLهای Fetch و Push |
| `git remote show origin` | اطلاعات Remote و وضعیت Branchهای مرتبط |
| `git branch -r` | فهرست Remote-tracking Branchها |
| `git branch -vv` | نمایش upstream و وضعیت جلو/عقب Branchهای محلی براساس آخرین دادهٔ Fetch شده |
| `git fetch origin` | دریافت Commitها و اطلاعات جدید بدون ادغام خودکار در Branch فعلی |
| `git fetch --all` | Fetch از Remoteهای پیکربندی‌شده |
| `git pull` | Fetch و سپس Merge یا Rebase بر اساس گزینه‌ها و تنظیمات |
| `git push -u origin feature/login` | Push شاخه و تنظیم upstream برای Pushهای بعدی |

### اضافه کردن یا تغییر دادن Remote

```bash
# معمولاً یک بار برای مخزن محلی جدید
git remote add origin https://github.com/USERNAME/REPOSITORY.git

# اگر URL فعلی اشتباه است
git remote set-url origin git@github.com:USERNAME/REPOSITORY.git

# تغییر نام Remote
git remote rename origin personal

# حذف اتصال از پیکربندی محلی
git remote remove personal
```

بعد از تغییر، `git remote -v` را اجرا کن تا نتیجه را ببینی. دستور `git remote remove` مخزن آنلاین را حذف نمی‌کند؛ فقط اطلاعات اتصال از مخزن محلی پاک می‌شود.

### همگام شدن با مخزن اصلی بعد از Fork

```bash
# origin باید به Fork خودت اشاره کند
git remote -v

# این مرحله را فقط یک بار، با URL واقعی مخزن اصلی انجام بده
git remote add upstream https://github.com/ORIGINAL_OWNER/PROJECT.git

git fetch upstream
git switch main
git merge upstream/main
git push origin main
```

در پروژهٔ واقعی ابتدا وضعیت مخزن را بررسی کن و راهنمای مشارکت را بخوان. اگر نام شاخهٔ پیش‌فرض `main` نیست، نام درست را جایگزین کن. در مخزن گروهی، سیاست تیم دربارهٔ Merge/Rebase و به‌روز کردن شاخه را رعایت کن.

### خطاهای رایج

- **`remote origin already exists`:** ابتدا `git remote -v` را ببین؛ اگر URL اشتباه است `git remote set-url` مناسب‌تر از افزودن دوباره است.
- **`Repository not found`:** URL، نام مالک/مخزن، مجوز دسترسی و احراز هویت را بررسی کن.
- **`rejected (fetch first)`:** Remote Commitهایی دارد که محلی نداری؛ ابتدا `git status`، سپس `git fetch origin` و بررسی تاریخچه را انجام بده. برای حل خطا کورکورانه Force Push نزن.
- **Branchهای حذف‌شده همچنان در فهرست Remote دیده می‌شوند:** پس از Fetch، در صورت نیاز `git remote prune origin` را به‌کار ببر. برای پیش‌نمایش قبل از پاک‌سازی، `git remote prune --dry-run origin` را اجرا کن.

قاعدهٔ خلاصه: `fetch` اطلاعات می‌آورد؛ `pull` دریافت را با Merge یا Rebase ترکیب می‌کند؛ `push` Commitهای محلی را می‌فرستد. قبل از تصمیم، `git status` و `git remote -v` وضعیت را روشن می‌کنند.

## ۱۸. پاسخ‌نامهٔ فعالیت کلاسی

### سؤال ۱: فایل را تغییر داده‌ام ولی `git add` نکرده‌ام؛ Commit چه می‌کند؟

**پاسخ:** تغییر جدید وارد Commit نمی‌شود؛ Commit فقط تغییرهای Stage شده را ثبت می‌کند. از `git status` و `git diff` برای بررسی استفاده کن.

### سؤال ۲: Commit کردم ولی Push نکردم؛ آیا تغییر روی GitHub است؟

**پاسخ:** نه لزوماً؛ Commit محلی است. `git push` آن را به Remote می‌فرستد.

### سؤال ۳: چرا برای قابلیت جدید Branch می‌سازیم؟

**پاسخ:** تا کار جدید از شاخهٔ اصلی جدا بماند، مستقل بررسی شود و بعد از تست و بازبینی ادغام شود.

### سؤال ۴: دو شاخه تغییر ناسازگار دارند و Conflict رخ داده است؛ کار درست چیست؟

**پاسخ:** هر دو تغییر را بررسی کن، نسخهٔ نهایی را ویرایش یا ترکیب کن، نشانگرهای Conflict را حذف کن، فایل را Stage کن، تست بگیر و `git status` را ببین.

### سؤال ۵: Commit اشتباه روی شاخهٔ مشترک Push شده؛ چه کار کنیم؟

**پاسخ:** در اغلب موارد `git revert <hash>` مناسب‌تر است؛ یک Commit تازه می‌سازد که تغییر قبلی را خنثی می‌کند، بدون اینکه تاریخچهٔ مشترک را بازنویسی کند.

### پاسخ سناریوهای اضافه

- **فایل اشتباه Stage شده:** `git restore --staged path/to/file`؛ تغییرهای داخل فایل معمولاً باقی می‌مانند.
- **Commit اشتباه قبلاً Push شده:** `git log --oneline` برای شناسایی Commit و سپس `git revert <hash>`؛ هش Commit صحیح را بررسی کن.
- **پیش از Pull، تغییر محلی دارم:** `git status`، `git diff` و `git fetch origin` اجرا کن؛ بعد تصمیم بگیر Commit، Stash یا همگام‌سازی مطابق روش تیم انجام شود. کورکورانه `reset --hard` نزن.
- **دو نفر بخش‌های جدا از یک فایل را تغییر داده‌اند:** لزوماً Conflict رخ نمی‌دهد؛ Git اغلب تغییرهای جدا را خودکار ادغام می‌کند، ولی تست و بررسی منطق همچنان لازم است.

## منابع تکمیلی اضافه‌شده

- [آموزش Git جادی در مکتب‌خونه](https://maktabkhooneh.org/course/%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%DA%AF%DB%8C%D8%AA-%D8%AC%D8%A7%D8%AF%DB%8C-mk12029/)
- [GitHub Issues — Quickstart](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/quickstart)
- [Linking a Pull Request to an Issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)
- [Exploring projects on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github)
- [Saving repositories with stars](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars)
- [Managing remote repositories](https://docs.github.com/en/get-started/git-basics/managing-remote-repositories)

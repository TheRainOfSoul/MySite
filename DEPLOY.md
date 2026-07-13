# Деплой на Netlify (с показом приватных репозиториев)

Сайт статический, но приватные репозитории подтягиваются через serverless-функцию
`netlify/functions/projects.js`. Токен GitHub живёт **только** в переменных
окружения Netlify и никогда не попадает ни в код, ни в браузер.

## 1. Создать токен GitHub

Нужен персональный токен только **на чтение** репозиториев.

**Вариант A — fine-grained (рекомендуется):**
1. GitHub → Settings → Developer settings → **Personal access tokens → Fine-grained tokens** → *Generate new token*.
2. **Resource owner:** `TheRainOfSoul`.
3. **Repository access:** *All repositories* (или выбери нужные приватные).
4. **Permissions → Repository permissions:**
   - *Contents* → **Read-only**
   - *Metadata* → **Read-only** (ставится автоматически)
5. Сгенерировать, скопировать токен (`github_pat_...`).

**Вариант B — classic:** *Generate new token (classic)* со scope **`repo`** (даёт чтение приватных). Проще, но прав больше — держи в секрете.

> Токен показывается один раз. Если потеряешь — просто создай новый.

## 2. Прописать переменные окружения в Netlify

Netlify → твой сайт → **Site configuration → Environment variables** → *Add a variable*:

| Ключ | Значение | Обязательно |
|------|----------|-------------|
| `GITHUB_TOKEN` | токен из шага 1 | да |
| `GITHUB_USERNAME` | `TheRainOfSoul` | да |
| `EXCLUDE_REPOS` | имена репо через запятую, которые **не** показывать (напр. `secret-repo,drafts`) | нет |

После изменения переменных — передеплой (Deploys → *Trigger deploy*), чтобы они подхватились.

## 3. Задеплоить

Netlify сам находит `netlify.toml` (там указаны папка функций и редирект `/api/projects`).
- Подключи этот репозиторий к сайту на Netlify (**Add new site → Import an existing project**), либо
- залей папку через `netlify deploy` (Netlify CLI).

Функция станет доступна по адресу `/.netlify/functions/projects`, а сайт обращается к ней
через удобный путь `/api/projects` (см. редирект в `netlify.toml`).

## 4. Как это работает

- Публичные репо: обычное превью-изображение + ссылка на GitHub.
- Приватные репо: **без** ссылки на GitHub (у постороннего был бы 404), с бейджем 🔒 Private,
  вместо превью — градиент с названием.
- Описание берётся по цепочке: ручное переопределение → описание с GitHub → первая строка README → `«<Язык> проект»`.
- Ответ функции кэшируется CDN Netlify ~1 час; в браузере — ещё и в `localStorage` (60 мин).

## 5. Ручная «косметика» (необязательно)

Файл `github-projects.js`, объект `PROJECTS_CONFIG.overrides` — здесь можно
переопределить оформление конкретного репо (это НЕ секрет, правится свободно):

```js
overrides: {
  "hhscript":  { description: "Скрипты для автоматизации Windows." },
  "our-story": { hide: true },                 // спрятать репо с сайта
  "arm-tv":    { live: "https://example.com" } // добавить кнопку Live Demo
  // доступно также: title, tags: ["a","b"], order: 1
}
```

## Локальная разработка

Открытие `index.html` напрямую (или через `python -m http.server`) работает, но
функции нет — поэтому подтянутся **только публичные** репо (запасной путь через
публичный GitHub API). Полная картина с приватными — только на задеплоенном Netlify-сайте.
Чтобы проверить функцию локально: `npx netlify dev` (нужен Netlify CLI и токен в `.env`).

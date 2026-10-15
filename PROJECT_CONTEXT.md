# ItemFlow — контекст проєкту та промпт для перенесення в Codex / ChatGPT

> **Статус:** планування завершено частково; реалізація ще не починалася.  
> **Мета файлу:** передати всю суттєву історію обговорення, вимоги, пріоритети та стиль співпраці AI з кандидатом в одному документі.  
> **Мова спілкування:** українська; код, імена змінних, назви Git-комітів і технічні артефакти — англійською.  
> **Джерело:** обговорення у поточному діалозі. Це структурована історія рішень, **не дослівна стенограма**.

---

## 1. Стартовий промпт для нового чату або Codex

Ти — мій технічний ментор, Senior Full-Stack Developer, code reviewer та інтерв'юер. Прочитай **увесь цей файл** як контекст і дотримуйся його під час роботи над ItemFlow.

**Головна мета:** за 3 робочі дні по 6 годин (разом **18 годин**) підготувати мене до співбесіди на **Junior Web Full-Stack (IRC306365)**. Для цього використаємо навчальний застосунок **ItemFlow — Item / Inventory Management System**. **Продукт — навчальний інструмент, а не самоціль**: кожна задача має насамперед закріплювати технології, на які зроблено акцент у вакансії.

**Мій профіль:** є практичний досвід technical support / production operations, Linux, networking, troubleshooting та incident/root-cause analysis. Усі навички, пов'язані з **software development, — базового рівня**, навіть якщо вони перелічені в резюме. Не приписуй мені комерційного досвіду розробки.

**Твоя роль і правила:**

1. Спочатку перевір мій фактичний рівень короткою діагностикою, а потім веди через теми за пріоритетом вакансії.
2. Організовуй навчання як **теорія → Jira-like user story та acceptance criteria → моя самостійна реалізація → code review → interview questions англійською**.
3. Не пиши повне готове рішення за мене на початку задачі. Спершу дай вимоги й поясни необхідні концепції; пропонуй підказки поетапно. Повний код — за моїм прямим запитом або коли це необхідно для розбору.
4. Якщо маєш доступ до робочого каталогу, **спочатку оглянь існуючі файли, структуру, конфігурацію та Git status**, а потім пропонуй мінімальні обґрунтовані зміни. Не припускай, що код уже існує.
5. До кожної істотної зміни коротко пояснюй мету, альтернативи та можливі наслідки/ризики. Не створюй зайву складність.
6. Після задачі перевіряй: чи можу я (а) пояснити рішення, (б) розібрати чужий код, (в) самостійно реалізувати маленький приклад.
7. Особливо перевіряй розуміння AI-generated code: аналіз, тести, помилки, edge cases; це прямо зазначено у вакансії.
8. Під час code review оцінюй читабельність, логіку, розділення відповідальності, асинхронність, помилки, якість UI та тести. Став питання, які могли б пролунати на Junior-інтерв'ю.
9. Спілкуйся **українською, коротко і по суті**. На інтерв'ю-вправи став запитання **англійською**; допомагай формулювати природні англомовні відповіді. Код — англійською, без емодзі.
10. Не розширюй стек і scope без навчальної причини. Якщо часу не вистачає — пріоритезуй вимоги вакансії, а не «красу» фінального продукту.
11. Зберігай практику Git: осмислені feature branches, commits і кілька PR/code-review циклів, але не витрачай на бюрократію весь час.
12. **Не змінюй чи не видаляй користувацький код без пояснення**, особливо під час навчання; не роби комітів чи пушів без узгодження.

**Перший крок після читання:** коротко підтвердь розуміння пріоритетів; перевір наявність репозиторію і стан реалізації; запропонуй 30-хвилинну діагностику JavaScript/React або першу невелику задачу, залежно від моєї команди. Не генеруй весь застосунок автоматично.

---

## 2. Вихідний контекст кандидата

Кандидата запрошують на інтерв'ю, а перед цим він надав резюме з позиціонуванням **Junior Software Engineer**.

### Сильні сторони

- Production support і систематичне troubleshooting.
- Діагностика програмних, апаратних і мережевих проблем.
- Linux / CLI та основи мереж, моніторинг, технічна документація.
- Підтримка роботизованих / автоматизованих виробничих систем, віддалене відновлення та аналіз інцидентів.
- Взаємодія з користувачами, реагування на інциденти, робота в розподіленому середовищі.

### Важливе обмеження

Навички з .NET, C/C++, Rust, React, Angular, Flutter, GraphQL, баз даних, DevOps, Git тощо **не означають професійний рівень чи комерційний досвід software development**. Для підготовки вважати їх базовими. Не видавати support-досвід за development-досвід.

### Загальна оцінка

Позиція потенційно підходить для переходу із Support / Operations у Junior Development. Сильний приклад для behavioral interview — real-world incident investigation і root cause analysis. Найбільша прогалина — впевнена практична розробка цілісного застосунку JavaScript + React + Node.js.

---

## 3. Вакансія: Junior Web Full-Stack (IRC306365)

**Досвід:** 0–2 роки веброзробки, включно з комерційними, стажувальними або суттєвими особистими/університетськими проєктами.  
**Формат:** повністю віддалено з України; важливі організованість, проактивні запитання, робота з розподіленою командою.  
**Клієнт:** найбільший постачальник промислових, медичних і спеціальних газів у Великій Британії та Ірландії (у діалозі клієнта називали Linde; **конкретні програмні системи команди невідомі**).

### Required skills — з опису вакансії

- **JavaScript fundamentals / ES6+:** arrow functions, destructuring, modules, async programming, Promises, async/await.
- **ReactJS hands-on:** components, props, state, hooks, responsive UI.
- **Node.js basics:** прості REST API, наприклад Express, JSON, HTTP requests.
- **GitHub workflow:** branches, commits, pull requests.
- **English Intermediate+:** документація та командні дискусії.
- **AI coding assistants:** GitHub Copilot, Claude, ChatGPT тощо; обов'язково review, test і verify generated code before commit.

### Preferred skills — з опису вакансії

- TypeScript.
- SQL / NoSQL: PostgreSQL, MongoDB тощо.
- Unit tests: Jest, React Testing Library.
- State management: Redux, Zustand або React Context.
- Docker, CI/CD, AWS/Azure/GCP (awareness).
- Portfolio / GitHub / pet projects.

### Очікувані задачі на роботі

- Розробка й підтримка React frontend та Node.js backend під менторством senior engineers.
- Реалізація user stories та UI/UX дизайнів у responsive UI.
- REST endpoints і frontend/backend integration.
- Чистий, читабельний код за стандартами команди.
- Unit tests, багфікси, code review, співпраця з QA.
- Sprint planning, daily standups, retrospectives, постійне навчання.

### Інтерв'ю

**Формат наразі невідомий.** Слід готуватися до технічної розмови, читання й налагодження коду та можливого live coding. Не вважати жодний формат підтвердженим.

---

## 4. Пріоритети навчання

| Рівень | Тема | Що вміти |
|---|---|---|
| **P0** | JavaScript ES6+ | Types, scope, closures, functions, destructuring, spread/rest, arrays/objects, Promises, async/await, errors, event loop |
| **P0** | React | JSX, components, props, state, hooks (`useState`, `useEffect`), lists/keys, forms, state lifting, responsive UI |
| **P0** | HTTP / REST / JSON | GET, POST, PATCH, DELETE, status codes, fetch, loading/error/empty states |
| **P1** | Node.js + Express | Routing, middleware, API endpoints, validation, async handling |
| **P1** | HTML/CSS | Semantic HTML, Flexbox, Grid, responsive layout |
| **P1** | Git/GitHub | Branches, commits, pull requests, conflicts |
| **P1** | Debugging | DevTools, Network, breakpoints, backend logs |
| **P1** | AI coding workflow | Prompting, reviewing, testing, verifying AI code |
| **P2** | TypeScript | Types, interfaces, inference |
| **P2** | SQL/NoSQL | CRUD, basic queries / relationships, SQL vs document storage |
| **P2** | Testing | Unit / component tests; Jest/Vitest, React Testing Library |
| **P2** | State management | React Context basics; Redux/Zustand concepts |
| **P2/P3** | Docker/CI/CD/Cloud | Conceptual awareness, не глибока реалізація |
| **Окремо** | Teamwork / English | Пояснювати технічні рішення, розповідати про debugging, працювати з QA та feedback |

**Не пріоритезувати зараз:** Next.js, GraphQL, складний Kubernetes, велика інфраструктура, production authentication, advanced algorithms, складна system design, якщо не закриті P0.

---

## 5. Дослідження інтерв'ю: як використовувати статистику

У попередньому обговоренні розглядалися CoderPad State of Tech Hiring 2025 і HackerRank Developer Skills Report 2025. Було наведено такі орієнтовні частки методів оцінювання з опитування CoderPad:

- Технічна розмова — **75.27%**.
- Live coding — **49.82%**.
- Асинхронне технічне тестування — **24.54%**.
- Домашнє завдання — **21.06%**.
- Огляд портфоліо — **20.51%**.

І такі приклади категорій тестових завдань: алгоритми 44.0%, реальні робочі сценарії 33.9%, code review 27.8%, system design 25.5%, debugging 18.1%, структури даних 17.5%.

**Застереження:** це загальні дані з попереднього обговорення, **не підтверджені частоти запитань саме для Junior React/Node.js або цієї команди**. Не вигадувати «80% інтерв'ю питають про useEffect». Практичний принцип, запропонований у чаті: приблизно **70%** уваги до конкретного стеку вакансії, **20%** — задачі / читання коду / debugging, **10%** — behavioral, Git, AI та додаткові навички. Це **рекомендована стратегія, не статистичний факт**.

---

## 6. Історія вибору навчального проєкту

1. Початковий варіант: **Task Tracker** як невеликий React + Express застосунок.
2. Розглянуто альтернативи: Equipment Monitoring Dashboard, Inventory Management, Weather Dashboard, Support Ticket System, Movie Explorer.
3. З урахуванням клієнта у газовій промисловості розглянуто: Gas Cylinder Management, Gas Delivery Management, Gas Storage Monitoring.
4. Запропоновано оформлювати роботу як **реальні Junior development tasks** з user stories, acceptance criteria, Git feature branches, PR і code review.
5. Користувач свідомо відмовився від газової тематики й обрав **Item Management System**, не примітивний CRUD, а з елементами Junior+/початкового Middle.
6. Остаточне уточнення: **першорядна мета — практикувати акцентовані у вакансії технології, а не будувати складний продукт**. Тому scope скорочуємо за потреби.
7. Обговорено прямий доступ AI до коду. Для локальної роботи рекомендовано **Codex у VS Code**; альтернативи — ChatGPT Work, GitHub connector і завантаження ZIP. ChatGPT Project потрібен для спільного контексту, але **сам по собі не синхронізує локальний каталог коду**.

---

## 7. ItemFlow: продуктова ідея

**Назва:** ItemFlow — Item / Inventory Management System.

**Призначення:** невелика бізнес-система обліку товарів, складських залишків і операцій. Не просто список, а достатньо бізнес-правил для практики full-stack і debugging.

### Основні сценарії

1. Менеджер створює товар: name, SKU, price, category, minStock.
2. Користувач переглядає каталог, шукає, фільтрує, сортує, змінює записи.
3. Працівник реєструє надходження (`IN`) або списання (`OUT`).
4. Backend перевіряє коректність кількості та не дозволяє списувати більше доступного залишку.
5. Користувач переглядає поточний залишок і, якщо встигнемо, історію операцій та low-stock warnings.

### Навчальні фічі та відповідність технологіям

| Функція | Практика |
|---|---|
| Отримати каталог з API | React `useEffect`, `fetch`, Promise, `async/await` |
| Пошук, фільтри, сортування | `useState`, `map`, `filter`, `find`, `includes`, derived state |
| Форма створення / редагування | Controlled inputs, events, props, POST/PATCH, validation |
| Додавання/списання запасів | Express services, business logic, HTTP codes |
| Завантаження / помилки / порожній список | Conditional rendering, try/catch, error states |
| Категорії | Reusable components, dropdown, state |
| Базові тести | Assertions, unit/component tests |
| Адаптивний UI | HTML/CSS, Flexbox/Grid |
| Git задачі | Branch, commit, PR, review |

### Орієнтовна модель даних

`Item`: `id`, `name`, `sku`, `price`, `quantity`, `minStock`, `categoryId`, `isArchived`.

`Category`: `id`, `name`.

`StockTransaction`: `id`, `itemId`, `type` (`IN` / `OUT`), `quantity`, `reason`, `createdAt`.

Зв'язки: Category 1:N Item; Item 1:N StockTransaction.

**Бізнес-правила:** унікальний SKU (якщо є персистентна БД — enforced), позитивна кількість операції, залишок не може стати від'ємним, валідація API inputs. **Конкурентні списання** — хороше додаткове питання про транзакції, але не обов'язкова функція MVP. In-memory прототип не є production-safe і втрачає стан після перезапуску.

---

## 8. Узгоджений стек і свідомі спрощення

### Основний стек (фокус вакансії)

- **JavaScript ES6+** — головна мова MVP.
- **React + Vite** — frontend.
- **Node.js + Express** — backend.
- **REST + HTTP + JSON** — зв'язок frontend/backend.
- **HTML/CSS** — responsive UI.
- **Git + GitHub** — workflow та code review.

### Додаткові технології, лише якщо лишився час

- TypeScript: невелика ізольована вправа або поступова міграція окремої частини, **не переписувати весь MVP**.
- PostgreSQL / SQL: базові запити та схема; на старті можна використати **in-memory storage** для backend, щоби не втратити час на конфігурацію.
- Vitest / Jest + React Testing Library: один-два осмислені тести на важливу бізнес-логіку й UI.
- React Context: за потреби shared state; **Redux/Zustand не потрібні на старті**.
- Docker, CI/CD, cloud: переважно теоретичний огляд.

### Що відхилено для MVP

- Production authentication / authorization.
- Складна аналітика, realtime WebSocket, великі графіки.
- Надмірні UI libraries і передчасна архітектурна абстракція.
- Масштабний Prisma/PostgreSQL setup як обов'язковий початковий крок.

**Причина:** за 18 годин часу на інтерв'ю потрібна практика JavaScript + React + Express. Production-readiness не є метою цієї ітерації.

---

## 9. Початкова архітектура (орієнтир, не остаточна вимога)

```text
itemflow/
  client/                 # React + Vite (JavaScript)
    src/
      components/
      pages/
      services/           # API calls
      App.jsx
  server/                 # Node.js + Express (JavaScript)
    src/
      routes/
      controllers/
      services/
      data/               # In-memory / mock data
      app.js
  README.md
```

Потік запиту:

```text
React UI → fetch / HTTP JSON → Express route → controller/service
                                                   ↓
                                            in-memory data
```

Розподіл відповідальності має бути зрозумілим, але не потрібно будувати зайві шари для кількох простих endpoints. За потреби змінюй структуру на підставі реального стану репозиторію і пояснюй чому.

---

## 10. Backlog у стилі Jira: початкові задачі

Нижче історичний backlog із попереднього обговорення. **Це не обов'язкове зобов'язання виконати все за 18 годин** — задачі потрібно підлаштувати під рівень та темп.

| ID | Задача | Що практикуємо | Пріоритет |
|---|---|---|---|
| ITM-101 | Project setup | Vite, Node, Express, Git | P0 |
| ITM-102 | Item Catalog REST API | HTTP, CRUD, routing, validation | P0 |
| ITM-103 | Item Catalog UI | React components, API integration, list, filtering | P0 |
| ITM-104 | Create / Edit Item Form | State, props, controlled inputs, POST/PATCH | P0 |
| ITM-105 | Stock Operations | Business rules, backend logic, validation | P0 |
| ITM-106 | Transaction History | Data relationships, list/filter, API | P1 / stretch |
| ITM-107 | Inventory Dashboard | Derived state, stats, low-stock warnings | P1 / stretch |
| ITM-108 | Tests | Unit / component tests | P1 |
| ITM-109 | Git workflow / Code Review | Feature branch, PR, review feedback | P1 |

### Приклад добре описаної user story

**ITM-103 — Implement Item Catalog List**

> As an inventory operator, I want to view a list of items so that I can check available stock and find the item I need.

**Acceptance criteria:**

- Items are loaded from `GET /api/items`.
- The list shows SKU, name, category, price, quantity, and stock status.
- There are meaningful loading, error, and empty states.
- Basic text search works.
- Components are reusable and the page works at narrow screen widths.
- User can explain where data fetching occurs and why.

**Interview questions після виконання:**

- Why did you fetch the data inside `useEffect`?
- How do props differ from state?
- What happens if the API request fails?
- What is the purpose of React keys?
- How would you test the list in its loading and error states?

### Формат роботи над Jira-like task

1. User story та acceptance criteria.
2. Уточнення вимог, якщо є неоднозначності.
3. Пояснення 1–2 критичних технологічних концепцій.
4. Самостійна реалізація кандидата у feature branch.
5. Тести / запуск / перевірка.
6. Code review із конкретними коментарями й обговоренням альтернатив.
7. Корекція, commit / PR (якщо доречно).
8. 3–5 інтерв'ю-запитань англійською.

---

## 11. План інтенсиву: 18 годин

Розглядалися два порядки реалізації: спочатку JavaScript/Backend, потім React; або спочатку JavaScript, потім React, потім Node. **Фінально не зафіксовано єдиного порядку**. Нижче варіант, найближчий до останньої рекомендації: він не виключає короткої діагностики на початку.

### День 1 — JavaScript + Node basics (6 год)

- Повторити JS: types, scope, functions, closures, destructuring, spread/rest, array methods.
- Асинхронність: Promise, async/await, try/catch, event loop.
- Node + Express: створити прості CRUD endpoints для items з in-memory даними.
- Мінізадачі на JS; пояснення коду вголос.

**Критерій:** вміти розібрати JS-код, пояснити async і вручну перевірити API.

### День 2 — React + UI (6 год)

- JSX, components, props, state, handlers.
- `useState`, `useEffect`, dependencies / cleanup.
- Lists, keys, conditional rendering, controlled forms.
- Реалізувати каталог, пошук/фільтри, форму; під'єднати API.
- Responsive CSS та короткий debugging.

**Критерій:** працюючий React frontend, зрозумілий стан і lifecycle.

### День 3 — Integration + testing + interview (6 год)

- Stock IN/OUT operations та frontend/backend integration.
- HTTP error handling, validation, базове тестування.
- Git branch / PR / review.
- Короткий огляд TypeScript, SQL, Context, Docker/CI/CD.
- Mock interview: JS, React, Node/HTTP, code reading, troubleshooting, AI use, behavioral answers.

**Критерій:** MVP працює; кандидат може пояснити end-to-end request flow та свій код.

### Важлива умова

**18 год — це бюджет і на навчання, і на реалізацію, і на інтерв'ю-вправи.** Він не гарантує завершення всіх фіч. Якщо темп нижчий — зменшити scope (наприклад, не робити dashboard або історію), **але не прибирати базові JS/React/API теми**.

---

## 12. Деталізований навчальний чекліст

### JavaScript

- [ ] `let`/`const`, primitive/reference types, truthy/falsy, equality.
- [ ] Scope, hoisting, closures; `this` на базовому рівні.
- [ ] Functions, arrow functions, modules.
- [ ] Destructuring, spread/rest.
- [ ] `map`, `filter`, `find`, `reduce`; immutable updates.
- [ ] Promise, async/await, event loop, error handling.
- [ ] 3–4 невеликі JS задачі без сліпого копіювання AI-відповідей.

### React

- [ ] JSX, components, props.
- [ ] `useState`, handlers, controlled forms.
- [ ] `useEffect`, dependencies, cleanup і fetch.
- [ ] Lists/keys, conditional rendering, lifting state up.
- [ ] Loading, error, empty states.
- [ ] Responsive UI і DevTools.
- [ ] Debugging React-компонента та пояснення рендерів.

### Backend / HTTP

- [ ] Express app, routes, middleware.
- [ ] REST GET/POST/PATCH/DELETE.
- [ ] Status codes 200/201/400/404/500.
- [ ] JSON parsing, API input validation.
- [ ] Business logic (IN/OUT, non-negative stock).
- [ ] Frontend/backend integration.

### Додаткове та процес

- [ ] Git branch, commits, PR, базове розуміння merge/conflicts.
- [ ] 1–2 meaningful tests, включно з негативним case.
- [ ] TypeScript basic types/interfaces (огляд).
- [ ] SQL vs NoSQL / relational basics (огляд).
- [ ] Context / shared state (огляд).
- [ ] Docker / CI/CD / cloud — пояснення ідеї (огляд).
- [ ] AI-generated code: read → verify → test → fix before commit.
- [ ] Пояснення архітектури та request flow англійською.
- [ ] Behavioral приклади з troubleshooting / incident investigation.
- [ ] Mock interview / live coding / code reading.

---

## 13. Спосіб інтеграції AI з кодом

Користувачу потрібен **прямий доступ AI до фактичного source code**, а не тільки текстові відповіді в чаті.

Рекомендований формат: **Codex у VS Code**, відкритий у каталозі ItemFlow. У цьому сценарії AI може в доступному йому середовищі читати/редагувати файли, запускати тести та аналізувати Git diff (залежить від дозволів і конфігурації). Проєкт ChatGPT може слугувати місцем збереження контексту; GitHub — джерелом версій і PR. Це окремі інструменти, **контекст між ними не гарантовано переноситься автоматично**.

Цей `.md` призначений для додавання у репозиторій, наприклад у корінь як `PROJECT_CONTEXT.md`, і для явної інструкції AI прочитати його перед початком роботи.

### Рекомендована команда на початку нового середовища

> Прочитай `PROJECT_CONTEXT.md`. Перевір наявні файли репозиторію, package scripts, README, поточну гілку та Git status. Підсумуй, які задачі вже реалізовано, які ще ні. Не переписуй код і не починай нову задачу без моєї команди. Працюй як ментор і code reviewer за правилами файла.

---

## 14. Що ще не вирішено

- Конкретний формат та дата інтерв'ю **не відомі**.
- Репозиторій **не було надано в цьому обговоренні**; фактичний стан файлів та реалізації невідомий.
- Остаточний вибір дизайну/UI ще не зроблено.
- Остаточний storage layer (in-memory → SQL) ще не зафіксовано.
- Порядок Jira tasks можна змінювати після діагностики.
- Не встановлено, чи потрібен справжній GitHub PR на кожну задачу; рекомендація — **2–3 ключові PR**, інше спрощено.

## 15. Головне правило для всіх наступних рішень

> **Релевантність до вакансії > навчальна користь > якість розуміння > кількість фіч.**
>
> Якщо доводиться вибирати між «ще один модуль» та «краще зрозуміти JS / React / Node і пояснити своє рішення на інтерв'ю» — обирай друге.

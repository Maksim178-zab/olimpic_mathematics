// ============================================================
// АВТОМАТИЧЕСКОЕ ОПРЕДЕЛЕНИЕ КОРНЯ ДЛЯ GITHUB PAGES И ЛОКАЛЬНОГО ПРОСМОТРА
// ============================================================
function getBasePath() {
    // Получаем текущий путь (например: /repo/main/index.html или /main/index.html)
    let path = window.location.pathname;

    // Если есть /main/ в пути, то theory1 находится на уровень выше
    if (path.includes('/main/')) {
        // Возвращаем путь к корню (где лежит папка theory1)
        let base = path.substring(0, path.indexOf('/main/') + 1);
        return base;
    }

    // Если мы в корне или в другой структуре
    let lastSlash = path.lastIndexOf('/');
    if (lastSlash > 0) {
        return path.substring(0, lastSlash + 1);
    }
    return '/';
}

function getFullPath(relativePath) {
    // Если это внешняя ссылка или абсолютная — возвращаем как есть
    if (relativePath.startsWith('http://') ||
        relativePath.startsWith('https://') ||
        relativePath.startsWith('//')) {
        return relativePath;
    }

    // Если путь начинается с / — это абсолютный путь от корня домена
    if (relativePath.startsWith('/')) {
        return relativePath;
    }

    // Для внутренних ссылок добавляем базовый путь
    let base = getBasePath();

    // Убираем возможное дублирование слешей
    let fullPath = base + relativePath;
    fullPath = fullPath.replace(/([^:]\/)\/+/g, '$1');

    return fullPath;
}

// ============================================================
// БАЗА ДАННЫХ ССЫЛОК (теория + практика по темам)
// ============================================================
const resources = {
    number: {
        theory: [
            { text: "Делимость чисел (полный сайт с теорией + практикой)", url: "theory1/divisibility.html", isInternal: true },
            { text: "Сравнения по модулю (подробный разбор + задачи)", url: "theory1/modular.html", isInternal: true },
            { text: "Десятичная запись числа и признаки делимости", url: "theory1/decimal.html", isInternal: true }
        ],
        practice: [
            { text: "📚 Сборник олимпиадных задач (15 задач с решениями)", url: "theory1/practice-number-theory.html", isInternal: true },
            { text: "Задачи на делимость (с решениями)", url: "theory1/divisibility.html#practice", isInternal: true },
            { text: "Практикум: сравнения по модулю", url: "theory1/modular.html#practice", isInternal: true },
            { text: "Упражнения: десятичная запись и признаки", url: "theory1/decimal.html#practice", isInternal: true }
        ]
    },
    ineq: {
        theory: [
            { text: "Метод интервалов: полное руководство", url: "theory2/interval-method.html", isInternal: true},
            { text: "Классические неравенства: Коши", url: "theory2/cauchy-inequality.html", isInternal: true },
            { text: "Классические неравенства: Бернулли, Йенсен, Шур", url: "theory2/bernoulli-jensen.html", isInternal: true },
            { text: "Все о производных", url: "theory2/derivative-theory.html", isInternal: true }
        ],
        practice: [
            { text: "📚 Сборник олимпиадных задач (50 задач с решениями)", url: "theory2/practice-inequalities-50.html", isInternal: true },
            { text: "📚 Сборник олимпиадных задач (30 задач с решениями)", url: "theory2/practice-derivatives.html", isInternal: true }
        ]
    },
    irrational: {
        theory: [
            { text: "Преобразование иррациональных выражений — теория", url: "https://www.khanacademy.org/math/algebra-home/alg-exp-and-log/alg-radical-expressions" },
            { text: "Сравнение иррациональных чисел (методы возведения в квадрат, оценка)", url: "https://math.stackexchange.com/questions/compare-irrational-numbers" }
        ],
        practice: [
            { text: "Рационализация знаменателя — 50 упражнений", url: "https://www.math-exercises.com/radicals/rationalization" },
            { text: "Практика: сравнение иррациональных чисел", url: "https://www.matematica.pt/en/exercises/irrational-numbers" }
        ]
    },
    geoopt: {
        theory: [
            { text: "Изопериметрические задачи", url: "theory4/isoperimetric.html" , isInternal: true },
            { text: "Геометрическая оптимизация: методы и примеры", url: "theory4/optimization-methods.html" , isInternal: true  },
            { text: "Задача Ферма-Торричелли и минимальные расстояния", url: "theory4/format-torricelli.html" , isInternal: true }
        ],
        practice: [
            { text: "📚 Сборник олимпиадных задач (40 задач с решениями)", url: "theory4/practice-geometry-optimization.html", isInternal: true }
        ]
    },
    invariant: {
        theory: [
            { text: "Инварианты: теория и ключевые примеры", url: "https://www.cantorsparadise.com/invariants-in-olympiad-mathematics-9e7e0a3e2d1c" },
            { text: "Полуинварианты и метод спуска", url: "https://imomath.com/index.php?options=Invariants" }
        ],
        practice: [
            { text: "Задачи на инварианты (от простых до сложных)", url: "https://artofproblemsolving.com/community/c169239_invariants" },
            { text: "Практика: раскраски, чётность, ходы в играх", url: "https://www.mccme.ru/circles/mccme/2017/invariants_tasks.pdf" }
        ]
    },
    dirichlet: {
        theory: [
            { text: "Принцип Дирихле (обобщённый, весовой) — теория", url: "https://brilliant.org/wiki/pigeonhole-principle/" },
            { text: "Весовой принцип Дирихле: формулировки и идеи", url: "https://www.math.uni-bielefeld.de/~sillke/PUZZLES/pigeonhole" }
        ],
        practice: [
            { text: "100 задач на принцип Дирихле (с решениями)", url: "https://artofproblemsolving.com/wiki/index.php/Pigeonhole_Principle#Problems" },
            { text: "Олимпиадный практикум: обобщённый Дирихле", url: "https://www.mccme.ru/circles/mccme/2021/dirichlet_problems.pdf" }
        ]
    },
    polynomials: {
        theory: [
            { text: "Теорема Безу и схема Горнера — теория", url: "https://mathvox.ru/algebra/polynomials/teorema-bezu" },
            { text: "Интерполяция многочленов: Лагранж, Ньютон", url: "https://mathworld.wolfram.com/LagrangeInterpolatingPolynomial.html" },
            { text: "Целые корни многочленов (рациональная теорема о корнях)", url: "https://www.purplemath.com/modules/rtnlroot.htm" }
        ],
        practice: [
            { text: "Схема Горнера — упражнения (много примеров)", url: "https://www.matematicasvisuales.com/english/html/analysis/polynomial/horner_exercises.html" },
            { text: "Задачи: целые корни, разложение на множители", url: "https://artofproblemsolving.com/community/c4h161142_integer_roots" },
            { text: "Интерполяция — практические задачи с решениями", url: "https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:polynomials/x9e81a4f98389efdf:lagrange-interpolation" }
        ]
    }
};

// ============================================================
// ФУНКЦИЯ СОЗДАНИЯ ССЫЛКИ (с правильными путями)
// ============================================================
function createLink(item) {
    const a = document.createElement("a");
    a.textContent = item.text;

    if (item.isInternal) {
        // Внутренняя ссылка — используем getFullPath для правильного пути
        a.href = getFullPath(item.url);
        a.target = "_self";
    } else {
        // Внешняя ссылка — открываем в новой вкладке
        a.href = item.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    }

    return a;
}

// ============================================================
// ЗАПОЛНЕНИЕ ВСЕХ РАЗДЕЛОВ (теория и практика)
// ============================================================
function populateAllSections() {
    const sections = [
        { theoryId: "theory-number", practiceId: "practice-number", key: "number" },
        { theoryId: "theory-ineq", practiceId: "practice-ineq", key: "ineq" },
        { theoryId: "theory-irrational", practiceId: "practice-irrational", key: "irrational" },
        { theoryId: "theory-geoopt", practiceId: "practice-geoopt", key: "geoopt" },
        { theoryId: "theory-invariant", practiceId: "practice-invariant", key: "invariant" },
        { theoryId: "theory-dirichlet", practiceId: "practice-dirichlet", key: "dirichlet" },
        { theoryId: "theory-polynomials", practiceId: "practice-polynomials", key: "polynomials" }
    ];

    sections.forEach(section => {
        const theoryContainer = document.getElementById(section.theoryId);
        const practiceContainer = document.getElementById(section.practiceId);
        const data = resources[section.key];

        if (theoryContainer) {
            theoryContainer.innerHTML = "";
            data.theory.forEach(item => {
                const li = document.createElement("li");
                li.appendChild(createLink(item));
                theoryContainer.appendChild(li);
            });
        }

        if (practiceContainer) {
            practiceContainer.innerHTML = "";
            if (data.practice.length === 0) {
                const li = document.createElement("li");
                li.textContent = "📌 Практические материалы скоро появятся";
                li.style.color = "#6c757d";
                li.style.fontStyle = "italic";
                practiceContainer.appendChild(li);
            } else {
                data.practice.forEach(item => {
                    const li = document.createElement("li");
                    li.appendChild(createLink(item));
                    practiceContainer.appendChild(li);
                });
            }
        }
    });
}

// ============================================================
// ДОПОЛНИТЕЛЬНАЯ ЗАЩИТА ДЛЯ ВНЕШНИХ ССЫЛОК
// ============================================================
function secureExternalLinks() {
    document.querySelectorAll(".link-list a").forEach(link => {
        // Если ссылка не ведёт на наши внутренние файлы и не имеет target
        if (!link.href.includes(window.location.origin) && !link.hasAttribute("target")) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }
    });
}

// ============================================================
// ЗАПУСК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    populateAllSections();
    secureExternalLinks();
    console.log("✅ Математический навигатор загружен");
    console.log("📁 Базовый путь для ссылок:", getBasePath());
});
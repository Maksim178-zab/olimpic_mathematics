// Структура данных: для каждой темы — объект с theory[] и practice[]
const resources = {
    number: {
        theory: [
            { text: "📘 Делимость чисел (полный сайт с теорией + практикой)", url: "/theory1/divisibility.html", isInternal: true },
            { text: "📘 Сравнения по модулю (подробный разбор + задачи)", url: "/theory1/modular.html", isInternal: true },
            { text: "📘 Десятичная запись числа и признаки делимости", url: "/theory1/decimal.html", isInternal: true }
        ],
        practice: [
            { text: "📚 Сборник олимпиадных задач (15 задач с решениями)", url: "/theory1/practice-number-theory.html", isInternal: true }
        ]
    },
    ineq: {
        theory: [
            { text: "Метод интервалов: полное руководство", url: "https://mathvox.ru/algebra/neravenstva/racionalnye-neravenstva/metod-intervalov/" },
            { text: "Классические неравенства: Коши, Бернулли, Йенсена", url: "https://artofproblemsolving.com/wiki/index.php/Inequality" }
        ],
        practice: [
            { text: "Метод интервалов — практические примеры (с ответами)", url: "https://www.mathtutor.com/inequalities/interval-method-exercises.html" },
            { text: "Сборник задач: алгебраические неравенства", url: "https://imomath.com/index.php?options=Problems&select=inequalities" }
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
            { text: "Геометрическая оптимизация: методы и примеры", url: "https://en.wikipedia.org/wiki/Geometric_optimization" },
            { text: "Задача Ферма-Торричелли и минимальные расстояния", url: "https://www.cut-the-knot.org/Curriculum/Geometry/FermatPoint.shtml" }
        ],
        practice: [
            { text: "Олимпиадные задачи на экстремумы в геометрии", url: "https://artofproblemsolving.com/community/c6h1210_geometric_optimization" },
            { text: "Практикум: изопериметрическая задача (упражнения)", url: "https://www.math.ucla.edu/~mms/Talks/Isoperimetric.pdf" }
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

// Функция для создания ссылки (поддерживает внутренние и внешние)
function createLink(item) {
    const a = document.createElement("a");
    a.href = item.url;
    a.textContent = item.text;
    if (item.isInternal) {
        // Внутренняя ссылка — открываем в этой же вкладке
        a.target = "_self";
    } else {
        // Внешняя — в новой вкладке
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    }
    return a;
}

// Заполнение списков для теории и практики
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

// Доп. безопасность для внешних ссылок
function secureExternalLinks() {
    document.querySelectorAll(".link-list a").forEach(link => {
        // Если ссылка не ведёт на наши внутренние файлы и не имеет target
        if (!link.href.includes("theory1/") && !link.hasAttribute("target")) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    populateAllSections();
    secureExternalLinks();
    console.log("✅ Математический навигатор загружен. Ссылки на теорию чисел ведут в папку theory1/");
});
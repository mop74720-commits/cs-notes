(() => {
  const stageStarts = [
    {
      zh: "数学基础",
      en: "Fundamental Mathematics",
      labelZh: "基础与理论",
      labelEn: "FOUNDATIONS & THEORY"
    },
    {
      zh: "计算机系统基础",
      en: "Computer Systems Principles",
      labelZh: "系统与架构",
      labelEn: "SYSTEMS & ARCHITECTURE"
    },
    {
      zh: "数据库系统",
      en: "Database Systems",
      labelZh: "软件与工程",
      labelEn: "SOFTWARE & ENGINEERING"
    },
    {
      zh: "数据科学",
      en: "Data Science",
      labelZh: "数据与智能",
      labelEn: "DATA & INTELLIGENCE"
    },
    {
      zh: "计算机图形学",
      en: "Computer Graphics",
      labelZh: "专项与交叉",
      labelEn: "SPECIALIZATIONS & INTERDISCIPLINARY"
    }
  ];

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function decorateNavigation() {
    document
      .querySelectorAll("nav.md-nav--primary > ul.md-nav__list")
      .forEach((list) => {
        list.querySelectorAll(":scope > .cs-stage-divider").forEach((el) => el.remove());

        const items = Array.from(list.children).filter((el) =>
          el.classList.contains("md-nav__item")
        );

        for (const stage of stageStarts) {
          const item = items.find((li) => {
            const link = li.querySelector(":scope > a.md-nav__link, :scope > label.md-nav__link");
            const text = normalize(link?.textContent);
            return text === stage.zh || text === stage.en;
          });

          if (!item) continue;

          const currentText = normalize(
            item.querySelector(":scope > a.md-nav__link, :scope > label.md-nav__link")?.textContent
          );
          const divider = document.createElement("li");
          divider.className = "cs-stage-divider";
          divider.setAttribute("aria-hidden", "true");
          divider.textContent = currentText === stage.en ? stage.labelEn : stage.labelZh;
          list.insertBefore(divider, item);
        }
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", decorateNavigation, { once: true });
  } else {
    decorateNavigation();
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(decorateNavigation);
  }
})();

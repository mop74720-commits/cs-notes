(() => {
  const stageStarts = [
    {
      zh: "数学基础",
      en: "Fundamental Mathematics",
      labelZh: "基础阶段",
      labelEn: "FOUNDATIONS"
    },
    {
      zh: "软件工程",
      en: "Software Engineering",
      labelZh: "CS 核心",
      labelEn: "CS CORE"
    },
    {
      zh: "并行与分布式系统",
      en: "Distributed Systems",
      labelZh: "系统与工程进阶",
      labelEn: "SYSTEMS & ENGINEERING"
    },
    {
      zh: "计算机图形学",
      en: "Computer Graphics",
      labelZh: "专项方向",
      labelEn: "SPECIALIZATIONS"
    },
    {
      zh: "数据科学",
      en: "Data Science",
      labelZh: "AI / 数据",
      labelEn: "AI / DATA"
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

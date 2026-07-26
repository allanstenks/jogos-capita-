document.addEventListener("DOMContentLoaded", function () {

/* SENINHA V2 */

const seninhaV2Page = document.getElementById("seninhaV2Page");

if (seninhaV2Page) {
  const dateButtons = seninhaV2Page.querySelectorAll(
    ".seninha-date-option"
  );

  const dozenButtons = seninhaV2Page.querySelectorAll(
    ".seninha-dozen-option"
  );

  const ticketMinus = document.getElementById(
    "seninhaV2TicketMinus"
  );

  const ticketPlus = document.getElementById(
    "seninhaV2TicketPlus"
  );

  const ticketCountElement = document.getElementById(
    "seninhaV2TicketCount"
  );

  const summaryTicketCount = document.getElementById(
    "seninhaV2SummaryTickets"
  );

  let ticketCount = 1;

  /* Seleção da data */

  dateButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      dateButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");
    });
  });

  /* Seleção da quantidade de dezenas */

  dozenButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      dozenButtons.forEach(function (item) {
        item.classList.remove("active");

        const oldCheck = item.querySelector(
          ".seninha-selected-check"
        );

        if (oldCheck) {
          oldCheck.remove();
        }
      });

      button.classList.add("active");

      const check = document.createElement("span");

      check.className = "seninha-selected-check";

      check.innerHTML =
        '<span class="icon icon-check"></span>';

      button.prepend(check);
    });
  });

  /* Atualiza quantidade de bilhetes */

  function updateTicketCount() {
    ticketCountElement.textContent = ticketCount;

    if (summaryTicketCount) {
      summaryTicketCount.textContent = ticketCount;
    }
  }

  ticketPlus.addEventListener("click", function () {
    ticketCount++;
    updateTicketCount();
  });

  ticketMinus.addEventListener("click", function () {
    if (ticketCount <= 1) {
      return;
    }

    ticketCount--;
    updateTicketCount();
  });

  updateTicketCount();

  /* Gerar números aleatórios */

const randomRadios = seninhaV2Page.querySelectorAll(
  'input[name="seninhaV2Random"]'
);

const ticketsList = document.getElementById(
  "seninhaV2TicketsList"
);

function generateRandomNumbers() {
  if (!ticketsList) return;

  ticketsList
    .querySelectorAll(".seninha-ticket")
    .forEach(function (ticket) {
      const inputs = ticket.querySelectorAll(
        ".seninha-number-grid input"
      );

      const numbers = new Set();

      while (numbers.size < inputs.length) {
        numbers.add(
          Math.floor(Math.random() * 61)
        );
      }

      Array.from(numbers)
        .sort(function (a, b) {
          return a - b;
        })
        .forEach(function (number, index) {
          inputs[index].value = String(number).padStart(2, "0");
        });
    });
}

randomRadios.forEach(function (radio) {
  radio.addEventListener("change", function () {
    if (
      radio.checked &&
      radio.value === "yes"
    ) {
      generateRandomNumbers();
    }
  });
});
}
  /* Menu ativo pela URL */

const currentPage =
  window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-link").forEach(function (link) {
  const linkPage = link.getAttribute("href");

  link.classList.toggle(
    "active",
    linkPage === currentPage
  );
});


  const accountPanel = document.getElementById("accountPanel");
  const accountToggles = document.querySelectorAll(
    "[data-account-toggle]"
  );

  if (accountPanel && accountToggles.length) {

    function setAccountPanelState(isOpen) {
      accountPanel.classList.toggle("open", isOpen);

      accountToggles.forEach(function (item) {
        item.setAttribute(
          "aria-expanded",
          String(isOpen)
        );
      });
    }

    function toggleAccountPanel() {
      const isOpen =
        !accountPanel.classList.contains("open");

      setAccountPanelState(isOpen);
    }

    accountToggles.forEach(function (toggle) {

      toggle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        toggleAccountPanel();
      });

      toggle.addEventListener("keydown", function (event) {
        const isActivationKey =
          event.key === "Enter" ||
          event.key === " ";

        if (!isActivationKey) return;

        event.preventDefault();
        event.stopPropagation();

        toggleAccountPanel();
      });

    });

    accountPanel.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    document.addEventListener("click", function () {
      setAccountPanelState(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setAccountPanelState(false);
      }
    });

  }


  /* Contagem regressiva */

  document.querySelectorAll(".card-countdown").forEach(function (card) {
    const targetDate = new Date(card.dataset.target).getTime();
    const boxes = card.querySelectorAll(".time-box strong");

    if (Number.isNaN(targetDate) || boxes.length < 3) return;

    const hoursEl = boxes[0];
    const minutesEl = boxes[1];
    const secondsEl = boxes[2];

    let interval;

    function pad(value) {
      return String(value).padStart(2, "0");
    }

    function updateCountdown() {
      const distance = targetDate - Date.now();

      if (distance <= 0) {
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        clearInterval(interval);
        return;
      }

      const totalSeconds = Math.floor(distance / 1000);

      hoursEl.textContent = pad(
        Math.floor(totalSeconds / 3600)
      );

      minutesEl.textContent = pad(
        Math.floor((totalSeconds % 3600) / 60)
      );

      secondsEl.textContent = pad(
        totalSeconds % 60
      );
    }

    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
  });


  /* Menu mobile */

  const menu = document.getElementById("mobileMenu");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  if (menu && sidebar && overlay) {

    menu.addEventListener("click", function () {
      sidebar.classList.toggle("open");
      overlay.classList.toggle("show");
    });

    overlay.addEventListener("click", function () {
      sidebar.classList.remove("open");
      overlay.classList.remove("show");
    });

  }


  /* Acordeões, FAQs e senha */

  document.querySelectorAll(
    "[data-accordion], .pool-faq-list, .help-faq-list, .password-card"
  ).forEach(function (container) {

    const items = container.matches(".password-card")
      ? [container]
      : container.querySelectorAll(
          ".accordion-item, .pool-faq-item, .help-faq-item"
        );

    items.forEach(function (item) {

      const trigger = item.querySelector(
        ".accordion-trigger, .pool-faq-question, .help-faq-question, .password-toggle, .profile-arrow"
      );

      if (!trigger) return;

      trigger.addEventListener("click", function (event) {
        event.preventDefault();

        const isOpen = item.classList.contains("open");

        items.forEach(function (otherItem) {
          otherItem.classList.remove("open");
        });

        if (!isOpen) {
          item.classList.add("open");
        }
      });

    });

  });


  /* Fluxo de depósito */

  const depositFlow = document.getElementById("depositFlow");

if (depositFlow) {
  let selectedMethod = "pix";

  const stepButtons =
    depositFlow.querySelectorAll("[data-go-step]");

  const stepContents =
    depositFlow.querySelectorAll("[data-step]");

  function goToStep(stepNumber, method) {
    selectedMethod = method || selectedMethod;

    stepButtons.forEach(function (button) {
      const buttonStep = Number(button.dataset.goStep);
      const buttonMethod = button.dataset.method;

      // PIX ou Transferência
      if (buttonMethod) {
        button.classList.toggle(
          "selected",
          buttonMethod === selectedMethod
        );

        return;
      }

      // Passos do topo
      button.classList.toggle(
        "active",
        buttonStep === stepNumber
      );

      button.classList.toggle(
        "done",
        buttonStep < stepNumber
      );
    });

    stepContents.forEach(function (content) {
      const contentStep = Number(content.dataset.step);
      const contentMethod = content.dataset.methodContent;

      const show =
        contentStep === stepNumber &&
        (!contentMethod || contentMethod === selectedMethod);

      content.classList.toggle("active", show);
    });
  }

  stepButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      goToStep(
        Number(button.dataset.goStep),
        button.dataset.method
      );
    });
  });
}


/* Valores - depósito e saque */

/* Seletores de valor — depósito e saque */

document.querySelectorAll("[data-amount-selector]").forEach(function (selector) {

  const amountInput = selector.querySelector("[data-amount-input]");
  const buttons = selector.querySelectorAll(
    ".amount-options button"
  );

  if (!amountInput || !buttons.length) return;

  function formatAmount(value) {
    return Number(value).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  buttons.forEach(function (button) {

    button.addEventListener("click", function (event) {
      event.preventDefault();

      buttons.forEach(function (otherButton) {
        otherButton.classList.remove("active");
      });

      /* Outro valor */

      if (button.hasAttribute("data-custom")) {
        amountInput.readOnly = false;
        amountInput.value = "";
        amountInput.focus();
        return;
      }

      /* Valores fixos */

      const value = button.dataset.amount;

      if (!value) return;

      button.classList.add("active");
      amountInput.readOnly = false;
      amountInput.value = "R$ " + formatAmount(value);
    });

  });

  /* Digitação do valor personalizado */

  amountInput.addEventListener("input", function () {
    buttons.forEach(function (button) {
      button.classList.remove("active");
    });

    const numbers = amountInput.value.replace(/\D/g, "");

    if (!numbers) {
      amountInput.value = "";
      return;
    }

    const value = Number(numbers) / 100;

    amountInput.value = "R$ " + formatAmount(value);
  });

});

  /* Bolão JC */

const poolBetPage = document.getElementById("poolBetPage");

if (poolBetPage) {
  const ticketsList = document.getElementById("poolTicketsList");
  const ticketTemplate = document.getElementById("poolTicketTemplate");

  const ticketCountElement = document.getElementById("poolTicketCount");
  const totalValueElement = document.getElementById("poolTotalValue");

  const minusButton = document.getElementById("poolTicketMinus");
  const plusButton = document.getElementById("poolTicketPlus");
  const addTicketButton = document.getElementById("poolAddTicket");

  const ticketPrice = 5;
  let ticketCount = 2;

  function formatMoney(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  function createTicket(ticketIndex) {
    const fragment = ticketTemplate.content.cloneNode(true);

    const card = fragment.querySelector(".pool-ticket-card");
    const title = fragment.querySelector(".pool-ticket-title");
    const numberGrid = fragment.querySelector(".pool-number-grid");

    const clearButton = fragment.querySelector(".pool-ticket-clear");
    const deleteButton = fragment.querySelector(".pool-ticket-delete");
    const toggleButton = fragment.querySelector(".pool-ticket-toggle");

    title.textContent =
      "Bilhete " + String(ticketIndex + 1).padStart(2, "0");

    for (let index = 0; index < 14; index++) {
      const input = document.createElement("input");

      input.type = "text";
      input.inputMode = "numeric";
      input.maxLength = 2;
      input.placeholder = "00";
      input.setAttribute(
        "aria-label",
        "Dezena " + (index + 1)
      );

      input.addEventListener("input", function () {
        input.value = input.value
          .replace(/\D/g, "")
          .slice(0, 2);
      });

      input.addEventListener("blur", function () {
        if (input.value !== "") {
          input.value = input.value.padStart(2, "0");
        }
      });

      numberGrid.appendChild(input);
    }

    clearButton.addEventListener("click", function () {
      numberGrid.querySelectorAll("input").forEach(function (input) {
        input.value = "";
      });
    });

    deleteButton.addEventListener("click", function () {
      if (ticketCount <= 1) return;

      card.remove();
      ticketCount--;

      updateTicketTitles();
      updateSummary();
    });

    toggleButton.addEventListener("click", function () {
      card.classList.toggle("closed");
    });

    return fragment;
  }

  function updateTicketTitles() {
    ticketsList
      .querySelectorAll(".pool-ticket-card")
      .forEach(function (card, index) {
        const title = card.querySelector(".pool-ticket-title");

        title.textContent =
          "Bilhete " + String(index + 1).padStart(2, "0");
      });
  }

  function updateSummary() {
    ticketCountElement.textContent = ticketCount;
    totalValueElement.textContent =
      formatMoney(ticketCount * ticketPrice);
  }

  function renderTickets() {
    ticketsList.innerHTML = "";

    for (let index = 0; index < ticketCount; index++) {
      ticketsList.appendChild(createTicket(index));
    }

    updateSummary();
  }

  function addTicket() {
    ticketCount++;

    ticketsList.appendChild(
      createTicket(ticketCount - 1)
    );

    updateSummary();
  }

  function removeTicket() {
    if (ticketCount <= 1) return;

    const lastTicket = ticketsList.lastElementChild;

    if (lastTicket) {
      lastTicket.remove();
    }

    ticketCount--;

    updateTicketTitles();
    updateSummary();
  }

  if (plusButton) {
    plusButton.addEventListener("click", addTicket);
  }

  if (addTicketButton) {
    addTicketButton.addEventListener("click", addTicket);
  }

  if (minusButton) {
    minusButton.addEventListener("click", removeTicket);
  }

  renderTickets();
}

/* Quininha V2 */

const quininhaV2Page = document.getElementById("quininhaV2Page");

if (quininhaV2Page) {
  const dateButtons = quininhaV2Page.querySelectorAll(
    "[data-quininha-date]"
  );

  const dozenButtons = quininhaV2Page.querySelectorAll(
    ".quininha-dozen-option"
  );

  const ticketMinus = document.getElementById(
    "quininhaV2TicketMinus"
  );

  const ticketPlus = document.getElementById(
    "quininhaV2TicketPlus"
  );

  const ticketCountElement = document.getElementById(
    "quininhaV2TicketCount"
  );

  const summaryTicketCount = document.getElementById(
    "quininhaV2SummaryTickets"
  );

  const totalValueElement = document.getElementById(
    "quininhaV2TotalValue"
  );

  const winningsElement = document.getElementById(
    "quininhaV2PossibleWinnings"
  );

  const ticketsList = document.getElementById(
    "quininhaV2TicketsList"
  );

  const clearAllButton = document.getElementById(
    "quininhaV2ClearAll"
  );

  const toggleTicketsButton = quininhaV2Page.querySelector(
    ".quininha-toggle-tickets"
  );

  const ticketsCard = quininhaV2Page.querySelector(
    ".quininha-tickets-card"
  );

  let selectedDozens = 13;
  let selectedPrice = 5000;
  let ticketCount = 1;
  let selectedDate = "today";

  function formatMoney(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  function createNumberInput(index) {
    const input = document.createElement("input");

    input.type = "text";
    input.inputMode = "numeric";
    input.maxLength = 2;
    input.placeholder = "00";

    input.setAttribute(
      "aria-label",
      "Dezena " + (index + 1)
    );

    input.addEventListener("input", function () {
      let value = input.value
        .replace(/\D/g, "")
        .slice(0, 2);

      if (value !== "" && Number(value) > 80) {
        value = "80";
      }

      input.value = value;
    });

    input.addEventListener("blur", function () {
      if (input.value !== "") {
        input.value = input.value.padStart(2, "0");
      }
    });

    return input;
  }

  function createTicket(ticketIndex) {
    const article = document.createElement("article");

    article.className = "quininha-ticket";

    article.innerHTML = `
      <div class="quininha-ticket-title">
        <strong>Bilhete ${ticketIndex + 1}</strong>
        <span>${selectedDozens} dezenas</span>
      </div>

      <div class="quininha-number-grid"></div>

      <div class="quininha-ticket-tip">
        <span class="icon icon-info"></span>
        Digite suas dezenas de 00 até 80
      </div>
    `;

    const numberGrid = article.querySelector(
      ".quininha-number-grid"
    );

    for (let index = 0; index < selectedDozens; index++) {
      numberGrid.appendChild(
        createNumberInput(index)
      );
    }

    return article;
  }

  function renderTickets() {
    ticketsList.innerHTML = "";

    for (let index = 0; index < ticketCount; index++) {
      ticketsList.appendChild(
        createTicket(index)
      );
    }
  }

  function updateSummary() {
    const total = selectedPrice * ticketCount;

    ticketCountElement.textContent = ticketCount;
    summaryTicketCount.textContent = ticketCount;

    totalValueElement.textContent =
      formatMoney(total);

    winningsElement.textContent =
      formatMoney(0);
  }

  function updatePage() {
    renderTickets();
    updateSummary();
  }

  function setActiveButton(buttons, activeButton) {
    buttons.forEach(function (button) {
      button.classList.toggle(
        "active",
        button === activeButton
      );
    });
  }

  dateButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedDate = button.dataset.quininhaDate;

      setActiveButton(
        dateButtons,
        button
      );
    });
  });

  dozenButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedDozens = Number(
        button.dataset.dozens
      );

      selectedPrice = Number(
        button.dataset.price
      );

      setActiveButton(
        dozenButtons,
        button
      );

      dozenButtons.forEach(function (item) {
        const oldCheck = item.querySelector(
          ".quininha-selected-check"
        );

        if (oldCheck) {
          oldCheck.remove();
        }
      });

      const check = document.createElement("span");

      check.className =
        "quininha-selected-check";

      check.innerHTML =
        '<span class="icon icon-check"></span>';

      button.appendChild(check);

      updatePage();
    });
  });

  ticketPlus.addEventListener("click", function () {
    ticketCount++;
    updatePage();
  });

  ticketMinus.addEventListener("click", function () {
    if (ticketCount <= 1) return;

    ticketCount--;
    updatePage();
  });

  clearAllButton.addEventListener("click", function () {
    ticketsList
      .querySelectorAll("input")
      .forEach(function (input) {
        input.value = "";
      });
  });

  toggleTicketsButton.addEventListener("click", function () {
    ticketsCard.classList.toggle("closed");
  });

  document
    .querySelectorAll('input[name="quininhaV2Random"]')
    .forEach(function (radio) {
      radio.addEventListener("change", function () {
        if (
          radio.value !== "yes" ||
          !radio.checked
        ) {
          return;
        }

        ticketsList
          .querySelectorAll(".quininha-ticket")
          .forEach(function (ticket) {
            const inputs = ticket.querySelectorAll(
              ".quininha-number-grid input"
            );

            const numbers = new Set();

            while (numbers.size < selectedDozens) {
              const number = Math.floor(
                Math.random() * 81
              );

              numbers.add(
                String(number).padStart(2, "0")
              );
            }

            Array.from(numbers).forEach(
              function (number, index) {
                inputs[index].value = number;
              }
            );
          });
      });
    });

  document
    .getElementById("quininhaV2Submit")
    .addEventListener("click", function () {
      const tickets = [];

      ticketsList
        .querySelectorAll(".quininha-ticket")
        .forEach(function (ticket) {
          const numbers = Array.from(
            ticket.querySelectorAll("input")
          )
            .map(function (input) {
              return input.value;
            })
            .filter(Boolean);

          tickets.push(numbers);
        });

      console.log({
        client:
          document.getElementById(
            "quininhaV2Client"
          ).value,

        date: selectedDate,
        dozens: selectedDozens,
        price: selectedPrice,
        ticketCount: ticketCount,
        tickets: tickets
      });
    });

  updatePage();
}
  
  

});

document.addEventListener("DOMContentLoaded", function () {
  const resultsPage = document.getElementById("animalResults");

  if (!resultsPage) return;

  const dateElement = document.getElementById("animalResultDate");
  const previousButton = resultsPage.querySelector("[data-result-prev]");
  const nextButton = resultsPage.querySelector("[data-result-next]");
  const drawCards = resultsPage.querySelectorAll("[data-draw]");

  const resultsByDate = [
    {
      date: "2026-06-24",
      label: "24 DE JUNHO",
      location: "RESULTADO DA EXTRAÇÃO DO RIO DE JANEIRO",
      draws: {
        ppt: [
          "1356-14",
          "7294-24",
          "4408-02",
          "9817-05",
          "2673-19",
          "5021-06",
          "8164-16"
        ],
        ptm: [
          "2231-08",
          "7415-04",
          "9028-07",
          "3362-16",
          "5914-04",
          "8706-02",
          "4119-05"
        ],
        pt: [
          "6541-11",
          "2018-05",
          "7723-06",
          "9845-12",
          "3157-15",
          "4392-23",
          "7068-17"
        ],
        ptv: [
          "9084-21",
          "1527-07",
          "6839-10",
          "2401-01",
          "7754-14",
          "3918-05",
          "6226-07"
        ],
        ptn: [
          "7143-11",
          "2860-15",
          "9532-08",
          "1176-19",
          "4284-21",
          "6049-13",
          "3397-25"
        ],
        cor: [
          "4381-21",
          "7602-01",
          "2944-11",
          "8015-04",
          "5377-20",
          "9653-14",
          "1248-12"
        ]
      }
    },
    {
      date: "2026-06-25",
      label: "25 DE JUNHO",
      location: "RESULTADO DA EXTRAÇÃO DO RIO DE JANEIRO",
      draws: {
        ppt: [
          "4291-23",
          "6208-02",
          "6381-21",
          "7897-25",
          "3341-11",
          "8118-05",
          "0638-10"
        ],
        ptm: [
          "3431-08",
          "2477-20",
          "3180-20",
          "9223-06",
          "4659-15",
          "2970-18",
          "0498-25"
        ],
        pt: [
          "6781-21",
          "3058-15",
          "6861-16",
          "1231-08",
          "6325-07",
          "4256-14",
          "0736-09"
        ],
        ptv: [
          "8363-16",
          "5746-12",
          "7083-21",
          "2999-25",
          "5106-02",
          "9297-25",
          "0053-14"
        ],
        ptn: [
          "8142-11",
          "2793-24",
          "4622-06",
          "4774-19",
          "5602-01",
          "5933-09",
          "0740-10"
        ],
        cor: [
          "3256-14",
          "2502-01",
          "5034-09",
          "8856-14",
          "9188-22",
          "8836-09",
          "0146-12"
        ]
      }
    },
    {
      date: "2026-06-26",
      label: "26 DE JUNHO",
      location: "RESULTADO DA EXTRAÇÃO DO RIO DE JANEIRO",
      draws: {
        ppt: [
          "5327-07",
          "9014-04",
          "6642-11",
          "2875-19",
          "4498-25",
          "7301-01",
          "1564-16"
        ],
        ptm: [
          "7728-07",
          "1345-12",
          "9063-16",
          "2582-21",
          "6174-19",
          "3407-02",
          "8891-23"
        ],
        pt: [
          "2216-04",
          "7348-12",
          "9651-13",
          "4182-21",
          "6505-02",
          "3177-20",
          "8294-24"
        ],
        ptv: [
          "9042-11",
          "2489-23",
          "7715-04",
          "6201-01",
          "3598-25",
          "4866-17",
          "1384-21"
        ],
        ptn: [
          "5552-13",
          "7813-04",
          "2906-02",
          "9348-12",
          "6171-18",
          "4425-07",
          "8039-10"
        ],
        cor: [
          "3154-14",
          "7801-01",
          "9643-11",
          "5067-17",
          "2298-25",
          "6812-03",
          "4176-19"
        ]
      }
    }
  ];

  let currentIndex = 1;

  function renderPrizeList(listElement, results) {
    listElement.innerHTML = "";

    results.forEach(function (result, index) {
      const item = document.createElement("li");

      const label = document.createElement("span");
      label.textContent = `${index + 1}º PRÊMIO`;

      const value = document.createElement("strong");
      value.textContent = result;

      item.appendChild(label);
      item.appendChild(value);
      listElement.appendChild(item);
    });
  }

  function renderResults() {
    const currentResult = resultsByDate[currentIndex];

    dateElement.textContent = currentResult.label;
    dateElement.dateTime = currentResult.date;

    const locationElement = resultsPage.querySelector(
      ".animal-result-location"
    );

    if (locationElement) {
      locationElement.textContent = currentResult.location;
    }

    drawCards.forEach(function (card) {
      const drawName = card.dataset.draw;
      const drawResults = currentResult.draws[drawName];
      const listElement = card.querySelector(".draw-result-list");

      if (!listElement || !drawResults) return;

      renderPrizeList(listElement, drawResults);
    });

    previousButton.disabled = currentIndex === 0;
    nextButton.disabled =
      currentIndex === resultsByDate.length - 1;
  }

  previousButton.addEventListener("click", function () {
    if (currentIndex === 0) return;

    currentIndex--;
    renderResults();
  });

  nextButton.addEventListener("click", function () {
    if (currentIndex === resultsByDate.length - 1) return;

    currentIndex++;
    renderResults();
  });

  renderResults();
});





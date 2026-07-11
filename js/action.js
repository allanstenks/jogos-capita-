document.addEventListener("DOMContentLoaded", function () {

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


  /* Valores */

  document.querySelectorAll(".deposit-form-card").forEach(
    function (card) {

      const amountInput = card.querySelector(
        ".deposit-amount-display"
      );

      const buttons = card.querySelectorAll(
        ".amount-options button"
      );

      if (!amountInput || !buttons.length) return;

      buttons.forEach(function (button) {

        button.addEventListener("click", function (event) {
          event.preventDefault();

          buttons.forEach(function (otherButton) {
            otherButton.classList.remove("active");
          });

          button.classList.add("active");

          amountInput.value =
            button.textContent.trim() + ",00";
        });

      });

    }
  );

});
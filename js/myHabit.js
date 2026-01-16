document.addEventListener("DOMContentLoaded", () => {
  const addHabitBtn = document.getElementById("addHabitBtn");
  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const modalBg = document.getElementById("modalBg");
  const inProgress = document.querySelector(".InProgress");
  const countText = document.querySelector(".nowamount h2");
  const emptyMsg = document.querySelector(".empty-msg");

  /* =====================
     localStorage 유틸
  ===================== */
  function getHabits() {
    return JSON.parse(localStorage.getItem("habits")) || [];
  }

  function saveHabits(habits) {
    localStorage.setItem("habits", JSON.stringify(habits));
  }

  /* =====================
     UI 관련
  ===================== */
  function updateCount() {
    const count = document.querySelectorAll(".habit-card").length;
    countText.textContent = `현재 챌린지 ${count}개 진행중...`;
  }

  function toggleEmptyMsg() {
    const count = document.querySelectorAll(".habit-card").length;
    emptyMsg.style.display = count === 0 ? "block" : "none";
  }

  /* =====================
     습관 카드 생성
  ===================== */
  function createHabitCard(habit) {
    const card = document.createElement("div");
    card.className = "habit-card";
    card.dataset.id = habit.id;

    card.innerHTML = `
      <h3>${habit.name}</h3>
      <p class="category">${habit.category}</p>
      <p class="count">${habit.currentDay} / ${habit.totalDays}일</p>

      <div class="progressBar">
        <div class="progressFill"></div>
      </div>

      <button class="todayBtn ${habit.isTodayDone ? "done" : ""}">
        ${habit.isTodayDone ? "오늘 완료됨" : "오늘 완료"}
      </button>
      <button class="deleteBtn">삭제</button>
    `;

    const countEl = card.querySelector(".count");
    const fillEl = card.querySelector(".progressFill");
    const todayBtn = card.querySelector(".todayBtn");

    function updateUI() {
      countEl.textContent = `${habit.currentDay} / ${habit.totalDays}일`;
      fillEl.style.width = `${(habit.currentDay / habit.totalDays) * 100}%`;
    }

    updateUI();

    // 오늘 완료 버튼
    todayBtn.addEventListener("click", () => {
      habit.isTodayDone = !habit.isTodayDone;
      habit.currentDay += habit.isTodayDone ? 1 : -1;

      todayBtn.textContent = habit.isTodayDone ? "오늘 완료됨" : "오늘 완료";
      todayBtn.classList.toggle("done");

      updateUI();
      saveHabits(getHabits().map(h => h.id === habit.id ? habit : h));
    });

    // 삭제 버튼
    card.querySelector(".deleteBtn").addEventListener("click", () => {
      const habits = getHabits().filter(h => h.id !== habit.id);
      saveHabits(habits);
      card.remove();
      updateCount();
      toggleEmptyMsg();
    });

    return card;
  }

  /* =====================
     습관 추가
  ===================== */
  function addHabit() {
    const name = document.getElementById("habitName").value.trim();
    const category = document.getElementById("habitCategory").value.trim();
    const totalDays = Number(document.getElementById("habitPeriod").value);

    if (!name || !category || !totalDays) {
      alert("모든 항목을 입력해줘!");
      return;
    }

    const newHabit = {
      id: Date.now(),
      name,
      category,
      totalDays,
      currentDay: 0,
      isTodayDone: false,
    };

    const habits = getHabits();
    habits.push(newHabit);
    saveHabits(habits);

    inProgress.appendChild(createHabitCard(newHabit));
    updateCount();
    toggleEmptyMsg();

    modalBg.style.display = "none";
  }

  /* =====================
     초기 로드
  ===================== */
  function loadHabits() {
    const habits = getHabits();
    habits.forEach(habit => {
      inProgress.appendChild(createHabitCard(habit));
    });
    updateCount();
    toggleEmptyMsg();
  }

  /* =====================
     이벤트
  ===================== */
  addHabitBtn.addEventListener("click", () => {
    modalBg.style.display = "flex";
  });

  confirmBtn.addEventListener("click", addHabit);

  cancelBtn.addEventListener("click", () => {
    modalBg.style.display = "none";
  });

  /* =====================
     오늘 날짜
  ===================== */
  const today = new Date();
  document.getElementById("todayDate").textContent = today.toLocaleDateString(
    "ko-KR",
    { year: "numeric", month: "long", day: "numeric", weekday: "short" }
  );

  loadHabits();
});

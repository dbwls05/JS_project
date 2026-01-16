document.addEventListener("DOMContentLoaded", () => {
  const addHabitBtn = document.getElementById("addHabitBtn");
  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const modalBg = document.getElementById("modalBg");
  const inProgress = document.querySelector(".InProgress");
  const countText = document.querySelector(".nowamount h2");

  // 모달 열기
  addHabitBtn.addEventListener("click", () => {
    modalBg.style.display = "flex";
  });

  // 개수 업데이트
  function updateCount() {
    const count = document.querySelectorAll(".habit-card").length;
    countText.textContent = `현재 챌린지 ${count}개 진행중...`;
  }

  // 빈 상태 메시지
  const emptyMsg = document.querySelector(".empty-msg");

  function toggleEmptyMsg() {
    const count = document.querySelectorAll(".habit-card").length;
    countText.textContent = `현재 챌린지 ${count}개 진행중...`;

    if (count === 0) {
      emptyMsg.style.display = "block";
    } else {
      emptyMsg.style.display = "none";
    }
  }

  // 습관 추가
  function addHabit() {
    const name = document.getElementById("habitName").value.trim();
    const category = document.getElementById("habitCategory").value.trim();
    const totalDays = Number(document.getElementById("habitPeriod").value);

    if (!name || !category || !totalDays) {
      alert("모든 항목을 입력해줘!");
      return;
    }

    let currentDay = 0;
    let isTodayDone = false;

    const habit = document.createElement("div");
    habit.className = "habit-card";


    habit.innerHTML = `
      <h3>${name}</h3>
      <p class="category">${category}</p>
      <p class="count">${currentDay} / ${totalDays}일</p>

      <div class="progressBar">
        <div class="progressFill"></div>
      </div>

      <button class="todayBtn">오늘 완료</button>
      <button class="deleteBtn">삭제</button>
    `;

    const countEl = habit.querySelector(".count");
    const fillEl = habit.querySelector(".progressFill");
    const todayBtn = habit.querySelector(".todayBtn");

    function updateUI() {
      countEl.textContent = `${currentDay} / ${totalDays}일`;
      fillEl.style.width = `${(currentDay / totalDays) * 100}%`;
    }

    todayBtn.addEventListener("click", () => {
      if (!isTodayDone) {
        currentDay++;
        isTodayDone = true;
        todayBtn.textContent = "오늘 완료됨";
        todayBtn.classList.add("done");
      } else {
        currentDay--;
        isTodayDone = false;
        todayBtn.textContent = "오늘 완료";
        todayBtn.classList.remove("done");
      }
      updateUI();
    });

    habit.querySelector(".deleteBtn").addEventListener("click", () => {
      habit.remove();
      updateCount();
      toggleEmptyMsg();
    });

    inProgress.appendChild(habit);
    toggleEmptyMsg();
    updateCount();

    modalBg.style.display = "none";
  }

  confirmBtn.addEventListener("click", addHabit);

  cancelBtn.addEventListener("click", () => {
    modalBg.style.display = "none";
  });

  // 오늘 날짜 표시
  const today = new Date();
  document.getElementById("todayDate").textContent = today.toLocaleDateString(
    "ko-KR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    }
  );
});

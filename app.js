// ===============================
// Azure Function App Base URL
// ===============================
const FUNCTION_BASE =
  "https://face-function-app2025-geh2h9cybcbdbfbx.azurewebsites.net";

// ===============================
// 출석 요약 조회 함수
// ===============================
async function loadAttendanceSummary(date) {
  if (!date) {
    throw new Error("날짜를 선택하세요.");
  }

  const url = `${FUNCTION_BASE}/api/attendance/summary?date=${date}`;

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API 호출 실패: ${res.status}\n${text}`);
  }

  return await res.json();
}

// ===============================
// 버튼 클릭 시 실행
// ===============================
async function onClickLoadAttendance() {
  const dateInput = document.getElementById("dateInput").value;
  const resultEl = document.getElementById("result");

  resultEl.innerText = "조회 중...";

  try {
    const data = await loadAttendanceSummary(dateInput);
    resultEl.innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    console.error(err);
    resultEl.innerText = "에러 발생:\n" + err.message;
  }
}

// ===============================
// 오늘 날짜 자동 세팅 (페이지 로드시)
// ===============================
window.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().slice(0, 10);
  const dateInput = document.getElementById("dateInput");
  if (dateInput) {
    dateInput.value = today;
  }
});

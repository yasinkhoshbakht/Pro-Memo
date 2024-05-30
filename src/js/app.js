let memoContainer = document.querySelector(".memoContainer");
let memoForm = document.querySelector(".memoForm");
let memos = JSON.parse(localStorage.getItem("memos")) || [];
function toggleMemoContainerVisibility() {
  if (memos.length > 0) {
    memoContainer.classList.remove("hidden");
    memoContainer.classList.add("flex");
  } else {
    memoContainer.classList.add("hidden");
    memoContainer.classList.remove("flex");
  }
}
toggleMemoContainerVisibility();
memoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let newMemo = {
    title: e.target.memoTitle.value,
    content: e.target.memoContent.value,
    isItImportant: false,
    id: makeId(),
  };
  e.target.memoTitle.value = "";
  e.target.memoContent.value = "";
  memos.push(newMemo);
  localStorage.setItem("memos", JSON.stringify(memos));
  toggleMemoContainerVisibility();
  showMemosInUI();
});
memoContainer.addEventListener("click", (e) => {
  let id = e.target.getAttribute("data-id");
  if (e.target.classList.contains("deleteBtn")) {
    memos = memos.filter((memo) => memo.id !== id);
    localStorage.setItem("memos", JSON.stringify(memos));
    toggleMemoContainerVisibility();
    showMemosInUI();
  } else if (e.target.classList.contains("checkBtn")) {
    memos.forEach((memo) => {
      if (memo.id === id) {
        memo.isItImportant = !memo.isItImportant;
      }
    });
    memos.sort((a, b) => b.isItImportant - a.isItImportant);
    localStorage.setItem("memos", JSON.stringify(memos));
    showMemosInUI();
  }
});
function showMemosInUI() {
  memoContainer.innerHTML = "";
  memos.forEach((memo) => {
    let memoBox = document.createElement("div");
    memoBox.classList.add(
      "memoBox",
      "p-3",
      "w-96",
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "gap-10",
      "border-4",
      "border-themePurple-200",
      "rounded-2xl"
    );
    memoBox.innerHTML = `
        <div class="head flex w-full gap-12">
          <div class="w-48 h-48 flex p-8 items-center border-4 border-lightBlue-200 rounded-2xl">
            <h3 class="memoTitle text-4xl font-black text-blue-200 mr-12">${memo.title}</h3>
          </div>
          <div class="btnBox w-28 flex justify-end items-center gap-8">
            <i class="fa-solid fa-trash bg-red-500 w-8 h-8 text-center pt-2 text-white rounded-xl hover:bg-white hover:text-red-500 transition-all duration-200 deleteBtn" data-id="${memo.id}"></i>
            <i class="fa-solid fa-star bg-yellow-300 w-8 h-8 text-center pt-2 text-white rounded-xl hover:bg-white hover:text-yellow-300 transition-all duration-200 checkBtn" data-id="${memo.id}"></i>
          </div>
        </div>
        <div class="memoText text-center w-full text-2xl font-bold">
          ${memo.content}
        </div>
      `;
    memoContainer.appendChild(memoBox);
  });
}
function makeId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
showMemosInUI();

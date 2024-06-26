class MemoApp {
  constructor() {
    this.memoContainer = document.querySelector(".memoContainer");
    this.memoForm = document.querySelector(".memoForm");
    this.memos = JSON.parse(localStorage.getItem("memos")) || [];
    this.bindEvents();
    this.showMemosInUI();
  }

  bindEvents() {
    this.memoForm.addEventListener("submit", (e) => this.addMemo(e));
    this.memoContainer.addEventListener("click", (e) =>
      this.handleMemoClick(e)
    );
  }

  addMemo(e) {
    e.preventDefault();
    let newMemo = {
      title: e.target.memoTitle.value,
      content: e.target.memoContent.value,
      isItImportant: false,
      id: this.makeId(),
      timestamp: Date.now(),
    };
    e.target.memoTitle.value = "";
    e.target.memoContent.value = "";
    this.memos.push(newMemo);
    localStorage.setItem("memos", JSON.stringify(this.memos));
    this.showMemosInUI();
  }

  handleMemoClick(e) {
    let id = e.target.getAttribute("data-id");
    if (e.target.classList.contains("deleteBtn")) {
      this.memos = this.memos.filter((memo) => memo.id !== id);
      localStorage.setItem("memos", JSON.stringify(this.memos));
      this.showMemosInUI();
    } else if (e.target.classList.contains("checkBtn")) {
      this.memos.forEach((memo) => {
        if (memo.id === id) {
          memo.isItImportant = !memo.isItImportant;
        }
      });
      this.memos.sort((a, b) => b.isItImportant - a.isItImportant);
      localStorage.setItem("memos", JSON.stringify(this.memos));
      this.showMemosInUI();
    }
  }

  showMemosInUI() {
    this.memoContainer.innerHTML = "";
    this.memos.forEach((memo) => {
      let memoDate = new Date(memo.timestamp);
      let formattedDate = `${memoDate.getDate()} / ${memoDate.getMonth()} / ${memoDate.getFullYear()}`;
      let formattedTime = `${memoDate.getHours()} : ${memoDate.getMinutes()}`;
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
        "border-green-300",
        "rounded-2xl",
        "my-6"
      );
      memoBox.innerHTML = `
        <div class="head flex w-full gap-12">
          <div class="w-80 h-36 flex items-center border-4 border-lightBlue-200 rounded-2xl">
            <h3 class="memoTitle w-full text-3xl font-bold text-blue-200 text-center">${memo.title}</h3>
          </div>
          <div class="Box w-28 flex justify-center items-center gap-4 flex-col">
            <div class="btns flex justify-center items-center gap-8">
              <i class="fa-solid fa-trash bg-red-500 w-8 h-8 text-center pt-2 text-white rounded-xl hover:bg-white hover:text-red-500 transition-all duration-200 deleteBtn" data-id="${memo.id}"></i>
              <i class="fa-solid fa-star bg-yellow-300 w-8 h-8 text-center pt-2 text-white rounded-xl hover:bg-white hover:text-yellow-300 transition-all duration-200 checkBtn" data-id="${memo.id}"></i>
            </div>
            <div class="dateOfCreate text-orange-300 flex flex-col text-center">
              <span class="date">${formattedDate}</span>
              <span class="time">${formattedTime}</span>
            </div>
          </div>
        </div>
        <div class="memoText text-center w-full text-2xl font-medium text-green-500">
          ${memo.content}
        </div>
      `;
      this.memoContainer.appendChild(memoBox);
    });
  }

  makeId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
new MemoApp();

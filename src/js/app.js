let memoContainer = document.querySelector(".memoContainer");
let memoForm = document.querySelector(".memoForm");
let memos = [];
memoForm.addEventListener("submit", (e) => {
  let newMemo = {
    title: e.target.memoTitle.value,
    content: e.target.memoContent.value,
    id: Math.random(),
  };
  e.target.memoTitle.value = "";
  e.target.memoContent.value = "";
  memos.push(newMemo);
  showMemosInUI(memos);
  e.preventDefault();
});
function showMemosInUI(memosList) {
  memoContainer.innerHTML = "";
  memosList.forEach((item) => {
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
    let head = document.createElement("div");
    head.classList.add("head", "flex", "w-full", "gap-12");
    memoBox.setAttribute("id", `${item.id}`);
    let btnBox = document.createElement("div");
    let headTitle = document.createElement("div");
    headTitle.classList.add(
      "w-48",
      "h-48",
      "flex",
      "p-8",
      "items-center",
      "border-4",
      "border-lightBlue-200",
      "rounded-2xl"
    );
    btnBox.classList.add(
      "btnBox",
      "w-28",
      "flex",
      "justify-end",
      "items-center",
      "gap-8"
    );
    let deleteBtn = document.createElement("i");
    deleteBtn.classList.add(
      "fa-solid",
      "fa-trash",
      "bg-red-500",
      "w-8",
      "h-8",
      "flex",
      "pt-2",
      "text-white",
      "rounded-xl",
      "hover:bg-white",
      "hover:text-red-500",
      "transition-all",
      "duration-200"
    );
    let checkBtn = document.createElement("i");
    checkBtn.classList.add(
      "fa-solid",
      "fa-check",
      "bg-green-500",
      "w-8",
      "h-8",
      "flex",
      "pt-2",
      "text-white",
      "rounded-xl",
      "hover:bg-white",
      "hover:text-green-500",
      "transition-all",
      "duration-200"
    );
    let memoText = document.createElement("div");
    memoText.classList.add(
      "memoText",
      "text-center",
      "w-full",
      "text-transparent",
      "bg-clip-text",
      "bg-gradient-to-r",
      "from-text",
      "to-themePurple-300",
      "text-2xl",
      "font-medium",
      "max-h-96"
    );
    memoText.innerHTML = `${item.content}`;
    headTitle.innerHTML = `<h3 class="memoTitle text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lightBlue-300 to-themePurple-300 mr-12">${item.title}</h3>`;
    head.appendChild(headTitle);
    head.appendChild(btnBox);
    btnBox.appendChild(deleteBtn);
    btnBox.appendChild(checkBtn);
    memoBox.appendChild(head);
    memoBox.appendChild(memoText);
    memoContainer.appendChild(memoBox);
  });
}

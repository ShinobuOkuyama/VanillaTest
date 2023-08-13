import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputTextObj = document.getElementById("add-text");
  addImconpleteList(inputTextObj.value);
  inputTextObj.value = "";
};

// 未完了リストへの追加
const addImconpleteList = (val) => {
  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // liタグ生成
  const li = document.createElement("li");
  li.innerText = val;

  // 完了ボタンのイベントハンドラ
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグの要素削除
    deleteFromImcompleteList(completeButton.parentNode);

    // 完了/削除ボタンを削除し、戻すボタンを追加
    const addTarget = completeButton.parentNode;
    const text = addTarget.firstElementChild.innerText;
    addTarget.textContent = null;
    // console.log(addTarget);

    // liタグ追加
    const li = document.createElement("li");
    li.innerText = text;

    // 戻すボタンを追加
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      const backTarget = backButton.parentNode;
      deleteFromImcompleteList(backTarget, true);

      const text = backTarget.firstElementChild.innerText;
      addImconpleteList(text);
    });

    addTarget.appendChild(li);
    addTarget.appendChild(backButton);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // 削除ボタンのイベントハンドラ
  const delButton = document.createElement("button");
  delButton.innerText = "削除";
  delButton.addEventListener("click", () =>
    deleteFromImcompleteList(delButton.parentNode)
  );

  // divタグの子要素に各要素を設定
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(delButton);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(div);
};

// 未完了リストから指定の要素を削除
const deleteFromImcompleteList = (target, flgComp = false) => {
  if (flgComp) {
    document.getElementById("complete-list").removeChild(target);
  } else {
    document.getElementById("incomplete-list").removeChild(target);
  }
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());

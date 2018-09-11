const app = new Vue({
  el: "#app",
  data: {
    itemList: [
      { text: "あいうえお", rest: false },
      { text: "abcedfghi", rest: false },
      { text: "かきくけこ", rest: false }
    ],
    newItem: "",
    resultList: [],
    n: 1
  },
  methods: {
    itemStyle(index) {
      let style = this.itemList[index].rest ? "line-through" : "";
      return { textDecoration: style };
    },
    addItem() {
      // 入力されていなければ、登録処理をしないで終了
      if (this.newItem === "") return;

      // 一旦、リストをnewListにコピーしておく
      let newList = this.itemList;

      // newListに、入力された新しいitemを追加
      newList.push({ text: this.newItem, rest: false });
      // 元のitemListに改めてセットしなおす
      this.itemList = newList;

      let el = document.getElementById("new-item");
      el.focus();
      this.newItem = "";
    },
    deleteItem(index) {
      this.itemList.splice(index, 1);
    },
    toggleItem(index) {
      this.itemList[index].rest = !this.itemList[index].rest;
    },
    // n個のitemをランダムに選択する
    choiceItem() {
      let results = [];
      let count = 0;
      for (let i = 0; i < this.n; i++) {
        // 選択する数だけ繰り返す
        results.push(-1);
      }

      while (count < this.n) {
        let num = Math.floor(Math.random() * this.itemList.length);

        // お休み状態だったら、乱数を改めて決める
        if (this.itemList[num].rest) continue;

        // すでに選択されたものとかぶっていないかチェック
        if (this.checkDuplicate(results, num) === false) continue;

        results[count] = num;
        count++;
      }

      this.resultList = [];
      for (let i = 0; i < results.length; i++) {
        this.resultList.push(this.itemList[results[i]].text);
      }
    },
    // すでに選択済みのitemでないかどうかチェック
    checkDuplicate(results, newNum) {
      for (let i = 0; i < this.n; i++) {
        if (results[i] === newNum) return false;
      }

      return true;
    }
  }
});

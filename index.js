const app = new Vue({
  el: "#app",
  data: {
    itemList: [],
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
    validate() {
      // 自然数以外の入力を除外
      let reg = /^[0-9]+$/;
      if (this.n.toString().match(reg) === null) return false;
      // 0を除外
      if (this.n == 0) return false;
      // 候補数を超える自然数を除外
      if (this.n > this.itemList.length) return false;

      // 入力値の検証OK
      return true;
    },
    // n個のitemをランダムに選択する
    choiceItem() {
      // nの値が「有効な（お休みでない）候補の数」以下の整数だけ許す
      if (!this.validate()) {
        alert("ルーレットで選ぶ数が不正です");
        return;
      }

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

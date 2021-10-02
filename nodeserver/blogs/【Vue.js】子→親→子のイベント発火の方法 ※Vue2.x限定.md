<!-- 2021-09-13 06:03:44 -->
<!-- プログラミング -->
<!-- Vue.js, JavaScript -->
![thumnail](img/pc/vuejs.jpg)
***

ある子コンポーネントから別の子コンポーネントのイベントを発火したいことがあった。

Vue.jsは私自身使ってて楽しいので大好きなのですが、開発がある程度進んでくると、必ずやや遠目にあるコンポーネント感とのデータ送受で唸ってしまうことがあると思います。

楽な方法が無いかと調べていたところ「おっ！」と思う簡単な方法が見つかりましたので備忘録も兼ねて記載します。

>2020年9月にリリースされたVue.js v3.0.0 にて $on, $off が削除されたため、 event bus は Vue 単体では使えなくなりました。詳細は下記。
https://v3.vuejs.org/guide/migration/events-api.html#overview
その為、この記事の内容はVue2.xで使えます。
制作物がある程度の規模になるようであればVuexを使うのが良さそうです。

# eventHubを作成してイベント送受を楽に
EventHub.jsを作成
```js
const eventHub = {
  install: function(Vue) {
    Vue.prototype.$eventHub = new Vue();
  },
};
export default eventHub;
```
main.jsで読み込み
```js
import EventHub from "./EventHub.js";
Vue.use(EventHub);
```
これで準備OK。

# コンポーネントで使ってみる
### eventをトリガーする側
```js
this.$eventHub.$emit('event-name',[引数]) 
```
ちなみにtemplate内で使用の場合`this`は不要
```js
@click="$eventHub.$emit('event-name')" 
```
### トリガーを受け取る側
メソッドを実行したいコンポーネントで`$on`を使用。
記述場所は`mounted`などで良さげ。
起動したいメソッド名を第２引数に渡します。
```js
this.$eventHub.$on("event-name", this.event);
```
これで、あるコンポーネントからemitされたら、そのイベント名でonが記述してあるコンポーネントの指定メソッドが発動する。

# まとめ
親子関係の縛りが無くなり非常に快適。
ただしグローバル登録になるので名前の衝突には注意。
小規模な開発ならこれで十分だと感じ。

前述している通りVue2.xでは使えます。非推奨ですが。

まぁ、私のような個人開発でチョロっとしたものを作る程度なら、このような**非親子感でのイベントの送受**状況が発生しても数えられる程度だと思いますので、十分かと思います。
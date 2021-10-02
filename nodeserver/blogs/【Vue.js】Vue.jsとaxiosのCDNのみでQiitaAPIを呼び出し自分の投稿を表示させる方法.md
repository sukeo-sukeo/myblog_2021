<!-- 2021-08-16 06:09:08 -->
<!-- プログラミング -->
<!-- Vue.js, JavaScript -->
![thumnail](img/pc/vuejs.jpg)
***

自分が処理を記述するときに「CDNのみで」という明示的な記事がなかった為、備忘録も兼ねて記事にしました。
CDNだけで簡単にQiitaから記事を取得できます。
# CDNの読み込み
vue.jsとaxiosを使えるようにHTMLファイル内に下記２つのurlを貼り付けます。

```html
<script src="https://unpkg.com/vue@2.5.17"></script><!-- 2020.8月時点のversion -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

# 結果を受けとる場所を作成する
data:に取得したデータを格納する場所を記述します。

```js
data: function() {
    return {
    	infoAll: {}
    }
}
```

# axiosでqiitaAPIに接続する
methods:に処理を記述していきます。 

```js
methods: {
    getAPIs: function() {
      axios
      .get(`https://qiita.com/api/v2/users/[ユーザー名]/items`)
        //[ユーザー名]はQiitaマイページの@で始まる名前です
        //私の場合sukeo-sukeoと記述します
      .then(res => {
        //thenの中に取得に成功したときの処理を記述していきます
        this.infoAll = res.data
        //resにすべてのデータが入りますが、今回必要なデータはresの中のdataに格納されていますのでres.dataとします
        console.log(this.infoAll)
        // log >>> (5) [{…}, {…}, {…}, {…}, {…}, __ob__: Observer]
      })
	}
 }
```
これでさきほど作成したinfoAll内にタイトルや記事本文、更新日時、記事へのURLなどのデータが格納されますので、例えば**this.infoAll[0].title**としてやると一番最近に書いた記事のタイトルが取得できます。

また、Qiitaのアクセストークンがあると１時間に取得できる記事数が拡張されるっぽいです。

ただ、アクセストークンがなくても動きましたのでとりあえず試したい方はアクセストークン無しでもOKだと思います。

ちなみに、アクセストークンがある場合はどこに記述するかと言うと...

```js
axios
.get(`https://qiita.com/api/v2/users/[ユーザー名]/items`, {
	headers: {Authorization: `Bearer ${this.qiitatoken}`}
						//テンプレートリテラルを使用しています
      })
```
axios.get(url)の後ろにオブジェクト形式で記述を追加します。
これでアクセストークンが反映されます。
アクセストークンありの場合はdataに **qiitatoken: トークン番号** を記述して下さい。

# methodsを実行する
データの取得のみですのでcreated:で上記の処理を呼び出します。

```js
created: function() {
    this.getAPIs()
  }
```

# v-forで取得したデータを表示する
HTMLファイル側に記述をします。
updated_atに更新日、urlにその記事へのurl、titleにその記事のタイトルが入っていますので、それをv-forで記事数分表示させます。

```html
<ul>
    <li v-for="item in infoAll" :key="item.id">
        {{ item.updated_at }}<br>
        <a :href="item.url" target="_blank">
        {{ item.title }}
        </a>
    </li>
</ul>
```

# まとめ
コードの全体図です。
アクセストークンがある場合は記述を追加してください。

```js
data: function() {
    return {
        qittatoken: 'トークン番号' //アクセストークンがある場合は記述 
    	infoAll: {}
    }
},
methods: {
    getAPIs: function() {
      axios.get(`https://qiita.com/api/v2/users/[ユーザー名]/items`) 
      //アクセストークンがある場合はget()内に記述を追加してください
      .then(res => {
        this.infoAll = res.data
        console.log(this.infoAll)
      })
	}
 },
created: function() {
    this.getAPIs()
  }  
```
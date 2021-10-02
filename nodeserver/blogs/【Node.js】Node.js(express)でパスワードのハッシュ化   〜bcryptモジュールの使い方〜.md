<!-- 2021-08-15 07:17:35 -->
<!-- プログラミング -->
<!-- Node.js, npm -->
![thumnail](img/pc/nodejs.png)
***

# bcryptとは
**password**を**2b$10$7f9myKwdo9BDUOkybKpQoOSMeEX90aRRFfOdj.c3dG6RIjZxZ/a4m**みたいな感じにぐっちゃぐちゃにしてくれるnpmモジュール


# 使い方
まずはrequireで読み込み

```js
const bcrypt = require('bcrypt')
```
ハッシュ化

```js
const hashed = bcrypt.hash(req.body.password, 10)
//bcrypt.hash(ハッシュ化したいpassword, ストレッチング回数)
//ストレッチング回数 =ハッシュ化の回数で、2のn乗のnのことで4~31を指定できる
```
照合

```js
const compared = bcrypt.compare(req.body.password, docs.password)
//bcrypt.compare(ハッシュ化前のpassword, ハッシュ化後のpassword)
```

# ポイント
- bcrypt.hashは時間がかかる為、非同期処理としてコントロールする必要。`async` `await`をつける  
- hash後にhash化したパスワードをデータベース等に保存する処理を書くことが多いと思いますが、その場合`async` `await`をつけないとハッシュ化が終わる前に次の保存処理を実行してしまう為、passwordがみつかりませんよ！みたいなエラーが出る。
- bcryptには`hashSync`というメソッドも用意されており、これを使っても`async` `await`同様の同期的な動きをとる。が、どこかで非推奨？と見た事があります。


# 使用例
現在勉強のため制作しているTodoアプリでexpress, mongooseを使っていますので、そこで使ったユーザー登録とログイン処理での使用例を記載致します。


### 新規ユーザー登録
クライアントからのフォーム送信で受けた新規ユーザーのpasswordを、ハッシュ化しデータベースに登録


```js
router.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  
  console.log(hashedPassword);
//hashedPasswordにpromiseが返ってくるためawaitで処理の完了を待つ
//試しにawaitを外すとPromise{pending}がlogされる
//pendingは「わたし待ってます」状態
  
  const userData = new User({
    username: req.body.username,
    password: hashedPassword
//ここでhashedPasswordのpromiseが解決している必要がある
//そのためbcrypt.hashにawaitをつけて10回hashされるのを待ってから次の処理に進むように制御する
  })
 
// --- 以下DB登録処理 --- 
    User.find({ username: userData.username }, (err, docs) => {
    if (docs.length) {
      res.send({
        msg: 'そのユーザー名は使えません'
      })
      return
    } else {
      User.insertMany(userData)
      .then(() => res.send({
        msg: '登録が完了しました！ログインしてください'
      }))
    }
  })
})
```

### ログインユーザーの照合
クライアントからのフォーム送信で受けたユーザーネームとpasswordをデータベースと照合し、合致するデータを取り出す

```js
router.post('/login', (req, res) => {
// ユーザー名でデータベース検索する処理のサンプル
 
 User.find({
    username: req.body.username,
  }, async (err, docs) => {

    if (!docs.length) {
      res.send({
        msg: 'ユーザー名 か パスワード が間違っています',
        isLogin: false
      })
      return
    }
      
// ここからハッシュ前のpasswordとDB内のハッシュ済のpasswordとの照合
      
    const compared = await bcrypt.compare(req.body.password, docs[0].password)
// bcrypt.compare(ユーザーが入力したpassword, DBから引っ張ってきたハッシュ化済のpassword)
// bcrypt.compareもPromiseが返してくるのでasync,awaitで制御を加える
// 照合が終わったら次の処理へ進むようになる
    
    console.log(compared)
// passwordがあってればtrue まちがっていればfalse


    if (!hassed) {
      res.send({
        msg: 'ユーザー名 か パスワード が間違っています',
        isLogin: false
      })
      return
    } else {
      res.send({
        msg: 'ログインできました',
        isLogin: true,
        username: req.body.username
      })
    }
  })
})

```
以上です。


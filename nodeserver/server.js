const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs").promises;
const Twitter = require("twitter-v2");
const fetch = require("node-fetch");
const { Client } = require("node-scp");
const wget = require("node-wget-promise");
const sharp = require("sharp");

require("dotenv").config();

const port = process.env.port || process.env.PORT || 3030;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let filePath = String;
let apiPath = String;

// 環境変数のUSER名でローカル(テスト)かサーバー(本番)か判別
const USER = process.env.USER;
if (USER === "root") {
  // product
  filePath = `/usr/share/nginx/blogs`;
  // apiPath = "/node/";
} else {
  // local
  filePath = `${__dirname}/blogs/`;
  // apiPath = "/node/";
}

// ブログデータを取得
app.get("/node/", async (req, res) => {
  // console.log(USER);
  const fileNames = await getFileNames(filePath);
  const fileInfos = await getFileInfos(fileNames, filePath);
  const contents = await getContents(fileNames, filePath);
  const blogData = await createFileData(fileNames, fileInfos, contents);

  // 作成時間順に並び替え
  sortBlog(blogData);

  res.json(blogData);
});

// githubからレポジトリ情報を取得
app.get("/node/product", async (req, res) => {
  const GITHUB_API_URL = "https://api.github.com";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const USERNAME = "sukeo-sukeo";

  const results = await fetch(`${GITHUB_API_URL}/users/${USERNAME}/repos`, {
    headers: {
      authorization: `token ${GITHUB_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  
  let dataList = [];
  for (let result of results) {
    // パブリックリポジトリのみ
    // 右端の説明欄にURLが記載されているリポジトリのみ
    if (!result.private && result.homepage) {
      const data = {};
      data.name = result.name;
      data.url = result.html_url;
      data.siteUrl = result.homepage;
      data.description = result.description;
      data.updatedAt = result.updated_at;
      data.watchers = result.watchers;
      data.watchers_c = result.watchers_count;
      dataList.push(data);
    }
  }

  dataList.sort((a, b) => {
    if (a.updatedAt > b.updatedAt) {
      return -1;
    } else {
      return 1;
    }
  });

  res.json(dataList);
});

// twitterから情報を取得
app.get("/node/profile", async (req, res) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_APIKEY,
    consumer_secret: process.env.TWITTER_SECRET_KEY,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });
  const userId = process.env.TWITTER_USERID;
  const params = {
    "user.fields": "description,profile_image_url",
  };

  const { data } = await client.get(`users/${userId}`, params);
  const imgSize = "_200x200";
  data.profile_image_url = data.profile_image_url.replace("_normal", imgSize);
  res.json({ twitterProfile: data });
});

// google apps script からのブログ投稿を受け取り成形し公開する
app.post(apiPath, async (req, res) => {
  let title = req.body.title;
  let content = req.body.content;

  const [thumnailId, thumnailURL] = getThumnailId(content);
  const [imgIds, imgUrls] = getImgIds(content);

  let blogPath_from = String;
  let blogPath_to = String;
  let thumnailPath_from = String;
  let thumnailPath_to = String;
  let thumnailPath = String;
  let imgPaths_from = Array;
  let imgPaths_to = Array;
  let imgPaths = Array;

  if (USER === "root") {
    // public
    blogPath_from = `${filePath}/${title}.md`;
    blogPath_to = `/Users/yusuke/Desktop/mddir/${title}.md`;
    thumnailPath_from = `${filePath}/img/gas/${thumnailId}.png`;
    thumnailPath_to = `/Users/yusuke/Desktop/mddir/img/gas/${thumnailId}.png`;
    thumnailPath = `img/gas/${thumnailId}.png`;
    imgPaths_from = imgIds.map(
      (imgId) => `${filePath}/img/gas/content/${imgId}.png`
    );
    imgPaths_to = imgIds.map(
      (imgId) => `/Users/yusuke/Desktop/mddir/img/gas/content/${imgId}.png`
    );
    imgPaths = imgIds.map((imgId) => `img/gas/content/${imgId}.png`);
  } else {
    // local
    // blogs/test をサーバー blogs/ をローカルに見立ててscpする
    blogPath_from = `${__dirname}/blogs/test/${title}.md`;
    blogPath_to = `${__dirname}/blogs/${title}.md`;
    thumnailPath_from = `${__dirname}/blogs/img/imgtest/${thumnailId}.png`;
    thumnailPath_to = `${__dirname}/blogs/img/${thumnailId}.png`;
    thumnailPath = `img/${thumnailId}.png`;
    imgPaths_from = imgIds.map(
      (imgId) => `${__dirname}/blogs/img/imgtest/${imgId}.png`
    );
    imgPaths_to = imgIds.map(
      (imgId) => `${__dirname}/blogs/img/gasContent/${imgId}.png`
    );
    imgPaths = imgIds.map((imgId) => `img/gasContent/${imgId}.png`);
  }

  // blog記事内のthumnailURLをサーバー内の画像へのpathに置換
  content = content.replace(thumnailURL, thumnailPath);
  // blog記事内のimgURLをサーバー内の画像へのpathに置換
  imgUrls.forEach(
    (imgUrl, i) => (content = content.replace(imgUrl, imgPaths[i]))
  );

  // blogファイルをサーバーへ保存
  await fs.writeFile(blogPath_from, content);
  if (USER === "root") {
    const uid = 1000;
    const gid = 1000;
    await fs.chown(blogPath_from, uid, gid);
  }

  // google drive からサムネイルを取得&リサイズ → サーバーへ保存
  await fetchImgAndResize(thumnailPath_from, thumnailId);
  // google drive からコンテント内で使用の画像を取得&リサイズ → サーバーへ保存
  imgPaths_from.forEach((imgPath_from, i) =>
    fetchImgAndResize(imgPath_from, imgIds[i])
  );

  // ブログ記事をローカルへコピー
  await scpFile(blogPath_from, blogPath_to);
  // サムネイルをローカルへコピー
  await scpFile(thumnailPath_from, thumnailPath_to);
  // コンテント内画像をローカルへコピー
  imgPaths_from.forEach((imgPath_from, i) =>
    scpFile(imgPath_from, imgPaths_to[i])
  );

  res.send("投稿が完了しました!");
});

const fetchImgAndResize = async (output, id) => {
  // 画像をサーバーへDLし保存
  const url = `https://drive.google.com/uc?export=download&id=${id}`;
  await wget(url, { output });

  // 以下リサイズ処理...封印 => 投稿側で調整
  // const stat = await fs.stat(output);
  // const imgSize = stat.size;

  // const metaData = await sharp(output).metadata();
  // const imgWidth = metaData.width;
  // const imgHeight = metaData.height;
  // // console.log(metaData);
  // // 100KB以上の場合リサイズ
  // if (imgSize > 100 * 1000) {
  //   console.log("resize!");
  //   // DLしてきた画像を取得
  //   const img = await fs.readFile(output);
  //   // 画像をリサイズし保存(上書き)
  //   await imgResize(img, imgWidth, imgHeight, output);
  //   // 画像を上書き
  //   // await fs.writeFile(output, resizedImg);
  // }
};

// 封印 => 投稿側で調整
const imgResize = async (img, width, height, output) => {
  console.log(width, height);
  height = 500;
  width = parseInt(height * 0.75);
  console.log(width, height);
  const option = {
    fit: "contain",
    background: { r: 255, g: 255, b: 255 },
  };

  await sharp(img)
    .resize(width, height, option)
    .toFile(output);
  // const resizedImg = await sharp(img).resize(WIDTH, HEIGHT, option).png().toBuffer();
  // return resizedImg;
};

const getThumnailId = (content) => {
  const url = content.split("![thumnail](")[1].split(")")[0];
  const id = url.split("id=")[1];
  return [id, url];
};

const getImgIds = (content) => {
  const tage = "![img](";
  const urlAry1 = content.split(tage);
  const urlAry2 = urlAry1.slice(1, urlAry1.length);

  const urls = urlAry2.map((val) => {
    const start = 0;
    const end = val.indexOf(")");
    const url = val.slice(start, end);
    return url;
  });

  const ids = urlAry2.map((val) => {
    const start = val.indexOf("=") + 1;
    const end = val.indexOf(")");
    const id = val.slice(start, end);
    return id;
  });

  return [ids, urls];
};

const scpFile = async (path_from, path_to) => {
  try {
    const client = await Client({
      host: process.env.SCP_HOST,
      port: process.env.SCP_PORT,
      username: process.env.SCP_USERNAME,
      password: process.env.SCP_PASSWORD,
    });
    await client.uploadFile(path_from, path_to);
    client.close();
  } catch (e) {
    console.log(e);
  }
};

const sortBlog = (blogData) => {
  blogData.sort((a, b) => {
    if (a.uid > b.uid) {
      return -1;
    } else {
      return 1;
    }
  });
};

const getFileNames = async (filePath) => {
  const fileNames = await fs.readdir(filePath);
  // ディレクトリを作成した場合はここでの処理を検討
  return fileNames.filter((name) => path.extname(name) === ".md");
};

const getFileInfos = async (fileNames, filePath) => {
  let fileInfos = [];
  for (fileName of fileNames) {
    const infos = await fs.stat(`${filePath}/${fileName}`);
    // 日本時間に修正(UTC時間で現在の日本時間から9時間マイナスで表示される)
    infos.mtime = infos.mtime
      .toLocaleString({ timeZone: "Asia/Tokyo" })
      .split(" ")[0]
      .replace("/", "-")
      .replace("/", "-");

    // 月、日に0をつける処理
    const y = infos.mtime.split("-")[0];
    const m = infos.mtime.split("-")[1];
    const d = infos.mtime.split("-")[2];
    if (m.length === 1) {
      infos.mtime = `${y}-0${m}-${d}`;
    }
    if (d.length === 1) {
      infos.mtime = `${y}-${m}-0${d}`;
    }

    fileInfos.push(infos);
  }
  return fileInfos;
};

const getContents = async (fileNames, filePath) => {
  let files = [];
  for (filename of fileNames) {
    const file = await fs.readFile(`${filePath}/${filename}`, "utf-8");
    files.push(file);
  }
  return files;
};

const getImgPaths = (content) => {
  // console.log(content);
  const lines = content.split("\n");
  const imgPaths = lines.filter((line) => line.includes("(img/"));
  return imgPaths;
};

const getImg = async (imgPaths) => {
  let imgs = [];
  for (imgPath of imgPaths) {
    try {
      const img = await fs.readFile(`${filePath}/${imgPath}`, {
        encoding: "base64",
      });
      imgs.push(img);
    } catch (e) {
      console.log(e);
    }
  }
  return imgs;
};

const replaceImgPath = (content, paths, base64_imgData) => {
  let newContent = String;
  // console.log(paths);
  for (let pathIdx in paths) {
    //jpgもpngじゃないとブラウザで表示されなかった
    const ext = path.extname(paths[pathIdx]).replace(".", "");
    const thumnailPathIdx = 0;
    if (pathIdx > thumnailPathIdx) {
      // contents内の置換
      newContent = newContent.replace(
        paths[pathIdx],
        `data:image/png;base64,${base64_imgData[pathIdx]}`
      );
    } else {
      // thumnailの置換
      newContent = content.replace(
        paths[pathIdx],
        `data:image/png;base64,${base64_imgData[pathIdx]}`
      );
    }
  }
  return newContent;
};

const createFileData = async (names, infos, contents) => {
  const fileData = [];

  for (i in names) {
    const data = {};

    data.title = names[i].replace(path.extname(names[i]), "");
    data.modifidAt = infos[i].mtime;
    data.fileSize = infos[i].size;

    // 作成日の取得
    data.createdAt = contents[i]
      .split("\n")[0]
      .replace("<!--", "")
      .replace("-->", "");
    // 作成日をミリ秒に変換しuidとする
    data.uid = Date.parse(data.createdAt);
    // 日付部分だけを取り出す
    data.createdAt = data.createdAt.split(" ")[1];

    // カテゴリの取得
    data.category = contents[i]
      .split("\n")[1]
      .replace("<!--", "")
      .replace("-->", "");

    // tagの取得
    data.tag = contents[i]
      .split("\n")[2]
      .replace("<!--", "")
      .replace("-->", "");

    // mdファイル内の画像をbase64に置換
    const imgPaths = getImgPaths(contents[i]).map((imgPath) =>
      imgPath.split("(")[1].slice(0, -1)
    );
    const base64_imgData = await getImg(imgPaths);
    const newContent = await replaceImgPath(
      contents[i],
      imgPaths,
      base64_imgData
    );

    // console.log(contents[i]);
    data.content = newContent;

    data.thumImg = base64_imgData.shift() ?? "";

    fileData.push(data);
  }
  return fileData;
};

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

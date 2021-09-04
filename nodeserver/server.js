const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs").promises;
const Twitter = require("twitter-v2");
const fetch = require("node-fetch");
const { Client } = require("node-scp");

require('dotenv').config();

const port = process.env.port || process.env.PORT || 3030;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let filePath = String;
let apiPath = String;
const USER = process.env.USER;
if (USER === 'root') {
  // product
  filePath = `/var/www/html/blogs`;
  apiPath = '/';
} else {
  // local
  filePath = `${__dirname}/blogs/`;
  apiPath = '/node/';
}

app.get(apiPath + "test", async (req, res) => {
  res.send("test ok!");
});

// ブログデータを取得
app.get(apiPath, async (req, res) => {
  const fileNames = await getFileNames(filePath);
  const fileInfos = await getFileInfos(fileNames, filePath);
  const contents = await getContents(fileNames, filePath);
  const blogData = await createFileData(fileNames, fileInfos, contents);

  // 作成時間順に並び替え
  sortBlog(blogData)
  
  res.json(blogData);
});

// githubからレポジトリ情報を取得
app.get(apiPath + 'product', async (req, res) => {
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
  for (result of results) {
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
app.get(apiPath + 'profile', async (req, res) => {
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
  data.profile_image_url = data.profile_image_url.replace('_normal', imgSize);
  res.json({twitterProfile: data});
});

// gasからのpost
app.post(apiPath, async (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const content = req.body.content;
  // const path_from = `${__dirname}/test/${title}.md`;
  // const path_to = `/Users/yusuke/Desktop/mddir/`;
  const path_from = `${filePath}/${title}.md `;
  const path_to = `/Users/yusuke/Desktop/mddir/`;
  await fs.writeFile(`${path_from}`, content);

  // 上書きの対策

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

  res.send("respons OK!");
});



const sortBlog = (blogData) => {
  blogData.sort((a, b) => {
    if (a.uid > b.uid) {
      return -1;
    } else {
      return 1;
    }
  });
}

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
  const lines = content.split('\n');
  const imgPaths =
    lines.filter((line) => line.includes("(img/"));
  return imgPaths;
}

const getImg = async (imgPaths) => {
  let imgs = [];
  for (imgPath of imgPaths) {
    const img = await fs.readFile(`${filePath}/${imgPath}`, { encoding: 'base64' });
    imgs.push(img);
  }
  return imgs;
};

const replaceImgPath = (content, paths, base64_imgData) => {
  let newContent = String;
  // console.log(paths);
  for (let pathIdx in paths) {
    //jpgもpngじゃないとブラウザで表示されなかった
    const ext = path.extname(paths[pathIdx]).replace('.', '');
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
}

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
    const imgPaths = getImgPaths(contents[i])
      .map((imgPath) => imgPath.split("(")[1].slice(0, -1));
    const base64_imgData = await getImg(imgPaths);
    const newContent = await replaceImgPath(
      contents[i],
      imgPaths,
      base64_imgData
    );
    
    // console.log(contents[i]);
    data.content = newContent;
  
    data.thumImg = base64_imgData.shift()??"";

    fileData.push(data);
  }
  return fileData;
};


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

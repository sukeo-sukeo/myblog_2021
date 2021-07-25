const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs").promises;
const Twitter = require("twitter-v2");
const fetch = require("node-fetch");

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
  for (const result of results) {
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
  return fileNames.filter((name) => path.extname(name) === ".md");
};

const getFileInfos = async (fileNames, filePath) => {
  let fileInfos = [];
  for (fileName of fileNames) {
    const infos = await fs.stat(`${filePath}/${fileName}`);
    fileInfos.push(infos);
  }
  // console.log(fileInfos);
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
  const lines = content.split('\n');
  const imgPaths = lines.filter(line => line.includes('(img/'));
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
  for (let i in paths) {
    //jpgもpngじゃないとブラウザで表示されなかった
    const ext = path.extname(paths[i]).replace('.', '');
    if (i > 0) {
      newContent = newContent.replace(
        paths[i],
        `data:image/png;base64,${base64_imgData[i]}`
      );
    } else {
      newContent = content.replace(paths[i], `data:image/png;base64,${base64_imgData[i]}`)
    }
  }
  return newContent;
}

const createTextConvertedImgToBase64 = () => {
  return convertedText;
}

const createFileData = async (names, infos, contents) => {
  const fileData = [];

  for (i in names) {
    const data = {};
    data.title = names[i].replace(path.extname(names[i]), "");
    data.createdAt = infos[i].birthtime;
    data.modifidAt = infos[i].mtime;
    data.fileSize = infos[i].size;
    data.uid = infos[i].birthtimeMs;

    // カテゴリの取得
    data.category = contents[i]
      .split("\n")[0]
      .replace("<!--", "")
      .replace("-->", "");
    // tagの取得
    data.tag = contents[i]
      .split("\n")[1]
      .replace("<!--", "")
      .replace("-->", "");

    // mdファイル内の画像をbase64に置換
    const imgPaths = getImgPaths(contents[i])
      .map((imgPath) => imgPath.split("(")[1].slice(0, -1));
    const base64_imgData = await getImg(imgPaths);
    const newContent = await replaceImgPath(contents[i], imgPaths, base64_imgData);
    
    data.content = newContent;
    data.thumImg = base64_imgData.shift();

    fileData.push(data);
  }
  return fileData;
};


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

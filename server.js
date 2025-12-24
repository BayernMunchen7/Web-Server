const express = require("express");
const path = require("path");

const app = express();

// 현재 폴더의 정적 파일 서빙 (index.html, app.js)
app.use(express.static(__dirname));

// 기본 라우트에서 index.html 반환
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Azure App Service는 PORT 환경변수로 포트를 줌
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on ${port}`));

// 导入路径模块
const path = require("path");
// 导入数据模块
const db = require(path.join(__dirname, "./utils/db.js"));
const bodyParser = require("body-parser");
const express = require("express");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//运用跨域的中间件
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
  next();
});

// 获取英雄列表
app.get("/list", (req, res) => {
  db.getHeros(data => {
    res.send({
      msg: "获取成功",
      code: 200,
      data
    });
  });
});
// 新增英雄
app.post("/add", upload.single("icon"), (req, res) => {
  const icon = req.file.path;
  const { name, skill } = req.body;
  db.addHero({
    icon,
    name,
    skill,
    callBack(data) {
      if (data === 1) {
        res.send({
          msg: "新增成功",
          code: 200
        });
      } else {
        res.send({
          msg: "参数错误",
          code: 400
        });
      }
    }
  });
});
// 根据id删除英雄
app.get("/delete", (req, res) => {
  const id = req.query.id;
  db.deleteHeroById({
    id,
    callBack(data) {
      if (data === 1) {
        res.send({
          msg: "删除成功",
          code: 200
        });
      } else {
        res.send({
          msg: "参数错误",
          code: 400
        });
      }
    }
  });
});
// 英雄id查询
app.get("/search", (req, res) => {
  const id = req.query.id;
  db.getHeroById({
    id,
    callBack(data) {
      if (data) {
        res.send({
          msg: "查询成功",
          code: 200,
          data
        });
      } else {
        res.send({
          msg: "参数错误",
          code: 400
        });
      }
    }
  });
});
// 编辑英雄
app.post("/edit", upload.single("icon"), (req, res) => {
  const icon = req.file.path;
  const { name, skill, id } = req.body;
  db.editHero({
    id,
    icon,
    name,
    skill,
    callBack(data) {
      if (data === 1) {
        res.send({
          msg: "修改成功",
          code: 200
        });
      } else {
        res.send({
          msg: "参数错误",
          code: 400
        });
      }
    }
  });
});
app.listen(4200, function() {
  console.log("success");
});

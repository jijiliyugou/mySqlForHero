const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require(path.join(__dirname, "./utils/db"));
// 导入验证码生成器
const svgCaptcha = require("svg-captcha");
// 导入cookieSession
const cookieSession = require("cookie-session");
const app = express();
// 信任第一次访问session
app.set("trust proxy", 1); // trust first proxy
app.use(express.static(path.join(__dirname, "../static")));
app.use(bodyParser.urlencoded({ extended: false }));
// 使用session中间件
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"]
  })
);
// 注册
app.post("/register", function(req, res) {
  const { username, password } = req.body;
  const sql = `select * from login where username='${username}'`;
  db.query({
    sql,
    callback(data) {
      if (data.length === 0) {
        const sql = `insert into login (username,password) values ("${username}","${password}")`;
        db.query({
          sql,
          callback(data) {
            if (data.affectedRows === 1) {
              res.send({
                code: 200,
                msg: "注册成功"
              });
            }
          }
        });
      } else {
        res.send({
          code: 400,
          msg: "该用户名已经被注册了"
        });
      }
    }
  });
});
// 登录
app.post("/login", function(req, res) {
  const myCaptcha = req.session.captcha;
  const { username, password, vcode } = req.body;

  if (myCaptcha === vcode) {
    const sql = `select * from login where username='${username}' and password='${password}'`;
    db.query({
      sql,
      callback(data) {
        if (data.length === 0) {
          res.send({
            code: 400,
            msg: "用户名或密码错误"
          });
        } else {
          res.send({
            code: 200,
            msg: "登录成功"
          });
        }
      }
    });
  } else {
    res.send({
      code: 400,
      msg: "验证码错误"
    });
  }
});
// 验证码生成器
app.get("/captcha", (req, res) => {
  const captcha = svgCaptcha.create();
  // 保存验证码到session中
  req.session.captcha = captcha.text;
  res.type("svg");
  res.status(200).send(captcha.data);
});
app.listen(3200, () => console.log("success"));

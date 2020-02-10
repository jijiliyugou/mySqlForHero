/**
 * db.js:数据库的操作模块
 */

const mysql = require('mysql');
// 创建数据库的链接
const connection = mysql.createConnection({
    // 地址
    host: 'localhost',
    // 用户名===>phpstudy安装的数据库默认的用户名是root
    user: 'root',
    // 密码===>phpstudy安装的数据库默认的密码也是root
    password: 'root',
    // 库的名字
    database: 'mytest'
});
// // 链接数据库
// connection.connect();
// // 查询功能语句
// // 参数1：执行sql语句===>默认是 (查询语句)
// // 参数2：执行sql语句之后的回调函数
// // connection.query('select * from hero', function(error, results, fields) {
// //     // 第一个参数是如果出错的信息
// //     if (error) throw error;
// //     // 第二个参数是执行sql语句后的结果
// //     console.log(results);
// //     // 第三个参数是数据库的详细信息，一般用不上
// //     // console.log(fields);
// // });
// // 断开数据库的链接
// connection.end();

module.exports = {
    // 获取所有数据
    getHeros(callBack) {
        // 链接数据库
        // connection.connect();
        // 查询功能语句
        connection.query('select id,name,skill,icon from hero where isDelete="false"', (error, results, fields) => {
            // 第一个参数是如果出错的信息
            if (error) throw error;
            callBack(results)
        });
        // 断开数据库的链接
        //  connection.end();
    },
    /**
     * 新增数据
     *  insert into hero (name,skill,icon) values ("xxx","xxx","xxx")
     */
    addHero({ name, skill, icon, callBack }) {
        // 链接数据库
        // connection.connect();
        // 查询功能语句
        connection.query(`insert into hero (name,skill,icon) values ("${name}","${skill}","${icon}")`, (error, results, fields) => {
            // 第一个参数是如果出错的信息
            if (error) throw error;
            callBack(results.affectedRows)
        });
        // 断开数据库的链接
        //  connection.end();
    },
    // 根据id获取数据
    getHeroById({ id, callBack }) {
        // 链接数据库
        // connection.connect();
        // 查询功能语句
        connection.query(`select id,name,skill,icon from hero where isDelete="false" and id=${id}`, (error, results, fields) => {
            // 第一个参数是如果出错的信息
            if (error) throw error;
            callBack(results)
        });
        // 断开数据库的链接
        //  connection.end();
    },
    // 根据id删除数据(软删除)
    deleteHeroById({ id, callBack }) {
        // 链接数据库
        // connection.connect();
        // 查询功能语句
        connection.query(`update hero set isDelete="true" where id = ${id}`, (error, results, fields) => {
            // 第一个参数是如果出错的信息
            if (error) throw error;
            callBack(results.affectedRows)
        });
        // 断开数据库的链接
        //  connection.end();
    },
    // 编辑数据
    editHero({ id, name, skill, icon, callBack }) {
        // 链接数据库
        // connection.connect();
        // 查询功能语句
        connection.query(`update hero set name="${name}",skill="${skill}",icon="${icon}" where id = ${id} and isDelete="false"`, (error, results, fields) => {
            // 第一个参数是如果出错的信息
            if (error) throw error;
            callBack(results.affectedRows)
        });
        // 断开数据库的链接
        //  connection.end();
    }
}
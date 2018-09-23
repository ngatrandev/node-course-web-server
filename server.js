//để viết server bên terminal chạy nodemon
// Nếu muốn chạy nodemon cho các file js, hbs khác ta viết -e js,hbs

const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const app = express();
app.set('view engine', 'hbs');

//Dùng syntax trên để liên kết đến 1 file html trong folder public

hbs.registerPartials(__dirname + '/views/partials');
//Dùng để tạo các data cố định (giống nhau giữa các file hbs) vd footer.hbs
//để lấy data trong footer.hbs ta viết {{> footer}}


hbs.registerHelper('getcurrentyear', () => {
    return new Date().getFullYear()
})
//Dùng để tạo các func sử dụng cho các file hbs khác.

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
  
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
//Đây là middleware với req và res tương ứng với get method bên dưới
//Khi app.get bên dưới chạy, middleware cũng chạy các code bên trong
  });

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// // dùng res.render trong middleware để dẫn đến file maintenance.hbs
// // các đoạn code đến url từ vị trí này xuống dưới sẽ bị khóa lại
// // và đều chạy vào file maintenance.hbs (vd để thông báo trang đang bảo trì)
// // nếu có các url bên trên thì vẫn chạy bình thường.
// })

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    //res.send("<h1>Hello Express</h1>")
    // res.send({
    //     data: "user1",
    //     info: ["name", "age", "address"]
    // })
    //thay vì dùng res.send ta dùng res.render() trong hbs để liên kết đến nhiều file hbs
    res.render('home.hbs', {
        pagetitle: 'Home Page',
        welcomeMess: `Welcome to my website`
    })
});

app.listen(8080);
app.get("/bad", (req, res)=> {
    res.send(`Unable to connect to the server`);
});
app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pagetitle: 'About Page'
    //obj này chứa các key-value sử dụng cho file about.hbs
    //bên file hbs các key để trong {{...}}
    });
})
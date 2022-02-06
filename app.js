import mysql from 'mysql2';
import express from 'express';

const app = express()
const urlEncoderParser = express.urlencoded({extended: false})

const pool = mysql.createPool({
  connectionLimit: 5,
  host:"localhost",
  user: "alex",
  database: "animalsdb2",
  password: "123456"
});

app.set("view engine", "hbs");

//------------------------Для таблицы animals-----------------------
// отображение начальной страницы
app.get("/", function(req, res){
      res.render("index.hbs", {
  });
});

// получение списка животных
app.get("/indexAnimal", function(req, res){
  pool.query("SELECT * FROM animals", function(err, data){
    if (err) return console.log(err);
    res.render("indexAnimal.hbs", {
      animals: data
    });
  });
});

//возвращаем форму для добавления данных
app.get("/createAnimal", function(req, res){
  res.render("createAnimal.hbs")
});

//получаем отправленные данные и добавляем их БД
app.post("/createAnimal", urlEncoderParser, function(req, res){
  if (!req.body) return res.sendStatus(400);
  const name = req.body.name;
  const type = req.body.type;
  const age = req.body.age;
  pool.query("INSERT INTO animals (name, type, age) VALUES (?,?,?)", [name, type, age], function(err, data) {
    if (err) return console.log(err);
    res.redirect("/indexAnimal");
  });
  console.log("Add animal name: ", name, " type: ", type, " age: ", age, new Date());
});

//получаем id редактируемого животного, получаем его из БД и отправлем с формой редактирования
app.get("/editAnimal/:id", function(req, res){
  const id = req.params.id;
  pool.query("SELECT * FROM animals WHERE id=?", [id], function(err, data){
    if (err) return console.log(err);
    res.render("editAnimal.hbs", {
      animal: data[0]
    });
  });
});

// получаем отредактированные данные и оправляем их в БД
app.post("/editAnimal", urlEncoderParser, function(req, res){
  if (!req.body) return res.sendStatus(400);
  const id = req.body.id;
  const name = req.body.name;
  const type = req.body.type;
  const age = req.body.age;

  pool.query("UPDATE animals SET name=?, type=?, age=? WHERE id=?", [name, type, age, id], function(err, data){
    if (err) return console.log(err);
    res.redirect("/");
  });
});

//получаем id удаляемого животного и удаляем его из бд
app.post("/deleteAnimal/:id", function(req, res){
  const id = req.params.id;
  pool.query("DELETE FROM animals WHERE id=?", [id], function(err, data){
    if (err) return console.log(err);
    res.redirect("/indexAnimal");
  }); 
  console.log("Delete animal with id:", id, new Date());
});

//-------------------Для таблицы zoos------------------------

// получение списка зоопарков
app.get("/indexZoo", function(req, res){
  pool.query("SELECT * FROM zoos", function(err, data){
    if (err) return console.log(err);
    res.render("indexZoo.hbs", {
      zoos: data
    });
  });
});

//возвращаем форму для добавления данных
app.get("/createZoo", function(req, res){
  res.render("createZoo.hbs")
});

//получаем отправленные данные и добавляем их БД
app.post("/createZoo", urlEncoderParser, function(req, res){
  if (!req.body) return res.sendStatus(400);
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;
  pool.query("INSERT INTO zoos (name, address, phone, email) VALUES (?,?,?,?)", [name, address, phone, email], function(err, data) {
    if (err) return console.log(err);
    res.redirect("/indexZoo");
  });
  console.log("Add zoo name: ", name, " address: ", address, " phone: ", phone, " email: ", email, " ", new Date());
});

//получаем id редактируемого зоопарка, получаем его из БД и отправлем с формой редактирования
app.get("/editZoo/:id", function(req, res){
  const id = req.params.id;
  pool.query("SELECT * FROM zoos WHERE id=?", [id], function(err, data){
    if (err) return console.log(err);
    res.render("editZoo.hbs", {
      zoo: data[0]
    });
  });
});

// получаем отредактированные данные и оправляем их в БД
app.post("/editZoo", urlEncoderParser, function(req, res){
  if (!req.body) return res.sendStatus(400);
  const id = req.body.id;
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;

  pool.query("UPDATE zoos SET name=?, address=?, phone=?, email=? WHERE id=?", [name, address, phone, email, id], function(err, data){
    if (err) return console.log(err);
    res.redirect("/indexZoo");
  });
});

//получаем id удаляемого зоопарка и удаляем его из бд
app.post("/deleteZoo/:id", function(req, res){
  const id = req.params.id;
  pool.query("DELETE FROM zoos WHERE id=?", [id], function(err, data){
    if (err) return console.log(err);
    res.redirect("/indexZoo");
  }); 
  console.log("Delete zoo with id:", id, new Date());
});

//-------------------Для таблицы cages------------------------

// получение списка клеток
app.get("/indexCage", function(req, res){
  pool.query("SELECT * FROM cages", function(err, data){
    if (err) return console.log(err);
    res.render("indexCage.hbs", {
      cages: data
    });
  });
});

//возвращаем форму для добавления данных
app.get("/createCage", function(req, res){
  res.render("createCage.hbs")
});

//получаем отправленные данные и добавляем их БД
app.post("/createCage", urlEncoderParser, function(req, res){
  if (!req.body) return res.sendStatus(400);
  const size = req.body.size;
  const idAnimal = req.body.idAnimal;
  const idZoo = req.body.idZoo;
  pool.query("INSERT INTO cages (size, idAnimal, idZoo) VALUES (?,?,?)", [size, idAnimal, idZoo], function(err, data) {
    if (err) return console.log(err);
    res.redirect("/");
  });
  console.log("Add cage id: ", id, " size: ", size, " Animal: ", idAnimal, " Zoo: ", idZoo, new Date());
});

//получаем id редактируемой клетки, получаем его из БД и отправлем с формой редактирования
app.get("/editCage/:id", function(req, res){
  const id = req.params.id;
  pool.query("SELECT * FROM cages WHERE id=?", [id], function(err, data){
    if (err) return console.log(err);
    res.render("editCage.hbs", {
      cage: data[0]
    });
  });
});

// получаем отредактированные данные и оправляем их в БД
app.post("/editCage", urlEncoderParser, function(req, res){
  if (!req.body) return res.sendStatus(400);
  const id = req.body.id;
  const size = req.body.size;
  const idAnimal = req.body.idAnimal;
  const idZoo = req.body.idZoo;

  pool.query("UPDATE cages SET size=?, idAnimal=?, idZoo=? WHERE id=?", [size, idAnimal, idZoo, id], function(err, data){
    if (err) return console.log(err);
    res.redirect("/indexCage");
  });
});

//получаем id удаляемого зоопарка и удаляем его из бд
app.post("/deleteCage/:id", function(req, res){
  const id = req.params.id;
  pool.query("DELETE FROM cages WHERE id=?", [id], function(err, data){
    if (err) return console.log(err);
    res.redirect("/indexCage");
  }); 
  console.log("Delete cage with id:", id, new Date());
});

//-------------------run server------------------------------
app.listen(3000, function(){
  console.log("Сервер ожидает подключение ...");
});
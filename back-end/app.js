var createError = require('http-errors');
var express = require('express');
var path = require('path');
//解析cookie模块
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//路由工具
var userInfo = require('./routes/user_info');
var positionRouter = require('./routes/position');
//创建一个应用程序
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//使用各种中间件
app.use(logger('dev'));
// body-parser 处理form-data和request payload数据
// express 4.X 内部集成了body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//处理静态资源
app.use(express.static(path.join(__dirname, 'public')));

//职位信息路由
app.use('/api/position',positionRouter);
//用户信息路由
app.use('/api/user', userInfo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

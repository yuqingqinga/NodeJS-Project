# NodeJS-Project
## 项目说明
#### 该项目的功能
+ 登录、注册
+ 查看详情页
+ 写留言
+ 发布留言
+ 修改、删除留言
+ 上传文件
#### 项目用到的技术
+ express框架
+ art-template模板引擎
+ uikit框架
+ ajax数据交互
+ mongodb数据库
+ 用session保持用户登录

### 项目使用express框架
+ `npm install express`
### 项目使用nodemon启动项目
+ 保证项目可以实时更新
+ 更改`package.json`配置，将`start： npm`改为`start: nodemon`
+ 使用`npm start`启动项目

### 链接mongodb数据库
+ 使用`mongo`在项目中链接数据库
+ `use project`创建数据库名为`project`
+ 创建集合（users：管理所有用户信息）
+ 使用erpress框架链接数据库，使用mongodb模块链接数据库
`npm install mogodb --save`
+ 创建model文件夹分装数据库数据

### 前端页面
+ 前端页面放在views文件下
+ 在express中使用ejs模板引擎
+ 使用uikit框架
### session
+ 使用session来保存用户的登录状态
+ `npm install express-session`
+ 在app.js中引入并配置
+ session的登陆拦截
+ 退出登录：将session内的用户名清空

### 写留言
+ 使用xheditor写复文本框 (现在不能使用了）
+ 创建article路由文件
+ **增加文件上传功能，使用uikit组件**
1. 定义服务端接口（文件上传为post方法）
2. `npm install multiparty -s`使用第三方库multiparty（呜呜呜，失败）


### 首页
+ 将本地图片挂载到服务器上
```js
app.get('/img', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'public/2.png'));
})
```
+ 修改时间格式`npm install moment -S`
+ 增加分页功能

+ **实现删除留言功能**
1. 如何让button变成<a href='链接'></a>效果
```
<button class="uk-button uk-button-primary " style="background-color: #7952b3d6" 
                      onclick="window.location.href='/article/delete?id=<%= item.id%>&page=<%=data.curPage%>' ">
                      删除</button>
```
2. 数据库的删除

+ **修改留言**
1. 修改页面可以和写留言页面复用，但是修改页面内要显示原始数据
2. 修改留言和写留言的button不相同
```
  <%  if(item.id){ %>
            <button class="uk-button uk-button-primary " style="background-color: #7952b3d6">修改</button>
<% }else{ %>
            <button class="uk-button uk-button-primary" style="background-color: #7952b3d6">发布</button>
<% }%>
```
3. 通过隐藏域将修改留言内的id和page传给服务端，以区分是修改页面还是新增页面


const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

// الاتصال في قاعده البيانات
mongoose.connect('mongodb://localhost/blog',
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
 
// view engine يحول ejs كود الى html
app.set('view engine', 'ejs')

// يجب اخبار الاكسبرس في ادخال البيانات الموجوده في الصفحه
app.use(express.urlencoded({ extended: false })) 

// delete route
app.use(methodOverride('_method'))

// عرض جميع البيانات في الصفحه الرئسيه
app.get('/', async (req,res) => { 
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

// articles للقرائه داخل الملف في route
app.use('/articles', articleRouter)

app.listen(5000)
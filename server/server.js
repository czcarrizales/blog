const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/blog',
    collection: 'sessions',
    expires: 5000
})
const passport = require('passport')
const LocalStrategy = require('passport-local')
mongoose.connect('mongodb://127.0.0.1:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: store
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email })
            if (!user) {
                return done(null, false, { message: 'Invalid username' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (!isPasswordValid) {
                return done(null, false, { message: 'Invalid password' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
))

passport.serializeUser((user, done) => {
    console.log('serializing user', user)
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    console.log('deserializing user')
    // Retrieve the user from the database based on the id
    const user = await User.findById(id)
    done(null, user)
});


// Models
const blogPostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})
const BlogPost = mongoose.model('BlogPost', blogPostSchema)

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model('User', userSchema)

app.get('/blog', async (req, res) => {
    try {
        const allBlogPosts = await BlogPost.find({})
        res.send(allBlogPosts)
    } catch (err) {
        console.log(err)
    }

})

app.post('/blog', async (req, res) => {
    console.log(req.user)
    if (req.isAuthenticated()) {
        const { title, content, authorId } = req.body;
        const newBlogPost = new BlogPost({
            title: title,
            content: content,
            author: authorId
        })
        try {
            const blogPost = await newBlogPost.save()
            res.send(blogPost)
            console.log(blogPost)
        } catch (err) {
            console.log(err)
        }
    } else {
        res.send('Must log in to post blog')
    }
    

})

app.put('/blog', async (req, res) => {
    const postId = req.body.postId;
    const { title, content } = req.body;
    const mongoObjectId = new mongoose.Types.ObjectId(postId)
    const updatePost = await BlogPost.findByIdAndUpdate(mongoObjectId, { title, content }, { new: true })
    res.send(updatePost)
})

app.delete('/blog', async (req, res) => {
    const postId = req.body.postId
    const mongoObjectId = new mongoose.Types.ObjectId(postId)
    const deletePost = await BlogPost.findByIdAndDelete(mongoObjectId)
    res.send(deletePost)
    console.log(deletePost)
})

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.send('user exists already')
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({ name, email, password: hashedPassword })
            const saveUser = await newUser.save()
            res.status(201).json({ message: 'User register success!', user: saveUser })
        }

    } catch (error) {
        res.send(error)
    }
})

app.post('/login', passport.authenticate('local'), async (req, res) => {
    try {
        const serializedUser = req.user;
        const sessionID = req.sessionID;
        res.send({
            serialUser: serializedUser,
            session: sessionID
        })
        console.log('login success')
    } catch (error) {
        res.send(error)
    }
    
})

app.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { 
        res.send('logout error')
        return next(err); 
    }
      res.send('logout success')
    });
  });

app.get('/protected', (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            res.send('user is authenticated!')
        } else {
            res.send('user not authenticated')
        }
    } catch (error) {
        res.send(error)
    }
})

app.listen(5000, () => {
    console.log('blog server started on 5000')
})
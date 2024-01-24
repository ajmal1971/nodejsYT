const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();
const PORT = 8000;

// Connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/01project')
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log('Mongo Error:: ', err));


//Define Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Create User Model
const User = mongoose.model('User', userSchema);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  fs.appendFile('./text.txt', `Date - ${new Date().toLocaleDateString()} | IP - ${req.ip} | Method - ${req.method} | Route - ${req.path}\n`, (err, data) => {
    next();
  });
});

// Response as HTML (Server Side Rendering - SSR)
app.get('/users', async (req, res) => {
  const users = await User.find({});
  const html = `
        <table border cellpadding='5'>
            <thead>
                <tr>
                    <th>SL#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>gender</th>
                </tr>
            </thead>

            <tbody>
                ${users.map((user, index) =>
    `
                        <tr>
                            <th>${index + 1}</th>
                            <th>${user.firstName} ${user.lastName}</th>
                            <th>${user.email}</th>
                            <th>${user.gender}</th>
                        </tr>
                    `
  ).join('')}
            </tbody>
        </table>
    `;

  res.send(html);
})

// JSON Response

// All Users or Create User
app
  .route('/api/users')
  .get(async (req, res) => {
    // Always start header name with X for custom header
    res.setHeader('X-Name', 'Ajmal Hossain');

    const users = await User.find({});
    return res.json(users);
  })
  .post(async (req, res) => {
    const body = req.body;
    const result = await User.create(
      {
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender
      }
    );

    return res.status(201).json({ msg: 'Successfull!', user: result });
  });

// User by Id or Update or Delete user
app
  .route('/api/users/:id')
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
  })
  .patch(async (req, res) => {
    const body = req.body;
    const updatedRow = {
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender
    }
    await User.findByIdAndUpdate(req.params.id, updatedRow)
      .then(result => {
        return res.json({ msg: 'Successfull' });
      });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
      .then(result => { return res.json({ msg: 'Successfull' }) });
  });

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`))
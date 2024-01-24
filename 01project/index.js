const express = require('express');
const mongoose  = require('mongoose');

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
app.get('/users', (req, res) => {
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
                            <th>${user.first_name} ${user.last_name}</th>
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
  .get((req, res) => {
    // Always start header name with X for custom header
    res.setHeader('X-Name', 'Ajmal Hossain')
    return res.json(users);
  })
  .post(async (req, res) => {
    const body = req.body;
    await User.create({
      firstName: body.first_name,
      lastName: last_name,
      
    });
  });

// User by Id or Update or Delete user
app
  .route('/api/users/:id')
  .get((req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id === Number(id));
    return res.json(user);
  })
  .patch((req, res) => {
    const id = req.params.id;
    const body = req.body;

    const user = users.find(user => user.id === Number(id));
    user.first_name = body.first_name;
    user.last_name = body.last_name;
    user.email = body.email;
    user.gender = body.gender;

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
      if (err) {
        return res.json({ status: 'Failed!', id: id });
      } else {
        return res.json({ status: 'Success', id: id });
      }
    });
  })
  .delete((req, res) => {
    const id = req.params.id;
    const rowIndex = users.findIndex(user => user.id === Number(id));

    if (rowIndex === -1) {
      return res.json({ status: 'User Not Found!', id: id });
    } else {
      users.splice(rowIndex, 1);
      fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if (err) {
          return res.json({ status: 'Failed to delete!', id: id });
        } else {
          return res.json({ status: 'Success', id: id });
        }
      });
    }
  });

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`))
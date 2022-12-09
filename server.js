require('dotenv').config()

const express = require('express');
const app = express();
const sgMail = require('@sendgrid/mail');
const cors = require('cors')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/email', async (req, res) => {
    const API_KEY = process.env.SG_API;

    sgMail.setApiKey(API_KEY);

    const { name, phone, email, msg, subject } = req.body;

    const message = {
        to: 'kleanique1@gmail.com',
        from: {
            name,
            email: "goldenimperialswifttech@gmail.com"
        },
        text: msg,
        subject
        
    }

    sgMail.send(message)
        .then(data => {
            res.status(202).json({message: 'email sent succeefully'})
        })
        .catch(err => {
            console.log(err)
            res.status(403).json({message: 'an error occured'})

        })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
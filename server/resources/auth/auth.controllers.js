const initStripe = require("../../stripe")
const fetchUsers = require("../../utils/fetchUsers")
const fs = require("fs").promises
const bcrypt = require("bcrypt")



const register = async (req, res) => {

    const {email, password} = req.body

    //Kolla så att använder inte redan finns
    const users = await fetchUsers()
    const userAlreadyExists = users.find(u => u.email === email)

    if (userAlreadyExists) {
        return res.status(400).json("User already exists")
    }



    const stripe = initStripe()
    
    const customer = await stripe.customers.create({
        email,
    });

    //Kryptera lösenordet
    const hashedPassword = await bcrypt.hash(password, 10)



    //Skapa användaren till databasen
    const newUser = {
        email,
        password: hashedPassword,
        stripeId: customer.id,
    }
    users.push(newUser)
    await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2))

    //Skicka tillbaka ett svar
    res.status(201).json(newUser.email)

}

const login = async(req, res) => {

    //Kolla så att användaren finns
    const {email, password} = req.body

    const users = await fetchUsers()
    const userExists = users.find(u => u.email === email)

    //Kolla så att lösenordet stämmer och att användaren finns

    if (!userExists || !await bcrypt.compare(password, userExists.password)) {
        return res.status(400).json("Username or password is incorrect")
    }

    // hämnta ut id från stripe via detta när betalning ska se
    //Starta en session DET HÄR HAR JAG INTE FÖRSTÅTT. BEHÖVER FÅ DET FÖRTYDLIGAT. HUR FUNKAR DET?
    req.session.user = userExists

    //Skicka tillbaka ett svar
    res.status(200).json(userExists)
}

const logout = (req, res) => {
    req.session = null
    res.status(200).json("Logged out")
}

const authorize = (req, res) => {
    if (!req.session.user) { 
        return res.status(401).json("You must be logged in")
    }
    res.status(200).json(req.session.user.email)
}

module.exports = {register, login, logout, authorize}
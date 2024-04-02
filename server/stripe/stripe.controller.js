const createCheckOutSession = (req, res) => {
    console.log("Creating checkout session")
    res.json({ message: "Creating checkout session" })

}

module.exports = { createCheckOutSession }
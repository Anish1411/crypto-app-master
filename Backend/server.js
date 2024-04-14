const express = require("express")
const app = express()
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const db = require('./config/db');
app.use(express.json())
const cors = require('cors');

app.use(cors());
app.post("/createUser", async (req, res) => {
    const user = req.body.name;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM loginuser WHERE user_name = ?"
        const search_query = mysql.format(sqlSearch, [user])
        const sqlInsert = "INSERT INTO loginuser VALUES (0,?,?)"
        const insert_query = mysql.format(sqlInsert, [user, hashedPassword])

        await connection.query(search_query, async (err, result) => {
            if (err) throw (err)
            console.log("------> Search Results")
            console.log(result.length)
            if (result.length != 0) {
                connection.release()
                console.log("------> User already exists")
                res.sendStatus(409)
            }
            else {
                await connection.query(insert_query, (err, result) => {
                    connection.release()
                    if (err) throw (err)
                    console.log("--------> Created new User")
                    console.log(result.insertId)
                    res.sendStatus(201)
                })
            }
        })
    })
})

// ............................

// Inside your login route handler after successful login
const updateProfitLoss = async (userId) => {
    // Calculate profit/loss based on user activities or holdings
    // For example:
    const userActivities = await getUserActivities(userId);
    const totalProfit = calculateTotalProfit(userActivities);
    const totalLoss = calculateTotalLoss(userActivities);

    // Update user's profit and loss in the database
    const updateQuery = "UPDATE loginuser SET profit = ?, loss = ? WHERE id = ?";
    const values = [totalProfit, totalLoss, userId];
    await db.query(updateQuery, values);
};

// ............................


app.post("/login", async (req, res) => {
    const user = req.body.name;
    const password = req.body.password;
    if (!user || !password) {
        return res.sendStatus(400); // Bad request if name or password is missing
    }

    db.getConnection(async (err, connection) => {
        if (err) throw (err);
        const sqlSearch = "SELECT * FROM loginuser WHERE user_name = ?";
        const search_query = mysql.format(sqlSearch, [user]);

        await connection.query(search_query, async (err, result) => {
            connection.release();
            if (err) throw (err);
            if (result.length === 0) {
                console.log("--------> User does not exist");
                return res.sendStatus(404);
            }

            const hashedPassword = result[0].user_pass;
            if (!hashedPassword) {
                console.log("--------> Hashed password not found");
                return res.sendStatus(500); // Internal server error
            }

            try {
                if (await bcrypt.compare(password, hashedPassword)) {
                    console.log("---------> Login Successful");
                    res.send(`${user} is logged in!`);
                } else {
                    console.log("---------> Password Incorrect");
                    res.send("Password incorrect!");
                }
            } catch (error) {
                console.error("---------> Error comparing passwords:", error);
                res.sendStatus(500); // Internal server error
            }
        });
    });

    // ............................
    const userId = user.id; // Get the user ID from your authentication logic

    try {
        // Call the updateProfitLoss function to update user's profit and loss
        await updateProfitLoss(userId);

        // Send success response
        res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        console.error("Error updating profit/loss:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
    // ..............................
});


// ..............................

app.get("/portfolio", async (req, res) => {
    const userId = req.user.id; // Assuming you have user authentication middleware
    const userData = await getUserData(userId); // Fetch user's data including profit/loss
    res.json(userData);
});

// ..............................



// const PORT = 9000;
app.listen(9000, () => {
    console.log(`Server running `);
});
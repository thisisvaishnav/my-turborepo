import express from "express";
import { prismaClient } from "db/client";

const app = express();

app.use(express.json());

app.get("/users", async (req,res) => {
    try {
        const users = await prismaClient.user.findMany();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// post req that takes username and pass and pass to server and tell prisma to create if the username does't exisit 
app.post("/user", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        res.status(400).json({ error: "Username and password are required" });
        return;
      }
  
      const existingUser = await prismaClient.user.findFirst({
        where: { username },
      });
      
      if (existingUser) {
        res.status(409).json({ error: "Username already exists" });
        return;
      }
  
      const user = await prismaClient.user.create({
        data: {
          username,
          password,
        },
      });
  
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });


app.listen(8080);
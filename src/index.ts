import express, { Request, Response } from "express"

const app = express()
const port = 3000

const categories = [
  {
    id: 1,
    name: "Breakfast",
    img: `/breakfast.png`,
  },
  {
    id: 2,
    name: "Vegan",
    img: `/vegan.png`,
  },
  {
    id: 3,
    name: "Meat",
    img: `/meat.png`,
  },
  {
    id: 4,
    name: "Dessert",
    img: `/dessert.png`,
  },
  {
    id: 5,
    name: "Lunch",
    img: `/lunch.png`,
  },
  {
    id: 6,
    name: "Chocolate",
    img: `/chocolate.png`,
  },
]

app.use(express.json())
app.use(express.static("public"))

app.get("/categories", (_: Request, res: Response) => {
  res.json({
    status: true,
    data: categories,
  })
})

app.post("/subscribe", (req: Request, res: Response) => {
  const { email } = req.body

  if (!email) {
    res.status(400).json({ status: false, message: "Email field is required" })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email || !emailRegex.test(email)) {
    res.status(400).json({ status: false, message: "Invalid email" })
  }

  res.json({ status: true, message: "User subscribed successfully" })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

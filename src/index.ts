import express, { Request, Response } from "express"
import swaggerUi from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import dotenv from "dotenv"

dotenv.config()

const app = express()

const apiUrl = process.env.API_URL

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Tasty API",
      version: "1.0.0",
      description: "API documentation for tasty",
    },
    servers: [
      {
        url: apiUrl,
      },
    ],
  },
  apis: ["./src/index.ts"],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

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

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       img:
 *                         type: string
 */
app.get("/categories", (_: Request, res: Response) => {
  res.json({
    status: true,
    data: categories,
  })
})

/**
 * @swagger
 * /subscribe:
 *   post:
 *     summary: Subscribe a user with an email address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: User subscribed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid email or missing email field
 */
app.post("/subscribe", (req: Request, res: Response) => {
  const { email } = req.body

  if (!email) {
    res.status(400).json({ status: false, message: "Email field is required" })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    res.status(400).json({ status: false, message: "Invalid email" })
  }

  res.json({ status: true, message: "User subscribed successfully" })
})

app.listen(3000, () => {
  console.log(`Server is running at ${apiUrl}`)
})

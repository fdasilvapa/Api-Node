import express from 'express'
import bcrypt from 'bcrypt'
import { Prisma, PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

//Cadastro
router.post('/cadastro', async (req, res) => {
    try{
        const user = req.body

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)

        const userDB = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword,
            },
        })
        res.status(201).json(userDB)
    }
    catch(err){
        res.status(500).json({message: "Erro no servidor, tente novamente."})
    }
})


export default router
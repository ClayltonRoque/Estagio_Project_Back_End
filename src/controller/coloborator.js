import { PrismaClient } from "@prisma/client";
import Jwt  from "jsonwebtoken";

const prisma = new PrismaClient();

export async function selectColoboradores(req, res) {
    const Coloboradores = await prisma.coloborador.findMany({
        orderBy:{id:"asc"}})
        return res.status(200).json(Coloboradores)
}

export async function insertColoborador(req, res) {
    const {name, admission, role, type_blood} = req.body;
    const coloboradorInsert = await prisma.coloborador.create({
        data: {
            name,
            admission, 
            role,
            type_blood
        }
    })
    return res.status(201).json(coloboradorInsert)
}

export async function updateColoborador(req, res) {
    const {id,name, admission, role, type_blood} = req.body;
    const coloboradorUpdate = await prisma.coloborador.update({
     where: { id },
     data: {
         name,
         admission,
         role,
         type_blood
     }
    });
    return res.status(200).json(coloboradorUpdate)
}

export async function deleteColoborador(req, res) {
  const { id } = req.body;
  const intId = parseInt(id)

  if(!intId){
    return res.status(400).json("Id require")
}

const coloboratorExist = await prisma.coloborador.findUnique({
    where: { id: intId } 
});

if(!coloboratorExist) {
    return res.status(404).json("coloborator not find")
}

await prisma.coloborador.delete({
    where: {id: intId}
});

return res.status(200).send();

} 

export async function selectColoboradores_Login(req, res) {
    const Coloboradores_Login = await prisma.Coloborador_Login.findMany({
        orderBy:{name:"asc"}})
        return res.status(200).json(Coloboradores_Login)
}

export async function insertColoborador_Login(req, res) {
    const {name, senha} = req.body;
    const coloboradorExist = await prisma.Coloborador_Login.findFirst({
        where: {
            name
        }   
    })

    if(coloboradorExist){
        return res.status(400).json("coloborator already exist")
    }

    const coloborador_Login_Insert = await prisma.Coloborador_Login.create({
        data: {
            name,
            senha
        }
    })
    return res.status(201).json(coloborador_Login_Insert)
}

export async function updateColoborador_Login(req, res) {
    const {id, name, senha} = req.body;
    const coloboradorUpdate_Login = await prisma.Coloborador_Login.update({
     where: { id },
     data: {
         name,
         senha
     }
    });
    return res.status(200).json(coloboradorUpdate_Login)
}

export async function deleteColoborador_Login(req, res) {
    const { id } = req.body;
    const intId = parseInt(id)
  
    if(!intId){
      return res.status(400).json("Id require")
  }
  
  const coloboratorExist_Login = await prisma.Coloborador_Login.findUnique({
      where: { id: intId } 
  });
  
  if(!coloboratorExist_Login) {
      return res.status(404).json("coloborator not find")
  }
  
  await prisma.Coloborador_Login.delete({
      where: {id: intId}
  });
  
  return res.status(200).send();
  
  } 

export async  function coloborador_Authenticate (req, res) {
   const { name, senha } = req.body;

   const coloboradorExist = await prisma.Coloborador_Login.findFirst({
    where: {
        name
    }   
})

if(!coloboradorExist){
    return res.status(400).json("coloborator not exist")
}

if(senha !== coloboradorExist.senha){
    return res.status(403).json("coloborator_name or coloborator_senha wrong")
}

const token = Jwt.sign(coloboradorExist, "SECRETKEY", {
    expiresIn: "1d" 
})

return res.json({ auth: true, token: token})

}









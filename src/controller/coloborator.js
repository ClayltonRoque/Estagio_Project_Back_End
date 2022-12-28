import { PrismaClient } from "@prisma/client";
import Jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function selectColoboradores(req, res) {
  const Coloboradores = await prisma.coloborador.findMany({
    orderBy: { id: "asc" },
  });
  return res.status(200).json(Coloboradores);
}

export async function insertColoborador(req, res) {
  const { name, admission, login, password, role, type_blood } = req.body;
  if (!name || !admission || !login || !password || !role || !type_blood) {
    return res.status(400).json("Mande todas as variaveis");
  }
  const coloboradorInsert = await prisma.coloborador.create({
    data: {
      name,
      admission,
      role,
      type_blood,
      login,
      password,
    },
  });
  return res.status(201).json(coloboradorInsert);
}

export async function updateColoborador(req, res) {
  const { name, admission, login, password, role, type_blood } = req.body;
  if (!name || !admission || !login || !password || !role || type_blood) {
    return res.status(400).json("Mande todas as variaveis");
  }
  const coloboradorUpdate = await prisma.coloborador.update({
    where: { id },
    data: {
      name,
      admission,
      role,
      type_blood,
      login,
      password,
    },
  });
  return res.status(200).json(coloboradorUpdate);
}

export async function deleteColoborador(req, res) {
  const { id } = req.body;
  const intId = parseInt(id);

  if (!intId) {
    return res.status(400).json("Id require");
  }

  const coloboratorExist = await prisma.coloborador.findUnique({
    where: { id: intId },
  });

  if (!coloboratorExist) {
    return res.status(404).json("coloborator not find");
  }

  await prisma.coloborador.delete({
    where: { id: intId },
  });

  return res.status(200).send();
}

export async function coloborador_Authenticate(req, res) {
  const { login, password } = req.body;
  if (!login) {
    return res.status(400).json("Login is mandatory");
  }
  const coloboradorExist = await prisma.coloborador.findFirst({
    where: {
      login,
    },
  });

  if (!coloboradorExist) {
    return res.status(400).json("coloborator not exist");
  }
  console.log(password, coloboradorExist.password);
  if (password !== coloboradorExist.password) {
    return res.status(403).json("coloborator_name or coloborator_senha wrong");
  }

  const token = Jwt.sign(coloboradorExist, "SECRETKEY", {
    expiresIn: "1d",
  });

  return res.json({ auth: true, token: token, colaborador: coloboradorExist });
}

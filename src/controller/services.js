import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer"

const prisma = new PrismaClient();

export async function selectServices(req, res) {
    const Coloboradores = await prisma.service.findMany({
        orderBy:{id:"asc"}})
        return res.status(200).json(Coloboradores)
}

export async function insertService(req, res) {
    const {name, requester} = req.body;
    if(!name || !requester){
        return res.status(400).json("Mande todas as variaveis")
    }
    const serviceInsert = await prisma.service.create({
        data: {
            name,
            requester,
            "status": "pendente",
            "solicitation": new Date(),
            "end": new Date(),
        }
    })
    return res.status(201).json(serviceInsert)
}


export async function deleteService(req, res) {
  const { id } = req.body;
  const intId = parseInt(id)

  if(!intId){
    return res.status(400).json("Id require")
}

const serviceExist = await prisma.service.findUnique({
    where: { id: intId } 
});

if(!serviceExist) {
    return res.status(404).json("service not find")
}

await prisma.service.delete({
    where: {id: intId}
});

return res.status(200).send();

} 

export async function finalizeService(req, res){

    const { id } = req.body;
    const intId = parseInt(id)

    if(!intId){
        return res.status(400).json("Id require")
    }

    const updatedService = await prisma.service.update({
        where: {
            id
        },
        data: {
            status: 'Finalizado',
        },
      })

    sendEmail(updatedService.requester, updatedService.id)

    res.status(200).json("Service fineshed and email send")
    
  
}

export async function attendenceService(req, res){

    const { id } = req.body;
    const intId = parseInt(id)

    if(!intId){
        return res.status(400).json("Id require")
    }

    const updatedService = await prisma.service.update({
        where: {
            id
        },
        data: {
            status: 'Em atendimento',
        },
      })

    res.status(200).json("Service em atendimento")
}


async function sendEmail(email, id){
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "333026cd9da062",
            pass: "815094763fe25d"
        }
    });
    
    let info = await transport.sendMail({
        from: '"Normatel" <normatel@example.com>', 
        to: email, 
        subject: "Tarefa Finalizada",
        text: `A tarefa com o ID ${id} foi finalizada`
    });
        
    console.log("Message sent: %s", info.messageId);

}












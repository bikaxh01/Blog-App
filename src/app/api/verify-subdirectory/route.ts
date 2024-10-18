import { prisma_client } from "@/utils/DB";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const paramsString = searchParams.get("name")
    

    if(!paramsString){
        return Response.json({
            message:"Invalid Params"
        },{
            status:400
        })
    }

    const getSubdirectory = await prisma_client.site.findUnique({
        where:{
           subDirectory:paramsString
        }
    })

    if(getSubdirectory){
        return Response.json({
            message:"Name already Taken"
        },{
            status:400
        })
    }

    return Response.json({
        message:"OK"
    })

  } catch (error) {
    return Response.json({
        message:"Error while Verifying Sub Directory"
    },{
        status:500
    })
  }
}

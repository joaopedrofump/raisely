export const RAISELY_ENDPOINT = "https://api.raisely.com/v3/signup"

export const fetchRequest = (payload: any, url: string) : Promise<any> => {

    return new Promise(async (res:Function, rej:Function) =>{

        try {
            const result = await fetch(url,{headers:{'Content-Type':'application/json'}, method: 'post', body: JSON.stringify(payload)})
            const parsed = await result.json()
            if(result.ok) 
                res(parsed)
            
            else  
                rej(parsed)
        }

        catch(err) {
            rej('fetch error')
        }
    })

}
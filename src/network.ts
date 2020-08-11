export const RAISELY_ENDPOINT = "https://api.raisely.com/v3/signup"

export const fetchRequest = (payload: any, url: string) : Promise<any> => {

    return new Promise(async (res:Function, rej:Function) =>{

        try {
            const result = await fetch(url,{headers:{'Content-Type':'application/json'}, method: 'post', body: JSON.stringify(payload)})
            const parsed = await result.json()
            if(result.ok) {
                console.log(parsed)
                res(parsed)
            }
            else  {
                console.error('erro', parsed)
                rej(parsed)
            }
        }

        catch(err) {
            console.log('fetch error')
            rej('fetch error')
        }
    })

}
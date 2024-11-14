import jwt from "jsonwebtoken"

const secretKey = "45yujgfe456ujhgfr56yu"
const expiresIn = "24h"

export async function sign(payload: any) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, { expiresIn }, (error, token) => {
            if (error)
                return reject(error)
            resolve(token)
        })
    })
}
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const private_key = [
    '-----BEGIN PRIVATE KEY-----',
    process.env.PRIVATE_KEY as string,
    '-----END PRIVATE KEY-----'
].join('\n')

export const generateToken = (data: {username: string, email: string, id: number}): string => {
    return jwt.sign(data, private_key, {expiresIn: '12h'})
}

export const checkToken = (token?: string): boolean => {
    return !!decodeToken(token)
}

export const decodeToken = (token?: string): {username: string, email: string, id: number} | null => {
    if (!token) {
        return null
    }
    try {
        const data = jwt.verify(token, private_key) as {username: string, email: string, id: number}
        if (!!data.username) {
            return data
        }
        return null
    } catch (e) {
        return null
    }
}

export const hashPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

export const comparePassword = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash)
}
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid4 } from 'uuid';
import { Ed25519PublicKey, Ed25519Signature } from "@aptos-labs/ts-sdk"

@Injectable()
export class AuthService {    

    constructor (private jwtService: JwtService, private prismaService: PrismaService, private configService: ConfigService) {}

    async login(wallet_address: string, public_key: string, signature: string, message: string): Promise<{access_token: string}> {

        
        
        try {

            const publicKey = new Ed25519PublicKey(public_key);
            const signatureObj = new Ed25519Signature(signature);
            const encodedMessage = new TextEncoder().encode(message);

            const result = publicKey.verifySignature({
                message: encodedMessage,
                signature: signatureObj
            })

            if (!result) {
                throw new BadRequestException("Invalid signature!");
            }

            
        } catch (err) {
            throw new BadRequestException(err.message);
        }

        let user = await this.prismaService.user.findUnique({
            where: {
                walletAddress: wallet_address
            }
        })

        if (!user) {
            user = await this.prismaService.user.create({
                data: {
                    username: `User-${uuid4().toString()}`,
                    walletAddress: wallet_address,
                }
            })
        }

        const issuedAt = Math.floor(Date.now() / 1000);

        const jwtPayload = {
            walletAddress: user.walletAddress,
            userId: user.id,
            iat: issuedAt,
        };

        const access_token = this.jwtService.sign(jwtPayload, { expiresIn: this.configService.get("JWT_TOKEN_EXPIRY", "1d") });

        return { access_token }

    }

    async updateUser(userId: number, username: string, bio: string, profile_pic: string): Promise<User> {

        let toUpdate: any = {}

        if (username.trim().length !== 0) {
            toUpdate.username = username
        }

        if (bio.trim().length !== 0) {
            toUpdate.bio = bio
        }

        if (profile_pic.trim().length !== 0) {
            toUpdate.profile_pic = profile_pic
        }

        const user = await this.prismaService.user.update({
            where: {
                id: userId
            }, 
            data: toUpdate
        })
        
        return user
    }


}

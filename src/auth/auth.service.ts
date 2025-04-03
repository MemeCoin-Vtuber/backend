import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { ethers } from 'ethers';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid4 } from 'uuid';
@Injectable()
export class AuthService {

    constructor (private jwtService: JwtService, private prismaService: PrismaService, private configService: ConfigService) {}

    async login(wallet_address: string, signature: string, message: string): Promise<{access_token: string}> {

        const signersAddress = ethers.verifyMessage(message, signature);

        if (signersAddress !== wallet_address) {
            throw new BadRequestException("Signature didn't matched wallet address!");
        }

        let user = await this.prismaService.user.findUnique({
            where: {
                walletAddress: signersAddress
            }
        })

        if (!user) {
            user = await this.prismaService.user.create({
                data: {
                    username: `User-${uuid4().toString()}`,
                    walletAddress: signersAddress,
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

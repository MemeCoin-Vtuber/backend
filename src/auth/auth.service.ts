import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { User as PrivyUser } from '@privy-io/server-auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class AuthService {    

    constructor (private jwtService: JwtService, private prismaService: PrismaService, private configService: ConfigService) {}

    async login(userData: PrivyUser): Promise<User> {

        let user = await this.prismaService.user.findUnique({
            where: {
                walletAddress: userData.wallet?.address
            }
        })

        if (!user) {
            user = await this.prismaService.user.create({
                data: {
                    username: `User-${uuid4().toString()}`,
                    walletAddress: userData.wallet?.address!,
                }
            })
        }

        return user;

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
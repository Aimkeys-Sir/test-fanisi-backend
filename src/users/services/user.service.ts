import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandler } from '@nestjs/common/interfaces';
import { PageDto } from '../dto/page.dto';
import { UserDto } from '../dto/user.dto';
import { PageOptionsDto } from '../dto/page-option.dto';
import { PageMetaDto } from '../dto/page-meta.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginDto } from '../dto/login.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private readonly errorHandler: ErrorHandler,
  ) {}

  async getUsers(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    console.log(pageOptionsDto.name)
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder
      .where('user.name ilike :name', { name: `%${pageOptionsDto.name || ''}%` })
      .orderBy('user.createdAt', pageOptionsDto.order)
      .skip(((pageOptionsDto.page || 1) - 1) * (pageOptionsDto.take || 5))
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async create(user: UserDto): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(user.password as string, 10);
    user.password = hashedPassword;

    const existing = await this.userRepository.find({
      where: { email: user.email },
    });
    if (existing[0]) {
      throw new ConflictException('user with that email already exists');
    }

    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async getUser(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(updateUser: UpdateUserDto, id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = Object.assign(user, updateUser);
    return this.userRepository.save(updatedUser);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepository.remove(user);
  }

  async login(loginDto: LoginDto): Promise<{ user: User; token: string }> {
    const user: User = (
      await this.userRepository.find({ where: { email: loginDto.email } })
    )[0];
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(
      loginDto.password,
      user.password as string,
    );
    if (!isMatch) {
      throw new Error('Incorrect password');
    }
    try {
      const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET || 's3cret',
        {
          expiresIn: '24h',
        },
      );

      delete user.password;
      return { token, user };
    } catch (err) {
      throw new Error(err);
    }
  }

  async register(user: any, userDto: UserDto) {
    if (user?.isAdmin) {
      const _user = this.create(userDto);
      return _user;
    } else {
      throw new ForbiddenException(
        'You are not authorized to perform this action',
      );
    }
  }
}

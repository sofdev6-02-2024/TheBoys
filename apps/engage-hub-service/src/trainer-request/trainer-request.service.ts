import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { TrainerRequest } from './entities/trainer-request.entity';
import { UpdateTrainerRequestDto } from './dto/update-trainer-request.dto';
import { CreateTrainerRequestDto } from './dto/create-trainer-request.dto';

@Injectable()
export class TrainerRequestService {
  constructor(
    @InjectRepository(TrainerRequest)
    private readonly trainerRequestRepository: Repository<TrainerRequest>,
  ) {}

  async create(createTrainerRequestDto: CreateTrainerRequestDto) {
    const { userId } = createTrainerRequestDto;

    const activeRequest = await this.findOneActiveRequestByUserId(userId);
    if (activeRequest) {
      throw new BadRequestException('You already have a request under review.');
    }

    const newRequest = this.trainerRequestRepository.create(
      createTrainerRequestDto,
    );
    return this.trainerRequestRepository.save(newRequest);
  }

  async findAll() {
    return this.trainerRequestRepository.find({
      relations: ['certifications'],
    });
  }

  async findOne(id: UUID) {
    const request = await this.trainerRequestRepository.findOne({
      where: { TrainerRequestId: id },
      relations: ['certifications'],
    });
    if (!request) {
      throw new NotFoundException('Request not found.');
    }
    return request;
  }

  async update(id: UUID, updateTrainerRequestDto: UpdateTrainerRequestDto) {
    await this.trainerRequestRepository.update(id, updateTrainerRequestDto);

    return this.trainerRequestRepository.findOne({
      where: { TrainerRequestId: id },
    });
  }

  async remove(id: UUID) {
    await this.trainerRequestRepository.delete(id);
    return { message: `Request ${id} successfully deleted.` };
  }

  async findOneActiveRequestByUserId(userId: UUID) {
    return this.trainerRequestRepository.findOne({
      where: { userId, status: 'Pending' },
    });
  }
}

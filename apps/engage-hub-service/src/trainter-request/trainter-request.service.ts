import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { TrainerRequest } from './entities/trainter-request.entity';
import { UpdateTrainerRequestDto } from './dto/update-trainter-request.dto';
import { CreateTrainerRequestDto } from './dto/create-trainter-request.dto';

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
      throw new BadRequestException('Ya tienes una solicitud en revisión.');
    }

    const newRequest = this.trainerRequestRepository.create(createTrainerRequestDto);
    return this.trainerRequestRepository.save(newRequest);
  }

  findAll() {
    return this.trainerRequestRepository.find();
  }

  findOne(id: UUID) {
    return this.trainerRequestRepository.findOne({ where: { id } });
  }

  async update(id: UUID, updateTrainerRequestDto: UpdateTrainerRequestDto) {
    const request = await this.findOne(id);
    if (!request) throw new NotFoundException('Solicitud no encontrada.');

    await this.trainerRequestRepository.update(id, updateTrainerRequestDto);
    return this.trainerRequestRepository.findOne({ where: { id } });
  }

  remove(id: UUID) {
    this.trainerRequestRepository.delete({ id });
    return { id };
  }

  async findOneActiveRequestByUserId(userId: UUID) {
    return this.trainerRequestRepository.findOne({
      where: { userId, status: 'Pending' },
    });
  }
}

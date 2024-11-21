import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { TrainerRequest } from './entities/trainer-request.entity';
import { UpdateTrainerRequestDto } from './dto/update-trainer-request.dto';
import { CreateTrainerRequestDto } from './dto/create-trainer-request.dto';
import { Certification } from './entities/certification.entity';

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
    const existingRequest = await this.findOne(id);
  
    if (!existingRequest) {
      throw new NotFoundException('Request not found.');
    }
  
    const { certifications, userId: _userId, ...updatableFields } = updateTrainerRequestDto;
      


    await this.trainerRequestRepository.update(id, updatableFields);
  
    if (certifications) {
      await this.trainerRequestRepository
        .createQueryBuilder()
        .relation(TrainerRequest, 'certifications')
        .of(existingRequest)
        .remove(existingRequest.certifications);
  
      const updatedCertifications = certifications.map(cert => 
        plainToInstance(Certification, cert)
      );
  
      await this.trainerRequestRepository.manager.save(updatedCertifications);

      await this.trainerRequestRepository
        .createQueryBuilder()
        .relation(TrainerRequest, 'certifications')
        .of(existingRequest)
        .add(updatedCertifications);
    }
  
    return this.trainerRequestRepository.findOne({
      where: { TrainerRequestId: id },
      relations: ['certifications'],
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

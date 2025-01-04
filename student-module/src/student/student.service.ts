import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(newStudent);
  }

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  updateStudent(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    return this.studentRepository.save({ id, ...updateStudentDto });
  }

  deleteStudent(id: number): Promise<void> {
    return this.studentRepository.delete(id).then(() => undefined);
  }
}

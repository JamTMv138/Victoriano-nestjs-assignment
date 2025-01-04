import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, Res } from '@nestjs/common';
import { StudentsService } from '../students/students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Response } from 'express';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('view')
  async getStudentView(@Res() res: Response) {
    const students = await this.studentsService.getAllStudents();
    res.setHeader('Content-Type', 'text/html');
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Student Module</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: 'Poppins', sans-serif;
              }

              body {
                  background: #1a1a1a;
                  color: #e0e0e0;
                  min-height: 100vh;
              }

              .container {
                  max-width: 1400px;
                  margin: 0 auto;
                  padding: 2rem;
              }

              .header {
                  display: grid;
                  grid-template-columns: 1fr auto;
                  align-items: center;
                  margin-bottom: 3rem;
                  padding: 1rem 2rem;
                  background: #2d2d2d;
                  border-radius: 15px;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
              }

              h1 {
                  font-size: 2.5rem;
                  color: #e0e0e0;
                  margin: 0;
                  position: relative;
                  padding-left: 1rem;
                  border-left: 4px solid #7C4DFF;
              }

              .add-button {
                  background: linear-gradient(135deg, #7C4DFF, #6C3FEF);
                  color: white;
                  padding: 1rem 2rem;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;
                  text-decoration: none;
                  display: inline-flex;
                  align-items: center;
                  gap: 0.5rem;
                  font-weight: 500;
                  transition: all 0.3s ease;
                  box-shadow: 0 4px 15px rgba(124, 77, 255, 0.2);
              }

              .student-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                  gap: 2rem;
                  padding: 1rem;
              }

              .student-card {
                  background: #2d2d2d;
                  border-radius: 15px;
                  padding: 1.5rem;
                  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
                  transition: all 0.3s ease;
                  position: relative;
                  overflow: hidden;
                  border: 1px solid rgba(255,255,255,0.1);
              }

              .student-card::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 4px;
                  background: linear-gradient(90deg, #7C4DFF, #6C3FEF);
              }

              .student-name {
                  font-size: 1.4rem;
                  color: #e0e0e0;
                  margin-bottom: 1.5rem;
                  font-weight: 600;
                  padding-bottom: 0.5rem;
                  border-bottom: 1px solid rgba(255,255,255,0.1);
              }

              .student-info {
                  margin: 1rem 0;
                  color: #b0b0b0;
                  display: flex;
                  align-items: center;
                  gap: 1rem;
                  padding: 0.5rem;
                  border-radius: 8px;
                  transition: all 0.3s ease;
              }

              .student-info:hover {
                  background: rgba(255,255,255,0.05);
              }

              .student-info i {
                  width: 24px;
                  height: 24px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: rgba(124, 77, 255, 0.1);
                  border-radius: 6px;
                  color: #7C4DFF;
              }

              .button-group {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 1rem;
                  margin-top: 1.5rem;
                  padding-top: 1rem;
                  border-top: 1px solid rgba(255,255,255,0.1);
              }

              .edit-button, .delete-button {
                  padding: 0.8rem;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;
                  font-weight: 500;
                  transition: all 0.3s ease;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 0.5rem;
              }

              .edit-button {
                  background: rgba(33, 150, 243, 0.1);
                  color: #2196F3;
                  border: 1px solid rgba(33, 150, 243, 0.2);
              }

              .delete-button {
                  background: rgba(244, 67, 54, 0.1);
                  color: #f44336;
                  border: 1px solid rgba(244, 67, 54, 0.2);
              }

              .edit-button:hover {
                  background: rgba(33, 150, 243, 0.2);
                  transform: translateY(-2px);
              }

              .delete-button:hover {
                  background: rgba(244, 67, 54, 0.2);
                  transform: translateY(-2px);
              }

              .empty-state {
                  grid-column: 1 / -1;
                  text-align: center;
                  padding: 4rem;
                  background: #2d2d2d;
                  border-radius: 15px;
                  border: 1px solid rgba(255,255,255,0.1);
              }

              .empty-state h2 {
                  color: #e0e0e0;
                  margin-bottom: 1rem;
              }

              .empty-state p {
                  color: #b0b0b0;
              }

              @media (max-width: 768px) {
                  .header {
                      grid-template-columns: 1fr;
                      gap: 1rem;
                      text-align: center;
                  }

                  h1 {
                      border-left: none;
                      border-bottom: 4px solid #7C4DFF;
                      padding: 0 0 1rem 0;
                  }

                  .student-grid {
                      gap: 1rem;
                  }
              }

              // Add a cool scrollbar style
              ::-webkit-scrollbar {
                  width: 10px;
              }

              ::-webkit-scrollbar-track {
                  background: #1a1a1a;
              }

              ::-webkit-scrollbar-thumb {
                  background: #7C4DFF;
                  border-radius: 5px;
              }

              ::-webkit-scrollbar-thumb:hover {
                  background: #6C3FEF;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Student Module</h1>
                  <a href="/students/new" class="add-button">
                      <i class="fas fa-plus"></i> Add New Student
                  </a>
              </div>
              <div class="student-grid">
                  ${students.length ? students.map((student, index) => `
                      <div class="student-card" data-id="${student.id}" style="animation-delay: ${index * 0.1}s">
                          <div class="student-name">${student.firstName} ${student.lastName}</div>
                          <div class="student-info">
                              <i class="fas fa-envelope"></i>
                              ${student.email}
                          </div>
                          <div class="student-info">
                              <i class="fas fa-calendar-alt"></i>
                              Enrolled: ${new Date(student.enrollmentDate).toLocaleDateString()}
                          </div>
                          <div class="student-info">
                              <i class="fas fa-clock"></i>
                              Created: ${new Date(student.createdAt).toLocaleString()}
                          </div>
                          <div class="student-info">
                              <i class="fas fa-edit"></i>
                              Updated: ${new Date(student.updatedAt).toLocaleString()}
                          </div>
                          <div class="button-group">
                              <a href="/students/edit/${student.id}" class="edit-button">
                                  <i class="fas fa-pencil-alt"></i> Edit
                              </a>
                              <button onclick="deleteStudent(${student.id})" class="delete-button">
                                  <i class="fas fa-trash-alt"></i> Delete
                              </button>
                          </div>
                      </div>
                  `).join('') : `
                      <div class="empty-state">
                          <h2>No students found</h2>
                          <p>Add your first student to get started</p>
                      </div>
                  `}
              </div>
          </div>
          <script>
              function showNotification(message, type = 'success') {
                  const notification = document.createElement('div');
                  notification.className = 'notification';
                  notification.innerHTML = \`
                      <i class="fas \${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                      \${message}
                  \`;
                  document.body.appendChild(notification);
                  
                  setTimeout(() => {
                      notification.addEventListener('animationend', function(e) {
                          if (e.animationName === 'fadeOut') {
                              notification.remove();
                          }
                      });
                  }, 3000);
              }

              function deleteStudent(id) {
                  if (confirm('Are you sure you want to delete this student?')) {
                      const card = document.querySelector(\`[data-id="\${id}"]\`);
                      
                      fetch('/students/' + id, {
                          method: 'DELETE',
                      })
                      .then(response => response.json())
                      .then(data => {
                          if (card) {
                              showNotification('Student deleted successfully!');
                              card.style.opacity = '0';
                              card.style.transform = 'scale(0.9)';
                              card.style.transition = 'all 0.3s ease';
                              
                              setTimeout(() => {
                                  card.remove();
                                  // Check if there are no more students
                                  const remainingCards = document.querySelectorAll('.student-card');
                                  if (remainingCards.length === 0) {
                                      const grid = document.querySelector('.student-grid');
                                      grid.innerHTML = \`
                                          <div class="empty-state">
                                              <h2>No students found</h2>
                                              <p>Add your first student to get started</p>
                                          </div>
                                      \`;
                                  }
                              }, 300);
                          }
                      })
                      .catch(error => {
                          showNotification('Error deleting student', 'error');
                          console.error('Error:', error);
                      });
                  }
              }
          </script>
      </body>
      </html>
    `;
    res.send(html);
  }

  @Get('new')
  newStudentForm(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html');
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Add New Student</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: 'Poppins', sans-serif;
              }

              body {
                  background: #1a1a1a;
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 2rem;
              }

              .container {
                  width: 100%;
                  max-width: 500px;
                  background: #2d2d2d;
                  padding: 2rem;
                  border-radius: 16px;
                  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
                  animation: slideIn 0.5s ease;
              }

              h1 {
                  color: #e0e0e0;
                  text-align: center;
                  margin-bottom: 2rem;
                  font-size: 1.8rem;
              }

              .form-group {
                  margin-bottom: 1.5rem;
              }

              label {
                  display: block;
                  margin-bottom: 0.5rem;
                  color: #b0b0b0;
                  font-weight: 500;
                  font-size: 0.9rem;
              }

              input {
                  width: 100%;
                  padding: 0.75rem 1rem;
                  border: 2px solid #404040;
                  border-radius: 8px;
                  font-size: 1rem;
                  transition: all 0.3s ease;
                  outline: none;
                  background: #3d3d3d;
                  color: #e0e0e0;
              }

              input:focus {
                  border-color: #7C4DFF;
                  box-shadow: 0 0 0 3px rgba(124, 77, 255, 0.2);
              }

              .button-group {
                  display: flex;
                  gap: 1rem;
                  margin-top: 2rem;
              }

              button, .back-button {
                  flex: 1;
                  padding: 0.75rem;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;
                  font-weight: 500;
                  font-size: 1rem;
                  transition: all 0.3s ease;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 0.5rem;
                  text-decoration: none;
              }

              button {
                  background: #7C4DFF;
                  color: white;
              }

              .back-button {
                  background: #404040;
                  color: #e0e0e0;
              }

              button:hover {
                  background: #6C3FEF;
                  transform: translateY(-2px);
                  box-shadow: 0 4px 12px rgba(124, 77, 255, 0.2);
              }

              .back-button:hover {
                  background: #505050;
                  transform: translateY(-2px);
                  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              }

              @keyframes slideIn {
                  from {
                      opacity: 0;
                      transform: translateY(20px);
                  }
                  to {
                      opacity: 1;
                      transform: translateY(0);
                  }
              }

              .input-icon {
                  position: relative;
              }

              .input-icon i {
                  position: absolute;
                  left: 1rem;
                  top: 50%;
                  transform: translateY(-50%);
                  color: #808080;
              }

              .input-icon input {
                  padding-left: 2.5rem;
              }

              @media (max-width: 480px) {
                  .container {
                      padding: 1.5rem;
                  }

                  .button-group {
                      flex-direction: column;
                  }
              }

              /* Notification styles */
              .notification {
                  position: fixed;
                  top: 20px;
                  right: 20px;
                  padding: 16px 24px;
                  background: #7C4DFF;
                  color: white;
                  border-radius: 8px;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  z-index: 1000;
                  animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
                  font-weight: 500;
              }

              .notification.error {
                  background: #f44336;
              }

              .notification i {
                  font-size: 1.2rem;
              }

              @keyframes slideInRight {
                  from {
                      transform: translateX(100%);
                      opacity: 0;
                  }
                  to {
                      transform: translateX(0);
                      opacity: 1;
                  }
              }

              @keyframes fadeOut {
                  from {
                      transform: translateX(0);
                      opacity: 1;
                  }
                  to {
                      transform: translateX(10px);
                      opacity: 0;
                  }
              }
          </style>
          <script>
              function showNotification(message, type = 'success') {
                  const notification = document.createElement('div');
                  notification.className = 'notification ' + (type === 'error' ? 'error' : '');
                  notification.innerHTML = \`
                      <i class="fas \${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                      \${message}
                  \`;
                  document.body.appendChild(notification);
                  
                  setTimeout(() => {
                      notification.addEventListener('animationend', function(e) {
                          if (e.animationName === 'fadeOut') {
                              notification.remove();
                          }
                      });
                  }, 3000);
              }

              function createStudent(event) {
                  event.preventDefault();
                  
                  const formData = {
                      firstName: document.getElementById('firstName').value,
                      lastName: document.getElementById('lastName').value,
                      email: document.getElementById('email').value,
                      enrollmentDate: document.getElementById('enrollmentDate').value
                  };

                  fetch('/students', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(formData)
                  })
                  .then(response => response.json())
                  .then(data => {
                      showNotification('Student created successfully!');
                      setTimeout(() => {
                          window.location.href = '/students/view';
                      }, 2000);
                  })
                  .catch(error => {
                      showNotification('Error creating student', 'error');
                      console.error('Error:', error);
                  });

                  return false;
              }
          </script>
      </head>
      <body>
          <div class="container">
              <h1><i class="fas fa-user-plus"></i> Add New Student</h1>
              <form onsubmit="return createStudent(event)">
                  <div class="form-group">
                      <label for="firstName">First Name</label>
                      <div class="input-icon">
                          <i class="fas fa-user"></i>
                          <input type="text" id="firstName" name="firstName" required placeholder="Enter first name">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="lastName">Last Name</label>
                      <div class="input-icon">
                          <i class="fas fa-user"></i>
                          <input type="text" id="lastName" name="lastName" required placeholder="Enter last name">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="email">Email Address</label>
                      <div class="input-icon">
                          <i class="fas fa-envelope"></i>
                          <input type="email" id="email" name="email" required placeholder="Enter email address">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="enrollmentDate">Enrollment Date</label>
                      <div class="input-icon">
                          <i class="fas fa-calendar"></i>
                          <input type="date" id="enrollmentDate" name="enrollmentDate" required>
                      </div>
                  </div>
                  <div class="button-group">
                      <a href="/students/view" class="back-button">
                          <i class="fas fa-arrow-left"></i> Back
                      </a>
                      <button type="submit">
                          <i class="fas fa-save"></i> Save Student
                      </button>
                  </div>
              </form>
          </div>
      </body>
      </html>
    `;
    res.send(html);
  }

  // Branch: create-students
  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.studentsService.createStudent(createStudentDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Student created successfully',
      data: student,
    };
  }

  // Branch: read-students
  @Get()
  async getAllStudents() {
    const students = await this.studentsService.getAllStudents();
    return {
      statusCode: HttpStatus.OK,
      data: students,
    };
  }

  @Get(':id')
  async getStudentById(@Param('id') id: number) {
    const student = await this.studentsService.getStudentById(id);
    return {
      statusCode: HttpStatus.OK,
      data: student,
    };
  }

  // Branch: update-students
  @Put(':id')
  async updateStudent(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    const student = await this.studentsService.updateStudent(id, updateStudentDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Student updated successfully',
      data: student,
    };
  }

  // Branch: delete-students
  @Delete(':id')
  async deleteStudent(@Param('id') id: number) {
    await this.studentsService.deleteStudent(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Student deleted successfully',
    };
  }

  @Get('edit/:id')
  async editStudentForm(@Param('id') id: number, @Res() res: Response) {
    const student = await this.studentsService.getStudentById(id);
    res.setHeader('Content-Type', 'text/html');
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Edit Student</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: 'Poppins', sans-serif;
              }

              body {
                  background: #1a1a1a;
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 2rem;
              }

              .container {
                  width: 100%;
                  max-width: 500px;
                  background: #2d2d2d;
                  padding: 2rem;
                  border-radius: 16px;
                  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
                  animation: slideIn 0.5s ease;
              }

              h1 {
                  color: #e0e0e0;
                  text-align: center;
                  margin-bottom: 2rem;
                  font-size: 1.8rem;
              }

              .form-group {
                  margin-bottom: 1.5rem;
              }

              label {
                  display: block;
                  margin-bottom: 0.5rem;
                  color: #b0b0b0;
                  font-weight: 500;
                  font-size: 0.9rem;
              }

              input {
                  width: 100%;
                  padding: 0.75rem 1rem;
                  border: 2px solid #404040;
                  border-radius: 8px;
                  font-size: 1rem;
                  transition: all 0.3s ease;
                  outline: none;
                  background: #3d3d3d;
                  color: #e0e0e0;
              }

              input:focus {
                  border-color: #7C4DFF;
                  box-shadow: 0 0 0 3px rgba(124, 77, 255, 0.2);
              }

              .button-group {
                  display: flex;
                  gap: 1rem;
                  margin-top: 2rem;
              }

              button, .back-button {
                  flex: 1;
                  padding: 0.75rem;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;
                  font-weight: 500;
                  font-size: 1rem;
                  transition: all 0.3s ease;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 0.5rem;
                  text-decoration: none;
              }

              button {
                  background: #7C4DFF;
                  color: white;
              }

              .back-button {
                  background: #404040;
                  color: #e0e0e0;
              }

              button:hover {
                  background: #6C3FEF;
                  transform: translateY(-2px);
                  box-shadow: 0 4px 12px rgba(124, 77, 255, 0.2);
              }

              .back-button:hover {
                  background: #505050;
                  transform: translateY(-2px);
                  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              }

              @keyframes slideIn {
                  from {
                      opacity: 0;
                      transform: translateY(20px);
                  }
                  to {
                      opacity: 1;
                      transform: translateY(0);
                  }
              }

              .input-icon {
                  position: relative;
              }

              .input-icon i {
                  position: absolute;
                  left: 1rem;
                  top: 50%;
                  transform: translateY(-50%);
                  color: #808080;
              }

              .input-icon input {
                  padding-left: 2.5rem;
              }

              @media (max-width: 480px) {
                  .container {
                      padding: 1.5rem;
                  }

                  .button-group {
                      flex-direction: column;
                  }
              }

              /* Notification styles */
              .notification {
                  position: fixed;
                  top: 20px;
                  right: 20px;
                  padding: 16px 24px;
                  background: #7C4DFF;
                  color: white;
                  border-radius: 8px;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  z-index: 1000;
                  animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
                  font-weight: 500;
              }

              .notification.error {
                  background: #f44336;
              }

              .notification i {
                  font-size: 1.2rem;
              }

              @keyframes slideInRight {
                  from {
                      transform: translateX(100%);
                      opacity: 0;
                  }
                  to {
                      transform: translateX(0);
                      opacity: 1;
                  }
              }

              @keyframes fadeOut {
                  from {
                      transform: translateX(0);
                      opacity: 1;
                  }
                  to {
                      transform: translateX(10px);
                      opacity: 0;
                  }
              }
          </style>
          <script>
              function showNotification(message, type = 'success') {
                  const notification = document.createElement('div');
                  notification.className = 'notification ' + (type === 'error' ? 'error' : '');
                  notification.innerHTML = \`
                      <i class="fas \${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                      \${message}
                  \`;
                  document.body.appendChild(notification);
                  
                  setTimeout(() => {
                      notification.addEventListener('animationend', function(e) {
                          if (e.animationName === 'fadeOut') {
                              notification.remove();
                          }
                      });
                  }, 3000);
              }

              function updateStudent(id) {
                  const formData = {
                      firstName: document.getElementById('firstName').value,
                      lastName: document.getElementById('lastName').value,
                      email: document.getElementById('email').value,
                      enrollmentDate: document.getElementById('enrollmentDate').value
                  };

                  fetch('/students/' + id, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(formData)
                  })
                  .then(response => response.json())
                  .then(data => {
                      showNotification('Student updated successfully!');
                      setTimeout(() => {
                          window.location.href = '/students/view';
                      }, 2000);
                  })
                  .catch(error => {
                      showNotification('Error updating student', 'error');
                      console.error('Error:', error);
                  });

                  return false;
              }
          </script>
      </head>
      <body>
          <div class="container">
              <h1><i class="fas fa-user-edit"></i> Edit Student</h1>
              <form onsubmit="return updateStudent(${student.id})">
                  <div class="form-group">
                      <label for="firstName">First Name</label>
                      <div class="input-icon">
                          <i class="fas fa-user"></i>
                          <input type="text" id="firstName" name="firstName" value="${student.firstName}" required>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="lastName">Last Name</label>
                      <div class="input-icon">
                          <i class="fas fa-user"></i>
                          <input type="text" id="lastName" name="lastName" value="${student.lastName}" required>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="email">Email Address</label>
                      <div class="input-icon">
                          <i class="fas fa-envelope"></i>
                          <input type="email" id="email" name="email" value="${student.email}" required>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="enrollmentDate">Enrollment Date</label>
                      <div class="input-icon">
                          <i class="fas fa-calendar"></i>
                          <input type="date" id="enrollmentDate" name="enrollmentDate" 
                                 value="${new Date(student.enrollmentDate).toISOString().split('T')[0]}" required>
                      </div>
                  </div>
                  <div class="button-group">
                      <a href="/students/view" class="back-button">
                          <i class="fas fa-arrow-left"></i> Back
                      </a>
                      <button type="submit">
                          <i class="fas fa-save"></i> Update Student
                      </button>
                  </div>
              </form>
          </div>
      </body>
      </html>
    `;
    res.send(html);
  }
} 
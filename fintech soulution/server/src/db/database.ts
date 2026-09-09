export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ROLE_STUDENT' | 'ROLE_TEACHER' | 'ROLE_ADMIN';
  studentId?: string; // e.g. STU-001
}

export interface StudentRecord {
  id: string;
  userId: string;
  teacherId: string;
  studentUniqueId: string; // STU-001
  name: string;
  email: string;
  subject: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE';
  registeredDate: string;
}

export interface PaymentRecord {
  id: string;
  studentId: string;
  month: string;
  paymentDate: string;
  amount: number;
  method: 'Card' | 'Bank Transfer' | 'QR Payment' | 'Cash' | '—';
  status: 'Paid' | 'Pending' | 'Overdue';
  transactionId?: string;
}

export interface NotificationRecord {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'PAYMENT_DUE' | 'PAYMENT_SUCCESS' | 'OVERDUE' | 'SYSTEM';
  isRead: boolean;
  createdAt: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  subjects: string[];
  qualification: string;
  experienceYears: number;
  bio: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  branchName: string;
  defaultMonthlyFee: number;
  paymentNotes: string;
}

// In-Memory Database initialized with default mock records matching the development guide specs
class Database {
  private teacherProfile: TeacherProfile = {
    id: 'usr_tch_1',
    name: 'Dr. Wickramasinghe',
    title: 'Senior Mathematics Lecturer & Tutor',
    email: 'teacher@ria.com',
    phone: '+94 77 987 6543',
    subjects: ['Combined Mathematics', 'Higher Mathematics', 'Physics'],
    qualification: 'Ph.D. in Applied Mathematics (Univ. of Colombo), B.Sc. (Hons)',
    experienceYears: 12,
    bio: 'Dedicated tuition educator specializing in Advanced Level Combined Mathematics and Physics with over 12 years of proven success preparing students for national examinations.',
    bankName: 'Commercial Bank of Ceylon',
    accountNumber: '8004591204',
    accountName: 'Dr. A. Wickramasinghe',
    branchName: 'Colombo Main Branch',
    defaultMonthlyFee: 3000,
    paymentNotes: 'Please include student ID (e.g. STU-001) as reference in bank transfer remark.'
  };
  private users: User[] = [
    {
      id: 'usr_stu_1',
      name: 'Pasindu Jayasinghe',
      email: 'pasindu@example.com',
      role: 'ROLE_STUDENT',
      studentId: 'STU-001',
    },
    {
      id: 'usr_tch_1',
      name: 'Dr. Wickramasinghe',
      email: 'teacher@ria.com',
      role: 'ROLE_TEACHER',
    },
  ];

  private students: StudentRecord[] = [
    {
      id: 'stu_1',
      userId: 'usr_stu_1',
      teacherId: 'usr_tch_1',
      studentUniqueId: 'STU-001',
      name: 'Pasindu Jayasinghe',
      email: 'pasindu@example.com',
      subject: 'Combined Mathematics',
      phone: '+94 77 123 4567',
      status: 'ACTIVE',
      registeredDate: '2026-01-15',
    },
    {
      id: 'stu_2',
      userId: 'usr_stu_2',
      teacherId: 'usr_tch_1',
      studentUniqueId: 'STU-002',
      name: 'Kavindu Perera',
      email: 'kavindu@example.com',
      subject: 'Physics',
      phone: '+94 71 987 6543',
      status: 'ACTIVE',
      registeredDate: '2026-02-01',
    },
    {
      id: 'stu_3',
      userId: 'usr_stu_3',
      teacherId: 'usr_tch_1',
      studentUniqueId: 'STU-003',
      name: 'Amaya Fernando',
      email: 'amaya@example.com',
      subject: 'Chemistry',
      phone: '+94 76 555 4321',
      status: 'ACTIVE',
      registeredDate: '2026-03-10',
    },
  ];

  private payments: PaymentRecord[] = [
    {
      id: 'pay_1',
      studentId: 'STU-001',
      month: 'August 2026',
      paymentDate: 'Aug 10',
      amount: 3000,
      method: 'Card',
      status: 'Paid',
      transactionId: 'TP-8241',
    },
    {
      id: 'pay_2',
      studentId: 'STU-001',
      month: 'July 2026',
      paymentDate: 'Jul 12',
      amount: 3000,
      method: 'Bank Transfer',
      status: 'Paid',
      transactionId: 'TP-7102',
    },
    {
      id: 'pay_3',
      studentId: 'STU-001',
      month: 'June 2026',
      paymentDate: 'Jun 15',
      amount: 3000,
      method: 'QR Payment',
      status: 'Paid',
      transactionId: 'TP-6091',
    },
    {
      id: 'pay_4',
      studentId: 'STU-001',
      month: 'May 2026',
      paymentDate: '—',
      amount: 3000,
      method: '—',
      status: 'Overdue',
    },
  ];

  private notifications: NotificationRecord[] = [
    {
      id: 'notif_1',
      userId: 'STU-001',
      title: 'September Payment Due',
      message: 'Rs. 3,000 is due in 5 days (Sep 15, 2026).',
      type: 'PAYMENT_DUE',
      isRead: false,
      createdAt: '2026-09-01',
    },
    {
      id: 'notif_2',
      userId: 'STU-001',
      title: 'August Payment Received',
      message: 'Receipt #TP-8241 sent to your email.',
      type: 'PAYMENT_SUCCESS',
      isRead: true,
      createdAt: '2026-08-10',
    },
  ];

  // User queries
  findUserByStudentId(studentId: string): User | undefined {
    return this.users.find((u) => u.studentId?.toUpperCase() === studentId.toUpperCase());
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  // Student queries
  getStudentById(studentUniqueId: string): StudentRecord | undefined {
    return this.students.find((s) => s.studentUniqueId.toUpperCase() === studentUniqueId.toUpperCase());
  }

  getAllStudents(): StudentRecord[] {
    return this.students;
  }

  addStudent(student: Omit<StudentRecord, 'id' | 'studentUniqueId' | 'registeredDate'>): StudentRecord {
    const nextNum = this.students.length + 1;
    const studentUniqueId = `STU-${String(nextNum).padStart(3, '0')}`;
    const newStudent: StudentRecord = {
      ...student,
      id: `stu_${Date.now()}`,
      studentUniqueId,
      registeredDate: new Date().toISOString().split('T')[0],
    };
    this.students.push(newStudent);

    // Also register user profile for login
    this.users.push({
      id: `usr_${newStudent.id}`,
      name: newStudent.name,
      email: newStudent.email,
      role: 'ROLE_STUDENT',
      studentId: studentUniqueId,
    });

    return newStudent;
  }

  // Payment queries
  getPaymentsByStudent(studentUniqueId: string): PaymentRecord[] {
    return this.payments.filter((p) => p.studentId.toUpperCase() === studentUniqueId.toUpperCase());
  }

  getAllPayments(): PaymentRecord[] {
    return this.payments;
  }

  addPayment(studentUniqueId: string, amount: number, method: PaymentRecord['method']): PaymentRecord {
    const txNum = Math.floor(1000 + Math.random() * 9000);
    const newPayment: PaymentRecord = {
      id: `pay_${Date.now()}`,
      studentId: studentUniqueId,
      month: 'September 2026',
      paymentDate: 'Sep 06',
      amount,
      method,
      status: 'Paid',
      transactionId: `TP-${txNum}`,
    };
    this.payments.unshift(newPayment);

    // Push notification
    this.notifications.unshift({
      id: `notif_${Date.now()}`,
      userId: studentUniqueId,
      title: 'Payment Successful',
      message: `Rs. ${amount.toLocaleString()} received for September 2026. Receipt #${newPayment.transactionId} generated.`,
      type: 'PAYMENT_SUCCESS',
      isRead: false,
      createdAt: new Date().toISOString().split('T')[0],
    });

    return newPayment;
  }

  updateStudent(studentUniqueId: string, updates: Partial<StudentRecord>): StudentRecord | null {
    const idx = this.students.findIndex(s => s.studentUniqueId.toUpperCase() === studentUniqueId.toUpperCase() || s.id === studentUniqueId);
    if (idx === -1) return null;
    this.students[idx] = { ...this.students[idx], ...updates };
    return this.students[idx];
  }

  deleteStudent(studentUniqueId: string): boolean {
    const initialLen = this.students.length;
    this.students = this.students.filter(s => s.studentUniqueId.toUpperCase() !== studentUniqueId.toUpperCase() && s.id !== studentUniqueId);
    return this.students.length < initialLen;
  }

  updatePayment(id: string, updates: Partial<PaymentRecord>): PaymentRecord | null {
    const idx = this.payments.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.payments[idx] = { ...this.payments[idx], ...updates };
    return this.payments[idx];
  }

  deletePayment(id: string): boolean {
    const initialLen = this.payments.length;
    this.payments = this.payments.filter(p => p.id !== id);
    return this.payments.length < initialLen;
  }

  // Notifications
  getNotifications(userId: string): NotificationRecord[] {
    return this.notifications.filter((n) => n.userId.toUpperCase() === userId.toUpperCase());
  }

  // Teacher Profile
  getTeacherProfile(): TeacherProfile {
    return this.teacherProfile;
  }

  updateTeacherProfile(updates: Partial<TeacherProfile>): TeacherProfile {
    this.teacherProfile = { ...this.teacherProfile, ...updates };
    return this.teacherProfile;
  }
}

export const db = new Database();

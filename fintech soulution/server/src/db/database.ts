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
  private teacherProfiles: TeacherProfile[] = [
    {
      id: 'usr_tch_ranil',
      name: 'Ranil Fernando',
      title: 'Senior English Lecturer',
      email: 'ranil@ria.com',
      phone: '+94 77 111 2222',
      subjects: ['English', 'English course'],
      qualification: 'B.A. in English (Univ. of Kelaniya), TEFL Certified',
      experienceYears: 10,
      bio: 'Specialist in English Language and Certificate English Courses at RIA Institute.',
      bankName: 'Commercial Bank',
      accountNumber: '8001002001',
      accountName: 'Ranil Fernando',
      branchName: 'Main Branch',
      defaultMonthlyFee: 3000,
      paymentNotes: 'Include student ID reference on payments.',
    },
    {
      id: 'usr_tch_lakshan',
      name: 'Lakshan Fernando',
      title: 'Head of IT & Software Education',
      email: 'lakshan@ria.com',
      phone: '+94 77 222 3333',
      subjects: ['IT', 'IT Course'],
      qualification: 'B.Sc. in Computer Science & Information Technology',
      experienceYears: 8,
      bio: 'Leading ICT & Practical IT Certificate Courses at RIA Institute.',
      bankName: 'Commercial Bank',
      accountNumber: '8001002002',
      accountName: 'Lakshan Fernando',
      branchName: 'Main Branch',
      defaultMonthlyFee: 3500,
      paymentNotes: 'Include student ID reference on payments.',
    },
    {
      id: 'usr_tch_ishan',
      name: 'Ishan Darshana',
      title: 'Commerce & Accounting Department Head',
      email: 'ishan@ria.com',
      phone: '+94 77 333 4444',
      subjects: ['Accounting', 'Econ', 'AAT'],
      qualification: 'B.Com (Hons), CIMA Passed Finalist, AAT Fellow Member',
      experienceYears: 11,
      bio: 'Senior lecturer for Advanced Level Accounting, Economics, and AAT professional courses.',
      bankName: 'Commercial Bank',
      accountNumber: '8001002003',
      accountName: 'Ishan Darshana',
      branchName: 'Main Branch',
      defaultMonthlyFee: 3000,
      paymentNotes: 'Include student ID reference on payments.',
    },
    {
      id: 'usr_tch_suranga',
      name: 'Suranga Hettiarachchi',
      title: 'Sinhala & History Department Head',
      email: 'suranga@ria.com',
      phone: '+94 77 444 5555',
      subjects: ['Sinhala', 'History'],
      qualification: 'B.A. (Hons) in Sinhala & History (Univ. of Peradeniya)',
      experienceYears: 14,
      bio: 'Expert educator in National Syllabus Sinhala Language, Literature and Sri Lankan History.',
      bankName: 'Commercial Bank',
      accountNumber: '8001002004',
      accountName: 'Suranga Hettiarachchi',
      branchName: 'Main Branch',
      defaultMonthlyFee: 2500,
      paymentNotes: 'Include student ID reference on payments.',
    },
    {
      id: 'usr_tch_lahiru',
      name: 'Lahiru Dombawalage',
      title: 'Mathematics & Science Senior Lecturer',
      email: 'lahiru@ria.com',
      phone: '+94 77 555 6666',
      subjects: ['Maths', 'Science'],
      qualification: 'B.Sc. Physical Science (Univ. of Sri Jayewardenepura)',
      experienceYears: 9,
      bio: 'Dedicated tutor delivering Mathematics and Science with simple conceptual learning.',
      bankName: 'Commercial Bank',
      accountNumber: '8001002005',
      accountName: 'Lahiru Dombawalage',
      branchName: 'Main Branch',
      defaultMonthlyFee: 3000,
      paymentNotes: 'Include student ID reference on payments.',
    },
  ];

  private users: User[] = [
    {
      id: 'usr_tch_ranil',
      name: 'Ranil Fernando',
      email: 'ranil@ria.com',
      role: 'ROLE_TEACHER',
    },
    {
      id: 'usr_tch_lakshan',
      name: 'Lakshan Fernando',
      email: 'lakshan@ria.com',
      role: 'ROLE_TEACHER',
    },
    {
      id: 'usr_tch_ishan',
      name: 'Ishan Darshana',
      email: 'ishan@ria.com',
      role: 'ROLE_TEACHER',
    },
    {
      id: 'usr_tch_suranga',
      name: 'Suranga Hettiarachchi',
      email: 'suranga@ria.com',
      role: 'ROLE_TEACHER',
    },
    {
      id: 'usr_tch_lahiru',
      name: 'Lahiru Dombawalage',
      email: 'lahiru@ria.com',
      role: 'ROLE_TEACHER',
    },
    {
      id: 'usr_tch_1',
      name: 'Dr. Wickramasinghe',
      email: 'teacher@ria.com',
      role: 'ROLE_TEACHER',
    },
  ];

  private students: StudentRecord[] = [];
  private payments: PaymentRecord[] = [];

  constructor() {
    this.seed170Students();
  }

  private seed170Students() {
    const firstNames = [
      'Pasindu', 'Kavindu', 'Amaya', 'Kasun', 'Nimal', 'Amal', 'Dilani', 'Sanduni', 'Tharindu', 'Ishara',
      'Hiruni', 'Kaveen', 'Shenali', 'Nethmi', 'Nuwan', 'Dinuka', 'Ruwan', 'Chamari', 'Ashan', 'Bhavanthi',
      'Chathura', 'Dasun', 'Eranga', 'Gayan', 'Hashini', 'Imesha', 'Janith', 'Kusal', 'Lahiru', 'Mahesh',
      'Nadeesha', 'Oshada', 'Pathum', 'Rashmi', 'Sachini', 'Thisara', 'Udesh', 'Vishwa', 'Yashodhara', 'Anuki'
    ];

    const lastNames = [
      'Jayasinghe', 'Perera', 'Fernando', 'Silva', 'Jayasuriya', 'Rathnayake', 'Bandara', 'Gunawardena',
      'Wickramasinghe', 'Abeyrathne', 'Herath', 'Dissanayake', 'Liyanage', 'Fonseka', 'Cooray', 'Rodrigo',
      'Peiris', 'Alwis', 'Mendis', 'Wijesinghe', 'Senanayake', 'Karunaratne', 'Ranasinghe', 'Rajapaksha',
      'De Silva', 'Gamage', 'Kulatunga', 'Amarasinghe', 'Tennekoon', 'Jayawardena'
    ];

    const subjects = [
      'Combined Mathematics', 'Physics', 'Chemistry', 'IT', 'English',
      'Accounting', 'Economics', 'Science', 'Sinhala', 'History'
    ];

    const methods: PaymentRecord['method'][] = ['Card', 'Bank Transfer', 'QR Payment', 'Cash'];

    for (let i = 1; i <= 170; i++) {
      const fn = firstNames[(i - 1) % firstNames.length];
      const ln = lastNames[((i - 1) * 7 + 3) % lastNames.length];
      const fullName = `${fn} ${ln}`;
      const studentUniqueId = `STU-${String(i).padStart(3, '0')}`;
      const email = `${fn.toLowerCase()}.${ln.toLowerCase().replace(/\s+/g, '')}@ria.com`;
      const phone = `+94 7${(i % 4) === 0 ? '7' : (i % 4) === 1 ? '1' : (i % 4) === 2 ? '6' : '0'} ${String(100 + (i * 37) % 900)} ${String(1000 + (i * 53) % 9000)}`;
      const subject = subjects[(i - 1) % subjects.length];
      const feeAmount = i % 7 === 0 ? 3500 : i % 5 === 0 ? 2500 : 3000;
      const registeredDate = `2026-0${(i % 8) + 1}-15`;

      const studentRec: StudentRecord = {
        id: `stu_${i}`,
        userId: `usr_stu_${i}`,
        teacherId: 'usr_tch_1',
        studentUniqueId,
        name: fullName,
        email,
        subject,
        phone,
        status: i <= 162 ? 'ACTIVE' : 'INACTIVE',
        registeredDate,
      };

      this.students.push(studentRec);

      this.users.push({
        id: `usr_stu_${i}`,
        name: fullName,
        email,
        role: 'ROLE_STUDENT',
        studentId: studentUniqueId,
      });

      // Payments: 1..110 Paid, 111..153 Pending, 154..170 Overdue
      let payStatus: PaymentRecord['status'] = 'Paid';
      let payDate = `Sep 0${(i % 6) + 1}`;
      let pMethod: PaymentRecord['method'] = methods[(i - 1) % methods.length];

      if (i > 110 && i <= 153) {
        payStatus = 'Pending';
        payDate = '—';
        pMethod = '—';
      } else if (i > 153) {
        payStatus = 'Overdue';
        payDate = '—';
        pMethod = '—';
      }

      this.payments.push({
        id: `pay_${i}`,
        studentId: studentUniqueId,
        month: 'September 2026',
        paymentDate: payDate,
        amount: feeAmount,
        method: pMethod,
        status: payStatus,
        transactionId: payStatus === 'Paid' ? `TP-${9000 + i}` : undefined,
      });
    }
  }

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
    const todayStr = new Date().toISOString().split('T')[0];
    const newStudent: StudentRecord = {
      ...student,
      id: `stu_${Date.now()}`,
      studentUniqueId,
      registeredDate: todayStr,
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

    // Automatically create initial Pending payment record upon registration by teacher
    this.payments.unshift({
      id: `pay_${Date.now()}`,
      studentId: studentUniqueId,
      month: 'September 2026',
      paymentDate: '—',
      amount: 3000,
      method: '—',
      status: 'Pending',
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

  addNotification(userId: string, title: string, message: string, type: NotificationRecord['type'] = 'SYSTEM'): NotificationRecord {
    const newNotif: NotificationRecord = {
      id: `notif_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      userId: userId.toUpperCase(),
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.notifications.unshift(newNotif);
    return newNotif;
  }

  // Teacher Profile
  getTeacherProfile(teacherId: string = 'usr_tch_1'): TeacherProfile {
    let profile = this.teacherProfiles.find(p => p.id === teacherId || p.email.toLowerCase() === teacherId.toLowerCase());
    if (!profile) {
      profile = this.teacherProfiles[0];
    }
    return profile;
  }

  updateTeacherProfile(teacherId: string, updates: Partial<TeacherProfile>): TeacherProfile {
    const idx = this.teacherProfiles.findIndex(p => p.id === teacherId || p.email.toLowerCase() === teacherId.toLowerCase());
    if (idx !== -1) {
      this.teacherProfiles[idx] = { ...this.teacherProfiles[idx], ...updates };
      return this.teacherProfiles[idx];
    }
    this.teacherProfiles[0] = { ...this.teacherProfiles[0], ...updates };
    return this.teacherProfiles[0];
  }

  addTeacher(teacher: { name: string; email: string; subject: string; phone: string }): TeacherProfile {
    const id = `usr_tch_${Date.now()}`;
    const newProfile: TeacherProfile = {
      id,
      name: teacher.name,
      title: `${teacher.subject} Lecturer & Tutor`,
      email: teacher.email,
      phone: teacher.phone || '+94 77 000 0000',
      subjects: [teacher.subject || 'General Tuition'],
      qualification: 'B.Sc. / Lecturer',
      experienceYears: 5,
      bio: `Professional tuition educator specializing in ${teacher.subject}.`,
      bankName: 'Commercial Bank of Ceylon',
      accountNumber: '8001234567',
      accountName: teacher.name,
      branchName: 'Main Branch',
      defaultMonthlyFee: 3000,
      paymentNotes: 'Please include student reference on transfer.',
    };
    this.teacherProfiles.push(newProfile);
    this.users.push({
      id,
      name: teacher.name,
      email: teacher.email,
      role: 'ROLE_TEACHER',
    });
    return newProfile;
  }
}

export const db = new Database();

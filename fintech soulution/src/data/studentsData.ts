export interface StudentItem {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  contact: string;
  fee: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  lastPayment: string;
  activeStatus: boolean;
  subject?: string;
  phone?: string;
}

export interface PaymentRecordItem {
  id: string;
  studentName: string;
  studentId: string;
  initials: string;
  avatarBg: string;
  month: string;
  amount: string;
  method: string;
  date: string;
  status: 'PAID' | 'PROCESSING' | 'PENDING' | 'OVERDUE';
}

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

const bgColors = [
  'bg-blue-600', 'bg-emerald-600', 'bg-purple-600', 'bg-indigo-600', 'bg-pink-600',
  'bg-orange-500', 'bg-cyan-600', 'bg-teal-600', 'bg-rose-600', 'bg-violet-600'
];

const subjects = [
  'Combined Mathematics', 'Physics', 'Chemistry', 'IT', 'English',
  'Accounting', 'Economics', 'Science', 'Sinhala', 'History'
];

const methods = ['Card Payment', 'Bank Transfer', 'QR Payment', 'Cash'];

const generate170Data = () => {
  const students: StudentItem[] = [];
  const payments: PaymentRecordItem[] = [];

  for (let i = 1; i <= 170; i++) {
    const fn = firstNames[(i - 1) % firstNames.length];
    const ln = lastNames[((i - 1) * 7 + 3) % lastNames.length];
    const fullName = `${fn} ${ln}`;
    const studentId = `STU-${String(i).padStart(3, '0')}`;
    const email = `${fn.toLowerCase()}.${ln.toLowerCase().replace(/\s+/g, '')}@ria.com`;
    const phone = `+94 7${(i % 4) === 0 ? '7' : (i % 4) === 1 ? '1' : (i % 4) === 2 ? '6' : '0'} ${String(100 + (i * 37) % 900)} ${String(1000 + (i * 53) % 9000)}`;
    const avatarBg = bgColors[(i - 1) % bgColors.length];
    const subject = subjects[(i - 1) % subjects.length];
    const feeAmount = i % 7 === 0 ? 3500 : i % 5 === 0 ? 2500 : 3000;
    const feeStr = `Rs. ${feeAmount.toLocaleString()}`;

    // Distribution:
    // 1..110 (65%) PAID
    // 111..153 (25%) PENDING
    // 154..170 (10%) OVERDUE
    let status: 'PAID' | 'PENDING' | 'OVERDUE' = 'PAID';
    let lastPayment = `Sep 0${(i % 6) + 1}, 2026`;
    let pMethod = methods[(i - 1) % methods.length];
    let pDate = `Sep 0${(i % 6) + 1}, 2026`;
    let payStatus: 'PAID' | 'PROCESSING' | 'PENDING' | 'OVERDUE' = 'PAID';

    if (i > 110 && i <= 153) {
      status = 'PENDING';
      payStatus = 'PENDING';
      lastPayment = 'Aug 12, 2026';
      pMethod = '—';
      pDate = '—';
    } else if (i > 153) {
      status = 'OVERDUE';
      payStatus = 'OVERDUE';
      lastPayment = 'Jul 15, 2026';
      pMethod = '—';
      pDate = '—';
    }

    students.push({
      id: studentId,
      name: fullName,
      initials: fn.charAt(0).toUpperCase(),
      avatarBg,
      contact: email,
      fee: feeStr,
      status,
      lastPayment,
      activeStatus: i <= 162, // 162 active, 8 inactive
      subject,
      phone,
    });

    payments.push({
      id: `TXN-${String(900 + i)}`,
      studentName: fullName,
      studentId,
      initials: fn.charAt(0).toUpperCase(),
      avatarBg,
      month: 'September 2026',
      amount: feeStr,
      method: pMethod,
      date: pDate,
      status: payStatus,
    });
  }

  return { students, payments };
};

const data = generate170Data();
export const mockStudents170: StudentItem[] = data.students;
export const mockPayments170: PaymentRecordItem[] = data.payments;

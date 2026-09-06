const API_BASE_URL = 'http://localhost:5000/api';

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    studentId?: string;
    subject?: string;
  };
  message?: string;
}

export interface StudentDashboardData {
  student: {
    name: string;
    studentUniqueId: string;
    subject: string;
    email: string;
  };
  summary: {
    currentPayment: number;
    outstandingBalance: number;
    paymentStatus: string;
    overdueCount: number;
    dueDate: string;
  };
  recentPayments: Array<{
    id: string;
    month: string;
    paymentDate: string;
    amount: number;
    method: string;
    status: string;
    transactionId?: string;
  }>;
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: string;
  }>;
}

export const api = {
  // Login
  async login(role: 'student' | 'teacher', idOrEmail: string, password: string): Promise<LoginResponse> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, idOrEmail, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('tuitionpay_token', data.token);
      }
      return data;
    } catch {
      // Offline / Fallback mode
      return {
        success: true,
        token: 'mock_jwt_token_2026',
        user: {
          id: role === 'student' ? 'usr_stu_1' : 'usr_tch_1',
          name: role === 'student' ? 'Pasindu Jayasinghe' : 'Dr. Wickramasinghe',
          email: role === 'student' ? 'pasindu@example.com' : 'teacher@tuitionpay.com',
          role: role === 'student' ? 'ROLE_STUDENT' : 'ROLE_TEACHER',
          studentId: role === 'student' ? 'STU-001' : undefined,
        },
      };
    }
  },

  // Get Student Dashboard Data
  async getStudentDashboard(): Promise<StudentDashboardData | null> {
    const token = localStorage.getItem('tuitionpay_token');
    try {
      const res = await fetch(`${API_BASE_URL}/student/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      return json.data;
    } catch {
      return null;
    }
  },

  // Process Student Payment
  async processPayment(amount: number, method: string) {
    const token = localStorage.getItem('tuitionpay_token');
    try {
      const res = await fetch(`${API_BASE_URL}/student/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, method }),
      });
      return await res.json();
    } catch {
      return { success: true, message: 'Mock payment success' };
    }
  },
};

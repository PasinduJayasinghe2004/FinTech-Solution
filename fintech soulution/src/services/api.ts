const API_BASE_URL = 'http://localhost:5000/api';

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  studentId?: string;
  subject?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: UserData;
  message?: string;
}

export const apiService = {
  async login(role: 'student' | 'teacher', idOrEmail: string, password: string): Promise<AuthResponse> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, idOrEmail, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('ria_token', data.token);
        localStorage.setItem('ria_user', JSON.stringify(data.user));
      }
      return data;
    } catch (err) {
      return { success: false, message: 'Unable to connect to backend database server' };
    }
  },

  async registerStudent(studentData: { name: string; email: string; subject: string; phone: string }): Promise<any> {
    try {
      const token = localStorage.getItem('ria_token');
      const res = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(studentData),
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Failed to create student' };
    }
  },

  async getStudentDashboard(): Promise<any> {
    try {
      const token = localStorage.getItem('ria_token');
      const res = await fetch(`${API_BASE_URL}/student/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Failed to fetch student dashboard data' };
    }
  },

  async getTeacherDashboard(): Promise<any> {
    try {
      const token = localStorage.getItem('ria_token');
      const res = await fetch(`${API_BASE_URL}/teacher/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Failed to fetch teacher dashboard data' };
    }
  },

  async fetchStudents(): Promise<any[]> {
    try {
      const token = localStorage.getItem('ria_token');
      const res = await fetch(`${API_BASE_URL}/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      return data.students || [];
    } catch (err) {
      return [];
    }
  },

  async processPayment(amount: number, method: string): Promise<any> {
    try {
      const token = localStorage.getItem('ria_token');
      const res = await fetch(`${API_BASE_URL}/student/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, method }),
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Failed to process payment' };
    }
  },

  async getPaymentHistory(): Promise<any> {
    try {
      const token = localStorage.getItem('ria_token');
      const res = await fetch(`${API_BASE_URL}/student/payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Failed to fetch payment history' };
    }
  },

  async getTeacherProfile(): Promise<any> {
    try {
      const token = localStorage.getItem('ria_token');
      const res = await fetch(`${API_BASE_URL}/teacher/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Failed to fetch teacher profile' };
    }
  },

  async updateTeacherProfile(profileData: any): Promise<any> {
    try {
      const token = localStorage.getItem('ria_token');
      const res = await fetch(`${API_BASE_URL}/teacher/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Failed to update teacher profile' };
    }
  },
};

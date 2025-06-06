export interface CertificateData {
    name: string;
    score: string;
    rank: string;
    tournamentTitle: string;
  }
  
  export interface CertificateResult {
    submissionId: string;
    status: 'created' | 'exists' | 'failed';
    certificateUrl?: string;
    certificateId?: string;
    emailSent?: boolean;
    emailError?: string;
    message?: string;
  }
  
  export interface GenerateCertificatesResponse {
    success: boolean;
    generatedCount: number;
    existingCount: number;
    failedCount: number;
    emailSentCount: number;
    emailFailedCount: number;
    results: CertificateResult[];
    message: string;
  }
  
  export interface EmailParams {
    to: string;
    userName: string;
    tournamentTitle: string;
    certificateId: string;
  }
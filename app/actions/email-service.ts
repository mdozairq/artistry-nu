import sgMail from '@sendgrid/mail';
import { EmailParams } from '@/types/types';

if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function sendCertificateEmail(params: EmailParams): Promise<boolean> {
    try {
        const { to, userName, tournamentTitle, certificateId } = params;

        const msg = {
            to,
            from: 'certificates@artistrynu.com',
            subject: `Your certificate for ${tournamentTitle} is ready!`,
            text: `Dear ${userName || 'Participant'},
      
Your certificate for the tournament "${tournamentTitle}" has been generated.
Please download it from: https://portal.artistrynu.in/dashboard/certificates/${certificateId}

Congratulations on your achievement!

Best regards,
ArtistryNU Team`,
            html: `<p>Dear ${userName || 'Participant'},</p>
      
<p>Your certificate for the tournament <strong>"${tournamentTitle}"</strong> has been generated.</p>
<p>Please download it from: <a href="https://portal.artistrynu.in/dashboard/certificates/${certificateId}">Certificate Download Link</a></p>

<p>Congratulations on your achievement!</p>

<p>Best regards,<br>
ArtistryNU Team</p>`,
        };

        await sgMail.send(msg);
        return true;
    } catch (error) {
        console.error('Error sending certificate email:', error);
        return false;
    }
}
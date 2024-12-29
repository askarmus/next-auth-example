import "server-only";
import { MailStatus } from "@/lib/types";
import sendMail from "@/mail/send";
import { render } from "@react-email/render";
import InterviewInvitationEmail from "../templates/Interview.Invitation.email";


export async function sendInvitationEmail(
  candidateName: string,
  invitationId: string,
  jobTitle: string,
  expiryDate: string,
  to: string
): Promise<MailStatus> {
  try {
    const html = await render(
      <InterviewInvitationEmail
        candidateName={candidateName}
        invitationId={invitationId}
        jobTitle={jobTitle}
        expiryDate={expiryDate}
      />
    );

    await sendMail(
      to,
      "Interview Invitation",
      "You're invited to an AI-based interview",
      html
    );

    return {
      status: "success",
      message: "Invitation email sent successfully!",
    };
  } catch (err) {
    console.error("Error sending invitation email:", err);
    return {
      status: "error",
      message: "Failed to send the invitation email.",
    };
  }
}

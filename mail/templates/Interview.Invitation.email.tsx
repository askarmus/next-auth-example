import React from 'react'
import { Body } from '@react-email/body'
import { Button } from '@react-email/button'
import { Head } from '@react-email/head'
import { Html } from '@react-email/html'
import { Hr } from '@react-email/hr'
import { Preview } from '@react-email/preview'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import { Img } from '@react-email/img'
import { Container } from '@react-email/container'

interface InterviewInvitationProps {
    candidateName: string
    invitationId: string
    jobTitle: string
    expiryDate: string // Format: 'YYYY-MM-DD'
}

export default function InterviewInvitationEmail({
    candidateName,
    invitationId,
    jobTitle,
    expiryDate,
}: InterviewInvitationProps) {
    return (
        <Html>
            <Head />
            <Preview>You're Invited to an AI-Based Interview</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Container
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Img
                            src={`https://yourcompany.com/logo.png`} // Replace with your company logo URL
                            width="140"
                            height="140"
                            alt="Company Logo"
                            className="mx-auto my-20"
                        />
                    </Container>

                    <Text style={paragraph}>Dear {candidateName},</Text>
                    <Text style={paragraph}>
                        We are excited to invite you to an AI-based interview
                        for the position of <strong>{jobTitle}</strong>.
                    </Text>
                    <Text style={paragraph}>
                        Please complete the interview before:
                        <br />
                        <strong>{expiryDate}</strong>
                    </Text>
                    <Text style={paragraph}>
                        Click the button below to start your interview. Make
                        sure you have a stable internet connection, and find a
                        quiet place to complete the session.
                    </Text>
                    <Section style={btnContainer}>
                        <Button
                            style={button}
                            href={`${process.env.BASE_URL}/interview/${invitationId}`}
                        >
                            Start Interview
                        </Button>
                    </Section>
                    <Text style={paragraph}>
                        Thank you for your interest in joining our team. If you
                        have any questions or issues, please contact us.
                    </Text>
                    <Text style={paragraph}>
                        Best regards,
                        <br />
                        [Your Company Name]
                    </Text>
                    <Hr style={hr} />
                    <Text style={footer}>
                        This email was sent by [Your Company Name].
                        <br />
                        For support, contact us at{' '}
                        <a href="mailto:support@yourcompany.com">
                            support@yourcompany.com
                        </a>
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
}

const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
}

const btnContainer = {
    textAlign: 'center' as const,
    display: 'flex',
    justifyContent: 'center',
}

const button = {
    backgroundColor: '#4CAF50',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px',
    width: '15rem',
}

const hr = {
    borderColor: '#cccccc',
    margin: '20px 0',
}

const footer = {
    color: '#8898aa',
    fontSize: '12px',
}

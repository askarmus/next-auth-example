'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Clock, Mic, SkipForward, RefreshCw, Globe, MapPin } from 'lucide-react'

export default function InterviewPage() {
    const [currentTime, setCurrentTime] = useState('11:07:14 AM')
    const [skippedQuestions, setSkippedQuestions] = useState([
        'Why do you want this job?',
        'What are your strengths?',
    ])

    const skipQuestion = (questionText: string) => {
        setSkippedQuestions((prev) => [...prev, questionText])
    }

    const restartQuestion = (index: number) => {
        const questionToRestart = skippedQuestions[index]
        setSkippedQuestions((prev) => prev.filter((_, i) => i !== index))
        // Here you would typically add logic to reinsert the question into the main question flow
        console.log(`Restarting question: ${questionToRestart}`)
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-primary text-primary-foreground shadow-md">
                <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
                    <h1 className="text-lg font-semibold">
                        Assessment Interview System
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{currentTime}</span>
                        </div>
                        <Button variant="destructive" size="sm">
                            End Interview
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main
                className="container mx-auto max-w-7xl px-4 py-8 pb-24 overflow-y-auto"
                style={{ maxHeight: 'calc(100vh - 4rem)' }}
            >
                <div className="mb-8 text-center">
                    <h3 className="text-lg font-medium text-primary">
                        Software Engineer Position (First Round)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Acme Corporation
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Instructions Card */}
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3 className="text-primary text-2xl font-semibold leading-none tracking-tight">
                                Instructions
                            </h3>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Please follow the instructions carefully
                                    during the interview.
                                </p>
                                <div className="rounded-lg border p-4">
                                    <p className="font-medium">
                                        Tell us about yourself.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="mb-2 font-medium text-orange-600">
                                    Skipped Questions:
                                </h3>
                                {skippedQuestions.length > 0 ? (
                                    <ul className="space-y-3">
                                        {skippedQuestions.map(
                                            (question, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-center justify-between bg-orange-50 p-2 rounded-md"
                                                >
                                                    <span className="text-sm text-orange-700">
                                                        {question}
                                                    </span>
                                                    <Button
                                                        onClick={() =>
                                                            restartQuestion(
                                                                index
                                                            )
                                                        }
                                                        size="sm"
                                                        className="bg-orange-500 hover:bg-orange-600 text-white"
                                                    >
                                                        <RefreshCw className="h-4 w-4 mr-2" />
                                                        Resume
                                                    </Button>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No skipped questions.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Candidate Section */}
                    <div className="space-y-6">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="text-primary text-2xl font-semibold leading-none tracking-tight">
                                    Candidate Video
                                </h3>
                            </div>
                            <div className="p-6 pt-0">
                                <div className="aspect-video overflow-hidden rounded-lg bg-black">
                                    {/* Video player would go here */}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="text-primary text-2xl font-semibold leading-none tracking-tight">
                                    Candidate Information
                                </h3>
                            </div>
                            <div className="p-6 pt-0">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage
                                            src="/placeholder.svg"
                                            alt="Candidate"
                                        />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold">
                                            John Doe
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Software Engineer
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Navigation */}
            <footer className="fixed bottom-0 left-0 right-0 bg-background p-4 shadow-top z-10">
                <div className="container mx-auto max-w-7xl flex items-center justify-between">
                    <Button variant="outline" className="gap-2">
                        <Mic className="h-4 w-4" />
                        Answer
                    </Button>
                    <div className="flex gap-2">
                        <Button className="gap-2">Next</Button>
                        <Button
                            variant="secondary"
                            className="gap-2"
                            onClick={() =>
                                skipQuestion('Tell us about yourself.')
                            }
                        >
                            <SkipForward className="h-4 w-4" />
                            Skip
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    )
}

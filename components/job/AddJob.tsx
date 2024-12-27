'use client'

import React, { useState } from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import {
    TextField,
    Button,
    Typography,
    Box,
    CircularProgress,
    IconButton,
    Tooltip,
    Alert,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { ExperienceLevel } from '@/lib/enum/experience.level'
import Image from 'next/image'
interface JobFormData {
    jobTitle: string
    description: string
    questions: { value: string }[]
    status: string
    expereinceLevel?: string
}

const AddJob: React.FC = () => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        getValues,
        formState: { errors },
    } = useForm<JobFormData>({
        defaultValues: { questions: [], status: 'open', expereinceLevel: '' }, // Default value for status
    })

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: 'questions',
    })

    const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedExperience, setSelectedExperience] = useState<
        ExperienceLevel | undefined
    >(undefined)

    const fetchQuestions = async () => {
        const jobTitle = getValues('jobTitle')
        const description = getValues('description')

        if (!jobTitle || !description || !selectedExperience) {
            setError(
                'Please fill in Job Title, Description, and Years of Experience before generating questions.'
            )
            return
        }

        setError(null)
        setIsLoadingQuestions(true)

        try {
            const response = await axios.post(
                '/api/openai/generate-questions',
                {
                    jobTitle,
                    description,
                    selectedExperience,
                }
            )

            const { questions } = response.data

            if (questions && questions.length) {
                replace(questions.map((q: string) => ({ value: q }))) // Map each question into an object with `value`
            } else {
                setError('No questions were generated. Please try again.')
            }
        } catch (error: unknown) {
            console.error('Error generating questions:', error)
            setError('Failed to generate questions. Please try again.')
        } finally {
            setIsLoadingQuestions(false)
        }
    }

    const onSubmit: SubmitHandler<JobFormData> = async (data) => {
        try {
            data.expereinceLevel = selectedExperience?.toString()
            const response = await axios.post('/api/job', data) // `status` will always be "open" here
            console.log('Job created:', response.data)
            console.log('Job datadatadatadatadatadatadatadatadatadata:', data)
            reset()
        } catch (error: unknown) {
            console.error('Failed to create job', error)
        }
    }

    return (
        <Box p={4}>
            {error && (
                <Alert severity="error" style={{ marginBottom: '16px' }}>
                    {error}
                </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={3}>
                    <TextField
                        label="Job Title"
                        fullWidth
                        {...register('jobTitle', {
                            required: 'Job title is required',
                            maxLength: 100,
                        })}
                        error={!!errors.jobTitle}
                        helperText={
                            errors.jobTitle?.message ||
                            'Enter the job title (max 100 characters)'
                        }
                        variant="outlined"
                    />
                </Box>

                <Box mb={3}>
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        {...register('description', {
                            required: 'Description is required',
                            minLength: {
                                value: 10,
                                message:
                                    'Description must be at least 10 characters long',
                            },
                        })}
                        error={!!errors.description}
                        helperText={
                            errors.description?.message ||
                            'Provide a detailed description of the job'
                        }
                        variant="outlined"
                    />
                </Box>

                <div className="w-full  mb-8 bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex items-center gap-2 text-lg font-semibold whitespace-nowrap border-b sm:border-b-0 sm:border-r border-gray-200 pb-4 sm:pb-0 sm:pr-4 w-full sm:w-auto">
                            <div className="bg-[#19c37d] p-1.5 rounded">
                                <Image
                                    src="https://cdn-icons-png.flaticon.com/512/9626/9626678.png"
                                    alt="AI Icon"
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                />
                            </div>
                            <span>Generate question using AI</span>
                        </div>
                        <div className="flex-grow border-b sm:border-b-0 sm:border-r border-gray-200 pb-4 sm:pb-0 sm:pr-4">
                            <FormControl>
                                <RadioGroup
                                    row
                                    value={selectedExperience || ''}
                                    onChange={(e) =>
                                        setSelectedExperience(
                                            e.target.value as ExperienceLevel
                                        )
                                    }
                                >
                                    {Object.values(ExperienceLevel).map(
                                        (level) => (
                                            <FormControlLabel
                                                key={level}
                                                value={level}
                                                control={<Radio />}
                                                label={level}
                                            />
                                        )
                                    )}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="w-full sm:w-auto pt-4 sm:pt-0">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={fetchQuestions}
                                disabled={isLoadingQuestions}
                            >
                                {isLoadingQuestions ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    'Generate Questions'
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {fields.map((field, index) => (
                    <Box
                        key={field.id}
                        mb={2}
                        display="flex"
                        alignItems="center"
                        gap={2}
                    >
                        <Tooltip title={`Question ${index + 1}`} arrow>
                            <TextField
                                fullWidth
                                {...register(`questions.${index}.value`, {
                                    required: true,
                                })}
                                defaultValue={field.value}
                                variant="outlined"
                            />
                        </Tooltip>
                        <IconButton onClick={() => remove(index)} color="error">
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    </Box>
                ))}

                <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => append({ value: '' })}
                    color="success"
                >
                    Add Question
                </Button>

                <Box mt={4} display="flex" justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default AddJob

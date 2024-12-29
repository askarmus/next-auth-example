'use client'

import React, { useState } from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import {
    TextField,
    Box,
    IconButton,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { ExperienceLevel } from '@/lib/enum/experience.level'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useSnackbar } from '@/lib/service/SnackbarService'
import AdminButton from '../Btn'
import AddIcon from '@mui/icons-material/Add'

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
        defaultValues: { questions: [], status: 'open', expereinceLevel: '' },
    })

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: 'questions',
    })

    const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)
    const [isSubmiting, setSubmiting] = useState(false)
    const [selectedExperience, setSelectedExperience] = useState<
        ExperienceLevel | undefined
    >(undefined)
    const { data: session } = useSession()
    const { showSuccess, showError } = useSnackbar()
    const [questionError, setQuestionError] = useState<string | null>(null)

    const fetchQuestions = async () => {
        const jobTitle = getValues('jobTitle')
        const description = getValues('description')

        if (!jobTitle || !description || !selectedExperience) {
            showError('Please fill in Job Title, Description, and job level')
            return
        }

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
                showError('No questions were generated. Please try again.')
            }
        } catch (error: unknown) {
            console.error('Error generating questions:', error)
            showError('Failed to generate questions. Please try again.')
        } finally {
            setIsLoadingQuestions(false)
        }
    }

    const onSubmit: SubmitHandler<JobFormData> = async (data) => {
        setQuestionError(
            !data.questions || data.questions.length === 0
                ? 'Please add at least one question.'
                : null
        )
        if (!data.questions || data.questions.length === 0) return

        try {
            const transformedData = {
                ...data,
                userId: session?.user?.id || '',
                questions: data.questions.map((q) => q.value),
                experienceLevel: selectedExperience?.toString(),
            }
            setSubmiting(true)
            const response = await axios.post('/api/job', transformedData)
            showSuccess('Job has been created successfully.')
            setSubmiting(false)

            reset()
        } catch (error: unknown) {
            console.error('Failed to create job', error)
            setSubmiting(false)
        }
    }

    return (
        <Box p={4}>
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
                            <FormControl
                                error={!!errors.expereinceLevel}
                                component="fieldset"
                            >
                                <RadioGroup
                                    row
                                    value={selectedExperience || ''}
                                    {...register('expereinceLevel', {
                                        required:
                                            'Please select an experience level.',
                                        onChange: (e) =>
                                            setSelectedExperience(
                                                e.target
                                                    .value as ExperienceLevel
                                            ),
                                    })}
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
                                {errors.expereinceLevel && (
                                    <span style={{ color: 'red' }}>
                                        {errors.expereinceLevel.message}
                                    </span>
                                )}
                            </FormControl>
                        </div>
                        <div className="w-full sm:w-auto pt-4 sm:pt-0">
                            <AdminButton
                                variant="outlined"
                                onClick={fetchQuestions}
                                loading={isLoadingQuestions}
                            >
                                {isLoadingQuestions
                                    ? 'Generating...'
                                    : 'Generate Questions'}
                            </AdminButton>
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
                        <TextField
                            fullWidth
                            {...register(`questions.${index}.value`, {
                                required: true,
                            })}
                            defaultValue={field.value}
                            variant="outlined"
                        />

                        <IconButton onClick={() => remove(index)} color="error">
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    </Box>
                ))}
                <Box mt={4}>
                    <AdminButton
                        variant="outlined"
                        icon={<AddIcon />}
                        onClick={() => {
                            append({ value: '' })
                            setQuestionError(null)
                        }}
                    >
                        Add Question
                    </AdminButton>

                    {questionError && (
                        <p style={{ color: 'red', marginTop: '8px' }}>
                            {questionError}
                        </p>
                    )}
                </Box>
                <Box mt={4} display="flex" justifyContent="flex-end">
                    <AdminButton type="submit" loading={isSubmiting}>
                        {isSubmiting ? 'Saving...' : 'Save'}
                    </AdminButton>
                </Box>
            </form>
        </Box>
    )
}

export default AddJob

'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


interface JobFormData {
  jobTitle: string;
  description: string;
  totalExperience: string;
  questions: { value: string }[]; // Updated to array of objects
  status: string; // Default status remains as "open"
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
    defaultValues: { questions: [], status: 'open', totalExperience: '' }, // Default value for status
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'questions',
  });

  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [questionCount, setQuestionCount] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async () => {
    const jobTitle = getValues('jobTitle');
    const description = getValues('description');
    const yearsOfExperience = getValues('totalExperience');

    if (!jobTitle || !description || !yearsOfExperience) {
      setError('Please fill in Job Title, Description, and Years of Experience before generating questions.');
      return;
    }

    setError(null);
    setIsLoadingQuestions(true);

    try {
      const response = await axios.post('/api/openai/generate-questions', {
        jobTitle,
        description,
        yearsOfExperience,
      });

      const { questions } = response.data;

      if (questions && questions.length) {
        replace(questions.map((q: string) => ({ value: q }))); // Map each question into an object with `value`
      } else {
        setError('No questions were generated. Please try again.');
      }
    } catch (error: unknown) {
      console.error('Error generating questions:', error);
      setError('Failed to generate questions. Please try again.');
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const onSubmit: SubmitHandler<JobFormData> = async (data) => {
    try {
      const response = await axios.post('/api/job', data); // `status` will always be "open" here
      console.log('Job created:', response.data);
      reset();
    } catch (error: unknown) {
      console.error('Failed to create job', error);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Add New Job
      </Typography>
      {error && (
        <Alert severity="error" style={{ marginBottom: '16px' }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Job Title */}
        <Box mb={3}>
          <TextField
            label="Job Title"
            fullWidth
            {...register('jobTitle', { required: 'Job title is required', maxLength: 100 })}
            error={!!errors.jobTitle}
            helperText={errors.jobTitle?.message || 'Enter the job title (max 100 characters)'}
            variant="outlined"
          />
        </Box>

        {/* Description */}
        <Box mb={3}>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            {...register('description', {
              required: 'Description is required',
              minLength: { value: 10, message: 'Description must be at least 10 characters long' },
            })}
            error={!!errors.description}
            helperText={errors.description?.message || 'Provide a detailed description of the job'}
            variant="outlined"
          />
        </Box>

        {/* Total Experience */}
        <Box mb={3}>
          <TextField
            label="Total Experience Required (in years)"
            fullWidth
            type="number"
            {...register('totalExperience', {
              required: 'Total experience is required',
              min: { value: 0, message: 'Experience must be at least 0 years' },
              max: { value: 50, message: 'Experience cannot exceed 50 years' },
            })}
            error={!!errors.totalExperience}
            helperText={errors.totalExperience?.message || 'Enter the total experience required for this job'}
            variant="outlined"
          />
        </Box>

        {/* Question Count */}
        <Box mb={3}>
          <TextField
            label="Number of Questions to Generate"
            fullWidth
            type="number"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            variant="outlined"
            helperText="Enter how many questions you want to generate for the job"
          />
        </Box>

        {/* Generate Questions */}
        <Box mb={3} display="flex" alignItems="center" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchQuestions}
            disabled={isLoadingQuestions}
          >
            {isLoadingQuestions ? <CircularProgress size={24} /> : 'Generate Questions'}
          </Button>
        </Box>

        {/* Questions */}
        {fields.map((field, index) => (
          <Box key={field.id} mb={2} display="flex" alignItems="center" gap={2}>
            <Tooltip title={`Question ${index + 1}`} arrow>
              <TextField
                fullWidth
                {...register(`questions.${index}.value`, { required: true })}
                defaultValue={field.value}
                variant="outlined"
                helperText={`Enter question ${index + 1}`}
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

        {/* Submit */}
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddJob;

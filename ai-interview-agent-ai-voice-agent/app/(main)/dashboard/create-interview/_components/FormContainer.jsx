'use client'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

function FormContainer({ onHandleInputChange, GoToNext }) {
  const [interviewType, setInterviewType] = useState([])

  useEffect(() => {
    onHandleInputChange('type', interviewType)
    console.log('Selected Interview Types:', interviewType)
  }, [interviewType])

  // ✅ Fixed: Accepts only title string
  const AddInterviewType = (typeTitle) => {
    const exists = interviewType.includes(typeTitle)
    if (!exists) {
      setInterviewType((prev) => [...prev, typeTitle])
    } else {
      const result = interviewType.filter((item) => item !== typeTitle)
      setInterviewType(result)
    }
  }

  return (
    <div className='p-5 border border-gray-300 rounded'>
      {/* Job Position */}
      <div>
        <h2 className='text-sm font-medium'>Job Position</h2>
        <Input
          placeholder='e.g. Full Stack Developer'
          onChange={(event) =>
            onHandleInputChange('jobPosition', event.target.value)
          }
        />
      </div>

      {/* Job Description */}
      <div className='mt-5'>
        <h2 className='text-sm font-medium'>Job Description</h2>
        <Textarea
          placeholder='Enter details for job description'
          className='h-[200px] mt-2'
          onChange={(event) =>
            onHandleInputChange('jobDescription', event.target.value)
          }
        />
      </div>

      {/* Interview Duration */}
      <div className='mt-5'>
        <h2 className='text-sm font-medium'>Interview Duration</h2>
        <Select onValueChange={(value) => onHandleInputChange('duration', value)}>
          <SelectTrigger className='w-full mt-2'>
            <SelectValue placeholder='Select Duration' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='5 Mins'>5 Mins</SelectItem>
            <SelectItem value='15 Mins'>15 Mins</SelectItem>
            <SelectItem value='30 Mins'>30 Mins</SelectItem>
            <SelectItem value='45 Mins'>45 Mins</SelectItem>
            <SelectItem value='60 Mins'>60 Mins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type */}
      <div className='mt-5'>
        <h2 className='text-sm font-medium'>Interview Type</h2>
        <div className='flex gap-3 flex-wrap'>
          {InterviewType.map((type, index) => (
            <div
              key={index}
              onClick={() => AddInterviewType(type.title)}
              className={`flex items-center cursor-pointer gap-2 p-1 px-3 rounded-full border border-gray-300 transition-all hover:bg-secondary ${
                interviewType.includes(type.title) ? 'bg-blue-100 text-primary' : 'bg-white'
              }`}
            >
              <type.icon />
              <span className='text-sm'>{type.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className='mt-7 flex justify-end' onClick={()=>GoToNext()}>
        <Button>
          Generate Question <ArrowRight className='ml-2' />
        </Button>
      </div>
    </div>
  )
}

export default FormContainer

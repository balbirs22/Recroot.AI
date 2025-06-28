import React from 'react'

function QuestionListContainer({questionList}) {
  return (
    <div>
            <h2 className='font-bold text-lg mb-5'>Generated Interview Questions:</h2>
            <div className='p-5 border border-gray-300 rounded-xl mt-5 bg-white'>
            <h2 className='text-lg font-semibold mb-4'>Generated Questions:</h2>
            {questionList.map((item, index) => (
                <div key={index} className='p-4 border border-gray-200 rounded-xl mb-4'>
                <h3 className=' font-bold font-medium mb-1'>{item.question}</h3>
                <p className='text-sm text-primary'>Type: {item.type}</p>
                </div>
            ))}
            </div>
        </div>
  )
}

export default QuestionListContainer
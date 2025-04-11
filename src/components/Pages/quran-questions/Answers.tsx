import { Button } from '@/components/ui/button'
import { Check, Edit2, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

const Answers = () => {
  const answers = ['أربعة', 'واحد', 'أثنين', 'ثلاثة']
  const [chooseAnswer, setChooseAnswer] = useState<number | null>(null)
  console.log(chooseAnswer)

  return (
    <div className='grid 2xl:grid-cols-5 grid-cols-2 mt-6 gap-4 items-center'>
      {answers.map((answer, index) => {
        console.log( chooseAnswer === index)
        return (
          <div
            role='button'
            key={index}
            onClick={() => setChooseAnswer(index)}
            className={`p-4 cursor-pointer rounded-xl flex items-center justify-between gap-4 ${
              chooseAnswer === index ? 'bg-our-green/35' : 'bg-our-white-100 '
            }`}
          >
            <div className='flex items-center gap-4'>
              <span className='shadow-2xl bg-our-white-200 text-black rounded-md p-3 py-1'>
                {index + 1}
              </span>
              <p>{answer}</p>
            </div>
            <div className='flex items-center gap-2'>
              <Button
                className={`rounded-full w-10 h-10 flex justify-center items-center ${chooseAnswer === index ? 'bg-our-green' : 'bg-our-sec-gray'}`}
                variant={'noHover'}
              >
                <Check
                  color='white'
                  className='[&_size]:size-6'
                />
              </Button>
              <Button
                className='bg-white rounded-full h-8 w-8'
                variant={'noHover'}
              >
                <Edit2 className='[&_size]:size-6' />
              </Button>
              <Button
                className='bg-white rounded-full h-8 w-8'
                variant={'noHover'}
              >
                <Trash2 className='[&_size]:size-6' />
              </Button>
            </div>
          </div>
        )
      })}
      <Button
        className='text-lg text-our-white-100 bg-our-brown-500 py-8 rounded-xl w-full flex justify-between 2xl:col-span-1 col-span-2'
        size={'lg'}
        variant={'noHover'}
      >
        <p>أضف إجابة</p>
        <div className='rounded-full bg-white text-base'>
          <Plus
            className='[&_size]:size-2 text-our-brown-500'
            size={20}
          />
        </div>
      </Button>
    </div>
  )
}

export default Answers

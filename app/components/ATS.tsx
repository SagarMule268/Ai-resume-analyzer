import React from 'react'

interface Suggestions {
  good: string[]
  improve: string[]
  tip: string[]
}

interface Props {
  score: number // 0-100
  suggestions: Suggestions
}

const clamp = (v: number) => Math.max(0, Math.min(100, Math.round(v)))

const ATS: React.FC<Props> = ({ score, suggestions }:{score:number , suggestions:Suggestions}) => {
  const s = clamp(score)
    
    console.log(suggestions)
  

  // choose gradient + text color via Tailwind classes
  let bgClasses = 'from-red-300 to-red-100 text-red-800' // default red
  let image = '/icons/ats-bad.svg';
  if (s >= 70) {
    bgClasses = 'from-green-300 to-green-100 text-green-900'
    image='/icons/ats-good.svg'
  } else if (s >= 50) {
    bgClasses = 'from-yellow-500 to-yellow-200 text-yellow-900'
    image='/icons/ats-warning.svg'
  }

  const subtitle = s>69?'Great Job':s>49?'Good Start':'Needs Improvment'

  return (
    <div className={`p-5  rounded-xl w-full shadow-lg font-sans bg-gradient-to-b ${bgClasses}`}>
      <div className="flex  justify-between items-center">
        <div className="flex items-center">
          <img src={image} alt="ATS" className="mr-2" />
          <div className='flex items-center flex-col'>
            <p className="text-xs font-medium opacity-90">ATS Score</p>
            <div className="text-4xl font-extrabold leading-none">{s}%</div>
          </div>
        </div>

        <div className=" w-18 h-18 rounded-full bg-white/10 flex items-center justify-center font-bold text-lg">
         {s}%
        </div>
      </div>

      <hr className="my-4 border-0 h-px bg-black/5" />

      <div className="flex items-center justify-center">
        <section className='flex flex-col justify-center'>
          <p className="text-2xl font-semibold mb-2"> {subtitle} </p>
         {
            suggestions.map((suggestion, index)=>{
            const textColor = suggestion.type=='good'?'text-green-500':'text-orange-400' ;
                
            return (
                <div className="flex items-center gap-3" key={index}>
            <img
              src={
                suggestion.type === "good"
                  ? "/icons/check.svg"
                  : "/icons/warning.svg"
              }
              alt="ATS"
              className="w-4 h-4"
            />
            <p className={`text-lg ${textColor}`}>{suggestion.tip}</p>
          </div>
            )})


         }
         <p className="text-lg text-gray-500">
          Want a better score? Improve your resume by applying the suggestions
          listed below.
        </p>
        </section>

       

        
      </div>
    </div>
  )
}

export default ATS

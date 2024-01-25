import React from 'react';

const PublicQuestionView = ({question,index,answerChanged}) => {
    let selectedOptions = []
    const checkBoxChanged= (option,event)=>{
        if(event.target.checked){
            selectedOptions.push(option.text);
        }else{
            selectedOptions =selectedOptions.filter((opt)=>opt!=option.text)
        }
        answerChanged(selectedOptions)
    }
    return (
        <>
            <fieldset className='mb-4'>
                <div>
                    <legend>
                        {index+1}. {question.question}
                    </legend>
                </div>
                <div className="mt-3">
                    {
                        question.type == "select" && (
                            <div>
                                <select
                                    onChange={(e) => answerChanged(e.target.value)}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Please Select</option>
                                    {question.data.options.map((option) => (
                                        <option key={option.uuid} value={option.text}>
                                            {option.text}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )
                    }
                    {
                        question.type =="radio" && (
                            <div className='flex gap-3 items-center'>
                                {question.data.options.map((option)=>(
                                    <div key={option.uuid}>
                                        <input type="radio" onChange={(e)=>answerChanged(e.target.value)} value={option.text} name={`question${question.id}`} id={option.uuid} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                        <label htmlFor={option.uuid} className='ml-1 font-medium text-gray-700 text-sm '>{option.text}</label>    
                                    </div>
                                ))}
                            </div>
                        )
                    }
                    {
                        question.type =="checkbox" && (
                            <div>
                                {question.data.options.map((option)=>(
                                    <div key={option.uuid} className='flex items-center'>
                                        <input type="checkbox" onChange={(e)=>checkBoxChanged(option,e)} name={`question${question.id}`} id={option.uuid} className='focus:ring-indigo-500 h-4 w-4 border-gray-300 rounded mr-1' />
                                        <label htmlFor={option.uuid}>{option.text}</label>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                    {question.type === "text" && (
                        <div>
                            <input
                                type="text"
                                onChange={(ev) => answerChanged(ev.target.value)}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 p-2 rounded-md focus:outline-none"
                            />
                        </div>
                    )}
                    {question.type === "textarea" && (
                        <div>
                            <textarea
                                onChange={(ev) => answerChanged(ev.target.value)}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm p-2 border border-gray-300 rounded-md focus:outline-none"
                                rows={3}
                            ></textarea>
                        </div>
                    )}

                </div>
            </fieldset>
        </>
    )
}

export default PublicQuestionView;
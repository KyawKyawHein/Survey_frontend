import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context/StateContext';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const QuestionEditor = ({index,question,questionChange,addQuestion,deleteQuestion}) => {
    const [model,setModel] = useState({...question});
    const {questionTypes} = useStateContext();

    useEffect(()=>{
        console.log(model);
        setModel(model);
        questionChange(model);
    },[model])

    function upperCaseFirst($str){
        return $str.charAt(0).toUpperCase() + $str.slice(1);
    }

    return (
        <div>
            <div className="flex justify-between mb-3">
                <h4>{index+1} {model.question}</h4>
                <div className="flex items-center">
                    <button type='button' className="flex items-center text-xs py-1 px-3 mr-2 rounded text-white bg-gray-600 hover:bg-gray-700"
                    onClick={()=>addQuestion(index)} >
                        <PlusIcon className='w-4'/>Add
                    </button>
                    <button type='button' className="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-red-500 hover:text-red-600 font-semibold border border-transparent"
                        onClick={()=>deleteQuestion(model)} >
                        <TrashIcon className='w-4' />Delete
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-3 justify-between mb-3">
                {/* Question Text  */}
                <div className="flex-1">
                    <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                        Question
                    </label>
                    <input type="text"
                     className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                     name='question'
                     id='question'
                     value={model.question}
                     onChange={(e)=>setModel({...model,question:e.target.value})}
                     />
                </div>
                {/* End question text  */}

                {/* Question Type  */}
                <div>
                    <label htmlFor="questionType" className="block text-sm font-medium text-gray-700">
                        Question Type
                    </label>
                    <select name="questionType" id="questionType"
                        onChange={(e)=>setModel({...model,type:e.target.value})}
                        className="mt-1 user-select-none p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={model.type}
                    >
                        {
                            questionTypes.map((type)=>(
                                <option value={type} key={type}>
                                    {upperCaseFirst(type)}
                                </option>
                            ))
                        }
                    </select>
                </div>
                {/* End question Type  */}

                {/* Description  */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea name="questionDescription" id="questionDescription" cols="30" rows="3"
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={model.description}
                        onChange={(e)=>setModel({...model,description:e.target.value})}
                    >
                    </textarea>
                </div>
                {/* End Description  */}
            </div>
        </div>
    )
}
export default QuestionEditor;

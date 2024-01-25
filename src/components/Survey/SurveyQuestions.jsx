import { PlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import QuestionEditor from './QuestionEditor';
import NoSurveyQuestion from './NoSurveyQuestion';

const SurveyQuestions = ({questions,onQuestionUpdate}) => {
    const [model,setModel]  = useState([...questions]);
    const addQuestion = (index)=>{
        const spliceModel = model;
        const newObj = {
            id: uuidv4(),
            type: "text",
            question: "",
            description: " ",
            data: {},
        };
         spliceModel.splice(index + 1, 0, newObj);
        setModel([...spliceModel])
    }

    const questionChange = (question)=>{
        if(!question) return;
        const newQuestions = model.map(q=>{
            if(q.id == question.id){
                return {...question};
            }
            return q;
        })
        setModel(newQuestions)
    }

    const deleteQuestion = (question)=>{
        const newQuestions = model.filter(q=>q.id != question.id);
        setModel(newQuestions);
    }

    useEffect(()=>{
        onQuestionUpdate(model);
    },[model])
    return (
        <>
            <div className="flex justify-between mb-1 md:mb-4">
                <h3 className="text-2xl font-bold">Questions</h3>
                <button type='button' className='flex items-center text-sm py-1 px-4 rounded text-white bg-gray-600 hover:bg-gray-700'
                    onClick={()=>addQuestion(model.length-1)}>
                    <PlusIcon className='w-4 mr-2'/>
                    Add Question
                </button>
            </div>
            {
                model.length? (
                    model.map((q,ind)=>(
                        <QuestionEditor
                            key = {q.id}
                            index = {ind}
                            question = {q}
                            questionChange={questionChange}
                            addQuestion={addQuestion}
                            deleteQuestion={deleteQuestion}
                        />
                    ))):
                    <NoSurveyQuestion message={"You don't have any questions created."}/>
            }
        </>
    );
}

export default SurveyQuestions;

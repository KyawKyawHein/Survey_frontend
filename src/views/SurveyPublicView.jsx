import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import PublicQuestionView from '../components/PublicQuestionView';

const SurveyPublicView = () => {
    const {slug} = useParams()
    const [survey,setSurvey] = useState({})
    const [loading,setLoading] = useState(false)
    const answer  ={}
    const answerChanged = (question,value) => {
        answer[question.id] = value
        console.log(answer);
    }
    const submit = (e)=>{
        e.preventDefault()
        axiosClient.post(`survey/${slug}/answer`,{answer})
        .then(({data})=>console.log(data))
        .catch((err)=>console.log(err))
    }
    useEffect(()=>{
        setLoading(true)
        axiosClient.get(`survey/public-view/${slug}`)
        .then(({data})=>{
            console.log(data);
            setSurvey(data.data)
            setLoading(false);
        })
    },[])
    return (
        <>
            {loading ? <div>Loading</div> :
                <form  className='container mx-auto p-2'>
                    <div className='grid grid-cols-6'>
                        <div>
                            <img src={survey.image_url} alt="" />
                        </div>
                        <div className='col-span-5 ml-4'>
                            <h2 className='text-3xl mb-3'>{survey.title}</h2>
                            <p className="text-gray-500 text-sm">{survey.expire_date}</p>
                            <p className='text-gray-500 mt-3'>{survey.description}</p>
                        </div>
                    </div>  

                    <div className='mt-3'>
                        {
                            survey.questions?.map((q,index)=>(
                                <PublicQuestionView key={q.id} question={q} index={index} answerChanged={(value)=>answerChanged(q,value)} />
                            ))
                        }
                    </div>
                    <button
                        type="submit"
                        onClick={submit}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </form>
            }
        </>
    )
}

export default SurveyPublicView;
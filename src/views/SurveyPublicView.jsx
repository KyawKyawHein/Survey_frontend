import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import PublicQuestionView from '../components/PublicQuestionView';

const SurveyPublicView = () => {
    const {slug} = useParams()
    const [survey,setSurvey] = useState({})
    const [loading,setLoading] = useState(false)
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
                <div>
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

                    <div>
                        {
                            survey.questions?.map((q,index)=>(
                                <PublicQuestionView key={q.uuid} question={q} index={index} />
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default SurveyPublicView;
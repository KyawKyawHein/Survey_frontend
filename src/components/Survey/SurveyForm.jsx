import React, { useEffect } from 'react';
import { useState } from "react";
import TButton from '../core/TButton';
import SurveyQuestions from "./SurveyQuestions";
import { PhotoIcon } from '@heroicons/react/24/outline';
import { useSurvey } from '../../hooks/UseSurvey';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/StateContext';

const SurveyForm = ({id,survey,setSurvey}) => {
    const nav = useNavigate();
    const {showToast} = useStateContext()

    // const {useSurveyCreateMutation} = useSurvey()
    // const { mutateAsync:newSurvey} = useSurveyCreateMutation()

    const [error, setError] = useState({})
    const onSubmit = async(e) => {
        e.preventDefault();
        const payload = { ...survey };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url; 
        // create or update control
        let res = null
        if(id){
            res= axiosClient.put(`/survey/${id}`,payload)
        }else{
            res = axiosClient.post(`/survey`, payload)
        }
        res.then(({data})=>{
            console.log(data);
            nav('/surveys')
            if(id){
                showToast('Survey is updated.')
            }else{
                showToast('Survey is created.')
            }
        })
        .catch((err)=>console.log(err))
    }
    const onImageChoose = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setSurvey({
                ...survey,
                image: file,
                image_url: reader.result
            })
            e.target.value = ''
        }
        reader.readAsDataURL(file);
    }

    const onQuestionUpdate = (questions) => {
        setSurvey({
            ...survey,
            questions
        });
    }

   
    return (
        <>
            <form onSubmit={(e) => onSubmit(e)} method="post" className="" encType="multipart/form-data">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white ">
                        {/* image */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                            <div className="flex mt-1 items-center">
                                {
                                    survey.image_url ?
                                        <img
                                            src={survey.image_url}
                                            alt=""
                                            className="w-32 h-32 object-cover"
                                        />
                                        :
                                        <span className="flex justify-center  items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                            <PhotoIcon className="w-8 h-8" />
                                        </span>
                                }
                                <button className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <input onChange={onImageChoose} type="file" className="absolute left-0 top-0 right-0 bottom-0 opacity-0" />
                                    Change
                                </button>
                            </div>
                        </div>
                        {/* end image  */}

                        {/*Title*/}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Survey title
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            autoComplete="title"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Enter survey title"
                                            value={survey.title}
                                            onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
                                        />
                                    </div>
                                </div>
                                {error.title && <p className="text-red-500 text-sm font-bold">{error.title}</p>}
                            </div>
                        </div>
                        {/*Title*/}

                        {/* Description  */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <textarea
                                            name="description"
                                            id="description"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Describe your survey"
                                            value={survey.description}
                                            onChange={(e) => setSurvey({ ...survey, description: e.target.value })}
                                        />
                                    </div>
                                </div>
                                {error.description && <p className="text-red-500 text-sm font-bold">{error.description}</p>}
                            </div>
                        </div>
                        {/* end description  */}

                        {/* Expire Date  */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="expireDate" className="block text-sm font-medium leading-6 text-gray-900">
                                    Expire date
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="date"
                                            name="expire_date"
                                            id="expireDate"
                                            autoComplete="expireDate"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={survey.expire_date}
                                            onChange={(e) => setSurvey({ ...survey, expire_date: e.target.value })}
                                        />
                                    </div>
                                </div>
                                {error.expire_date && <p className="text-red-500 text-sm font-bold">{error.expire_date}</p>}
                            </div>
                        </div>
                        {/* End expire date  */}

                        {/* Active  */}
                        <div className="flex items-start">
                            <div className="flex h-7 rounded-md shadow-sm sm:max-w-md">
                                <input
                                    type="checkbox"
                                    name="status"
                                    id="status"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    value={survey.status}
                                    checked={survey.status}
                                    onChange={(e) => setSurvey({ ...survey, status: e.target.checked })}
                                />
                            </div>
                            <div className="ms-2 p-0">
                                <label htmlFor="status" className="text-sm font-medium leading-6 text-gray-900">
                                    Active
                                </label>
                                <p className="text-gray-500">
                                    Whether to make survey publicly available
                                </p>
                            </div>
                        </div>
                        {/* End Active  */}

                        {/* Survey Questions  */}
                        <SurveyQuestions questions={survey.questions} onQuestionUpdate={onQuestionUpdate} />
                    </div>
                </div>
                {/* Start button  */}
                <div className="grid grid-cols-3 px-4 py-3 flex justify-end px-0 sm:px-6">
                    <div className="text-start">
                        <TButton>{id?'Update':'Create'}</TButton>
                    </div>
                </div>
                {/* end button  */}
            </form>
        </>
    )
}

export default SurveyForm;
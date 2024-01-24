import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react'
import TButton from './core/TButton';

const SurveyListItem = (props) => {
    const {id,image,slug,title,description} = props;
    const onDeleteClick = ()=>{

    }
    return (
        <>
            <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
                <img src={image} alt={title}  className="w-full h-48 object-cover"  />
                <h4 className='mt-4 text-lg font-bold'>{title}</h4>
                <div
                    dangerouslySetInnerHTML={{__html:description}}
                    className='overflow-hidden flex-1'
                >
                </div>

                <div className="flex justify-between items-center mt-3">
                    <TButton to={`/surveys/${id}`}>
                        <PencilIcon className="w-5 h-5 mr-2 " />
                        Edit
                    </TButton>
                    <div className="flex items-center">
                        <TButton href={`/view/survey/${slug}`} circle link>
                            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                        </TButton>

                        {id && (
                            <TButton onClick={ev => onDeleteClick(id)} circle link color="red">
                                <TrashIcon className="w-5 h-5" />
                            </TButton>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SurveyListItem
import React from 'react';

const PaginationLink = ({meta,getSurveys}) => {
    const getSurvey = (e,link)=>{
        e.preventDefault();
        if(link){
            getSurveys(link)
        }
    }
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            {/* <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
            </div> */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{meta.from}</span> to <span className="font-medium">{meta.to}</span> of{' '}
                        <span className="font-medium">{meta.total}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        {
                            meta.links && meta.links.map((link,index)=>(
                                <button
                                    disabled={link.active}
                                    onClick={e=>getSurvey(e,link.url)}
                                    key={index}
                                    className={"relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 hover:bg-gray-50" 
                                        + (link.active && 'border-black-500 bg-black text-white rounded')
                                    }
                                    dangerouslySetInnerHTML={{ __html : link.label }}
                                >
                                </button>
                            ))
                        }
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default PaginationLink;
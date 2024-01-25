import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";

const StateContext = createContext({
    user : null,
    token : null,
    setUser : ()=>{},
    setToken : ()=>{},
    questionTypes : [],
    toast : {
        message : '',
        show :false
    }
});

export const StateContextProvider = ({children})=>{
    const tmpSurveys = [
        {
            "id": 1,
            "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAe1BMVEXw208yMzDw2kjz4nny3U/34VApLC8iJi90bDm7q0Xo1E0mKS8AACz75VEwMTDt2E5gWjUcIS5CQTKlmEHSwEkWHS7k0E3HtkcPGC3AsEZ5cTqNgz2GfTwAES3dykuZjT9NSjM9PDJXUzWsnkJrZTgACSy0pUT/7VOAdztQ+GE7AAAIVklEQVR4nO2ca5eiuhKGYe9KUALhqqAiN5Xx///CE+yeGSUJYGtvqs/K+8m1xMhDkkpVpYJl/d/on3+XvoM3ysBglYHBKgODVQYGqwwMVhkYrDIwWGVgsMrAYJWBwSoDg1UGBqsMDFYZGKwyMFhlYLDKwGCVgcEqA4NVBgarDAxWGRisMjBYZWCwysBglYHBKgODVQYGqwwMVhkYrDIwWGVgsMrAYJWBwSoDg1UGBqsMDFYZGKwyMFhlYLDKwGCVgcGqb4YBWXN+RIAQ4t9EfPFx1s++HSaQNXFb/X0H5bpahTGLIta058Mp2wazHsO3wpAsHKo9uGM3BSBAisY7bhxGeS/qbHIvb6tsa03ifC/MOnLYo/LVCAwQNzs0l4jaA3G2ObZJapFxnG+GoXxwW84IDLF2e7qRSD7F8rpKxzsHDwz4adFEw+vvRaM2ATLyf2hgwD+1oyi3X/P9doQGCwz4B8omUIR4VKe+9v+QwAC5sqlu+RBrMi0NDpj5LGLmNNq+QQED5ODMZRF9E6eaeYMChnS2ziCr5ISl2ohggCFp6zzBYttRoXaKEMBAcNg8xWJz3ilXTwwwmT1/wny20ioH2vIwEBRPdoxQrhxoCGBS6aIPUSeKHPV3LC9UFn5xGIAkV9wu3xzjVVHs2+giOwabeu2q/m95mKBVuDGOcyiDQHwdbNdt/mi3aX7dqr3nxWFI6SlY2tL/HWYTf2ffWW4e2ZmvcbwXh4H1UWJh4b2nD34Q/qYRgWdBtH7z4jBEtmW8Gfj5BMLoY4TxNvulj8+WhwmlKRNVQ0+SuLG4ijtxZaEOzvxGcssuW4XH43Bm77PxJMDiMGQzvIQzxQQnldeeXOQJDQBplaHxL7kpcA8T2QwLA4xkzGitgBHr0XQWcHmYXB5mKhhrRoJ2aRiLyCkZb15mWdbiMD6XYKJEn4AZ1eIwRHbNaPPFrlkepoiGMDa9fo1meRhFBMDpwR1b6XVaHAZShdfM6XV6VZG1PIwrW4DeDWuTrc7T12p5GGuvzDMx+5wET+IsDiMCGsU46zuH2W3iPoWDAKaMNelMznh82PrzTQECmKCSY83fOJyxVepPOMt/tDyMiFV0XXPjibx6PW/LHQMMWIm8bt6Lek0yY68ZBYxFyvNE4pwf7SQNJkcbBhiL7MYG2gdO3lTpaALAQgIDkEznzummrlLkOYCbwKpmbJ1Rp61GfTYcMP0ejSrjPBTj4XpkGUUCI0ZapXYEHsUdu9DXNWCBsYCcvDkbm5y1Jerd5g/5qT1ZotGL0U4z1BDBWCS4Us3G04MoS5BuadwLyDqcU3QiaJSZJ1QwFvjbqnWmpw5lJ1Xf4IK5FWpVw60yFY29+wEw/WZMjzM12JxasXmOD0bMHJKewmjCsm3OsoFGCNPjwHa32oyXBxzX0uKJEuZWEByUh42UVL8Tt6XVBimMdSvVtpLNRW8L8m7YNXhhrN60+es60q2jNB7OGtQwQr5YR201DqfZoGuww/TGoDtT5WCjh0HXoIfpB5tb1aqUBw0HgecPgOlxslBhp+lw4fwRMGLqlGeZhse7x0nzQ2AsUtbycQc7+Zkwoi05icsHFgARzDgkbOUiG3ZFCiNCmdEUH7iVNGuc1XfAaPLaZC2lXZ29siRZuGIHbzdO00nJKGf1aJvfASPuZDdcjG8infwwVTAAbmfnNB7tG7JW9cy7YYiVFl6o6BtVLakj74oLlOzcB5f0OjZv4D+AAVIm8cbmiqoKcA/Swu0Uw6dPICv47TphavX7FmApnsyb5wwJ1uc+A0HbUhojUJ7l6otBlR/4pfBVPs0EjddaGnDljVz6VmsGJL02H/9B5Rpwkkq5fd6c7v8ffEjCu2wM09Ooarl59UYYAlXNPm+F26eB2weWbEx5vXuoi92d+cPzZk2n3rUAS96QEk/mbR4A/NrV/O9Tpc3u8TmRUi5XoHX6517FCNs3wwNN1K5Upb7g72W/mcfZm2DAD1aPlfr0sXqagOJUDAv/GCwxo7nibBZndTqs9gWfhIoYgNbue7xmIMlmeK/8WMHtUHUvv7QVG5Ws+Nt75KSOIKl3Tsn90W7Sn8RVXbh6T3BG0laVOTnyZOvelO1VGxS8ucsPgbvS7Ms6Xp2krvtxsNtNK9Gu6jLevQkmkz3yW/u5Z7dhGx8vyt3wx4HhZ9p9WbrxnPq8v17PreNpTgjzZmg/vwgDUGmTJowx7T3uHwwz0TZi38r+e+mviIYpgC/PGVKGzxzg+xR7PJQIrryqzlckFaZ/2ZqRk6pObIJlmIHwtUVA08qljnnBNMP+6afqSadF/Uw9t6dFpRnzyqJJXPlIwrg2e9kZJZpqs0ldFEHHCx4AUVVXjog7qlBG0HylbzyVg/2Kb+Znz9BwTxnACZqR5LhOx/cfbfS7sT2HAUuu3IbsaTLJQ5tqK7oqg+/XQgCy5jOtAGWVNowkqSaZrGuLFuoSmlfjmV0966kKZ3gkJCbuIZ5/hp7F6o3zlyNNEZ3tpzuHO/VpNC0mHsqKzjt5Tp3zTleo9XIOgLhJq329yuejdPbZRFEi+G53ntqT7VGObVVq65pez84ApFVz1OM4l7DbTte/Aim7FR2tAODOxKtn3pBqAhKUVX1Rdg/L83NXzivrB9hmVZvn6knInaMjmhp9KdBbMpoCZ5sV8eUY/fWX+5csXcSgSN35JxQARDtVePTy6N7xpk509JxV1zf1X5Q19m/xssquCG3vU8f4XO22MwuS79rpX6KVJUXYHP+01IRFl4I13db7Eue3+Nb3fXC35dbtP/Uh9Jca+ni5GQncsnSD20eY1dT7dwFmv5NtZkNPtGReo4dVBgarDAxWGRis+uff/wFAgomqp4a2YgAAAABJRU5ErkJggg==",
            "title": "TheCodeholic YouTube channel",
            "slug": "thecodeholic-youtube-channel",
            "status": true,
            "description": "My name is Zura.<br>I am Web Developer with 9+ years of experience, free educational content creator, CTO, Lecturer and father of two wonderful daughters.<br><br>The purpose of the channel is to share my several years of experience with beginner developers.<br>Teach them what I know and make my experience as a lesson for others.",
            "created_at": "2022-01-07 13:23:41",
            "updated_at": "2022-01-18 16:34:19",
            "expire_date": "2022-01-23",
            "questions": [
                {
                    "id": 15,
                    "type": "text",
                    "question": "From which country are you?",
                    "description": null
                },
                {
                    "id": 16,
                    "type": "checkbox",
                    "question": "Which language videos do you want to see on my channel?",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
                    "data": {
                        "options": [
                            {
                                "uuid": "8ee03188-9e7e-44e5-9176-7574c0beec6f",
                                "text": "JavaScript"
                            },
                            {
                                "uuid": "fe9497f2-8f05-4c82-9586-26e36736fa9e",
                                "text": "PHP"
                            },
                            {
                                "uuid": "db0f194c-d32d-4e19-929e-08f7b4e2bcc0",
                                "text": "HTML + CSS"
                            },
                            {
                                "uuid": "93273c4c-ac8f-432e-b847-e467df64ab9c",
                                "text": "All of the above"
                            },
                            {
                                "uuid": "d54818a7-ad7e-4b69-9287-16a8dc50a6cb",
                                "text": "Everything Zura thinks will be good"
                            }
                        ]
                    }
                },
                {
                    "id": 17,
                    "type": "select",
                    "question": "Which PHP framework videos do you want to see on my channel?",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
                    "data": {
                        "options": [
                            {
                                "uuid": "fb907cfe-b7a1-4b24-86fb-03f9c44aa710",
                                "text": "Laravel"
                            },
                            {
                                "uuid": "e2629262-93ca-4a7a-8129-19c765664a04",
                                "text": "Yii2"
                            },
                            {
                                "uuid": "9a11a425-d9fe-4fe9-86af-bb814e3d9271",
                                "text": "Codeigniter"
                            },
                            {
                                "uuid": "484268b1-d3aa-47f8-a185-356ed48e50fe",
                                "text": "Symfony"
                            }
                        ]
                    }
                },
                {
                    "id": 18,
                    "type": "radio",
                    "question": "Which Laravel Framework do you love most?",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
                    "data": {
                        "options": [
                            {
                                "uuid": "c02e50e6-5ebf-4344-9822-baa16502dbdb",
                                "text": "Laravel 5"
                            },
                            {
                                "uuid": "90a15aae-ef4c-4d04-aa05-8e840d4a2ded",
                                "text": "Laravel 6"
                            },
                            {
                                "uuid": "93c64532-c1eb-4bfd-bd00-ab51cafdee78",
                                "text": "Laravel 7"
                            },
                            {
                                "uuid": "51f6a704-7a86-47a4-9b2d-72bb026a3371",
                                "text": "Laravel 8"
                            }
                        ]
                    }
                },
                {
                    "id": 19,
                    "type": "checkbox",
                    "question": "What type of projects do you want to see on my channel built with Laravel?",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
                    "data": {
                        "options": [
                            {
                                "uuid": "c5519ab0-3282-4758-a34b-506052bf1342",
                                "text": "REST API"
                            },
                            {
                                "uuid": "dfbbc0af-8fff-44ae-be36-e85270041729",
                                "text": "E-commerce"
                            },
                            {
                                "uuid": "6940c122-505f-4d9d-a103-472f923fad94",
                                "text": "Real Estate"
                            },
                            {
                                "uuid": "2b3c12a4-8f3c-4276-ae59-4e9d55e849be",
                                "text": "All of the above"
                            }
                        ]
                    }
                },
                {
                    "id": 22,
                    "type": "textarea",
                    "question": "What do you think about TheCodeholic channel?",
                    "description": "Write your honest opinion. Everything is anonymous.",
                    "data": []
                },
                {
                    "id": 23,
                    "type": "text",
                    "question": "Which channel is your favorite one?",
                    "description": null,
                    "data": []
                }
            ]
        },
        {
            "id": 2,
            "image_url": "data:image/png;base64,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",
            "title": "React",
            "slug": "react",
            "status": true,
            "description": "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
            "created_at": "2022-01-07 08:50:40",
            "updated_at": "2022-01-07 13:37:37",
            "expire_date": "2022-02-01",
            "questions": []
        },
        {
            "id": 3,
            "image_url": "data:image/png;base64,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",
            "title": "Laravel 9",
            "slug": "laravel-9",
            "status": true,
            "description": "Laravel is a web application framework with expressive, elegant syntax. We\u2019ve already laid the foundation \u2014 freeing you to create without sweating the small things.",
            "created_at": "2022-01-07 13:28:56",
            "updated_at": "2022-01-07 13:28:56",
            "expire_date": "2022-01-20",
            "questions": []
        },
    ]
    const [user,setUser] = useState(null);
    const [token,_setToken] = useState(localStorage.getItem('ACCESS_TOKEN')??null);
    const [questionTypes] = useState(['text','select','radio','checkbox','textarea']);
    const [toast,setToast] = useState({message:'',show:false})
    // const {useUserQuery} = useUser()    
    // const { data:currentUser } = useUserQuery();
    const setToken = (token)=>{
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN',token);
        }
    }
    const showToast=(message)=>{
        setToast({message,show:true})
        setTimeout(() => {
            setToast({message,show:false})
        }, 3000);
    }
    // const getUser = ()=>{
    //     setUser(currentUser);
    // }
    // useEffect(()=>{
        // getUser()
    // },[token])

    const data = {user,setUser,token,setToken,questionTypes,toast,showToast};
    return(
        <StateContext.Provider value={data}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext =()=> useContext(StateContext);

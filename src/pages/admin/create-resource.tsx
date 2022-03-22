import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import DeleteIcon from "../../assets/images/delete-icon.svg";
import FileIcon from "../../assets/images/file-icon.svg";
import BrowseFile from '../../assets/images/browse-file.svg';
import { encryptData } from '../../lib/encryptionHelper';
import { generalEncKey } from '../../common/constants/globals';
import { utilityServiceBaseUrlUrl } from '../../apiUrls';
import axios from 'axios';
import SpinnerIcon from "../../assets/images/spinner.gif";

const AdminCreateResource = () => {

    document.title = "Admin Create Resource - Anchoria";

    const [learnFile, setLearnFile] = useState('');
    const [learnBase64Img, setLearnBase64Img] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    function triggerFileUpload(){
        document.getElementById("learn_file")?.click();
    }

    function changeFile(event :any){
        setLearnFile(event.target.files[0].name);

        let fileExtArr = ["jpg", "jpeg", "png", "jfif", "pjpeg", "pjp", "gif", "webp"];

        let base64String = '';

        let file = event.target.files[0];

        let fileExt = file.name.split(".")[1];

        if(fileExtArr.includes(fileExt.toLowerCase())){
            let reader = new FileReader();
          
            reader.onload = function () {
                let result = reader.result as string;

                base64String = result.replace("data:", "").replace(/^.+,/, "");

                setLearnBase64Img(base64String);
            }

            reader.readAsDataURL(file);
        }
        else{
            setErrorMsg("Uploaded file is not a valid image. Only JPEG, JPG, PNG and GIF files are allowed.");
        }
    }

    function deleteFile(){
        setLearnFile('');
        setLearnBase64Img('');
    }

    function createLearnResource(){

        let requestData = {
            "title": title,
            "description": description,
            "content": description,
            "link": link,
            "files": [learnBase64Img]
        }

        console.log(requestData);

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));

        let headers = {
            'Authorization': 'Bearer '+localStorage.getItem('aislUserToken'), 
            'x-firebase-token': '12222',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

        axios.post(utilityServiceBaseUrlUrl+'/learn/create', 
        {
            "text" : genericCypher
        },{headers})
        .then(function (response) {
            setShowSpinner(false)
            setIsSuccessful(true);
        })
        .catch(function (error) {
            setShowSpinner(false)
        });
    }



    return (
        <div className="relative">

            <UserAreaHeader />

            <div>
                <div className="h-screen flex">
                    <AdminSidebar/>

                     {/* Main Content section */}
                     <div className="mt-20 flex-1 min-w-0 flex flex-col">
                        <div className='p-10 flex-1 bg-gray-100 overflow-y-auto'>
                            <div className='m-auto pt-5'>

                                <div className='mb-30 rounded-lg border bg-white px-10 py-5' style={{ width: '50rem' }}>                                   

                                    
                                    <div>
                                        <div> 
                                            {/* Personal Deatils Success */}
                                            <div className={isSuccessful ? "otp-alert mb-20":"hidden"}>
                                                <div className="flex otp-validated justify-between space-x-1 pt-3">
                                                    <div className="flex">
                                                        <div>
                                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                                                <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                                            </svg>
                                                        </div>

                                                        <div className="text-sm text-green-900">Learn Rresource created successfully.</div>
                                                    </div>                                                
                                                    
                                                </div>
                                            </div>
                                            {/* End */}

                                            <div className='font-bold text-green-900 text-lg mb-6'>
                                                Create A Resource
                                            </div>

                                            <div className='font-bold text-lg mb-6'>
                                                <div className='text-sm mb-10'>Title</div>
                                                <div><input type="text" className='p-3 text-lg border rounded-lg focus:outline-white w-full' value={title} onChange={e => setTitle(e.target.value)}/></div>
                                            </div>

                                            <div className='font-bold text-lg mb-6'>
                                                <div className='text-sm mb-10'>Description</div>
                                                <div><textarea className='p-3 text-lg border rounded-lg focus:outline-white w-full' rows={8} value={description} onChange={e => setDescription(e.target.value)}></textarea></div>
                                            </div>

                                            <div className='font-bold text-lg mb-11'>
                                                <div className='text-sm mb-10'>Link</div>
                                                <div><input type="text" className='p-3 text-lg border rounded-lg focus:outline-white w-full' value={link} onChange={e => setLink(e.target.value)} /></div>
                                            </div>

                                            <div className='mb-11'>
                                                <img className={learnFile === '' ? 'cursor-pointer w-full':'hidden'} src={BrowseFile} alt="" onClick={triggerFileUpload}/>

                                                <div className={learnFile === '' ? 'hidden':'flex space-x-3 items-center p-5 w-96 bg-gray-100 border rounded-lg w-full'}>
                                                    <div><img src={FileIcon} alt=""/></div>
                                                    <div className='font-bold flex-1'>{learnFile}</div>
                                                    <div><img className='cursor-pointer' src={DeleteIcon} onClick={deleteFile} alt=""/></div>
                                                </div>

                                                <div className={errorMsg === ''? 'hidden':'text-red-500'}></div>
                                            </div>

                                            <div className='flex space-x-3'>
                                                <button  onClick={createLearnResource} type='button' className='w-full font-bold border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-4 cursor-pointer'>
                                                    <span className={ showSpinner ? "hidden" : ""}>Create</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="15"/>
                                                </button>
                                            </div>
                                            
                                        </div>
                                    </div>

                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End */}
                </div>
            </div>

            <input type="file" id="learn_file" className='opacity-0' onChange={changeFile}/>
            
        </div>
    );
};

export default AdminCreateResource;
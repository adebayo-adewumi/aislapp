import React, { useEffect, useState } from 'react';
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
import { getAxios } from '../../network/httpClientWrapper';

const AdminCreateResource = () => {

    document.title = "Admin Create Resource - Anchoria";

    const [learnFile, setLearnFile] = useState('');
    const [learnBase64Img, setLearnBase64Img] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState<any[]>([]);

    const [fileCategory, setFileCategory] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const [isSuccessful, setIsSuccessful] = useState('');


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [link, setLink] = useState('');

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    useEffect(()=>{
        function getFileTypes() {

            getAxios(axios).get(utilityServiceBaseUrlUrl + '/utils/file-types')
            .then(function (response) {
                let _fTypes :any[] = [];

                _fTypes.push(response.data)

                setFileType(_fTypes);
            })
            .catch(function (error) { });
        }

        getFileTypes();
    },[]);

    function triggerFileUpload(){
        document.getElementById("learn_file")?.click();
    }

    function changeFile(event :any){
        setLearnFile(event.target.files[0].name);

        let fileExtArr = ["jpg", "jpeg", "png", "jfif", "pjpeg", "pjp", "gif", "webp"];

        let base64String = '';

        let file = event.target.files[0];

        let _fileExt = file.name.split(".")[1];

        setFileName(file.name.split(".")[0]);

        if(fileExtArr.includes(_fileExt.toLowerCase())){
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
            "content": content,
            "link": link,
            "files": [{
                "name": fileName,    
                "category": fileCategory,    
                "data": learnBase64Img   
            }]
        }

        ;

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
            setIsSuccessful('true');
        })
        .catch(function (error) {
            setShowSpinner(false)
            setIsSuccessful('false');

            setErrorMsg(error.response.data.message);
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
                                            {/* Success */}
                                            <div className={isSuccessful === 'true' ? "otp-alert mb-20":"hidden"}>
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

                                            {/* Error */}
                                            <div className={isSuccessful === 'false' ? "error-alert mb-20" : "hidden"}>
                                                <div className="flex justify-between space-x-1 pt-3">
                                                    <div className="flex">
                                                        <div>
                                                            <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                            </svg>
                                                        </div>

                                                        <div className="text-sm">{errorMsg}</div>
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
                                                <div><input type="text" className='p-3 text-lg border rounded-lg focus:outline-white w-full' value={description} onChange={e => setDescription(e.target.value)}/></div>
                                            </div>

                                            <div className='font-bold text-lg mb-6'>
                                                <div className='text-sm mb-10'>Content</div>
                                                <div><textarea className='p-3 text-lg border rounded-lg focus:outline-white w-full' rows={5} value={content} onChange={e => setContent(e.target.value)}></textarea></div>
                                            </div>

                                            <div className='font-bold text-lg mb-11'>
                                                <div className='text-sm mb-10'>Link</div>
                                                <div><input type="text" className='p-3 text-lg border rounded-lg focus:outline-white w-full' value={link} onChange={e => setLink(e.target.value)} /></div>
                                            </div>

                                            <div className='mb-11'>
                                                <div className='text-sm font-bold mb-10'>File Types</div>
                                                <div>
                                                    {fileType.map((item :any, index:any)=>
                                                        <select className='text-sm outline-white w-full p-3 rounded-lg border border-gray-500 ' onChange={e => setFileCategory(e.target.value)} key={index}>
                                                            <option value=''>Select a file type</option>
                                                            <option value={item.DOC}>{item.DOC}</option>
                                                            <option value={item.GIF}>{item.GIF}</option>
                                                            <option value={item.IMAGE}>{item.IMAGE}</option>
                                                            <option value={item.VIDEO}>{item.VIDEO}</option>
                                                        </select>
                                                    )}
                                                </div>
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

                                            <div className='flex space-x-3 mb-6'>
                                                <button  onClick={createLearnResource} type='button' className='w-full font-bold border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-4 cursor-pointer'>
                                                    <span className={ showSpinner ? "hidden" : ""}>Create</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="15"/>
                                                </button>
                                            </div>

                                            {/* Success */}
                                            <div className={isSuccessful === 'true' ? "otp-alert mb-20":"hidden"}>
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

                                            {/* Error */}
                                            <div className={isSuccessful === 'false' ? "error-alert mb-20" : "hidden"}>
                                                <div className="flex justify-between space-x-1 pt-3">
                                                    <div className="flex">
                                                        <div>
                                                            <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                            </svg>
                                                        </div>

                                                        <div className="text-sm">{errorMsg}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End */}
                                            
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
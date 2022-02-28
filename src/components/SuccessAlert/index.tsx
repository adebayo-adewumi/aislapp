
import SuccessIcon from '../../assets/images/success.gif';
const SuccessAlert = ({ showSuccess,
    closeModal,
    message = "Successful",
    title = "Successful"
}: any) => {

    return (
        <div className={showSuccess ? "success-modal" : "success-modal hidden"}>
            <div className="mx-auto h-64 relative">
                <img src={SuccessIcon} alt="success icon" className="w-96" />
                <div className="bg-white p-3 w-full -bottom-10 absolute"></div>
            </div>

            <div className="relative z-10 text-green-900 font-gotham-black-regular text-3xl text-center mb-20">{title}</div>

            <div className="text-color-4 text-sm text-center mb-14">{message}</div>

            <div className="flex space-x-5 mb-30">
                <button onClick={closeModal} type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer">Close</button>

                <button onClick={closeModal} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">Okay</button>
            </div>
        </div>
    );
}
export default SuccessAlert;
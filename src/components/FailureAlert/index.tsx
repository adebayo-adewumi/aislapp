
import DeleteIcon from '../../assets/images/failed.svg';
const FailureAlert = ({ showFailure,
    closeModal,
    message = "Failed",
    title = "Failed"
}: any) => {

    return (
        <div className={showFailure ? "success-modal" : "success-modal hidden"}>
            <div className="d-flex justify-content-center">
                <img src={DeleteIcon} alt="success icon" className="w-60" />
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
export default FailureAlert;
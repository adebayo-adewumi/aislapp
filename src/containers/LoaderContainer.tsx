
import AnchoriaIcon from '../assets/images/anchoria-icon.svg';
import AnchoriaSpinner from '../assets/images/anchoria-spinner.svg';

const LoaderContainer = ({ children, showPageLoader }: any) => {

    return (
        <div>
            <div className={showPageLoader ? "page-loader-backdrop opacity-90" : "hidden"}>
                <div className='ml-custom w-96 my-custom relative'>
                    <div className='absolute top-44pc left-46pt5pc'><img src={AnchoriaIcon} alt="" /></div>
                    <div className='text-center'><img src={AnchoriaSpinner} alt="" /></div>
                </div>
            </div>
            {children}
        </div>
    );
}
export default LoaderContainer;
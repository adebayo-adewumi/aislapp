
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FunctionComponent } from "react";
import GreenBoxIcon from '../../assets/images/green-box.svg';
import RedBoxIcon from '../../assets/images/red-box.svg';
import ChevronRightIcon from "../../assets/images/chevron-right.svg";
import BlueBoxIcon from '../../assets/images/blue-box.svg';
import DeleteIcon from '../../assets/images/delete-icon.svg';
import { defaultToZeroIfNullOrUndefined, isNullOrUndefined } from '../../common/Utilities';
import { formatCurrencyWithDecimal } from '../../lib/helper';
import axios from 'axios';
import { getPortfolioEndpoint } from '../../apiUrls';
import { getAxios } from '../../network/httpClientWrapper';
import LoaderContainer from "../../containers/LoaderContainer";
import SuccessAlert from "../SuccessAlert";
import FailureAlert from "../FailureAlert";
import ModalBackground from "../ModalBackground";

type Props = {
    item: {
        purchasedValue: number,
        currentValue: number,
        portfolioPercentageReturn: number,
        portfolioReturn: number,
        name: string,
        uuid: string,
        listOfStocks: any[]
    };
    title: string;
    onReload: () => void
};


const PortfolioInfoCard: FunctionComponent<Props> = ({
    item,
    title,
    onReload
}) => {
    let navigate = useNavigate();

    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showSuccess, setShowSuccessModal] = useState<boolean>(false);
    const [showFailure, setShowFailureModal] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    function closeModal() {
        setShowModalBG(false);
        setShowSuccessModal(false);
        setShowFailureModal(false);
    }

    const viewPortfolioDetails = () => {
        navigate("details/".concat(item.uuid));
    }

    const deletePortfolio = () => {
        setShowSpinner(true);

        let urlToCall: string = getPortfolioEndpoint.concat("/".concat(String(item.uuid)));

        getAxios(axios).delete(urlToCall).then((response) => {
            setShowModalBG(true);
            setShowSuccessModal(true);
            setShowSpinner(false);
            onReload();

        }).catch((err) => {
            setShowSpinner(false);
            setShowFailureModal(true);
            setErrorMessage(err.message);
        });
    }

    return (
        <LoaderContainer showPageLoader={showSpinner}>
            {showSuccess && <SuccessAlert showSuccess={showSuccess} closeModal ={closeModal}/>}
            {showFailure && <FailureAlert message={errorMessage} showFailure={showFailure} closeModal ={closeModal}/>}
            {showModalBG && <ModalBackground showModalBG={showModalBG}/>}
            
            <div className="card-custom p-5 flex justify-between cursor-pointer">
                <div className="flex space-x-4">
                    <div><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" /></div>

                    <div className="text-14">
                        <div className="mb-10 font-bold text-color-2">{item.name}</div>
                        <div className={item.hasOwnProperty("listOfStocks") ? 'text-black':'hidden'}>Count: {item.hasOwnProperty("listOfStocks") ? item.listOfStocks.length : 0}</div>
                    </div>
                </div>

                <div className="text-14">
                    <div className="flex mb-10 justify-between">
                        <div className="text-color-1 font-bold">{title}</div>
                    </div>
                    <div className="font-gotham-black-regular text-color-1 text-24 mb-10">₦ {formatCurrencyWithDecimal(item.currentValue)}</div>
                    <div className={item.hasOwnProperty("uuid") ? '':'hidden'}>
                        <span className={(item.portfolioReturn) >= 0 ? "text-green-500 text-24 font-bold" : "text-red-500 text-24 font-bold"}>
                            <span>{formatCurrencyWithDecimal(defaultToZeroIfNullOrUndefined(item.portfolioReturn)).replace("-","")}</span> |
                            <span className='ml-1'>{isNullOrUndefined(item.portfolioPercentageReturn)
                                ? 0 : formatCurrencyWithDecimal(item.portfolioPercentageReturn).replace("-","")}</span>%</span>
                        <span className='text-black hidden'> 7days</span>
                    </div>
                </div>

                <div className={item.hasOwnProperty("uuid") ? 'row d-flex justify-content-end align-items-end':'hidden'}>
                    <div onClick={viewPortfolioDetails}><img src={ChevronRightIcon} alt="" /></div>
                    <div className='mr-2' onClick={deletePortfolio}>
                        <img src={DeleteIcon} alt="" />
                    </div>
                </div>
            </div>
        </LoaderContainer>
    );
}

export default PortfolioInfoCard;
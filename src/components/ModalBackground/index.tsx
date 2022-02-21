const ModalBackground = ({ showModalBG,
}: any) => {

    return (
        <div className={showModalBG ? "modal-backdrop opacity-40" : "modal-backdrop opacity-40 hidden"}></div>
    );
}
export default ModalBackground;
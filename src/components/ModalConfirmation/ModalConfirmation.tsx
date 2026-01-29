import React from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../Button/Button";

import "./ModalConfirmation.css"

interface ModalConfirmationProps {
    visible: boolean
    // title: React.ReactNode;
    children: React.ReactNode;
    closeText?: string
    onOk?: () => void
    onCancel?: () => void;
    okText?: React.ReactNode;
    cancelText?: React.ReactNode;
    okButtonProps?: React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >;
    cancelButtonProps?: React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >;
}


// eslint-disable-next-line import/no-anonymous-default-export
const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
    // title = "",
    children,
    onCancel,
    visible = false,
    onOk,
    okText
    // onClose,
}) => {
    if (!visible) {
        return null;
    }
    // const {title} = props
    return (
        <div className="modal-confirmation-container">
        <div className="modal-confirmation-centered">
            <div className="modal-confirmation">
                {/* <div className="modal-header">
                    <div className="modal-title">{ title }</div>
                    <div className="modal-closemark">
                        <button onClick={onCancel}>
                            <h1><FaTimes /></h1>
                        </button>
                    </div>
                </div> */}
                <div className="modal-confirmation-body">
                  
                  { children }
                </div>
                <div className="modal-confirmation-footer">
                    {/* <button {...props.cancelButtonProps} onClick={() => props.onCancel()}>
                        { props.cancelText ? props.cancelText : null}
                    </button> */}
                    {/* <button {...props.okButtonProps} onClick={() => props.onOK()}>
                        { props.okText ? props.okText : "OK" } */}
                    <Button
                        name="Batalkan"
                        color="light"
                        onClick={onCancel}
                        style={{marginRight:5}}
                    />
                    {okText === "Hapus" ?
                    <Button
                        name="Hapus"
                        color="secondary"
                        onClick={onOk}
                    />
                    : 
                    <Button
                        name="Simpan"
                        color="success"
                        onClick={onOk}
                    />
                    }
                    {/* <Button name="Simpan" /> */}
                </div>
            </div>
        </div>
    </div>
    );

};

export default ModalConfirmation
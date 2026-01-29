import React from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../Button/Button";

import "./Modal.css"

interface ModalProps {
    visible: boolean
	title: React.ReactNode;
	children: React.ReactNode;
    closeText?: string
	onOk?: () => void
	onCancel?: () => void;
	onReject?: () => void;
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
const Modal: React.FC<ModalProps> = ({
	title="",
	children,
	onCancel,
	visible = false,
	onOk,
	okText,
	onReject
	// onClose,
  }) => {
	if (!visible) {
	  return null;
	}
    // const {title} = props
	return (
		<div className="modal-container">
			<div className="modal-centered">
				<div className="modal">
					<div className="modal-header">
                        <div className="modal-title">{ title }</div>
						<div className="modal-closemark">
							<button onClick={onCancel}>
								<h1><FaTimes /></h1>
							</button>
						</div>
					</div>
                    <div className="modal-body">{ children }</div>
					<div className="modal-footer">
                        {/* <button {...props.cancelButtonProps} onClick={() => props.onCancel()}>
                            { props.cancelText ? props.cancelText : null}
                        </button> */}
                        {/* <button {...props.okButtonProps} onClick={() => props.onOK()}>
                            { props.okText ? props.okText : "OK" } */}
							{okText === "Edit" ? 
							<Button 
								name="Edit"
								color="primary"
								onClick={onOk}
							/>
						: okText === "Simpan" ?
						<>
						<Button 
						name="Batalkan"
						color="secondary"
						onClick={onCancel}
						style={{marginRight:5}}
						/> 
						<Button 
						name="Simpan"
						color="success"
						onClick={onOk}
						/> 
						</>
						: okText === "Terima" ?
						<>
						<Button 
						name="Tolak"
						color="secondary"
						onClick={onReject}
						style={{marginRight:5}}
						/> 
						<Button 
						name="Terima"
						color="success"
						onClick={onOk}
						/> 
						</>
						:  okText === "Tolak" ?
						<>
						<Button 
						name="Tolak"
						color="secondary"
						onClick={onReject}
						style={{marginRight:5}}
						/> 
						<Button 
						name="Terima"
						color="disabled"
						onClick={onOk}
						/> 
						</>
						: null }
						{/* <Button name="Simpan" /> */}
					</div>
				</div>
			</div>
		</div>
	);
    
};

export default Modal
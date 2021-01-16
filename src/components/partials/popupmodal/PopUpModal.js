import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap'

const PopUpModal = (props) => {
    let smallFInput = props.fInput.toLowerCase()
    let smallSInput = (props.sInput ? props.sInput.toLowerCase() : "");

    const [fInfo, setFInfo] = useState()
    const [sInfo, setSInfo] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = document.getElementById("PopUpForm");
        form.checkValidity()
        let formInfo;
        if (sInfo) {
            formInfo = smallFInput + "=" + fInfo + "&" + smallSInput + "=" + sInfo
        }
        else {
            formInfo = smallFInput + "=" + fInfo
        }
        props.submitAction(props.iden, formInfo)
    }

    return (
        <div>
            <Modal show={props.show}>
                <Modal.Header closeButton onClick={() => props.hide()}>
                    <Modal.Title>{props.heading}</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit} id="PopUpForm">

                    <Modal.Body>
                        <label> {props.fInput}</label>
                        <input type="text" className="form-control mb-2" required name={smallFInput}
                            onChange={e => setFInfo(e.target.value)} />
                        {props.sInput ? <div><label> {props.sInput}<small></small></label>
                            <input type="text" className="form-control" required name={smallSInput}
                                onChange={e => setSInfo(e.target.value)} /></div> : ''}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => props.hide()}>
                            Close
                    </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};
export default PopUpModal;
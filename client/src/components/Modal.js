
import { useEffect } from "react";
import "./Modal.css";


const Modal = ({ setModalOpen, contract }) => {
    const sharing = async () => {
        const address = document.querySelector(".address").value;
        await contract.allow(address);

    };
    const abort = async () => {
        const address = document.querySelector(".address").value;
        await contract.disallow(address);
    };
    useEffect(() => {
        const list = async () => {
            const addlist = await contract.shareAcess();
            console.log(addlist)
            let select = document.querySelector("#selectnumber");

            for (let i = 0; i < addlist.length; i++) {
                let opt = addlist[i];
                console.log("gg");
                const newel = document.createElement("option");

                newel.innerText = opt;
                // console.log("1");
                console.log(newel.innerText);
                newel.textContent = opt;
                // console.log("2");
                // console.log(newel.textContent);
                // newel.value = opt;
                // console.log("3");
                // console.log(newel.value);

                select.appendChild(newel);
            }

        };
        contract && list();
    }, [contract]);

    return (<>
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title"> Share With</div>
                <div className="body">
                    <input type="text" className="address" placeholder="Enter Address"></input>
                </div>
                <form id="myform">
                    <select id="selectnumber">
                        <option className="address">Share With Access</option>
                    </select>
                </form>
                <div className="footer">
                    <button onClick={() => { setModalOpen(false) }} id="cancelBtn">Cancel</button>
                    <button onClick={() => sharing()}>Share  Access</button>
                    <button onClick={() => abort()}>Abort  Access</button>
                </div>

            </div>
        </div>

    </>)

};

export default Modal;
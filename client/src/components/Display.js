import { useState } from "react";

import "./Display.css";


const Display = ({ contract, account }) => {
    const [data, setData] = useState("");
    const getData = async () => {

        let dataArray;
        let Otheraddress = document.querySelector(".address").value;

        try {

            if (Otheraddress) {
                dataArray = await contract.display(Otheraddress);
                console.log(dataArray);
            } else {
                dataArray = await contract.display(account);
            }
        }
        catch (e) {
            alert("You Don't have access");
        }
        const isEmpty = Object.keys(dataArray).length === 0;
        if (!isEmpty) {
            const str = dataArray.toString();
            const str_array = str.split(",");
            // console.log(str);
            // console.log(str_array);
            const file = str_array.map((item, i) => {
                return (

                    <a href={item} key={i} target="_blank" rel="noreferrer">
                        <img key={i} src={item}
                            alt="File"
                            className="image-list"
                        ></img>
                        

                    </a>
                )
            })

            setData(file);

        } else {
            alert("No file to Display");
        }
    }
    return <>
        <div className="image-list"  >{data}</div>
        <input type="text" placeholder="Enter Address" className="address"></input>
        <button className="center button" onClick={getData}>
            Get Images
        </button>


    </>
};

export default Display;
import React from 'react';
import { useEffect, useState } from 'react';
import { firestore } from '../base';
import { getFirestore, collection, getDocs, setDoc, arrayUnion } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import './Assign.css';
import { navigate } from '@reach/router';
import PickerButton from 'antd/es/date-picker/PickerButton';
const Assign = () => {
    const [lookupUID, setLookupUID] = useState("");
    const [adminList, setAdminList] = useState([]);
    const [assigned, setAssigned] = useState("");
    const [assignedUid, setAssignedUid] = useState("");
    const [admin, setAdmin] = useState({});
    async function getAdmin() {
        // const db = getFirestore();
        const adminRef = collection(firestore, "admins");
        const adminSnapshot = await getDocs(adminRef);
        const adminList = adminSnapshot.docs.map(doc => doc.data());
        console.log(adminList);
        setAdminList(adminList);
        return adminList;
    }
    async function submit(e) {
        e.preventDefault(); 
        console.log("submit");
        // setAssigned(document.getElementById("exampleFormControlSelect1").value);
        console.log(assigned);
        updateDoc(doc(firestore, "admins", assignedUid), {
            assignedStories: arrayUnion(...[lookupUID])
        }).then(() => {
            updateDoc(doc(firestore, "userRequestedWebsites", lookupUID), {
                assignedTo: assigned
            }).then(() => {
                console.log("Document successfully written!");
                alert("Assigned to " + assigned + "!");
            });
            
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        }
        );
        
    }
    const handleChange = (e) => {
        
        setAdmin(e.target.value);
        console.log("admin",admin);
        setAssigned(e.target.selectedOptions[0].text);
        setAssignedUid(e.target.value);
        // setAssignedUid(e.target.value[0]);
        console.log("assigned: ", assigned);
        console.log("assignedUid: ", assignedUid);
    }
    const goBack = () => {
        // window.history.back();
        navigate('/story/'+lookupUID);
        window.location.reload();
    }
    useEffect(()=> {
        const tempUID = window.location.pathname.slice(8,);
        setLookupUID(tempUID);
        console.log(tempUID);
        // getStoryInfo(lookupUID);
        
        console.log("Important");
        getAdmin();

        // console.log(data[1]);
        // setFname(data.firstName);

    },[])
  return (
    <div className="assign">
        <div className='story1'>
        <h3>Assign {lookupUID} to:</h3>
        {/* dropdown menu containing list of admin names */}
        
        <form>
                <div class="form-group">
                    <label for="exampleFormControlSelect1" >Select Assignee</label>
                    <select class="form-control" id="exampleFormControlSelect1" onChange={handleChange}>
                        {adminList.map((admin) => {
                            return (
                                <option key={admin.name} value={admin.uid}>{admin.name}</option>
                            )
                        }
                        )}
                    </select>
                    <div onClick={submit} className = 'edit1'>Submit</div>
                </div>
        </form>
        </div>
        <div className='edit1' onClick={goBack}>Go Back</div>
    </div>
  );
};
export default Assign;
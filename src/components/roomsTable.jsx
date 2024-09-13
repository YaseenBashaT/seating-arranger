import { useEffect, useState } from "react"
import { json } from "react-router-dom"

export default function Roomstable(){
    const [roomList, setRoomList] = useState([])

    const url = "https://seating-arranger.onrender.com"
    useEffect(()=>{ 
        fetch(`${url}/getrooms`)
        .then(response=> {return response.json()})
        .then(data=> {console.log(data);setRoomList(data.response)})
        .catch(reason=>{console.log(reason)})
    },[])

    function handleInsert(room){
        fetch(`${url}/getrooms`,{
            method:"POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(room)})
        .then((resp)=>{ return resp.json()})
        .then((data)=>{setRoomList(prev=>[...prev, data.response]);});
        
    }
    function handleDeleteRow(id){
        let conf = confirm("delete the row")
        if (conf){
            fetch(`${url}/getrooms/${id}`, {method:'DELETE'})
            .then(resp => {return resp.json})
            .then((data) => console.log(data.response))
            setRoomList(item => item.filter(room => id !== room._id))
        }
    }

    return <>
    <InsertRowForm handleInsert={handleInsert} />
    <Table roomList={roomList} handleDeleteRow={handleDeleteRow} />
    </>
}

const InsertRowForm = ({handleInsert})=>{
    const [form, setform] = useState({rno:'', rows:'', columns:'', strength:''})
    const handlesubmit = (e)=>{
        e.preventDefault();
        if (form.rno != "" && form.rows >1 && form.columns >1 && form.strength >0)
        handleInsert(form);
        else
        alert("check the room details")

    }
    const handlerno = (e)=>{
        setform(prev=> ({...prev, rno: e.target.value}))
    }
    const handlerow = (e)=>{
        setform(prev=> ({...prev, rows: e.target.value}))
    }
    const handlecolumn = (e)=>{
        setform(prev=> ({...prev, columns: e.target.value}))
    }
    const handlestrength = (e)=>{
        setform(prev=> ({...prev, strength: e.target.value}))
    }

    return <form action="" id="formInsertRooms" onSubmit={ handlesubmit}>
        <input type="text" name="rno" id="" placeholder="room number" value={form.rno} onChange={handlerno}/>
        <input type="number" name="rows" id="rows" placeholder="rows" value={form.rows} onChange={handlerow}/>
        <input type="number" name="columns" id="columns" placeholder="columns" value={form.columns} onChange={handlecolumn}/>
        <input type="number" name="strength" id="strength" placeholder="strength" value={form.strength} onChange={handlestrength} />
        <input type="submit" value="add room" />
    </form>
}


const Table = ({roomList, handleDeleteRow })=>{
    return <table>
    <thead>
    <tr key={0}>
    <th>rno</th>
    <th> rows </th>
    <th> columns </th>
    <th>strength </th>
    <th> delete row</th>
    </tr>
    </thead>
    
    <tbody>
    { roomList.map(item =>  <tr key={item._id}> 
    <td> {item.rno}</td>
    <td> { item.rows }</td>
    <td> {item.columns} </td>
    <td> {item.strength} </td>
    <td> <button onClick={()=> handleDeleteRow(item._id)}> delete row</button></td>
</tr>) }
    </tbody>
</table>
}
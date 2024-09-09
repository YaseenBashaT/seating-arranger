import { useEffect, useState } from "react"
import { json } from "react-router-dom"

export default function Roomstable(){
    const [roomList, setRoomList] = useState([])

    const url = "https://ap-south-1.aws.data.mongodb-api.com/app/data-opccxbo/endpoint/data/v1/action/findOne"
    useEffect(()=>{ 
        
        fetch('http://127.0.0.1:8080/getrooms')
        .then(response=> {return response.json()})
        .then(data=> {setRoomList(data.response)})
        .catch(reason=>{console.log(reason)})
    },[])

    function handleInsert(room){
        setRoomList((item)=> { roomList+item });
    }
    function handleDeleteRow(id){
        setRoomList(item => item.filter(room => id !== room.id))
    }
    function handledummy(id){
        console.log(id)
    }
    return <>
    <Table roomList={roomList} handleDeleteRow={handleDeleteRow} />
    </>
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
    { roomList.map(item =>  <tr key={item.id}> 
    <td> {item.rno}</td>
    <td> { item.rows }</td>
    <td> {item.columns} </td>
    <td> {item.strength} </td>
    <td> <button onClick={()=> handleDeleteRow(item.id)}> delete row</button></td>
</tr>) }
    </tbody>
</table>
}
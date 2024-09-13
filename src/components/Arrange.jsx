import { useState, useEffect } from "react"
import { json } from "react-router-dom";

function allValuesNotNull(array, property) {
    return array.every(item => item[property] !== null);
}

export default function Arrange(){
    const [rooms, setRooms] = useState([])
    const [branches, setBranches] = useState([])
    const [seatingdata, setSeatingData] = useState([])

    //get rooms data 
    const url = "https://seating-arranger.onrender.com"
    useEffect(()=>{ 
        fetch(`${url}/getrooms`)
        .then(response=> {return response.json()})
        .then(data=> {setRooms(data.response)})
        .catch(reason=>{console.log(reason)})
    },[])

    //get branches data
    useEffect(()=>{ 
        fetch(`${url}/getbranches`)
        .then(response=> {return response.json()})
        .then(data=> {setBranches(data.response)})
        .catch(reason=>{console.log(reason)})
    },[])

    const handleCheckedRoom = (e, room)=>{
        const {checked} = e.target;
        setRooms(prev => prev.map(item => (item._id === room._id? {...item, checked:checked} : item)))
    }
    const handleCheckedBranch = (e, branch)=>{
        const {checked} = e.target;
        setBranches(prev => prev.map(item => (item._id === branch._id ? {...item, checked:checked} : item)))
    }
    const handleChangeSubject = (e, branch)=>{
        const {value} = e.target;
        setBranches(prev => prev.map(item => (item._id === branch._id ? {...item, subject:value}: item)))
        console.log(branches)
    }


    const handlesubmit =(e)=>{
        e.preventDefault()
        let room = rooms.filter(item => item.checked == true)
        let branch = branches.filter(item => item.checked == true)
        console.log(room, branch)

            fetch(`${url}/arrangerooms`, {method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    rooms: rooms.filter(item => item.checked == true),
                    branches: branches.filter(item => item.checked == true)
                })
            })
            .then(resp => {return resp.json()})
            .then(data => { let jsonString = data.res;
                jsonString = jsonString.replace(/'/g, '"');
                console.log(data.res);
                console.log(typeof JSON.parse(jsonString));
                setSeatingData(JSON.parse(jsonString))})

    }



    return <>
    <h1> select rooms </h1>

    <div className="selectrooms">

        {rooms.map( room => <>
        <label key={room._id}> {room.rno} 
            <input type="checkbox" 
            name={room.rno} 
            id={room.rno} 
            onChange={(e) => handleCheckedRoom(e, room)}
            checked= {room.checked ? room.checked :false} />
        </label>
        </>)}

    </div>

    <SelectBranch handleChangeSubject={handleChangeSubject} handleCheckedBranch={handleCheckedBranch} branches={branches}/>

    

    <button onClick={ handlesubmit}> generate seating chart</button>

    <SeatingChart rows = {seatingdata} />
    
    </>
}

const SelectBranch =({handleChangeSubject,handleCheckedBranch,  branches})=>{
    return <>
    <h2>select branches </h2>
    <div className="selectbranches">
    {branches.map( branch => <>
        <label key={branch._id}> 
            <input type="checkbox" 
            name={branch.branch} 
            id={branch.branch} 
            onChange={(e) => handleCheckedBranch(e, branch)}
            checked= {branch.checked ? branch.checked :false} />
            {branch.branch}: 
        </label>
        <input type="text" name="subject" placeholder="subject name" value={branch.subject} onChange={(e)=> {handleChangeSubject(e, branch)}} /> <br />
        </>)}
    </div></>
}

const SeatingChart = ({rows})=>{
    return <>
    { (rows.length == 0) ? <p> no data found </p> : <Chart data={rows}/> }
    
    </>
}

//rno': 'vff 5', 'from': 1, 'to': 15, 'row': 1, 'branch': 'AIML'}
const Chart = ({data})=>{
    return <>
        <table>
        <thead>
        <tr key={0}>
        <th>branch</th>
        <th> from  </th>
        <th> to </th>
        <th>strength </th>
        <th> room  </th>
        </tr>
        </thead>
        
        <tbody>
        { data.map(item =>  <tr > 
        <td> {item.branch}</td>
        <td> { item.from }</td>
        <td> {item.to} </td>
        <td> {item.to - item.from +1} </td>
        <td> { item.rno}</td>
    </tr>) }
        </tbody>
    </table>
    
    </>
}
import { useState, useEffect } from "react"

export default function BranchTable(){
const [data, setData] = useState([])
const [editingId, setEditingId] = useState(null);
// server url
const url = "https://seating-arranger.onrender.com"

//loading data from the server and fill the table

    useEffect(()=>{ 
        fetch(`${url}/getbranches`)
        .then(response=> {return response.json()})
        .then(data=> {setData(data.response)})
        .catch(reason=>{console.log(reason)})
    },[])

// function to handle insert branch 
function handleInsert(branch){
    fetch(`${url}/getbranches`,{
        method:"POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(branch)})
    .then((resp)=>{ return resp.json()})
    .then((data)=>{setData(prev=>[...prev, data.response]);});
}

// Function to handle row deletion
const handleDelete = (id) => {
    let conf = confirm("confirm to delete the branch!!")
    if (conf){
        fetch(`${url}/getbranches/${id}`, {method:'DELETE'})
        .then(resp => {return resp.json})
        .then((data) => console.log(data.response))
        setData(item => item.filter(room => id !== room._id))
    }
};

// Function to handle row edit
const handleEdit = (id, updatedRow) => {
setData(prevData =>
    prevData.map(item => (item.id === id ? { ...item, ...updatedRow } : item))
);
setEditingId(null); // Exit edit mode after saving
};

// Function to start editing mode
const startEditing = (id) => {
setEditingId(id);
};

return (
<div>
    <InsertBranchForm handleInsert={handleInsert} />

    <Table
    data={data}
    onDelete={handleDelete}
    onEdit={handleEdit}
    editingId={editingId}
    startEditing={startEditing}
    />
</div>
);
}


const InsertBranchForm =({handleInsert})=>{
    const [form, setform] = useState({branch:'', strength:''})
    const handlesubmit = (e)=>{
        e.preventDefault();
        if (form.branch != "" && form.year >0 &&  form.strength >0)
        handleInsert(form);
        else
        alert("invalid! check the branch details")

    }
    const handlebranch = (e)=>{
        setform(prev=> ({...prev, branch: e.target.value}))
    }
    const handlerow = (e)=>{
        setform(prev=> ({...prev, year: e.target.value}))
    }
    const handlestrength = (e)=>{
        setform(prev=> ({...prev, strength: e.target.value}))
    }

    return <form action="" id="formInsertRooms" onSubmit={ handlesubmit}>
        <input type="text" name="branch" id="" placeholder="branch name" value={form.branch} onChange={handlebranch}/>
        <input type="number" name="year" id="year" placeholder="year" value={form.year} onChange={handlerow}/>
        <input type="number" name="strength" id="strength" placeholder="strength" value={form.strength} onChange={handlestrength} />
        <input type="submit" value="add branch" />
    </form>

}
const Table = ({ data, onDelete, onEdit, editingId, startEditing }) => {
    return ( <table>
        <thead>
            <tr>
            <th>Branch</th>
            <th>Year</th>
            <th>Strength</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {data.map(item => (
            <TableRow
                key={item.id}
                item={item}
                isEditing={item.id === editingId}
                onDelete={onDelete}
                onEdit={onEdit}
                startEditing={startEditing}
            />
            ))}
        </tbody>
        </table>
    );
    };


const TableRow = ({ item, isEditing, onDelete, onEdit, startEditing }) => {
const [branch, setBranch] = useState(item.branch);
const [year, setYear] = useState(item.year);
const [strength, setStrength] = useState(item.strength);

const handleEditClick = () => {
    if (isEditing) {
    onEdit(item.id, { branch, year, strength }); // Save the edited data
    } else {
    startEditing(item.id); // Enter edit mode
    }
};

return (
    <tr>
    <td>
        {isEditing ? (
        <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
        />
        ) : (
        branch
        )}
    </td>
    <td>
        {isEditing ? (
        <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
        />
        ) : (
        year
        )}
    </td> 
    <td>
        {isEditing ? (
        <input
            type="number"
            value={strength}
            onChange={(e) => setStrength(Number(e.target.value))}
        />
        ) : (
        strength
        )}
    </td>
    <td>
        <button onClick={() => onDelete(item._id)}>Delete</button>
        {/* <button onClick={handleEditClick}>
        {isEditing ? 'Save' : 'Edit'}
        </button> */}
    </td>
    </tr>
);
};













//my code

function dymmytable(){
    const [branchList, setBranchList] = useState([
        {id:1,branch:'aiml', year:3, strength:52 },
        {id:2,branch:'cse', year:3, strength:52 },
        {id:3,branch:'ece', year:3, strength:52 },
        {id:4,branch:'eee', year:3, strength:52 },
        {id:5,branch:'cai', year:3, strength:52 },
        {id:6,branch:'csm', year:3, strength:52 },
        {id:7,branch:'it', year:3, strength:52 },
        {id:8,branch:'ce', year:3, strength:52 },

    ])
    return <>
    <Table branchList={branchList}/>
    </>
}


const Tableme = ({branchList})=>{
    return <table>
        <thead>
            <tr>
            <th>branch</th>
            <th> year </th>
            <th>strength </th>
            </tr>
        </thead>
        <tbody>
            { branchList.map(item => <tr key={item._id}> 
            <td> {item.branch}</td>
            <td> { item.year }</td>
            <td> {item.strength} </td>
            </tr>)}
        </tbody>
    </table>
}
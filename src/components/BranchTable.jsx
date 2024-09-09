import { useState } from "react"

export default function BranchTable(){
const [data, setData] = useState([
{ id: 1, branch: 'Computer Science', year: 2023, strength: 60 },
{ id: 2, branch: 'Electrical Engineering', year: 2022, strength: 45 },
{ id: 3, branch: 'Mechanical Engineering', year: 2024, strength: 50 }
]);

const [editingId, setEditingId] = useState(null);

// Function to handle row deletion
const handleDelete = (id) => {
setData(prevData => prevData.filter(item => item.id !== id));
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
    <h1>Data Table</h1>
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
        <button onClick={() => onDelete(item.id)}>Delete</button>
        <button onClick={handleEditClick}>
        {isEditing ? 'Save' : 'Edit'}
        </button>
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
            { branchList.map(item => <tr key={item.id}> 
            <td> {item.branch}</td>
            <td> { item.year }</td>
            <td> {item.strength} </td>
            </tr>)}
        </tbody>
    </table>
}
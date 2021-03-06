import React, { useEffect, useState } from "react";
import {useNavigate,Link} from 'react-router-dom';
import { FaEdit , FaTrash } from 'react-icons/fa';
import StudentService from "../services/StudentService";
import '../Students/student.css';
const Student=()=>{
    const history=useNavigate();
    const[student,setstudent]=useState([]);
    const editstudent=(id)=>{
        {localStorage.getItem('admindata')?
        history('/editstudent/'+id):history('/admin/login')}
    }
    const deletestudent=(id)=>{
        StudentService.deleteStudent(id).then(res=>{
            setstudent(student.filter(response=>response.studentId!==id));
        });
        alert('student Deleted');
    }
    const addstudent=()=>{
        {localStorage.getItem('admindata')?
        history('/enrollcourse'):history('/admin/login')}
    }
    useEffect(()=>{
            StudentService.getStudent().then((res)=>{
                setstudent(res.data);
            });
    },[]);
    return(
        <>
        {localStorage.getItem('admindata')?
        <div className="table-container">
        <div className='Navbar2'>
            <Link to='/institutepage' className='instnav'>Institutes</Link>
            <Link to='/availablecourse' className='instnav'>Courses</Link>
            <Link to='/student' className='instnav'>Students</Link>
        </div>
            <h1 className="heading">Student Details</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>EmailId</th>
                        <th>Mobile Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {student.map((item)=>{
                        return(
                            <tr key={item}>
                                <td>{item.studentId}</td>
                                <td>{item.firstName}</td>
                                <td>{item.emailId}</td>
                                <td>{item.phoneNumber}</td>
                                <td style={{cursor:'pointer'}}><FaEdit onClick={()=>editstudent(item.studentId)}/>
                                <FaTrash onClick={()=>deletestudent(item.studentId)}/></td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
            <div className='button2'>
            <button className='button' onClick={addstudent}><span>{'Add'} </span></button>
            </div>
        </div>:history('/admin/login')}
        </>
    );
}
export default Student;
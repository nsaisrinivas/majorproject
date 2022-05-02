import React,{useEffect,useState} from 'react'
import './enrolledcourse.css';
import StudentService from '../../admin/services/StudentService';
import { useNavigate } from 'react-router-dom';
const Enrolledcourse = () => {
  const history=useNavigate();
  const[student,setstudent]=useState([]);
  useEffect(()=>{
    StudentService.getStudent().then((res)=>{
        setstudent(res.data);
    });
},[]);
    return (
      <>{localStorage.getItem('usersdata')?
      <>
      {student.map((item)=>{
        return(
      <div className='enrolledcoursecontent'>
            <h1>Course Name :{item.coursename} <br></br>
              Student Name:{item.firstName}<br></br>
              Email Id:{item.emailId}<br></br>
              id:{item.studentId}<br></br>
              </h1>
            <div className='button-alignment'>
              <button className='enrollbutton' id='enrollbutton'>My Learning</button>
            </div>
      </div>
        )
      })}
      
      </>:history('/user/login')}
      </>
    )
  }
  
  export default Enrolledcourse;
import React from 'react'
import "./home.css"
import { Building2 } from "lucide-react"
import { Mail } from "lucide-react"
import student_Data from "./config/student.js"

function Home() {
  return (
    <div className='student-container'>
  
      {student_Data.map((student, index) => (
        <div className='student-card' key={index}>
          <h1 className='student-name'>{student.Name}</h1>
          <p className='student-info'>
          <Mail className='student-info-card' /> {student.email}
          </p>
          <p className='student-info'>
          <Building2 className='student-info-card' /> {student.city}
          </p>
          <p className='student-gender'>
            <img className='student-avatar'
              src={student.avatar}
              alt={student.gender}
            
            />
          </p>
        </div>
      ))}
    </div>
  )
}

export default Home
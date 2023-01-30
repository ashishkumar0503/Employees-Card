import './App.css';
import Employees from './components/Employees';
import Header from './components/Header';
import Footer from './components/Footer';
import GroupedTeamMembers from './components/GroupedTeamMembers';
import Nav from './components/Nav';
import NotFound from './components/NotFound';
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {

  const [selectedTeam, setTeam] = useState(JSON.parse(localStorage.getItem('selctedTeam')) || "TeamB");

    const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employeeList')) ||
        [
            {
                id: 1,
                fullName: "Ashish Kumar", 
                designation: "React Developer",
                gender: "Male",
                teamName: "TeamA"
            },
            {
                id: 2,
                fullName: "Lakshya Rana", 
                designation: "Node Developer",
                gender: "Male",
                teamName: "TeamA"
            },
            {
                id: 3,
                fullName: "Dheeraj Adhikari", 
                designation: "JavaScript Developer",
                gender: "Male",
                teamName: "TeamA"
            },
            {
                id: 4,
                fullName: "Jill Bailey", 
                designation: "Node Developer",
                gender: "Female",
                teamName: "TeamB"
            },
            {
                id: 5,
                fullName: "Gail Shepherd", 
                designation: "DotNet Developer",
                gender: "Female",
                teamName: "TeamB"
            },
            {
                id: 6,
                fullName: "Sam Raynolds", 
                designation: "Java Developer",
                gender: "Male",
                teamName: "TeamB"
            },
            {
                id: 7,
                fullName: "James Bennet", 
                designation: "API Developer",
                gender: "Male",
                teamName: "TeamC"
            },
            {
                id: 8,
                fullName: "Lita Stone", 
                designation: "C++ Developer",
                gender: "Female",
                teamName: "TeamC"
            },
            {
                id: 9,
                fullName: "Jessica Faye", 
                designation: "SQL Server DBA",
                gender: "Female",
                teamName: "TeamC"
            },
            {
                id: 10,
                fullName: "Daniel Young", 
                designation: "Angular Developer",
                gender: "Male",
                teamName: "TeamD"
            },{
                id: 11,
                fullName: "Adrian Jacobs", 
                designation: "Vue Developer",
                gender: "Male",
                teamName: "TeamD"
            },{
                id: 12,
                fullName: "Devin Monroe", 
                designation: "Graphic Designer",
                gender: "Male",
                teamName: "TeamD"
            }

        ]
    );

    useEffect(() => {
      localStorage.setItem('employeeList', JSON.stringify(employees));
    }, [employees]);

    useEffect(() => {
      localStorage.setItem('selectedTeam', JSON.stringify(selectedTeam));
    }, [selectedTeam]);

    function handleTeamSelectionChange(event) {
        setTeam(event.target.value);
    }

    function handleEmployeeCardClick(event) {
        const transformedEmployees = employees.map((employee) => employee.id === parseInt(event.currentTarget.id)
                                                ?(employee.teamName === selectedTeam) ? {...employee, teamName:''} : {...employee, teamName: selectedTeam}
                                                :employee);
        setEmployees(transformedEmployees);
    }


  return (
    <Router>
        <Nav/>
            <Header selectedTeam={selectedTeam}
                    teamMemberCount={employees.filter((employee) => employee.teamName === selectedTeam).length}
            />
            <Routes>
                <Route path="/" 
                    element={
                        <Employees employees={employees}
                                selectedTeam={selectedTeam}
                                handleEmployeeCardClick={handleEmployeeCardClick}
                                handleTeamSelectionChange={handleTeamSelectionChange}
                        />
                    }>
                </Route>
                <Route path="/GroupedTeamMembers" 
                    element={
                        <GroupedTeamMembers
                            employees={employees}
                            selectedTeam={selectedTeam}
                            setTeam={setTeam}
                        />
                    } >
                </Route>
                <Route path="*" 
                    element={
                        <NotFound/>
                    }>
                </Route>
            </Routes>
            <Footer/>
    </Router>
    
  );
}

export default App;

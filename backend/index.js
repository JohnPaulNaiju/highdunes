import cors from 'cors';
import mysql from 'mysql2';
import express from 'express';

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'highdunes'
});

app.use(express.json());
app.use(cors());

function toDate(value){
    try{
        if(value === 'MM/DD/YYYY' || !value) return null;
        const [month, day, year] = value.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }catch{
        return null;
    }
};

function toInt(value){
    try{
        if(value === '' || !value) return null;
        else return parseInt(value);
    }catch{
        return null;
    }
};

function toDec(value){
    try{
        if(value === '' || !value) return null;
        else return value;
    }catch{
        return null;
    }
};

function toPh(value){
    try{
        if(value === '' || !value) return null;
        else return `+${value.replace('+', '')}`;
    }catch{
        return null;
    }
};

function toJSON(value){
    try{
        if(value === '' || !value) return null;
        else return JSON.stringify(value);
    }catch{
        return null;
    }
};

app.post('/verify-phone', (req, res) => {
    const { phoneNumber } = req.body;
    const phno = phoneNumber.toString();
    const query = `SELECT * FROM employee WHERE phno = ${phno};`;
    db.query(query, (e, data) => {
        if(e) throw e;
        if(data.length > 0) res.status(200).json({ exists: true }); 
        else res.status(404).json({ exists: false });
    });
});

app.post('/create-employee', (req, res) => {
    const { name, status, role, empcode, dob, gender, phone, email, address, emph, emname, jobTitle, emptype, dateofhire, salary } = req.body;
    const query = 'INSERT INTO employee (name, status, role, empCode, dob, gender, phno, email, address, emPhNo, emName, jobTitle, empType, dateOfHire, salary) VALUES (?);';
    const values = [name, status, role, empcode, toDate(dob), gender, toPh(phone), email, address, toPh(emph), emname, jobTitle, emptype, toDate(dateofhire), salary];
    db.query(query, [values], (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json('Successfully created employee');
    });
});

app.get('/get-employee-count', (req, res) => {
    const query = 'SELECT COUNT(*) FROM employee;';
    db.query(query, (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json(data[0]['COUNT(*)']);
    });
});

app.get('/get-employees', (req, res) => {
    const query = 'SELECT * FROM employee ORDER BY createdAt DESC;';
    db.query(query, (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json(data);
    });
});

app.get('/get-employee-info', (req, res) => {
    const empId = req.query.empId;
    const query = `SELECT * FROM employee where id = ${parseInt(empId)};`;
    db.query(query, (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json(data);
    });
});

app.post('/update-employee', (req, res) => {
    const { id, name, status, role, empcode, dob, gender, phone, email, address, emph, emname, jobTitle, emptype, dateofhire, salary, dateOfTermination, hrsWorked, holidaySalary, holidaysWorked, overTimeSalary, overTimeHrs, comments } = req.body;
    const query = `
    UPDATE employee
    SET empCode = ?, name = ?, dob = ?, gender = ?, phno = ?, email = ?, address = ?, emPhNo = ?, emName = ?, jobTitle = ?, dateOfHire = ?, dateOfTermination = ?, empType = ?, salary = ?, hrsWorked = ?, holidaySalary = ?, holidaysWorked = ?, overTimeSalary = ?, overTimeHrs = ?, status = ?, role = ?, comments = ?
    WHERE id = ?`;
    const values = [empcode, name, toDate(dob), gender, toPh(phone), email, address, toPh(emph), emname, jobTitle, toDate(dateofhire), toDate(dateOfTermination), emptype, salary, toInt(hrsWorked), toDec(holidaySalary), toInt(holidaysWorked), toDec(overTimeSalary), toInt(overTimeHrs), status, role, comments, id];
    db.query(query, values, (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json("Employee was updated");
    });
});

app.post('/delete-employee', (req, res) => {
    const { id } = req.body;
    const query = `DELETE FROM employee WHERE id = ${id}`;
    db.query(query, (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json("Employee was deleted");
    })
});

app.get('/get-client-count', (req, res) => {
    const query = 'SELECT COUNT(*) FROM client;';
    db.query(query, (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json(data[0]['COUNT(*)']);
    });
});

app.get('/get-clients', (req, res) => {
    const query = 'SELECT * FROM client ORDER BY createdAt DESC;';
    db.query(query, (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json(data);
    });
});

app.post('/create-client', (req, res) => {
    const { name, status, clientType, email, mob1, mob2, comments } = req.body;
    const query = 'INSERT INTO client (name, status, clientType, email, mob1, mob2, comments) VALUES (?);';
    const values = [name, status, clientType, email, toPh(mob1), toPh(mob2), comments];
    db.query(query, [values], (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json('Successfully created client');
    });
});

app.get('/get-client-info', (req, res) => {
    const clientId = req.query.clientId;
    const query = `SELECT * FROM client where id = ${parseInt(clientId)};`;
    db.query(query, (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json(data);
    });
});

app.post('/update-client', (req, res) => {
    const { id, name, status, clientType, email, mob1, mob2, comments } = req.body;
    const query = `
    UPDATE client
    SET name = ?, status = ?, clientType = ?, email = ?, mob1 = ?, mob2 = ?, comments = ?
    WHERE id = ?`;
    const values = [name, status, clientType, email, toPh(mob1), toPh(mob2), comments, id];
    db.query(query, values, (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json("Client was updated");
    });
});

app.post('/delete-client', (req, res) => {
    const { id } = req.body;
    const query = `DELETE FROM client WHERE id = ${id}`;
    db.query(query, (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json("Client was deleted");
    })
});

app.get('/get-project-count', (req, res) => {
    const query1 = 'SELECT COUNT(*) FROM project;';
    const query2 = 'SELECT COUNT(*) FROM project where status = ?;';
    const query3 = 'SELECT COUNT(*) FROM project where status = ?;';
    const query4 = 'SELECT COUNT(*) FROM project where status = ?;';
    db.query(query1, (e, data1) => {
        if(e) return res.status(404).json(e);
        db.query(query2, ['active'], (e, data2) => {
            if(e) return res.status(404).json(e);
            db.query(query3, ['completed'], (e, data3) => {
                if(e) return res.status(404).json(e);
                db.query(query4, ['pending'], (e, data4) => {
                    if(e) res.status(404).json(e);
                    else res.status(200).json({
                        total: data1[0]['COUNT(*)'], 
                        active: data2[0]['COUNT(*)'], 
                        completed: data3[0]['COUNT(*)'], 
                        pending: data4[0]['COUNT(*)'], 
                    });
                });
            });
        });
    });
});

app.get('/get-projects', (req, res) => {
    const query = `
    SELECT project.*, client.name AS clientName
    FROM project
    JOIN client ON project.clientId = client.id
    ORDER BY project.createdAt DESC;
    `;
    db.query(query, (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json(data);
    });
});

app.post('/create-project', (req, res) => {
    const { name, projectCode, startDate, clientId, clientName, serviceType, status, projectDesc, empId, empName } = req.body;
    const query = 'INSERT INTO project (name, projectCode, startDate, clientId, clientName, serviceType, status, projectDesc, supervisor, supervisorName) VALUES (?);';
    const values = [name, projectCode, toDate(startDate), toInt(clientId), clientName, serviceType, status, projectDesc, toInt(empId), empName];
    db.query(query, [values], (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json('Successfully created project');
    });
});

app.get('/get-project-info', (req, res) => {
    const clientId = req.query.projectId;
    const query = `SELECT * FROM project where id = ${parseInt(clientId)};`;
    db.query(query, (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json(data);
    });
});

app.post('/update-project', (req, res) => {
    const { id, projectCode, clientId, clientName, name, projectDesc, empId, empName, quantityOfService, serviceType, materialsRequired, materialsUsed, hrsTaken, team, startDate, endDate, status, comments } = req.body;
    const query = `
    UPDATE project
    SET projectCode = ?, clientId = ?, clientName = ?, name = ?, projectDesc = ?, supervisor = ?, supervisorName = ?, quantityOfService = ?, serviceType = ?, materialsRequired = ?, materialsUsed = ?, hrsTaken = ?, team = ?, startDate = ?, endDate = ?, status = ?, comments = ? 
    WHERE id = ?`;
    const values = [projectCode, toInt(clientId), clientName, name, projectDesc, toInt(empId), empName, quantityOfService, serviceType, toJSON(materialsRequired), toJSON(materialsUsed), toInt(hrsTaken), toJSON(team), toDate(startDate), toDate(endDate), status, comments, id];
    db.query(query, values, (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json("Project was updated");
    });
});

app.post('/delete-project', (req, res) => {
    const { id } = req.body;
    const query = `DELETE FROM project WHERE id = ${id}`;
    db.query(query, (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json("Project was deleted");
    });
});

app.get('/get-dutysheet', (req, res) => {
    const query = 'SELECT * FROM dutysheet ORDER BY createdAt DESC;';
    db.query(query, (e, data) => {
        if(e) res.status(404).json(e);
        else res.status(200).json(data);
    });
});

app.listen(8800, () => {
    console.log('Connection established');
});

// pagination example
// app.get('/get-employees', (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.pageSize) || 50;
//     const offset = (page - 1) * pageSize;
//     const query = 'SELECT * FROM employee ORDER BY createdAt DESC LIMIT ? OFFSET ?;';
//     db.query(query, [pageSize, offset], (e, data) => {
//         if(e) res.status(404).json(e);
//         else res.status(200).json(data);
//     });
// });

// const paginate = React.useRef({
//     page: 1,
//     pageSize: 50, 
// });

// const getClientData = async() => {
//     setLoading(true);
//     await axios.get(`${APP_URL}/get-clients`, {
//         params: {
//             page: paginate.current.page, 
//             pageSize: paginate.current.pageSize, 
//         }
//     }).then((res) => setClients(res.data)).catch((e) => {
//         alert('Error');
//     });
//     setLoading(false);
// };
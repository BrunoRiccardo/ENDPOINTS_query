
const mariadb = require('mariadb');
 

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'user_flight',
  connectionLimit: 5
});
  
//!!!!"GET "!!!!!!
//-------------UTENTE

// Legge tutti gli users
async function getAllUsers() {
  let conn, result;
  try {
    conn = await pool.getConnection();
    console.log('Connessione stabilita (getAllUsers)');
    result = await conn.query('SELECT * FROM users');
    console.log('Elenco users:', result);
  } catch (err) {
    console.error('Errore durante la lettura:', err.message);
    result = {"error": err.message};
  } finally {
    if (conn) conn.release(); 
    return result;
  }
}
 
 //trova uno user per ID
async function findUserById(id) {
  let conn, result;
  try {
    conn = await pool.getConnection();
    console.log('Connessione stabilita (findUserById)');
    result = await conn.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    console.log('Studente trovato:', result);
  } catch (err) {
    console.error('Errore  utente non trovato', err.message);
    result = {error: err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
}
//filtra utenti per genere
async function filterUserByGender(gender){

  let conn, result;
  try{
    conn = await pool.getConnection();
    console.log('Connessione stabilita (filterUserByGender)');
    result=await conn.query('SELECT * FROM users WHERE gender =?', [gender]);
    console.log('Utenti filtrati per genere:', result);
    return result;


  }
  catch(err){
    console.error('Errore durante la lettura:', err.message);
    result = {"error": err.message};
  }
  finally {
    if (conn) conn.release(); 
    return result;
  }

}

//trova utente per nome e cognome
async function findUserByNameAndLastname(firstname, lastname) {
  let conn, result;
  try {
    conn = await pool.getConnection();
    console.log('Connessione stabilita (findUserByNameAndLastname)');
    result = await conn.query(
      'SELECT * FROM users WHERE firstname = ? AND lastname = ?',
      [firstname, lastname]
    );
    console.log('Utente trovato:', result);
  } catch (err) {
    console.error('Errore utente non trovato', err.message);
    result = {error: err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
}


//FLIGHT-------------------------------


async function getAllFlights() {
  let conn, result;
  try {
    conn = await pool.getConnection();
    console.log('Connessione stabilita (getAllFlhights)');
    result = await conn.query('SELECT * FROM flights');
    console.log('Elenco flights:', result);
  } catch (err) {
    console.error('Errore durante la lettura:', err.message);
    result = {"error": err.message};
  } finally {
    if (conn) conn.release(); 
    return result;
  }
}


async function findFlightById(id) {
  let conn, result;
  try {
    conn = await pool.getConnection();
    console.log('Connessione stabilita (findFlightById)');
    result = await conn.query(
      'SELECT * FROM flights WHERE id = ?',
      [id]
    );
    console.log('Flight trovato:', result);
  } catch (err) {
    console.error('Errore  utente non trovato', err.message);
    result = {error: err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
}


async function findFlightByDepartureArrival(departurecity,arrivalcity) {
  let conn, result;
  try {
    conn = await pool.getConnection();
    console.log('Connessione stabilita (findFlightByDepartureArrival)');
    result = await conn.query(
      'SELECT * FROM flights WHERE departurecity = ? AND arrivalcity = ?',
      [departurecity, arrivalcity]
    );
    console.log('Flight trovato con ricerca city:', result);
  } catch (err) {
    console.error('Errore flight non trovato', err.message);
    result = {error: err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
}
 


//POST----------------------------------
//USER------


// Inserisce un nuovo user
// l'id è autoincrement fallo manuale se vuoi
async function addUser
(nome, cognome, email, gender, ip) {
  let conn, result;
  try {
    conn = await pool.getConnection();
    console.log('Connessione stabilita (addUser)');
    result = await conn.query(
      'INSERT INTO users (firstname, lastname, email,gender,ip) VALUES (?, ?, ?, ?, ?)',
      [nome, cognome, email, gender, ip]
    );
   
  } catch (err) {
    console.error('Errore durante l\'inserimento:', err.message);
    result = {"error": err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
} 

//FLIGHT------
//id -> STESSA ROBA PER L'ID UTENTE
async function addFlight(flightnumber, departurecode, departurecity, arrivalcode, arrivalciry,airlinecode,airlinename,departuretime,duration) {
  let conn, result;
  try {
    conn = await pool.getConnection();
    console.log('Connessione stabilita (addFlight)');
    result = await conn.query(
      'INSERT INTO flights (flightnumber, departurecode, departurecity, arrivalcode, arrivalcity, airlinecode, airlinename, departuretime, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [flightnumber, departurecode, departurecity, arrivalcode, arrivalciry, airlinecode, airlinename, departuretime, duration]
    );
   
  } catch (err) {
    console.error('Errore durante l\'inserimento:', err.message);
    result = {"error": err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
} 




//PUT---------------------
//USER------


//aggiorna un utente per id
async function updateUser(id, firstname, lastname, email, gender, ip) {
  let conn,result;
  try {
    conn = await pool.getConnection();
    result = await conn.query(
      `UPDATE users
       SET firstname = ?, lastname = ?, email = ?, gender = ?, ip = ?
       WHERE id = ?`,
      [firstname, lastname, email, gender, ip, id]
    );
    return {
      message: `Utente con id ${id} aggiornato`
    };
  } catch (err) {
    console.error('Errore durante l\'aggiornamento:', err.message);
    result = {"error": err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
}
//update un email per id
async function updateEmail(id, email) {
  let conn,result;
  try {
    conn = await pool.getConnection();

    result = await conn.query(
      `UPDATE users
       SET   email = ?
       WHERE id = ?`,
      [ email, id]
    );


    return {
      message: `email utente con id ${id} aggiornato`
    };

  } catch (err) {
    console.error('Errore durante l\'aggiornamento:', err.message);
    result = {"error": err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
}

//update un email per ip
async function updateIp(id, ip) {
  let conn,result;
  try {
    conn = await pool.getConnection();

    result = await conn.query(
      `UPDATE users
       SET   ip = ?
       WHERE id = ?`,
      [ ip, id]
    );


    return {
      message: `ip utente con id ${id} aggiornato`
    };

  } catch (err) {
    console.error('Errore durante l\'aggiornamento:', err.message);
    result = {"error": err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
}
//FLIGHT------


async function updateDeparturetime(id, departuretime) {
  let conn,result;
  try {
    conn = await pool.getConnection();

    result = await conn.query(
      `UPDATE flights
       SET   departuretime = ?
       WHERE id = ?`,
      [ departuretime, id]
    );


    return {
      message: `departuretime volo con id ${id} aggiornato`
    };

  } catch (err) {
    console.error('Errore durante l\'aggiornamento:', err.message);
    result = {"error": err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
}

async function updateDuration(id, duration) {
  let conn,result;
  try {
    conn = await pool.getConnection();

    result = await conn.query(
      `UPDATE flights
       SET   duration = ?
       WHERE id = ?`,
      [ duration, id]
    );


    return {
      message: `duration volo con id ${id} aggiornato`
    };

  } catch (err) {
    console.error('Errore durante l\'aggiornamento:', err.message);
    result = {"error": err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
}



async function updateFlight(id, arrivalcity, duration, airlinename) {
  let conn,result;
  try {
    conn = await pool.getConnection();

    result = await conn.query(
      `UPDATE flights
       SET   duration = ?,
        airlinename = ?,
         arrivalcity = ?
       WHERE id = ?`,
      [ duration, airlinename, arrivalcity, id]
    );


    return {
      message: `duration volo con id ${id} aggiornato`
    };

  } catch (err) {
    console.error('Errore durante l\'aggiornamento:', err.message);
    result = {"error": err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
}




async function updateAirlinename(id,  airlinename) {
  let conn,result;
  try {
    conn = await pool.getConnection();

    result = await conn.query(
      `UPDATE flights
        SET
        airlinename = ?
         
       WHERE id = ?`,
      [ airlinename, id]
    );


    return {
      message: `airlinename volo con id ${id} aggiornato`
    };

  } catch (err) {
    console.error('Errore durante l\'aggiornamento:', err.message);
    result = {"error": err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
}


//DELETE---------------------
// Elimina uno studente per ID
async function deleteUser(id) {
  let conn, result;
  try {
    conn = await pool.getConnection();
    
    result = await conn.query('DELETE FROM users WHERE id = ?', [id]);
   
  } catch (err) {
    console.error('Errore durante l\'eliminazione:', err.message);
    result = {error: err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
}



async function deleteIp(id) {
  let conn, result;
  try {
    conn = await pool.getConnection();
    
    result = await conn.query('UPDATE users SET ip = "" WHERE id = ?', [id]);
   
  } catch (err) {
    console.error('Errore durante l\'eliminazione:', err.message);
    result = {error: err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
}


//flight-------------------------------

async function deleteFlight(id) {
  let conn, result;
  try {
    conn = await pool.getConnection();
    
    result = await conn.query('DELETE FROM flights WHERE id = ?', [id]);
   
  } catch (err) {
    console.error('Errore durante l\'eliminazione:', err.message);
    result = {error: err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
}

async function deleteAirlinename(id) {
  let conn, result;
  try {
    conn = await pool.getConnection();
    
    result = await conn.query('UPDATE flights SET airlinename = "" WHERE id = ?', [id]);
   
  } catch (err) {
    console.error('Errore durante l\'eliminazione:', err.message);
    result = {error: err.message};
  } finally {
    if (conn) conn.release();
    return result;
  }
}
//esportazione delle funzioni
module.exports = {
  getAllUsers,
  addUser,
  addFlight,
  findUserById,
  filterUserByGender,
  findUserByNameAndLastname,
  getAllFlights,
  findFlightById,
  findFlightByDepartureArrival,
  updateUser,
  updateEmail,
  updateIp,
  deleteUser,
  deleteIp,
  updateDeparturetime,
  updateDuration,
  updateFlight,
  updateAirlinename,
  deleteFlight,
  deleteAirlinename
};
// ===========================================================
// Funzione principale asincrona
// ===========================================================
/*
async function main() {
  console.log('--- INIZIO SCRIPT MARIADB ---');
 
  await addUser('Luca', 'Rossi', 'email','male','121.0.0.0'); //TODO MODIFICA PARAMETRI
  await getAllUsers();
  await findStudentById(1);
  await filterStudentByGender('Male');
  await findStudentByNameAndLastname('Luca', 'Rossi');
  await deleteStudent(2);
 
  console.log('--- FINE SCRIPT ---');
  pool.end(); // chiude il pool
}
 
// ===========================================================
// Avvio del programma
// ===========================================================
main();*/